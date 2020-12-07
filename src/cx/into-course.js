const webdriver = require('selenium-webdriver');
const By = webdriver.By
const ocs_config = require('../../ocs.config.js')


 function intoCourse(driver, course_url) {
	return new Promise((resolve, reject) => {
		//进入页面
		driver.get(course_url)
		setTimeout(()=>{
			//获取第一个章节
			driver.findElements(By.css(ocs_config.cx.into_course.elements.job_a)).then(a=>{
				 a[0].getAttribute('href').then(href=>{
					 //进入章节
				 	driver.get(href).then(r=>{
				 		resolve(driver)
				 	}).catch(e=>{
				 		reject(e)
				 	})
				 }).catch(e=>{
				 	reject(e)
				 })
			}).catch(e=>{
				reject(e)
			})
		},ocs_config.cx.into_course.elements.into_course_wait_time)
	})

}

module.exports = intoCourse
