declare const _default: {
    /**	超星总配置 */
    cx: {
        /**	登录配置 */
        login: {
            /**	是否使用破解验证码登录 */
            use_breakCode: boolean;
            /**	如果不使用验证码破解，人工输入的等待时间，write_code_time 秒后自动点击登录按钮 */
            write_code_time: number;
            /**	登录涉及到的元素 */
            elements: {
                /**	ele:学校元素 */
                select_school: string;
                /**	js：打开弹窗 */
                show_school_script: string;
                /**	ele:等待学校输入框元素 */
                search_school: string;
                /**	js：输入学校名,搜索学校 */
                search_school_script: string;
                /**	time:等待搜索结果的时间 */
                search_school_wait_time: number;
                /**	ele:等待搜索结果列表 */
                search_school_result: string;
                /**	js：关闭选择学校框 */
                close_school_select_script: string;
                /**	ele:账号 */
                account: string;
                /**	ele:密码 */
                password: string;
                /**	ele:验证码图像元素 */
                vercode_img: string;
                /**	ele:验证码 */
                vercode_input: string;
                /**	ele:执行js：登录 */
                login_script: string;
                /**	ele:查看错误 */
                show_error: string;
                /** string:表单提交后的验证码错误信息 */
                error_code: string;
                /**	time:登录等待时间 */
                login_wait_time: number;
            };
        };
        /**	获取课程页面的配置 */
        get_course: {
            elements: {
                /** 底部元素 */
                foot: string;
                /**	ele:外层frame名字 */
                iframe_name: string;
                /** script:全部显示 */
                all_show_script: string;
                /** ele:课程图片 */
                img: string;
                /** ele:课程a标签 */
                a_tag: string;
                /** ele:课程信息 */
                info: string;
            };
        };
        /**	进入课程页面配置 */
        into_course: {
            elements: {
                /** ele:作业的a标签 */
                work_a: string;
                /** ele:考试的a标签 */
                exam_a: string;
                /**	ele:第一个学习点a标签 */
                job_a: string;
                /** string:课程页面的  url */
                course_study_url: string;
                /** string:课程页面的  url */
                course_work_url: string;
                /** string:课程页面的  url */
                course_exam_url: string;
            };
        };
        /**	基本路径配置 */
        url: {
            /**	登录页 */
            login: string;
            login_request: string;
            /**	主页 */
            index: string;
        };
    };
};
export default _default;
