const webdriver = require('selenium-webdriver');
const By = webdriver.By
const ocs_config = require('../../ocs.config.js')

function intoCourse(driver, course_url) {
	return new Promise((resolve, reject) => {
		driver.get(course_url).then(r => {
			setTimeout(()=>{
				driver.findElements(By.css(ocs_config.cx.into_course.elements.job_a)).then(a=>{
					console.log(a);
					 a[0].getAttribute('href').then(href=>{
					 	driver.get(href).then(r=>{
					 		resolve(href)
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
		}).catch(e => {
			reject(e)
		})
	})

}

module.exports = intoCourse
