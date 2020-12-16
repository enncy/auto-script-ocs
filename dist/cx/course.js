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
const ocs_config_1 = __importDefault(require("../ocs.config"));
const elements = ocs_config_1.default.cx.get_course.elements;
/**
 * CX课程类
 * @param {Puppeteer.Page} page  浏览器页面对象
 */
class CXCourse {
    constructor(page) {
        this.page = page;
    }
    /**
     * 获取所有课程
     * @returns {Promise<Array<any>>}
     */
    getCourseInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let page = this.page;
                try {
                    //总课程信息
                    let course_info = [];
                    //等待加载完成
                    yield page.waitFor(elements.foot);
                    //获取frame
                    const frame = page.frames().find(frame => frame.name() === elements.iframe_name);
                    if (frame) {
                        //执行元素全部显示
                        yield frame.evaluate(elements.all_show_script);
                        //课程图片
                        const course_imgs = yield frame.$$eval(elements.img, element => element.map(ele => ele.src));
                        //课程标题
                        const course_titles = yield frame.$$eval(elements.a_tag, element => element.map(ele => ele.title));
                        //课程链接
                        const course_url = yield frame.$$eval(elements.a_tag, element => element.map(ele => ele.href));
                        //课程信息
                        const course_infos = yield frame.$$(elements.info);
                        let course_infos_titles = [];
                        //遍历
                        for (let element of course_infos) {
                            const couse_info_title = yield element.$$eval('p', ele => ele.map(p => p.innerHTML));
                            //过滤掉空元素
                            course_infos_titles.push(couse_info_title.filter(el => el.trim() !== ''));
                        }
                        //汇总信息
                        for (let i = 0; i < course_titles.length; i++) {
                            course_info[i] = {
                                title: course_titles[i],
                                img: course_imgs[i],
                                url: course_url[i],
                                info: course_infos_titles[i]
                            };
                        }
                        resolve(course_info);
                    }
                    else {
                        reject('frame is  invalid');
                    }
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    /**
     * 进入课程学习界面
     * @param {String} course_url  课程url
     */
    gotoStudy(course_url) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = ocs_config_1.default.cx.into_course.elements;
            return yield this.goto({
                course_url,
                element: element.job_a,
                url: element.course_study_url
            });
        });
    }
    /**
     * 进入课程作业界面
     * @param {String} course_url  课程url
     */
    gotoWork(course_url) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = ocs_config_1.default.cx.into_course.elements;
            return yield this.goto({
                course_url,
                element: element.work_a,
                url: element.course_work_url
            });
        });
    }
    /**
     * 进入课程考试界面
     * @param {String} course_url  课程url
     */
    gotoExam(course_url) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = ocs_config_1.default.cx.into_course.elements;
            return yield this.goto({
                course_url,
                element: element.exam_a,
                url: element.course_exam_url
            });
        });
    }
    /**
     *
     * @param options 配置
     * @returns {Promise<boolean>}
     */
    goto(options) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const page = this.page;
                //进入指定url
                yield page.goto(options.course_url);
                //点击指定的元素
                yield page.waitFor(options.element);
                const a = yield page.$(options.element);
                if (a)
                    yield a.click();
                //监听请求
                page.on('requestfinished', (request) => {
                    //如果是指定界面
                    if (request.url().match(options.url)) {
                        //加载完成
                        page.once('load', () => {
                            page.removeAllListeners();
                            resolve(true);
                        });
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        }));
    }
}
exports.default = CXCourse;
