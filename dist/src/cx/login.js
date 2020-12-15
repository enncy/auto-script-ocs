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
import cfg from '../../ocs.config.js';
import breakCode from '../utils/break-code';
import { EventEmitter } from 'events';
var elements = cfg.cx.login.elements;
//事件对象
var emitter = new EventEmitter();
/**
 * cx 登录类
 * @param {Page} page  浏览器页面对象
 * @param {any} options  配置对象
 */
var CXLogin = /** @class */ (function () {
    function CXLogin(page, options) {
        this.page = page;
        this.options = options;
    }
    /**
     * 开始课程
     */
    CXLogin.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    emitter.on('login-success', function (url) {
                                        console.log("login success!!!");
                                        //登录成功
                                        resolve(url);
                                    });
                                    emitter.on('login-error', function (err) {
                                        console.error(err);
                                        //登录失败
                                        reject(err);
                                    });
                                    return [4 /*yield*/, this.selectSchool()
                                        //输入信息
                                    ];
                                case 1:
                                    _a.sent();
                                    //输入信息
                                    return [4 /*yield*/, this.inputInfo()];
                                case 2:
                                    //输入信息
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 选择学校
     */
    CXLogin.prototype.selectSchool = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, options, search_school_ele, search_school_result_ele;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = this.page;
                        options = this.options;
                        return [4 /*yield*/, page.goto(cfg.cx.url.login)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.waitFor(elements.select_school)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, page.evaluate(elements.show_school_script)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.waitFor(elements.search_school)
                            //输入学校名
                        ];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, page.$(elements.search_school)];
                    case 5:
                        search_school_ele = _a.sent();
                        if (!search_school_ele) return [3 /*break*/, 7];
                        return [4 /*yield*/, search_school_ele.type(options.school)
                            //搜索学校名
                        ];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: 
                    //搜索学校名
                    return [4 /*yield*/, page.evaluate(elements.search_school_script)
                        //等待搜索结果
                    ];
                    case 8:
                        //搜索学校名
                        _a.sent();
                        //等待搜索结果
                        return [4 /*yield*/, page.waitFor(elements.search_school_wait_time)];
                    case 9:
                        //等待搜索结果
                        _a.sent();
                        return [4 /*yield*/, page.waitFor(elements.search_school_result)
                            //点击搜索结果相匹配的列表，并且点击
                        ];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, page.$$(elements.search_school_result)];
                    case 11:
                        search_school_result_ele = _a.sent();
                        search_school_result_ele.forEach(function (ele) { return __awaiter(_this, void 0, void 0, function () {
                            var text;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, page.evaluate(function (ele) { return ele.outerText; }, ele)
                                        //寻找匹配的学校，并点击
                                    ];
                                    case 1:
                                        text = _a.sent();
                                        if (!(text === options.school)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, ele.click()];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 输入账号
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    CXLogin.prototype.inputAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, options, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = this.page;
                        options = this.options;
                        return [4 /*yield*/, page.waitFor(elements.account)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.$(elements.account)
                            //清空
                        ];
                    case 2:
                        account = _a.sent();
                        //清空
                        return [4 /*yield*/, page.evaluate(function (ele) { return ele.value = ''; }, account)];
                    case 3:
                        //清空
                        _a.sent();
                        return [4 /*yield*/, page.waitFor(100)];
                    case 4:
                        _a.sent();
                        if (!account) return [3 /*break*/, 6];
                        return [4 /*yield*/, account.type(options.account)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 输入密码
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    CXLogin.prototype.inputPassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, options, password;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = this.page;
                        options = this.options;
                        return [4 /*yield*/, page.waitFor(elements.password)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.$(elements.password)
                            //清空
                        ];
                    case 2:
                        password = _a.sent();
                        //清空
                        return [4 /*yield*/, page.evaluate(function (ele) { return ele.value = ''; }, password)];
                    case 3:
                        //清空
                        _a.sent();
                        return [4 /*yield*/, page.waitFor(100)];
                    case 4:
                        _a.sent();
                        if (!password) return [3 /*break*/, 6];
                        return [4 /*yield*/, password.type(options.password)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 输入验证码
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    CXLogin.prototype.inputVcode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, options, vcode_input, vercode_img_ele, img_base64, code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = this.page;
                        options = this.options;
                        //清空
                        return [4 /*yield*/, page.waitFor(elements.vercode_input)];
                    case 1:
                        //清空
                        _a.sent();
                        return [4 /*yield*/, page.$(elements.vercode_input)];
                    case 2:
                        vcode_input = _a.sent();
                        return [4 /*yield*/, page.evaluate(function (ele) { return ele.value = ''; }, vcode_input)
                            //验证码填写
                        ];
                    case 3:
                        _a.sent();
                        //验证码填写
                        return [4 /*yield*/, page.waitFor(elements.vercode_img)];
                    case 4:
                        //验证码填写
                        _a.sent();
                        return [4 /*yield*/, page.$(elements.vercode_img)];
                    case 5:
                        vercode_img_ele = _a.sent();
                        return [4 /*yield*/, page.evaluate(function (ele) {
                                return getBase64Image(ele);
                                //获取图片base64编码
                                function getBase64Image(img) {
                                    var canvas = document.createElement("canvas");
                                    canvas.width = img.width;
                                    canvas.height = img.height;
                                    var ctx = canvas.getContext("2d");
                                    if (ctx)
                                        ctx.drawImage(img, 0, 0, img.width, img.height);
                                    var dataURL = canvas.toDataURL("image/png");
                                    //不需要data:image/png;base64这部分
                                    return dataURL.replace("data:image/png;base64,", "");
                                }
                            }, vercode_img_ele)
                            //如果设置了破解验证码, 可通过 options.use_breakCode 或者 cfg.cx.login.use_breakCode 设置
                        ];
                    case 6:
                        img_base64 = _a.sent();
                        if (!(options.use_breakCode || cfg.cx.login.use_breakCode)) return [3 /*break*/, 10];
                        return [4 /*yield*/, breakCode(img_base64, options.breakCode)];
                    case 7:
                        code = _a.sent();
                        if (!vcode_input) return [3 /*break*/, 9];
                        return [4 /*yield*/, vcode_input.type(code)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, page.waitFor(cfg.cx.login.write_code_time)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 输入信息
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    CXLogin.prototype.inputInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //输入账号
                    return [4 /*yield*/, this.inputAccount()
                        //输入密码
                    ];
                    case 1:
                        //输入账号
                        _a.sent();
                        //输入密码
                        return [4 /*yield*/, this.inputPassword()
                            //输入验证码
                        ];
                    case 2:
                        //输入密码
                        _a.sent();
                        //输入验证码
                        return [4 /*yield*/, this.inputVcode()
                            //提交表单
                        ];
                    case 3:
                        //输入验证码
                        _a.sent();
                        //提交表单
                        return [4 /*yield*/, this.submit()];
                    case 4:
                        //提交表单
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 提交表单
     * @param {Puppeteer.Page} page 页面元素
     * @param {Object} options 配置
     */
    CXLogin.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, options, show_error_ele, error_text, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = this.page;
                        options = this.options;
                        //监听请求成功响应，或者重定向
                        page.on('requestfinished', function (request) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                page.once('load', function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        //如果主页请求已完成，说明登录成功
                                        if (request.url().match(cfg.cx.url.index)) {
                                            emitter.emit('login-success', request.url());
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                                return [2 /*return*/];
                            });
                        }); });
                        //提交表单
                        return [4 /*yield*/, page.evaluate(elements.login_script)];
                    case 1:
                        //提交表单
                        _a.sent();
                        return [4 /*yield*/, page.waitFor(elements.login_wait_time)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 10, , 11]);
                        return [4 /*yield*/, page.waitFor(elements.show_error)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, page.$(elements.show_error)];
                    case 5:
                        show_error_ele = _a.sent();
                        return [4 /*yield*/, page.evaluate(function (ele) { return ele.outerText; }, show_error_ele)
                            //如果有错误信息，则抛出异常
                        ];
                    case 6:
                        error_text = _a.sent();
                        if (!(error_text.trim() !== '')) return [3 /*break*/, 9];
                        console.log(error_text);
                        if (!(error_text.trim() === elements.error_code)) return [3 /*break*/, 8];
                        console.log("retring to input vcode...");
                        //移除监听
                        page.removeAllListeners();
                        //重新输入信息
                        return [4 /*yield*/, this.inputInfo()];
                    case 7:
                        //重新输入信息
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        emitter.emit('login-error', error_text.trim());
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        e_1 = _a.sent();
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return CXLogin;
}());
export default CXLogin;
