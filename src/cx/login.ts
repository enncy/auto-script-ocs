

import cfg from '../../ocs.config.js'
import ASOcsLogin from '../login'
import breakCode from '../utils/break-code'
import {EventEmitter} from 'events'
import { JSHandle, ElementHandle,Page } from 'puppeteer-core'
const elements = cfg.cx.login.elements
//事件对象
const emitter = new EventEmitter();

/**
 * cx 登录类
 * @param {Page} page  浏览器页面对象
 * @param {any} options  配置对象
 */

class CXLogin implements ASOcsLogin {
    page: Page
    options: any

    constructor(page: Page  , options: any){
        this.page = page
        this.options = options
    }

    /**
     * 开始课程
     */
    async start() {
        return new Promise(async (resolve, reject) => {

            emitter.on('login-success', url => {
                console.log("login success!!!");
                //登录成功
                resolve(url)
            })
            emitter.on('login-error', err => {
                console.error(err)
                //登录失败
                reject(err)
            })
            await this.selectSchool()
            //输入信息
            await this.inputInfo()
        })
    }

    /**
     * 选择学校
     */
    async  selectSchool() {
        let page = this.page
        let options = this.options
        await page.goto(cfg.cx.url.login)
        await page.waitFor(elements.select_school)
        await page.evaluate(elements.show_school_script)
        await page.waitFor(elements.search_school)
        //输入学校名
        let search_school_ele = await page.$(elements.search_school)  
        if(search_school_ele)await search_school_ele.type(options.school)
        //搜索学校名
        await page.evaluate(elements.search_school_script)
        //等待搜索结果
        await page.waitFor(elements.search_school_wait_time)
        await page.waitFor(elements.search_school_result)

        //点击搜索结果相匹配的列表，并且点击
        const search_school_result_ele = await page.$$(elements.search_school_result)
        search_school_result_ele.forEach(async ele => {
            const text = await page.evaluate(ele => ele.outerText, ele)
            //寻找匹配的学校，并点击
            if (text === options.school) {
                await ele.click()
            }
        })
    }

    /**
     * 输入账号
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    async  inputAccount() {
        let page = this.page
        let options = this.options
        await page.waitFor(elements.account)
        const account = await page.$(elements.account)
        //清空
        await page.evaluate(ele => ele.value = '', account)
        await page.waitFor(100)
        if(account)await account.type(options.account)
    }
    /**
     * 输入密码
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    async  inputPassword() {
        let page = this.page
        let options = this.options
        await page.waitFor(elements.password)
        const password = await page.$(elements.password)
        //清空
        await page.evaluate(ele => ele.value = '', password)
        await page.waitFor(100)
        if(password)await password.type(options.password)
    }

    /**
     * 输入验证码
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    async  inputVcode() {
        let page = this.page
        let options = this.options
        //清空
        await page.waitFor(elements.vercode_input)
        const vcode_input=await page.$(elements.vercode_input)
        await page.evaluate(ele => ele.value = '', vcode_input)
        //验证码填写
        await page.waitFor(elements.vercode_img)
        const vercode_img_ele = await page.$(elements.vercode_img)
        const img_base64 = await page.evaluate(ele => {
            return getBase64Image(ele)
            //获取图片base64编码
            function getBase64Image(img:any) {
                var canvas = document.createElement("canvas");
                canvas.width =  img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                if(ctx)ctx.drawImage(img, 0, 0, img.width, img.height);
                var dataURL = canvas.toDataURL("image/png");
                //不需要data:image/png;base64这部分
                return dataURL.replace("data:image/png;base64,", "");
            }
        }, vercode_img_ele)

        //如果设置了破解验证码, 可通过 options.use_breakCode 或者 cfg.cx.login.use_breakCode 设置
        if (options.use_breakCode || cfg.cx.login.use_breakCode) {
            const code = await breakCode(img_base64, options.breakCode)
            if(vcode_input)await vcode_input.type(code)
        }
        //否则等待时间
        else {
            await page.waitFor(cfg.cx.login.write_code_time)
        }
    }

    /**
     * 输入信息
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    async  inputInfo() {
        //输入账号
        await this.inputAccount()

        //输入密码
        await this.inputPassword()

        //输入验证码
        await this.inputVcode()

        //提交表单
        await this.submit()
    }

    /**
     * 提交表单
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    async  submit() {
        let page = this.page
        let options = this.options
        //监听请求成功响应，或者重定向
        page.on('requestfinished', async request => {
            page.once('load', async () => {
                //如果主页请求已完成，说明登录成功
                if (request.url().match(cfg.cx.url.index)) {
                    emitter.emit('login-success', request.url())
                }
            })
        })
        //提交表单
        await page.evaluate(elements.login_script)
        await page.waitFor(elements.login_wait_time)
        try {
            await page.waitFor(elements.show_error)
            const show_error_ele = await page.$(elements.show_error)
            const error_text = await page.evaluate(ele => ele.outerText, show_error_ele)
            //如果有错误信息，则抛出异常
            if (error_text.trim() !== '') {
                console.log(error_text);
                //如果是验证码错误，则重新输入
                if (error_text.trim() === elements.error_code) {
                    console.log("retring to input vcode...");
                    //移除监听
                    page.removeAllListeners()
                    //重新输入信息
                    await this.inputInfo()
                } else {
                    emitter.emit('login-error', error_text.trim())
                }
            }
        } catch (e) {
            //不进行处理
        }
    }

}

export default CXLogin