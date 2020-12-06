var webdriver = require('selenium-webdriver');

const axios = require('axios').default;
const fs = require('fs');

const loginUtil =require('./utils/cx/login.js')
const getCourse =require('./utils/cx/get-course.js')

const ocs_config = require('./ocs.config.js')





module.exports={
	
	
	
	
	//执行获取课程操作
	startGetCourse(driver) {
		return new Promise((resolve, reject) => {
			getCourse(driver).then(r => {
				console.log(r);
				if (r) {
					resolve(r)
					driver.quit().catch((e) => {})
				}
			}).catch(e => {
				reject(e)
			})
		})
	},
	//执行刷课操作
	startCourse(){
		
	},
	
	//执行登录操作
	startLogin(config) {
		return new Promise((resolve, reject) => {
			var driver = new webdriver.Builder().forBrowser(config.forBrowser || 'chrome').build();
			//超星登录
			if(config.type=='cx')driver.get(ocs_config.cx.url.login);
			
			loginUtil.login(driver, config).then(r => {
				resolve()
			}).catch(e => {
				resolve()
			})
		})
	}
}