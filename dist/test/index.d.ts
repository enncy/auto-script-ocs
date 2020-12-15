export {};
/**
 *  使用调试模式浏览器，此方法可以打开原来自带用户数据的浏览器，例如导航栏，历史记录，拓展程序，但是只能打开一次，多次打开将使用第一个进行操作
    browserUtils.openChromeByDebug({
        binary_path: 'D:/.../chrome.exe', //浏览器路径
    }).then(async browser => {
        ......
    }).catch(e => {
        console.error(e);
    })

*/ 
