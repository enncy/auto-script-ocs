/**
 * 破解验证码 api 文档 http://api.ttshitu.com/
 * @see http://api.ttshitu.com/
 * @param {String} base64  图片的 base64 编码 ，不包 含data:image/png..... 这段字符串
 * @param {Object} breakConfig  打码平台的账号 breakConfig.account 和 breakConfig.password 密码
 * @return {Promise<String>} code
 */
declare function breakCode(base64: string, breakConfig: {
    username: string;
    password: string;
}): Promise<string>;
export default breakCode;
