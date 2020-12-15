import ASOcsCourse from "./src/course";
import ASOcsLogin from "./src/login";
import BrowserUtils from "./src/utils/browser";
import { Browser } from 'puppeteer-core';
declare class AutoScriptOcs {
    browser_utils: BrowserUtils;
    login: ASOcsLogin;
    course: ASOcsCourse;
    options: any;
    browser: Browser;
    constructor(options: any);
    set Login(login: ASOcsLogin);
    get Login(): ASOcsLogin;
    launch(options: any): Promise<Browser>;
    launchByDebug(options: {
        binary_path: string;
        port: number;
    }): Promise<void>;
}
export default AutoScriptOcs;
