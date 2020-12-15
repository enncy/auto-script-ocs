import ASOcsCourse from "./src/course"
import ASOcsLogin from "./src/login";
import BrowserUtils from "./src/utils/browser"
import { Browser, Page } from 'puppeteer-core'
import CXLogin from "./src/cx/login";
import CXCourse from "./src/cx/course";

const enum Type {
	'cx',
}
 
class AutoScriptOcs {
	browser_utils: BrowserUtils = new BrowserUtils()
	login!: ASOcsLogin  
	course!: ASOcsCourse  
	options:any
	browser!:Browser
	constructor(options: any) {
		this.options = options
	}

	set Login(login: ASOcsLogin ){
		this.login = login
	}

	get Login(){
		return this.login
	}

	//默认启动
	async launch(options:any) {
		this.browser =await this.browser_utils.launch({})
		this.login = new CXLogin(await this.browser .newPage(),options)
		this.course = new CXCourse(await this.browser .newPage())
		return this.browser 
	}
	//调式模式启动
	async launchByDebug(options: { binary_path: string; port: number; }) {
		let browser =await this.browser_utils.launchChromeByDebug(options)
		this.login = new CXLogin(await browser.newPage(),options)
		this.course = new CXCourse(await browser.newPage())
		return 
	}
}

export default AutoScriptOcs

