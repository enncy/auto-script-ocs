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
var findChrome = require('carlo/lib/find_chrome.js');
import request from './request';
import system from './system';
import puppeteer from 'puppeteer-core';
var BrwoserUtils = /** @class */ (function () {
    function BrwoserUtils() {
        this.default_debug_port = 9222;
        this.debug_cmd = '--remote-debugging-port';
    }
    /**
     * 获取本机 chrome 浏览器的二进制文件路径
     *
     * @return {Promise<String>}
     */
    BrwoserUtils.prototype.getChromePath = function () {
        return new Promise(function (resolve, reject) {
            //find_chrome模块来源于GoogleChromeLabs的Carlo,可以查看本机安装Chrome目录， 
            findChrome({}).then(function (findChromePath) {
                resolve(findChromePath.executablePath);
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     *
     * 使用调式模式打开指定路径的 chrome
     * --remote-debugging-port=9222
     *
     * @param {any} options
     * - options
     * 	- binary_path  二进制文件路径
     * 	- port 		   指定打开的端口，默认9222 ，每次调用此方法 端口号会自增 1
     * @see https://chromedevtools.github.io/devtools-protocol/
     *
     * @return {Promise<Browser>} 返回一个Browser对象
     */
    BrwoserUtils.prototype.launchChromeByDebug = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _a, debug_options, chrome_path, wsEndpointURL, browser, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        //获取可用的端口号
                        _a = this;
                        return [4 /*yield*/, system.portIsOccupied((options && options.port) || this.default_debug_port)];
                    case 1:
                        //获取可用的端口号
                        _a.default_debug_port = _b.sent();
                        debug_options = "   " + this.debug_cmd + "=" + this.default_debug_port;
                        if (!(!options || !options.binary_path)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getChromePath()];
                    case 2:
                        chrome_path = _b.sent();
                        return [4 /*yield*/, system.exec(chrome_path + debug_options)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, system.exec(options.binary_path + debug_options)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [4 /*yield*/, this.checkBrowserOpened(this.default_debug_port)];
                    case 7:
                        wsEndpointURL = _b.sent();
                        return [4 /*yield*/, this.createBrowserByDebug(wsEndpointURL)];
                    case 8:
                        browser = _b.sent();
                        resolve(browser);
                        return [3 /*break*/, 10];
                    case 9:
                        e_1 = _b.sent();
                        reject(e_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * 创建一个原生的 Puppeteer.Browser  对象 ，如果不指定浏览器路径则用本地的 chrome
     * @param {any} options launch 配置
     * @returns {Promise<Browser>}
     */
    BrwoserUtils.prototype.launch = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _a, path, opt, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(options && options.executablePath)) return [3 /*break*/, 2];
                        _a = resolve;
                        return [4 /*yield*/, puppeteer.launch(options)];
                    case 1:
                        _a.apply(void 0, [_c.sent()]);
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, this.getChromePath()
                        //找不到安装路径
                    ];
                    case 3:
                        path = _c.sent();
                        if (!!path) return [3 /*break*/, 4];
                        reject("Unable to find the installation path for Chrome browser");
                        return [3 /*break*/, 6];
                    case 4:
                        opt = Object.assign(options ? options : { headless: false, defaultViewport: null }, { executablePath: path });
                        _b = resolve;
                        return [4 /*yield*/, puppeteer.launch(opt)];
                    case 5:
                        _b.apply(void 0, [_c.sent()]);
                        _c.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * 使用devtools 协议来创建一个 Browser  对象 ，
     * @param {String} wsEndpointURL devtools 调试的url
     * @see getWsEndpointURL(port)
     * @returns {Promise<Browser>}
     */
    BrwoserUtils.prototype.createBrowserByDebug = function (wsEndpointURL) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var browser_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, puppeteer.connect({
                                browserWSEndpoint: wsEndpointURL,
                                defaultViewport: null,
                            })];
                    case 1:
                        browser_1 = _a.sent();
                        browser_1.on('disconnected', function () {
                            browser_1.close();
                        });
                        resolve(browser_1);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        reject(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * 获取本机打开的 debug 浏览器 wsEndpoint 路径 <br/>
     * GET http://localhost:port/json/version
     *
     * @see https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v5.5.0&show=api-browserwsendpoint
     * @see https://chromedevtools.github.io/devtools-protocol/
     * @param {number} port 指定的端口号
     * @return  {Promise<String>}
     */
    BrwoserUtils.prototype.getWsEndpointURL = function (port) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                request.get('http://localhost:' + port + '/json/version').then(function (r) {
                    resolve(r.data.webSocketDebuggerUrl);
                }).catch(function (e) {
                    reject(e);
                });
                return [2 /*return*/];
            });
        }); });
    };
    /**
     * @see getWsEndpointURL(port)
     */
    BrwoserUtils.prototype.getDefaultWsEndpointURL = function () {
        return this.getWsEndpointURL(this.default_debug_port);
    };
    /**
     *
     * @param {number} port 端口
     * 定时检测浏览器启动状态，如果获取到启动状态，则返回一个 wsEndpoint url
     * @return {Promise<String>}
     */
    BrwoserUtils.prototype.checkBrowserOpened = function (port) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var point, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getWsEndpointURL(port)];
                    case 1:
                        point = _a.sent();
                        this.sleep(1000);
                        console.log(point);
                        resolve(point);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.log("checking the browser...");
                        this.sleep(1000);
                        resolve(this.checkBrowserOpened(port));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    BrwoserUtils.prototype.sleep = function (time) {
        var startTime = new Date().getTime() + parseInt(String(time), 10);
        while (new Date().getTime() < startTime) { }
    };
    return BrwoserUtils;
}());
export default BrwoserUtils;
