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
	//启动服务设置
	service:Object,

	loginUtil,
	getCourse,
	intoCourse,
	driverHandle,
	
	initService(chrome_version){
		var service = new chrome.ServiceBuilder(`./bin/chromedriver${chrome_version}.exe`).build();
		chrome.setDefaultService(service);
	},

	//执行登录操作
	startLogin(config) {
		let driver

		return new Promise((resolve, reject) => {

			//查找谷歌浏览器驱动
			if (!fs.existsSync('./bin')) fs.mkdirSync('./bin')
			//如果查找不到则下载
			if (!fs.existsSync(`./bin/chromedriver${config.chrome_version}.exe`)) {
				driverHandle.installChromedriver(config.chrome_version).then(r => {
					
					//启动刚刚下载的chromedriver$
					driver = this.newBrowser(config.chrome_version)
					start()
				}).catch(e => {
					console.error(e);
				})

				//查找到则直接运行
			} else {
				driver = this.newBrowser(config.chrome_version)
				start()
			}

			function start() {
				//超星登录
				if (config.type == 'cx')driver.get(ocs_config.cx.url.login);

				loginUtil.login(driver, config).then(driver => {
					resolve(driver)
				}).catch(e => {
					//如果有错误信息，说明登录错误，否则视为登录成功
					if(e){
						reject(e)
						console.log("登录失败,原因："+e);
					}else{
						resolve(driver)
					}
					
					
				})
			}



		})
	},
	//新建浏览器，此浏览器不共享 cookie
	newBrowser(chrome_version) {

		chromedriver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
		return chromedriver
	}
}
