import ASOcsCourse from "./course";
import ASOcsLogin from "./login";
import BrowserUtils from "./utils/browser";
import { Browser, Page } from 'puppeteer-core';
declare class AutoScriptOcs {
    browser_utils: BrowserUtils;
    login: ASOcsLogin;
    course: ASOcsCourse;
    options: any;
    browser: Browser;
    page: Page;
    constructor(options: any);
    set Login(login: ASOcsLogin);
    get Login(): ASOcsLogin;
    launch(): Promise<Browser>;
    launchByDebug(options: {
        binary_path: string;
        port: number;
    }): Promise<Browser>;
}
export default AutoScriptOcs;
