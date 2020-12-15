var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import ASOcs from '../index';
var options = {
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
    account: '123456',
    //密码
    password: '123456'
};
var ocs = new ASOcs(options);
/**
 * 使用默认方式打开本机上存在的chrome浏览器，此时打开的浏览器是纯净的浏览器什么都没有
 */
ocs.launch({}).then(function (browser) { return __awaiter(void 0, void 0, void 0, function () {
    var course_info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //开始刷课
                ocs.login.start();
                return [4 /*yield*/, ocs.course.getCourseInfo()
                    //进入学习界面
                ];
            case 1:
                course_info = _a.sent();
                //进入学习界面
                return [4 /*yield*/, ocs.course.gotoStudy(course_info[0].url)
                    //进入考试界面
                ];
            case 2:
                //进入学习界面
                _a.sent();
                //进入考试界面
                return [4 /*yield*/, ocs.course.gotoExam(course_info[0].url)
                    //进入作业界面
                ];
            case 3:
                //进入考试界面
                _a.sent();
                //进入作业界面
                return [4 /*yield*/, ocs.course.gotoWork(course_info[0].url)];
            case 4:
                //进入作业界面
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }).catch(function (e) {
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
