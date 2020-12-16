# auto-script-ocs
auto-script-projects  for  OnlineCourseScript


### ocs 的自动化测试脚本
#### 功能：
- 超星自动登录
- 超星自动获取课程
- 超星自动进入课程，作业，考试

## 使用
```
// install this project
npm i auto-script-ocs
```

新建index.js文件复制以下内容然后 `node index.js`    
或者在你的 node 程序中调用

```javascript

import ASOcs from 'auto-script-ocs'

let options = {
    //启动类型，目前有 : cx
    type:'cx', 
    //开启验证码破解，如果你不想用验证码破解功能，想手动输入验证码，使用 use_breakCode: false
    use_breakCode: false,
    //破解验证码的配置，请到 http://www.ttshitu.com/ 打码平台配置你的 account账号和 password密码
    breakCode: {
        username: '...',
        password: '...',
    },
    //学校名称
    school: "北京大学",
    //账号名称
    account: '123456789',
    //密码
    password: '123456789'
}
/**
 * 使用默认方式打开本机上存在的chrome浏览器，此时打开的浏览器是纯净的浏览器什么都没有
 */
const ocs = new ASOcs(options) //传入options配置

ocs.launch().then(async browser=>{
    //启动浏览器并登录
    await ocs.login.start()
    //获取课程信息
    const course_info =await ocs.course.getCourseInfo()
    console.log(course_info);
    //进入学习界面
    await ocs.course.gotoStudy( course_info[0].url)
    //进入考试界面
    await ocs.course.gotoExam(course_info[0].url)
    //进入作业界面
    await ocs.course.gotoWork( course_info[0].url)
    //关闭浏览器
    browser.close()
}).catch(e=>{
    console.error(e);
})
 
 



```

# Api

# AutoScriptOcs
## class:AutoScriptOcs(options)

#### options


+ `type`  <string>    ` cx | ...`        超星 ，目前只支持 	`cx`        
    
+ `use_breakCode`  <boolean>       是否开启验证码破解 ，
    
+ `breakCode` <Object>  此属性必须先开启 `use_breakCode : true `     ，请到 http://www.ttshitu.com/docs/ 打码平台配置你的 account账号和 password密码
    
  - `account`     <string>  账号
    
  - `password`    <string>  密码
    
+ `school`  <string> 网课平台学校名
    
+ `account`   <string> 网课平台账号
    
+ `password `  <string> 网课平台密码    
    
 

## Property



+ `browser_utils` <[BrowserUtils](#BrowserUtils)>  浏览器工具类

+ `login` :  <[ASOcsLogin](#ASocsLogin)>  登录类 ， 使用  `login.start() ` 登录

+ `course`: <[ASOcsCourse](#ASOcsCourse)>  课程类 



## Methods



+ `launch()` `return ` <[Browser](#Browser)> 默认启动方式，初始化 

+ `launchByDebug(options)` `return ` <[Browser](#Browser)>   调试模式启动，具体见 see *https://chromedevtools.github.io/devtools-protocol/*

  + `options`  <Object>       
     
    - `binary_path` <string>  被调试的浏览器可执行文件路径 ，例如  ..../chrome.exe          
    
    - `port` <number>    调试模式指定端口                        
               


# ASOcsLogin

## interface: ASOcsLogin 

登录类，`start()` 作为主函数使用，其他方法不建议调用

## Methods

  `start()` `return  `  <Promise<string>>   开始登录函数

具体实现类 ： [CXLogin](#CXLogin)



# ASOcsCourse

## interface: ASOcsLogin

## Methods



`getCourseInfo()` `return` <Promise<Array<Object>>>   获取课程信息，返回一个课程数组

+ return <Array<Object>>
    
  + `Object` :
  
    - `title` <string> 课程标题
    
    - `url` <string> 课程链接
    
    - `img` <string> 课程图片链接
    
    + `info` <Array<string>>   课程信息，例如 ["张三","100班级","课程结束"]            
          

`gotoStudy(course_url)` `return` <Promise<boolean>>  进入学习界面

`gotoWork(course_url)` `return` <Promise<boolean>>  进入作业界面

`gotoExam(course_url)` `return` <Promise<boolean>>  进入考试界面

+ `course_url`  <string>  课程链接 ， 例如  `getCourseInfo()[0].url`         
    
    

具体实现类：[CXCourse](#CXCourse)



# CXLogin

@see `src\cx\course.ts`

# CXCourse

@see  `src\cx\login.ts`

# BrowserUtils

@see `src\utils\browser.ts`

# Browser

@see [https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v5.5.0&show=api-class-browser](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v5.5.0&show=api-class-browser)
