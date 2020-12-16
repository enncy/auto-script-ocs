import { Browser } from 'puppeteer-core';
declare class BrwoserUtils {
    default_debug_port: number;
    debug_cmd: string;
    /**
     * 获取本机 chrome 浏览器的二进制文件路径
     *
     * @return {Promise<String>}
     */
    getChromePath(): Promise<string>;
    /**
     *
     * 使用调式模式打开指定路径的 chrome
     * --remote-debugging-port=9222
     *
     * @param {any} options
     * - options
     * 	- binary_path  二进制文件路径
     * 	- port 		   指定打开的端口，默认9222 ，每次调用此方法 端口号会自增 1
     * @see https://chromedevtools.github.io/devtools-protocol/
     *
     * @return {Promise<Browser>} 返回一个Browser对象
     */
    launchChromeByDebug(options: {
        binary_path: string;
        port: number;
    }): Promise<Browser>;
    /**
     * 创建一个原生的 Puppeteer.Browser  对象 ，如果不指定浏览器路径则用本地的 chrome
     * @param {any} options launch 配置  默认为 {headless:false,defaultViewport:null}
     * @returns {Promise<Browser>}
     */
    launch(options?: any): Promise<Browser>;
    /**
     * 使用devtools 协议来创建一个 Browser  对象 ，
     * @param {String} wsEndpointURL devtools 调试的url
     * @see getWsEndpointURL(port)
     * @returns {Promise<Browser>}
     */
    createBrowserByDebug(wsEndpointURL: string): Promise<Browser>;
    /**
     * 获取本机打开的 debug 浏览器 wsEndpoint 路径 <br/>
     * GET http://localhost:port/json/version
     *
     * @see https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v5.5.0&show=api-browserwsendpoint
     * @see https://chromedevtools.github.io/devtools-protocol/
     * @param {number} port 指定的端口号
     * @return  {Promise<String>}
     */
    getWsEndpointURL(port: number): Promise<string>;
    /**
     * @see getWsEndpointURL(port)
     */
    getDefaultWsEndpointURL(): Promise<string>;
    /**
     *
     * @param {number} port 端口
     * 定时检测浏览器启动状态，如果获取到启动状态，则返回一个 wsEndpoint url
     * @return {Promise<String>}
     */
    checkBrowserOpened(port: number): Promise<string>;
    sleep(time: number): void;
}
export default BrwoserUtils;
