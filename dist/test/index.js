"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
let options = {
    //启动类型，目前有 : cx
    type: 'cx',
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
};
/**
 * 使用默认方式打开本机上存在的chrome浏览器，此时打开的浏览器是纯净的浏览器什么都没有
 */
const ocs = new index_1.default(options);
ocs.launch().then((browser) => __awaiter(void 0, void 0, void 0, function* () {
    //启动浏览器并登录
    yield ocs.login.start();
    //获取课程信息
    const course_info = yield ocs.course.getCourseInfo();
    console.log(course_info);
    //进入学习界面
    yield ocs.course.gotoStudy(course_info[0].url);
    //进入考试界面
    yield ocs.course.gotoExam(course_info[0].url);
    //进入作业界面
    yield ocs.course.gotoWork(course_info[0].url);
    //关闭浏览器
    browser.close();
})).catch(e => {
    console.error(e);
});
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
