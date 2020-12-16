import path from 'path';
import fs from 'fs';
import request from './request';
import system from './system';
import puppeteer from 'puppeteer-core';
import {Browser} from 'puppeteer-core';
 

class BrwoserUtils {
  
 
	 default_debug_port:number = 9222
	 debug_cmd: string=  '--remote-debugging-port'
  

	/**
	 * 获取本机 chrome 浏览器的二进制文件路径
	 * 
	 * @return {Promise<String>}
	 */
	 getChromePath(): Promise<string> {

		return new Promise((resolve, reject) => {
			let chrome_path = path.join( <string>process.env.LOCALAPPDATA,"\\Google\\Chrome\\Application\\chrome.exe")  
			if(fs.existsSync(chrome_path)){
				resolve(chrome_path)
			}else{
				reject("unable to find the chrome path !")
			}
		})
	}

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
	 launchChromeByDebug(options: {binary_path:string,port:number}): Promise<Browser> {
		return new Promise(async (resolve, reject) => {
			try {
				//获取可用的端口号
				this.default_debug_port = await system.portIsOccupied((options && options.port) || this.default_debug_port)
				let debug_options = `   ${this.debug_cmd}=${this.default_debug_port}`
				//如果指定了路径，则使用指定路径，否则使用系统的 chrome 路径
				if (!options || !options.binary_path) {
					//获取系统安装的 chrome 路径
					let chrome_path = await this.getChromePath()
					await system.exec(chrome_path + debug_options)
				} else {
					await system.exec(options.binary_path + debug_options)

				}

				const wsEndpointURL = await this.checkBrowserOpened(this.default_debug_port)
				const browser = await this.createBrowserByDebug(wsEndpointURL)
				resolve(browser)
			} catch (e) {
				reject(e)
			}

		})
	}


	/**
	 * 创建一个原生的 Puppeteer.Browser  对象 ，如果不指定浏览器路径则用本地的 chrome
	 * @param {any} options launch 配置  默认为 {headless:false,defaultViewport:null}
	 * @returns {Promise<Browser>}
	 */
	 launch(options : any = {headless:false,defaultViewport:null}): Promise<Browser> {
		return  new Promise(async (resolve, reject) => {
			if (options && options.executablePath) {
				resolve(await puppeteer.launch(options))
			} else {
				let path = await this.getChromePath()
				console.log("running browser from "+path);
				
				//找不到安装路径
				if (!path) reject("Unable to find the installation path for Chrome browser")
				else {
					const opt = Object.assign(options , { executablePath: path })
					resolve(await puppeteer.launch(opt))
				}
			}
		})
	}

	/**
	 * 使用devtools 协议来创建一个 Browser  对象 ，
	 * @param {String} wsEndpointURL devtools 调试的url
	 * @see getWsEndpointURL(port)
	 * @returns {Promise<Browser>}
	 */
	 createBrowserByDebug(wsEndpointURL: string): Promise<Browser> {
		return new Promise(async (resolve, reject) => {
			try {
				let browser = await puppeteer.connect({
					browserWSEndpoint: wsEndpointURL,
					defaultViewport: null,//铺满屏幕
				})
				browser.on('disconnected', () => {
					browser.close()
				})
				resolve(browser)
			} catch (e) {
				reject(e)
			}
		})
	}



	/**
	 * 获取本机打开的 debug 浏览器 wsEndpoint 路径 <br/>
	 * GET http://localhost:port/json/version
	 * 
	 * @see https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v5.5.0&show=api-browserwsendpoint
	 * @see https://chromedevtools.github.io/devtools-protocol/
	 * @param {number} port 指定的端口号
	 * @return  {Promise<String>}
	 */
	 getWsEndpointURL(port: number): Promise<string> {
		return new Promise(async (resolve, reject) => {
			request.get('http://localhost:' + port + '/json/version').then((r: { data: { webSocketDebuggerUrl: string }; }) => {
				resolve(r.data.webSocketDebuggerUrl)
			}).catch((e: any) => {
				reject(e)
			})
		})
	}
	/**
	 * @see getWsEndpointURL(port)
	 */
	 getDefaultWsEndpointURL() {
		return this.getWsEndpointURL(this.default_debug_port)
	}

	/**
	 * 
	 * @param {number} port 端口
	 * 定时检测浏览器启动状态，如果获取到启动状态，则返回一个 wsEndpoint url
	 * @return {Promise<String>}
	 */
	 checkBrowserOpened(port: number): Promise<string> {
		return new Promise(async (resolve, reject) => {
			try {
				let point = await this.getWsEndpointURL(port)
				this.sleep(1000)
				console.log(point);
				resolve(point)
			} catch (e) {
				console.log("checking the browser...");
				this.sleep(1000)
				resolve(this.checkBrowserOpened(port))
			}
		})
	}
	 sleep(time:  number ) {
		var startTime = new Date().getTime() + parseInt(String(time), 10);
		while (new Date().getTime() < startTime) { }
	}
}

 

export default BrwoserUtils