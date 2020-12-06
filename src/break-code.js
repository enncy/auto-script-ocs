
/*
 * @Description: 破解验证码 http://api.ttshitu.com/
 * return Promise<String> code
 */
const axios = require('axios').default;

module.exports={
	//base64 是图片的 base64 编码 ，不包 含data:image/png..... 这段字符串
	getCode(base64,breakConfig) {
		
		//打码
		return new Promise((resolve, reject) => {
			//判断信息是否正确
			if(!breakConfig || !breakConfig.username || !breakConfig.password|| breakConfig.username=='' || breakConfig.password==''){
				console.error("[break-code.js] error :  breakConfig is incorrect 破解验证码信息填写不正确！！！");
				reject("[break-code.js] error :  breakConfig is incorrect 破解验证码信息填写不正确！！！")
			}else{
				const apiUrl = 'http://api.ttshitu.com/base64'; //要使用点选请将地址修改为 http://api.ttshitu.com/imageXYPlus
				axios.post(apiUrl, {
					'username': breakConfig.username, //用户名
					'password': breakConfig.password, //密码
					'typeid': '1', //验证码类型(默认 3 数英混合)：16:汉字 14:图片旋转 11:计算题 7:无感学习，4:闪动GIF，3:数英混合， 2:纯英文，1:纯数字.  
					'image': base64
				}).then(function(response) {
					
					let d = response.data;
					if (d.success) {
						// handle success
						let {
							id,
							result
						} = d.data;
						resolve(result)
					
					} else {
						reject(d.message)
						console.log(d.message)
					}
				});
			}
			
			
			
		})
	
	
	}
	
}