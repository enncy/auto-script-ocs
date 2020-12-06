const ocs = require('../index.js')


/*
 * @Description: config : 登录的配置
 * 
 * 				config.type :  cx | zhs | mooc    登录的平台类型
 * 						
 */

let config = {
	type:'cx',  
	//破解验证码的配置，请到 http://www.ttshitu.com/docs/ 打码平台配置你的 account账号和 password密码
	breakCode:{
		username:'',
		password:'',
	},
	school: "北京大学",
	account: '12345678',
	password: 'abcdefg'
}


ocs.startLogin(config)