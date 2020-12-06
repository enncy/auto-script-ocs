const ocs = require('../index.js')


/*
 * @Description: config : 登录的配置
 *  目前只支持超星的登录和获取
 * 	config.type :  cx | zhs | mooc    登录的平台类型
 * 						
 */

let config = {
	type:'cx',  
	//破解验证码的配置，请到 http://www.ttshitu.com/docs/ 打码平台配置你的 account账号和 password密码
	breakCode:{
		username:'skeleton',
		password:'132525',
	},
	school: "广西大学行健文理学院",
	account: '18275719980',
	password: 'skeleton132525'
}


ocs.startLogin(config).then(()=>{
	//获取全部课程
	ocs.startGetCourse().then(r=>{
		ocs.startCourse(r[0].url).then(r=>{
			console.log("进入课程成功"+r);
		}).catch(e=>{
			console.error(e);
		})
	}).catch(e=>{
		console.error(e);
	})
}).catch(e=>{
	console.error(e);
})