# auto-script-ocs
auto-script-projects  for  OnlineCourseScript




### ocs 的自动化测试脚本
#### 功能：
- 超星自动登录
- 超星自动获取课程
- 超星自动进入课程

## 使用

新建index.js文件然后 `node index.js`    
或者在你的 node 程序中调用

```javascript

const ocs = require('auto-script-ocs')

let config = {
	//需要登录的网课平台
	type:'cx',  
	//破解验证码的配置，请到 http://www.ttshitu.com/docs/ 打码平台配置你的 account账号和 password密码
	//如果你不想用验证码破解功能，想手动输入验证码，
	//第一种方式：使用 use_breakCode: false
	//第二种方式：请在 ./node_modules/auto-script-ocs/ocs.config.js 下的:  平台类型.login.use_breakCode 设置为 false
	
	//开启验证码破解
	use_breakCode: true,
	//破解验证码平台 http://www.ttshitu.com/docs/
	breakCode:{
		username:'破解验证码平台的账号',
		password:'破解验证码平台的密码',
	},
	//学校名称
	school: "北京大学",
	//账号名称
	account: '12345678901',
	//密码
	password: 'abcdefg'
}

//开始登录
ocs.startLogin(config).then(()=>{
	//获取全部课程
	ocs.getCourse(ocs.driver).then(courses_info=>{
		//全部课程信息
		console.log(courses_info);
		//进入课程
		ocs.intoCourse(ocs.driver,courses_info[0].url).then(driver=>{
			driver.getCurrentUrl().then(url=>{
				console.log("进入课程成功"+url);
			}) 
		})
	})
})

```


### 运行


```javascript
//下载此项目
npm install git+https://github.com/klskeleton/auto-script-ocs.git
//安装依赖包
npm install
//启动测试
npm run test
```
