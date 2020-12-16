import cfg from '../ocs.config'
import { Page } from 'puppeteer-core'
import ASOcsCourse from '../course'
const elements = cfg.cx.get_course.elements


/**
 * CX课程类
 * @param {Puppeteer.Page} page  浏览器页面对象
 */
class CXCourse implements ASOcsCourse{
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    /**
     * 获取所有课程
     * @returns {Promise<Array<any>>}
     */
    async  getCourseInfo(): Promise<Array<any>> {
        return new Promise(async (resolve, reject) => {
            let page = this.page
            try {
                //总课程信息
                let course_info = []
                //等待加载完成
                await page.waitFor(elements.foot)
                //获取frame
                const frame = page.frames().find(frame => frame.name() === elements.iframe_name);
                if (frame) {
                    //执行元素全部显示
                    await frame.evaluate(elements.all_show_script)
                    //课程图片
                    const course_imgs = await frame.$$eval(elements.img, element => element.map(ele =>  (<HTMLImageElement>ele).src));
                    //课程标题
                    const course_titles = await frame.$$eval(elements.a_tag, element => element.map(ele =>  (<HTMLElement>ele).title));
                    //课程链接
                    const course_url = await frame.$$eval(elements.a_tag, element => element.map(ele =>  (<HTMLLinkElement>ele).href));
                    //课程信息
                    const course_infos = await frame.$$(elements.info);
                    let course_infos_titles = []
                    //遍历
                    for (let element of course_infos) {
                        const couse_info_title = await element.$$eval('p', ele => ele.map(p =>  (<HTMLElement>p).innerHTML))
                        //过滤掉空元素
                        course_infos_titles.push(couse_info_title.filter(el => el.trim() !== ''))
                    }
                    //汇总信息
                    for (let i = 0; i < course_titles.length; i++) {
                        course_info[i] = {
                            title: course_titles[i],
                            img: course_imgs[i],
                            url: course_url[i],
                            info: course_infos_titles[i]
                        }
                    }
                    resolve(course_info)
                }else{
                    reject('frame is  invalid')
                }
            } catch (e) {
                reject(e)
            }
        })
    }

    /**
     * 进入课程学习界面
     * @param {String} course_url  课程url
     */
    async gotoStudy(course_url: string) {
        const element = cfg.cx.into_course.elements
        return await this.goto({
            course_url,
            element: element.job_a,
            url: element.course_study_url
        })
    }

    /**
     * 进入课程作业界面
     * @param {String} course_url  课程url
     */
    async gotoWork(course_url: string) {
        const element = cfg.cx.into_course.elements
        return await this.goto({
            course_url,
            element: element.work_a,
            url: element.course_work_url
        })
    }

    /**
     * 进入课程考试界面
     * @param {String} course_url  课程url
     */
    async gotoExam(course_url: string) {
        const element = cfg.cx.into_course.elements
        return await this.goto({
            course_url,
            element: element.exam_a,
            url: element.course_exam_url
        })
    }

    /**
     * 
     * @param options 配置
     * @returns {Promise<boolean>}
     */
    goto(options: { course_url: any; element: any; url: any; }): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const page = this.page
                //进入指定url
                await page.goto(options.course_url)
                //点击指定的元素
                await page.waitFor(options.element)
                const a = await page.$(options.element)
                if(a)await a.click()
                //监听请求
                page.on('requestfinished', (request: { url: () => string }) => {
                    //如果是指定界面
                    if (request.url().match(options.url)) {
                        //加载完成
                        page.once('load', () => {
                            page.removeAllListeners()
                            resolve(true)
                        })
                    }
                })

            } catch (e) {
                reject(e)
            }
        })
    }

}

export default CXCourse
