var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');

const axios = require('axios').default;
const fs = require('fs');
const path = require('path');
const ocs_config = require('./ocs.config.js')
const loginUtil = require('./src/cx/login.js')
const getCourse = require('./src/cx/get-course.js')
const intoCourse = require('./src/cx/into-course.js')
const driverHandle = require('./src/chromedriver-handle.js')




module.exports = {


	driver: Object,
	loginUtil,
	getCourse,
	intoCourse,

	//执行登录操作
	 startLogin(config) {
		
		 
		return new Promise((resolve, reject) => {
			
			//查找谷歌浏览器驱动
			if(!fs.existsSync('./bin'))fs.mkdirSync('./bin')
			if (!fs.existsSync(`./bin/chromedriver${config.chrome_version}.exe`)) {
				driverHandle.installChromedriver(config.chrome_version).then(r=>{
					//启动刚刚下载的chromedriver$
					
					this.driver = this.newBrowser(config.chrome_version)
					//超星登录
					if (config.type == 'cx') this.driver.get(ocs_config.cx.url.login);
					
					loginUtil.login(this.driver, config).then(r => {
						resolve(this.driver)
					}).catch(e => {
						resolve(this.driver)
					})
				}).catch(e=>{
					console.error(e);
				})
			} 
			
			
			
		})
	},
	//新建浏览器，此浏览器不共享 cookie
	newBrowser(chrome_version){
		var service = new chrome.ServiceBuilder(`./bin/chromedriver${chrome_version}.exe`).build();
		chrome.setDefaultService(service);
		chrome = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
		return chrome
	}
}

 
