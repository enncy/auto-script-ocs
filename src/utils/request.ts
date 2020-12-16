
import axios from 'axios';

var service = axios.create({
	timeout:60*1000
})

// 添加请求拦截器
axios.interceptors.request.use(function(config: any) {
	// 在发送请求之前做些什么
	return config;
}, function(error: any) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response: any) {
	// 对响应数据做点什么
	return response;
}, function(error: any) {
	// 对响应错误做点什么
	return Promise.reject(error);
});


export default   service