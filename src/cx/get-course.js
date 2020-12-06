const webdriver = require('selenium-webdriver');

const By = webdriver.By

function getCourse(driver) {
	//查找课程布局
	/*
	 * 
     * 课程图片： $('.courseItem.curFile').find('img')
     * 课程名字： $('.courseItem.curFile').find('h3 a') 
     * 课程信息： $('.courseItem.curFile').find('div p').not('h3').text()
	 */
	//切换到课程iframe
	return new Promise((resolve,reject)=>{
		driver.switchTo().frame(driver.findElement(By.id("frame_content"))).then(r => {
			driver.executeScript("$('*').css('display','block')")
			driver.findElements(By.css(".courseItem.curFile")).then(courses => {
				//总课程信息
				let course_info = []
				//递归遍历每个课程
				forEachCourses(0)
				function forEachCourses(index) {
					//遍历到最后一个，返回课程信息
					if(!courses[index]){
						resolve(course_info,driver)
						return
					}else{
						//遍历课程信息
						//1。获取图片
						courses[index].findElement(By.css('img')).then(img=>{
							img.getAttribute('src').then(src=>{
								
								 courses[index].findElement(By.css('h3 a')).then(a => {
									 //2 获取课程链接
								 	a.getAttribute('href').then(url=>{
										//3 获取课程名
								 		a.getAttribute('title').then(r => {
								 			console.log("获取课程："+r);
								 			//添加到总课程
								 			course_info.push({
								 				title:r,
								 				img:src,
								 				url:url,
								 				details:[]
								 			})
								 			//4 获取课程信息
								 			courses[index].findElements(By.css('div p')).then(p => {
								 				//递归遍历课程信息，如课程老师，课程班级
								 				forEachP(0)
								 				function forEachP(i){
								 					if(!p[i]){
								 						forEachCourses(index+1)
								 					}else{
								 						p[i].getAttribute('title').then(r => {
								 							if(r.trim()!=''){
								 								course_info[index].details.push(r.trim())
								 							}
								 						})
								 						forEachP(i+1)
								 					}
								 					
								 				}
								 			})
								 		})
								 	}) 
								 	
								 })
							})
						})
						
					}
					
				}
		
			}).catch(e => {
				reject(e)
			})
		
		}).catch(e => {
			reject(e)
		})
	})
}


module.exports = getCourse
