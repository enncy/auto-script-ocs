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
const browser_1 = __importDefault(require("./utils/browser"));
const login_1 = __importDefault(require("./cx/login"));
const course_1 = __importDefault(require("./cx/course"));
class AutoScriptOcs {
    constructor(options) {
        this.browser_utils = new browser_1.default();
        this.options = options;
    }
    set Login(login) {
        this.login = login;
    }
    get Login() {
        return this.login;
    }
    //默认启动
    launch() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("launching...");
            this.browser = yield this.browser_utils.launch();
            this.page = yield this.browser.newPage();
            this.login = new login_1.default(this.page, this.options);
            this.course = new course_1.default(this.page);
            console.log("launch finish!");
            return this.browser;
        });
    }
    //调式模式启动
    launchByDebug(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser = yield this.browser_utils.launchChromeByDebug(options);
            this.page = yield this.browser.newPage();
            this.login = new login_1.default(this.page, options);
            this.course = new course_1.default(this.page);
            return this.browser;
        });
    }
}
exports.default = AutoScriptOcs;
