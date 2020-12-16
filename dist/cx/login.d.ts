import ASOcsLogin from '../login';
import { Page } from 'puppeteer-core';
/**
 * cx 登录类
 * @param {Page} page  浏览器页面对象
 * @param {any} options  配置对象
 */
declare class CXLogin implements ASOcsLogin {
    page: Page;
    options: any;
    constructor(page: Page, options: any);
    /**
     * 开始课程
     * @returns {Promise<string>}
     */
    start(): Promise<string>;
    /**
     * 选择学校
     * @returns {Promise<boolean>}
     */
    selectSchool(): Promise<boolean>;
    /**
     * 输入账号
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    inputAccount(): Promise<void>;
    /**
     * 输入密码
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    inputPassword(): Promise<void>;
    /**
     * 输入验证码
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    inputVcode(): Promise<void>;
    /**
     * 输入信息
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    inputInfo(): Promise<void>;
    /**
     * 提交表单
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    submit(): Promise<void>;
}
export default CXLogin;
