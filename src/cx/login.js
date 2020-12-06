const webdriver = require('selenium-webdriver');
const ocs_config = require('../../ocs.config.js')
const breakCode = require('../break-code.js')
const By = webdriver.By
const until = webdriver.until


module.exports = {
	//检查登录是否成功
	checkLogin(driver) {
		return new Promise((resolve, reject) => {
			driver.getCurrentUrl().then(url => {
				if (url.indexOf(ocs_config.cx.url.index) != -1) {
					console.log("登录成功");
					resolve(true)
				} else {
					console.log("登录失败");
					resolve(false)
				}
			}).catch(e => {
				console.error(e);
			})
		})
	},

	//登录操作
	login(driver, config) {

		return new Promise((resolve, reject) => {
			console.log("正在选择学校。。。");
			//等待选择学校
			this.getSchool(driver, config).then(() => {
				console.log("输入账号中。。。");
				this.writeInfo(driver, config).then(r => {
					resolve(r)
				}).catch(e => {
					reject(e)
				})
			})
		})
	},
	//填写账号信息
	writeInfo(driver, config) {

		return new Promise((resolve, reject) => {
			driver.findElement(By.css(ocs_config.cx.login.elements.account)).then(accountEle => {
				//清空账号
				accountEle.clear().then(() => {
					//输入账号
					accountEle.sendKeys(config.account).then(() => {
						console.log("输入密码中。。。");

						driver.findElement(By.css(ocs_config.cx.login.elements.password)).then(passwordEle => {
							//清空密码
							passwordEle.clear().then(() => {
								//输入密码
								passwordEle.sendKeys(config.password).then(() => {
									//如果不开启验证码破解，则等待时间 ，  可以在 ocs.config.js 设置 use_breakCode 或者直接在 config 对象设置  use_breakCode
									if ((config.use_breakCode!=undefined && config.use_breakCode==false) ||  !ocs_config.cx.login.use_breakCode) {
										setTimeout(() => {
											this.loginSubmit(driver, config).then(r => {
												resolve(r)
											}).catch(e => {
												reject(e)
											})
										}, ocs_config.cx.login.write_code_time)
									} else {
										//获取验证码的base64编码
										console.log("获取验证码中。。。");
										driver.executeScript(this.getBase64Script()).then(base64 => {
											console.log("获得验证码的base64\n");
											//获取图片的base64
											breakCode.getCode(base64, config.breakCode).then(r => {
												console.log("获取验证码成功" + r);

												//输入验证码
												driver.findElement(By.css(ocs_config.cx.login.elements.vercode_input)).then(ele => {
													ele.sendKeys(r).then(r => {
														//登录操作
														this.loginSubmit(driver, config).then(r => {
															resolve(r)
														}).catch(e => {
															reject(e)
														})
													})
												})
											}).catch(e => {
												reject(e)
											})
										}).catch(e => {
											reject(e)
										})

									}



								})
							})

						})
					})
				})

			})
		})
	},
	//提交登录表单
	loginSubmit(driver, config) {
		return new Promise((resolve, reject) => {
			console.log("登录中。。。");
			driver.executeScript(ocs_config.cx.login.elements.login_script).then(r => {
				console.log("登录操作成功");

				//等待登录操作
				setTimeout(() => {

					//等待2秒，如果页面没跳转，说明登录失败
					driver.findElement(By.css(ocs_config.cx.login.elements.show_error)).then(error => {
						error.getText().then(text => {
							if (text.trim() == "验证码错误" || text.trim() =="请填写验证码") {
								driver.navigate().refresh().then(r => {
									//重新来
									this.writeInfo(driver, config).then(r=>{
										resolve(r)
									}).catch(e=>{
										reject(e)
									})
								})
							} else {
								reject(text.trim())
							}
						}).catch(e => {
							reject(e);
						})

					}).catch(e => {
						//如果页面此时在跳转，则会抛出此异常，说明登录成功，这里加一下url判断即可
						this.checkLogin(driver).then(r => {
							if (r) {
								resolve("登录成功")
							}
						}).catch(e => {
							reject(e);
						})
					})
				}, ocs_config.cx.login.elements.login_script.login_wait_time)
			})
		})
	},



	//选择学校
	getSchool(driver, config) {

		return new Promise((resolve, reject) => {

			//选择学校
			driver.findElement(By.css(ocs_config.cx.login.elements.select_school)).then(r => {

				//打开弹窗
				driver.executeScript(ocs_config.cx.login.elements.show_school_script);

				//等待学校输入框元素
				driver.findElement(By.css(ocs_config.cx.login.elements.search_school)).then(r => {

					//输入学校名
					r.sendKeys(config.school).then(() => {

						//搜索学校
						driver.executeScript(ocs_config.cx.login.elements.search_school_script);
						//https://passport2.chaoxing.com/org/searchforms
						setTimeout(() => {

							//等待搜索结果
							driver.findElements(By.css(ocs_config.cx.login.elements.search_school_result)).then(r => {
								if (r.length == 0) {
									reject("无匹配的学校名称：" + config.school)
								} else {

									//循环遍历学校名，查找学校
									r.forEach(li => {
										li.getText().then((t) => {
											if (t.trim() === config.school) {
												li.click().then(() => {
													//关闭选择学校框
													driver.executeScript(ocs_config.cx.login.elements.close_school_select_script);
													resolve()
												})
											}
										})
									})
								}
							}).catch(e => {
								reject(e);
							})
						}, ocs_config.cx.login.elements.search_school_wait_time)
					})
				}).catch(e => {
					reject(e);
				})
			}).catch(e => {
				reject(e);
			})
		})
	},


	getBase64Script(driver) {
		return `
				function getBase64Image(img) {
		            var canvas = document.createElement("canvas");
		            canvas.width = img.width;
		            canvas.height = img.height;
		            var ctx = canvas.getContext("2d");
		            ctx.drawImage(img, 0, 0, img.width, img.height);
		            var dataURL = canvas.toDataURL("image/png");
					//消除前面的base64数据格式，只保留base64码，打码需要
		             return dataURL.replace("data:image/png;base64,", "");
		             
		        }	
				return getBase64Image(document.querySelector('${ ocs_config.cx.login.elements.vercode_img}'))
			`
	},

}
