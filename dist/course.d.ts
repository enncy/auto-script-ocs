import { Page } from 'puppeteer-core';
interface ASOcsCourse {
    page: Page;
    getCourseInfo: () => Promise<Array<Object>>;
    gotoStudy: (course_url: string) => Promise<boolean>;
    gotoWork: (course_url: string) => Promise<boolean>;
    gotoExam: (course_url: string) => Promise<boolean>;
}
export default ASOcsCourse;
