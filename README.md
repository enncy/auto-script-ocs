# auto-script-ocs
auto-script-projects  for  OnlineCourseScript


### ocs 的自动化测试脚本
#### 功能：
- 超星自动登录
- 超星自动获取课程
- 超星自动进入课程

## 使用
```
// install this project
npm i auto-script-ocs
```

新建index.js文件复制以下内容然后 `node index.js`    
或者在你的 node 程序中调用

```javascript

const ocs = require('../index.js')

let config = {
	//谷歌浏览器的版本， 打开谷歌浏览器 -> 设置(s) -> 关于 Chrome -> 版本 xx.x.xxxx.xx
	chrome_version: 'xx.x.xxxx.xx',
	//需要登录的网课平台
	type: 'cx', //cx超星 ，目前只支持cx
	//破解验证码的配置，请到 http://www.ttshitu.com/docs/ 打码平台配置你的 account账号和 password密码
	//如果你不想用验证码破解功能，想手动输入验证码，
	//第一种方式：使用 use_breakCode: false
	//第二种方式：请在 ./node_modules/auto-script-ocs/ocs.config.js 下的:  平台类型.login.use_breakCode 设置为 false
	//开启验证码破解
	use_breakCode: true,
	//破解验证码平台 http://www.ttshitu.com/docs/
	breakCode: {
		username: '破解验证码平台的账号',
		password: '破解验证码平台的密码',
	},
	//学校名称
	school: "北京大学",
	//账号名称
	account: '12345678901',
	//密码
	password: 'abcdefg'
}

//初始化chrome服务
ocs.initService(config.chrome_version)
//开始登录
ocs.startLogin(config).then(driver => {
	//获取全部课程
	ocs.getCourse(driver).then(course_info=> {
		//全部课程信息
		console.log(course_info);
		//进入课程
		ocs.intoCourse(driver, course_info[0].url).then(driver => {
			driver.getCurrentUrl().then(url => {
				console.log("进入课程成功" + url);
			})
		})
	})
}).catch(e=>{
	console.error(e);
})
 



```


#### methods

- `ocs`   requied('auto-script-ocs') ， ocs 对象 ，封装了各种自动化函数

  - `startLogin(config) `  `return Promise(driver)    `   开始自动登录 ，  `config` 为上面的 [config ](#config ) 对象

    - `config`
      - `chrome_version` :  `String`     谷歌浏览器的版本， 打开谷歌浏览器 -> 设置(s) -> 关于 Chrome -> 版本 xx.x.xxxx.xx
      - `type`  :  ` String(cx)`        超星 ，目前只支持cx
      - `use_breakCode `  : `Boolean`       是否开启验证码破解 ，
      - `breakCode` : `Object`       此属性必须先开启 `use_breakCode : true `     ，请到 http://www.ttshitu.com/docs/ 打码平台配置你的 account账号和 password密码
        - `account`   : `String ` 账号
        - `password`  : `String `  密码
      - `school` : `String `网课平台学校名
      - `account`  : `String ` 网课平台账号
      - `password ` : `String ` 网课平台密码

  - `getCourse(driver)` : `return Promise(driver,courses_info)`  开始自动获取课程 ， 必须在 `startLogin` 之后执行

    - `driver` Webdriver 对象 

  - `intoCourse(driver,url)` : `return Promise(driver)`  开始进入课程

    - `driver` :  `Webdriver ` 对象 
    - `url` : `String`

    


