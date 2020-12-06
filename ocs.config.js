
module.exports={
	
	//超星的配置
	cx:{
		
		login:{
			//登录涉及到的元素
			elements:{
				//等待选择学校
				//选择学校
				select_school:'#selectSchoolA',
				//打开弹窗
				show_school_script:"showSchool('dialog1',-1,-1)",
				//等待学校输入框元素
				search_school:'#searchSchool1',
				//输入学校名,//搜索学校
				search_school_script:"searchSchool('searchSchool1')",
				//等待搜索结果
				search_school_wait_time:2000,
				//等待搜索结果
				search_school_result:'.zw_m_bottom2 .zw_m_li',
				//关闭选择学校框
				close_school_select_script:"closeSchool('dialog2');",
				//验证码图像元素
				vercode_img:'#numVerCode',
				//账号
				account:'#unameId',
				//密码
				password:'#passwordId',
				//验证码
				vercode_input:'#numcode',
				//登录
				login_script:"mysubmit('form')",
				//查看错误
				show_error:'.show_error',
				//登录等待时间
				login_wait_time:2000,
								
			}
		},
		url:{
			//登录页
			login:'https://passport2.chaoxing.com/login',
			//主页
			index:'http://i.mooc.chaoxing.com/space/index'
		}
	}
	
	
}