import ASOcsCourse from "./course"
import ASOcsLogin from "./login";
import BrowserUtils from "./utils/browser";
import { Browser,Page } from 'puppeteer-core'
import CXLogin from "./cx/login";
import CXCourse from "./cx/course";

class AutoScriptOcs {
	browser_utils: BrowserUtils = new BrowserUtils()
	login!: ASOcsLogin  
	course!: ASOcsCourse  
	options:any
	browser!:Browser
	page!:Page
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
	async launch() {
		console.log("launching...");
		this.browser =await this.browser_utils.launch()
		this.page = await this.browser.newPage()
		this.login = new CXLogin(this.page,this.options)
		this.course = new CXCourse(this.page)
		console.log("launch finish!");
		
		return this.browser 
	}
	//调式模式启动
	async launchByDebug(options: { binary_path: string; port: number; }) {
		this.browser =await this.browser_utils.launchChromeByDebug(options)
		this.page = await this.browser.newPage()
		this.login = new CXLogin(this.page,options)
		this.course = new CXCourse(this.page)
		return this.browser 
	}
}

export default AutoScriptOcs

