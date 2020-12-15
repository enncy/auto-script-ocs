import { Page } from 'puppeteer-core';
import ASOcsCourse from '../course';
/**
 * CX课程类
 * @param {Puppeteer.Page} page  浏览器页面对象
 */
declare class CXCourse implements ASOcsCourse {
    page: Page;
    constructor(page: Page);
    /**
     * 获取所有课程
     * @returns {Promise<Array<any>>}
     */
    getCourseInfo(): Promise<Array<any>>;
    /**
     * 进入课程学习界面
     * @param {String} course_url  课程url
     */
    gotoStudy(course_url: string): Promise<boolean>;
    /**
     * 进入课程作业界面
     * @param {String} course_url  课程url
     */
    gotoWork(course_url: string): Promise<boolean>;
    /**
     * 进入课程考试界面
     * @param {String} course_url  课程url
     */
    gotoExam(course_url: string): Promise<boolean>;
    /**
     *
     * @param options 配置
     * @returns {Promise<boolean>}
     */
    goto(options: {
        course_url: any;
        element: any;
        url: any;
    }): Promise<boolean>;
}
export default CXCourse;
