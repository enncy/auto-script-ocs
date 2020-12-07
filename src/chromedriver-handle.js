/*
 * @Description: chrome 浏览器 与 chromedriver 版本处理
 * 查询对应的chromedriver 地址
 * https://chromedriver.storage.googleapis.com/LATEST_RELEASE_浏览器版本  返回匹配的浏览器版本
 * 最终下载地址
 * http://chromedriver.storage.googleapis.com/匹配的浏览器版本/chromedriver_win32.zip
 * 
 */

const request = require('request')
const axios = require('axios')
const fs = require('fs')
const compressing = require('compressing')
const EventEmitter = require('events').EventEmitter;




module.exports =  {
	//下载chromedriver
	installChromedriver(chrome_version) {
		return new Promise((resolve,reject)=>{
			let version = chrome_version
			if(chrome_version.indexOf('.')!=-1){
				//处理version ，一般 https://chromedriver.storage.googleapis.com/LATEST_RELEASE_浏览器版本 只有 xx.0.xxxx 和 xx 这种版本格式
				//如果chrome_version 是 xx.0.xxxx.xx 则会请求失败 404 要删除后面的 .xx
				version = chrome_version.substring(0,chrome_version.lastIndexOf('.'))
			}
			//获取对应的chromedriver
			axios.get(`https://chromedriver.storage.googleapis.com/LATEST_RELEASE_${version}`).then(r => {
				console.log("downloading chromedriver ! :"+version);
				this.downloadFile(`http://chromedriver.storage.googleapis.com/${r.data}/chromedriver_win32.zip`, `./bin/chromedriver${chrome_version}.zip`)
					.on('finish', () => {
						//解压缩 'chromedriver.zip' 是目标文件 ./bin/ 是目标文件夹
						console.log("compressing chromedriver !");
						this.compres(`./bin/chromedriver${chrome_version}.zip`,'./bin/').then(r=>{
							//更改名字，带上版本号
							fs.renameSync(`./bin/chromedriver.exe`,`./bin/chromedriver${chrome_version}.exe`);
							console.log("install chromedriver finish!");
							resolve()
						}).catch(e=>{
							reject(e.message)
							console.error(e);
						})
					})
			}).catch(e => {
				reject(e.message)
				console.error(e.message);
			})
		})
	},

	/*
	 * url 网络文件地址
	 * filename 文件名
	 * return  Promise
	 */
	downloadFile(uri, filename) {
		var event = new EventEmitter();
		var stream = fs.createWriteStream(filename);
		request(uri)
			.on('response', response => {
				response.on('data', data => {
					event.emit('downloading', response.headers['content-length'], data.length);
				})
			})
			.pipe(stream).on('close', () => {
				event.emit('finish');
			});
		return event

	},
	//解压缩
	compres(path,new_path){
		return new Promise((resolve,reject)=>{
			compressing.zip.uncompress(path, new_path)
				.then(() => {
					fs.unlinkSync(path)
					resolve()
				})
				.catch(err => {
					reject(err)
					console.error(err);
				});
		})
	}
}
