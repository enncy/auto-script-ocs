var webdriver = require('selenium-webdriver');

const axios = require('axios').default;
const fs = require('fs');


const loginUtil = require('./utils/cx/login.js')
const getCourse = require('./utils/cx/get-course.js')
const intoCourse = require('./utils/cx/into-course.js')
const ocs_config = require('./ocs.config.js')

module.exports = {


	webdriver: Object,
	//执行获取课程操作
	startGetCourse() {
		return new Promise((resolve, reject) => {
			getCourse(this.webdriver).then(courses_info => {

				if (courses_info) {
					resolve(courses_info, this.webdriver)

				}
			}).catch(e => {
				reject(e)
			})
		})
	},
	//执行刷课操作
	startCourse(course_url) {
		return new Promise((resolve, reject) => {
			intoCourse(this.webdriver, course_url).then(r => {
				resolve(r)
			}).catch(e => {
				reject(e)
			})
		})
	},

	//执行登录操作
	startLogin(config) {
		return new Promise((resolve, reject) => {
			this.webdriver = new webdriver.Builder().forBrowser(config.forBrowser || 'chrome').build();
			//超星登录
			if (config.type == 'cx') this.webdriver.get(ocs_config.cx.url.login);

			loginUtil.login(this.webdriver, config).then(r => {
				resolve(this.webdriver)
			}).catch(e => {
				resolve(this.webdriver)
			})
		})
	}
}
