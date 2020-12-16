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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ocs_config_1 = __importDefault(require("../ocs.config"));
var elements = ocs_config_1.default.cx.get_course.elements;
/**
 * CX课程类
 * @param {Puppeteer.Page} page  浏览器页面对象
 */
var CXCourse = /** @class */ (function () {
    function CXCourse(page) {
        this.page = page;
    }
    /**
     * 获取所有课程
     * @returns {Promise<Array<any>>}
     */
    CXCourse.prototype.getCourseInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var page, course_info, frame, course_imgs, course_titles, course_url, course_infos, course_infos_titles, _i, course_infos_1, element, couse_info_title, i, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    page = this.page;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 14, , 15]);
                                    course_info = [];
                                    //等待加载完成
                                    return [4 /*yield*/, page.waitFor(elements.foot)
                                        //获取frame
                                    ];
                                case 2:
                                    //等待加载完成
                                    _a.sent();
                                    frame = page.frames().find(function (frame) { return frame.name() === elements.iframe_name; });
                                    if (!frame) return [3 /*break*/, 12];
                                    //执行元素全部显示
                                    return [4 /*yield*/, frame.evaluate(elements.all_show_script)
                                        //课程图片
                                    ];
                                case 3:
                                    //执行元素全部显示
                                    _a.sent();
                                    return [4 /*yield*/, frame.$$eval(elements.img, function (element) { return element.map(function (ele) { return ele.src; }); })];
                                case 4:
                                    course_imgs = _a.sent();
                                    return [4 /*yield*/, frame.$$eval(elements.a_tag, function (element) { return element.map(function (ele) { return ele.title; }); })];
                                case 5:
                                    course_titles = _a.sent();
                                    return [4 /*yield*/, frame.$$eval(elements.a_tag, function (element) { return element.map(function (ele) { return ele.href; }); })];
                                case 6:
                                    course_url = _a.sent();
                                    return [4 /*yield*/, frame.$$(elements.info)];
                                case 7:
                                    course_infos = _a.sent();
                                    course_infos_titles = [];
                                    _i = 0, course_infos_1 = course_infos;
                                    _a.label = 8;
                                case 8:
                                    if (!(_i < course_infos_1.length)) return [3 /*break*/, 11];
                                    element = course_infos_1[_i];
                                    return [4 /*yield*/, element.$$eval('p', function (ele) { return ele.map(function (p) { return p.innerHTML; }); })
                                        //过滤掉空元素
                                    ];
                                case 9:
                                    couse_info_title = _a.sent();
                                    //过滤掉空元素
                                    course_infos_titles.push(couse_info_title.filter(function (el) { return el.trim() !== ''; }));
                                    _a.label = 10;
                                case 10:
                                    _i++;
                                    return [3 /*break*/, 8];
                                case 11:
                                    //汇总信息
                                    for (i = 0; i < course_titles.length; i++) {
                                        course_info[i] = {
                                            title: course_titles[i],
                                            img: course_imgs[i],
                                            url: course_url[i],
                                            info: course_infos_titles[i]
                                        };
                                    }
                                    resolve(course_info);
                                    return [3 /*break*/, 13];
                                case 12:
                                    reject('frame is  invalid');
                                    _a.label = 13;
                                case 13: return [3 /*break*/, 15];
                                case 14:
                                    e_1 = _a.sent();
                                    reject(e_1);
                                    return [3 /*break*/, 15];
                                case 15: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 进入课程学习界面
     * @param {String} course_url  课程url
     */
    CXCourse.prototype.gotoStudy = function (course_url) {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = ocs_config_1.default.cx.into_course.elements;
                        return [4 /*yield*/, this.goto({
                                course_url: course_url,
                                element: element.job_a,
                                url: element.course_study_url
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 进入课程作业界面
     * @param {String} course_url  课程url
     */
    CXCourse.prototype.gotoWork = function (course_url) {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = ocs_config_1.default.cx.into_course.elements;
                        return [4 /*yield*/, this.goto({
                                course_url: course_url,
                                element: element.work_a,
                                url: element.course_work_url
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 进入课程考试界面
     * @param {String} course_url  课程url
     */
    CXCourse.prototype.gotoExam = function (course_url) {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = ocs_config_1.default.cx.into_course.elements;
                        return [4 /*yield*/, this.goto({
                                course_url: course_url,
                                element: element.exam_a,
                                url: element.course_exam_url
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * @param options 配置
     * @returns {Promise<boolean>}
     */
    CXCourse.prototype.goto = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var page_1, a, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        page_1 = this.page;
                        //进入指定url
                        return [4 /*yield*/, page_1.goto(options.course_url)
                            //点击指定的元素
                        ];
                    case 1:
                        //进入指定url
                        _a.sent();
                        //点击指定的元素
                        return [4 /*yield*/, page_1.waitFor(options.element)];
                    case 2:
                        //点击指定的元素
                        _a.sent();
                        return [4 /*yield*/, page_1.$(options.element)];
                    case 3:
                        a = _a.sent();
                        if (!a) return [3 /*break*/, 5];
                        return [4 /*yield*/, a.click()
                            //监听请求
                        ];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        //监听请求
                        page_1.on('requestfinished', function (request) {
                            //如果是指定界面
                            if (request.url().match(options.url)) {
                                //加载完成
                                page_1.once('load', function () {
                                    page_1.removeAllListeners();
                                    resolve(true);
                                });
                            }
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        e_2 = _a.sent();
                        reject(e_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
    };
    return CXCourse;
}());
exports.default = CXCourse;
