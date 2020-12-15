


export default   {

	/**	超星总配置 */
	cx: {
		/**	登录配置 */
		login: {
			/**	是否使用破解验证码登录 */
			use_breakCode: false,
			/**	如果不使用验证码破解，人工输入的等待时间，write_code_time 秒后自动点击登录按钮 */
			write_code_time: 5000,
			/**	登录涉及到的元素 */
			elements: {
				/**	ele:学校元素 */
				select_school: '#selectSchoolA',
				/**	js：打开弹窗 */
				show_school_script: "showSchool('dialog1',-1,-1)",
				/**	ele:等待学校输入框元素 */
				search_school: '#searchSchool1',
				/**	js：输入学校名,搜索学校 */
				search_school_script: "searchSchool('searchSchool1')",
				/**	time:等待搜索结果的时间 */
				search_school_wait_time: 2000,
				/**	ele:等待搜索结果列表 */
				search_school_result: '.zw_m_bottom2 .zw_m_li a',
				/**	js：关闭选择学校框 */
				close_school_select_script: "closeSchool('dialog2');",
				/**	ele:账号 */
				account: '#unameId',
				/**	ele:密码 */
				password: '#passwordId',
				/**	ele:验证码图像元素 */
				vercode_img: '#numVerCode',
				/**	ele:验证码 */
				vercode_input: '#numcode',
				/**	ele:执行js：登录 */
				login_script: "mysubmit('form')",
				/**	ele:查看错误 */
				show_error: '.show_error',
				/** string:表单提交后的验证码错误信息 */
				error_code: '验证码错误',
				/**	time:登录等待时间 */
				login_wait_time: 2000,

			}
		},
		/**	获取课程页面的配置 */
		get_course: {
			elements: {
				/** 底部元素 */
				foot:'.foot',
				/**	ele:外层frame名字 */
				iframe_name: 'frame_content',
				/** script:全部显示 */
				all_show_script: "$('*').css('display','block')",
				/** ele:课程图片 */
				img: '.courseItem.curFile img',
				/** ele:课程a标签 */
				a_tag: '.courseItem.curFile h3 a',
				/** ele:课程信息 */
				info: '.courseItem.curFile div:not(.Mcon1img)'
			}
		},
		/**	进入课程页面配置 */
		into_course: {
			elements: {
				/** ele:作业的a标签 */
				work_a: '.navshow li a[title="作业"]',
				/** ele:考试的a标签 */
				exam_a: '.navshow li a[title="考试"]',
				/**	ele:第一个学习点a标签 */
				job_a: '.units h3 .articlename a',
				/** string:课程页面的  url */
				course_study_url: '/mycourse/studentstudy',
				/** string:课程页面的  url */
				course_work_url: '/work/getAllWork',
				/** string:课程页面的  url */
				course_exam_url: '/exam/test',
			}
		},
		/**	基本路径配置 */
		url: {
			/**	登录页 */
			login: 'https://passport2.chaoxing.com/login',

			login_request: 'https://passport2.chaoxing.com/login',

			/**	主页 */
			index: 'http://i.mooc.chaoxing.com/space/index'
		}
	}


}