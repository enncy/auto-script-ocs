"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
/**
 * 破解验证码 api 文档 http://api.ttshitu.com/
 * @see http://api.ttshitu.com/
 * @param {String} base64  图片的 base64 编码 ，不包 含data:image/png..... 这段字符串
 * @param {Object} breakConfig  打码平台的账号 breakConfig.account 和 breakConfig.password 密码
 * @return {Promise<String>} code
 */
function breakCode(base64, breakConfig) {
    //打码
    return new Promise((resolve, reject) => {
        //判断信息是否正确
        if (!breakConfig || !breakConfig.username || !breakConfig.password || breakConfig.username == '' || breakConfig.password == '') {
            console.error("[break-code.js] error :  breakConfig is incorrect 破解验证码信息填写不正确！！！");
            reject("[break-code.js] error :  breakConfig is incorrect 破解验证码信息填写不正确！！！");
        }
        else {
            const apiUrl = 'http://api.ttshitu.com/base64'; //要使用点选请将地址修改为 http://api.ttshitu.com/imageXYPlus
            axios_1.default.post(apiUrl, {
                'username': breakConfig.username,
                'password': breakConfig.password,
                'typeid': '1',
                'image': base64
            }).then(function (response) {
                let d = response.data;
                if (d.success) {
                    // handle success
                    let { id, result } = d.data;
                    resolve(result);
                }
                else {
                    reject(d.message);
                    console.log(d.message);
                }
            });
        }
    });
}
exports.default = breakCode;
