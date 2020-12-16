
import ASOcs from '../index'

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
const ocs = new ASOcs(options)

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
 

/**
 *  使用调试模式浏览器，此方法可以打开原来自带用户数据的浏览器，例如导航栏，历史记录，拓展程序，但是只能打开一次，多次打开将使用第一个进行操作
    browserUtils.openChromeByDebug({
        binary_path: 'D:/.../chrome.exe', //浏览器路径
    }).then(async browser => {
        ......
    }).catch(e => {
        console.error(e);
    })

*/