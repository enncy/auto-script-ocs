var webdriver = require('selenium-webdriver');

const axios = require('axios').default;
const fs = require('fs');
const ocs_config = require('./ocs.config.js')
const loginUtil = require('./src/cx/login.js')
const getCourse = require('./src/cx/get-course.js')
const intoCourse = require('./src/cx/into-course.js')


module.exports = {


	driver:Object,	
	loginUtil,
	getCourse,
	intoCourse,

	//执行登录操作
	startLogin(config) {
		this
		return new Promise((resolve, reject) => {
			this.driver = new webdriver.Builder().forBrowser(config.forBrowser || 'chrome').build();
			//超星登录
			if (config.type == 'cx') this.driver.get(ocs_config.cx.url.login);

			loginUtil.login(this.driver, config).then(r => {
				resolve(this.driver)
			}).catch(e => {
				resolve(this.driver)
			})
		})
	}
}

module.exports.loginUtil


