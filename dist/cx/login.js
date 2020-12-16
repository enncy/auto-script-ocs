"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ocs_config_js_1 = __importDefault(require("../ocs.config.js"));
const break_code_1 = __importDefault(require("../utils/break-code"));
const events_1 = require("events");
const elements = ocs_config_js_1.default.cx.login.elements;
//事件对象
const emitter = new events_1.EventEmitter();
/**
 * cx 登录类
 * @param {Page} page  浏览器页面对象
 * @param {any} options  配置对象
 */
class CXLogin {
    constructor(page, options) {
        this.page = page;
        this.options = options;
    }
    /**
     * 开始课程
     * @returns {Promise<string>}
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                emitter.on('login-success', url => {
                    console.log("login success!!!");
                    //登录成功
                    resolve(url);
                });
                emitter.on('login-error', err => {
                    console.error(err);
                    //登录失败
                    reject(err);
                });
                yield this.selectSchool();
                //输入信息
                yield this.inputInfo();
            }));
        });
    }
    /**
     * 选择学校
     * @returns {Promise<boolean>}
     */
    selectSchool() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let page = this.page;
                    let options = this.options;
                    yield page.goto(ocs_config_js_1.default.cx.url.login);
                    yield page.waitFor(elements.select_school);
                    yield page.evaluate(elements.show_school_script);
                    yield page.waitFor(elements.search_school);
                    //输入学校名
                    let search_school_ele = yield page.$(elements.search_school);
                    if (search_school_ele)
                        yield search_school_ele.type(options.school);
                    //搜索学校名
                    yield page.evaluate(elements.search_school_script);
                    //等待搜索结果
                    yield page.waitFor(elements.search_school_wait_time);
                    yield page.waitFor(elements.search_school_result);
                    //点击搜索结果相匹配的列表，并且点击
                    const search_school_result_ele = yield page.$$(elements.search_school_result);
                    search_school_result_ele.forEach((ele) => __awaiter(this, void 0, void 0, function* () {
                        const text = yield page.evaluate(ele => ele.outerText, ele);
                        //寻找匹配的学校，并点击
                        if (text === options.school) {
                            yield ele.click();
                            resolve(true);
                        }
                    }));
                }
                catch (e) {
                    reject(false);
                }
            }));
        });
    }
    /**
     * 输入账号
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    inputAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            let page = this.page;
            let options = this.options;
            yield page.waitFor(elements.account);
            const account = yield page.$(elements.account);
            //清空
            yield page.evaluate(ele => ele.value = '', account);
            yield page.waitFor(100);
            if (account)
                yield account.type(options.account);
        });
    }
    /**
     * 输入密码
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    inputPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            let page = this.page;
            let options = this.options;
            yield page.waitFor(elements.password);
            const password = yield page.$(elements.password);
            //清空
            yield page.evaluate(ele => ele.value = '', password);
            yield page.waitFor(100);
            if (password)
                yield password.type(options.password);
        });
    }
    /**
     * 输入验证码
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    inputVcode() {
        return __awaiter(this, void 0, void 0, function* () {
            let page = this.page;
            let options = this.options;
            //清空
            yield page.waitFor(elements.vercode_input);
            const vcode_input = yield page.$(elements.vercode_input);
            yield page.evaluate(ele => ele.value = '', vcode_input);
            //验证码填写
            yield page.waitFor(elements.vercode_img);
            const vercode_img_ele = yield page.$(elements.vercode_img);
            const img_base64 = yield page.evaluate(ele => {
                return getBase64Image(ele);
                //获取图片base64编码
                function getBase64Image(img) {
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext("2d");
                    if (ctx)
                        ctx.drawImage(img, 0, 0, img.width, img.height);
                    var dataURL = canvas.toDataURL("image/png");
                    //不需要data:image/png;base64这部分
                    return dataURL.replace("data:image/png;base64,", "");
                }
            }, vercode_img_ele);
            //如果设置了破解验证码, 可通过 options.use_breakCode 或者 cfg.cx.login.use_breakCode 设置
            if (options.use_breakCode || ocs_config_js_1.default.cx.login.use_breakCode) {
                const code = yield break_code_1.default(img_base64, options.breakCode);
                if (vcode_input)
                    yield vcode_input.type(code);
            }
            //否则等待时间
            else {
                yield page.waitFor(ocs_config_js_1.default.cx.login.write_code_time);
            }
        });
    }
    /**
     * 输入信息
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    inputInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            //输入账号
            yield this.inputAccount();
            //输入密码
            yield this.inputPassword();
            //输入验证码
            yield this.inputVcode();
            //提交表单
            yield this.submit();
        });
    }
    /**
     * 提交表单
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            let page = this.page;
            let options = this.options;
            //监听请求成功响应，或者重定向
            page.on('requestfinished', (request) => __awaiter(this, void 0, void 0, function* () {
                page.once('load', () => __awaiter(this, void 0, void 0, function* () {
                    //如果主页请求已完成，说明登录成功
                    if (request.url().match(ocs_config_js_1.default.cx.url.index)) {
                        emitter.emit('login-success', request.url());
                    }
                }));
            }));
            //提交表单
            yield page.evaluate(elements.login_script);
            yield page.waitFor(elements.login_wait_time);
            try {
                yield page.waitFor(elements.show_error);
                const show_error_ele = yield page.$(elements.show_error);
                const error_text = yield page.evaluate(ele => ele.outerText, show_error_ele);
                //如果有错误信息，则抛出异常
                if (error_text.trim() !== '') {
                    console.log(error_text);
                    //如果是验证码错误，则重新输入
                    if (error_text.trim() === elements.error_code) {
                        console.log("retring to input vcode...");
                        //移除监听
                        page.removeAllListeners();
                        //重新输入信息
                        yield this.inputInfo();
                    }
                    else {
                        emitter.emit('login-error', error_text.trim());
                    }
                }
            }
            catch (e) {
                //不进行处理
            }
        });
    }
}
exports.default = CXLogin;
