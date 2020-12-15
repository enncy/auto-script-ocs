import net from 'net';
import process from 'child_process';
export default {
    /**
     * 检测port端口是否被占用
     * @param {number} port
     * @returns {Promise<number>}
     */
    portIsOccupied: function (port) {
        var _this = this;
        var server = net.createServer().listen(port);
        return new Promise(function (resolve, reject) {
            server.on('listening', function () {
                server.close();
                resolve(port);
            });
            server.on('error', function (err) {
                if (err.name === 'EADDRINUSE') {
                    resolve(_this.portIsOccupied(port + 1)); //注意这句，如占用端口号+1
                }
                else {
                    reject(err);
                }
            });
        });
    },
    /**
     * 执行 cmd 命令
     * @param {String} cmd
     */
    exec: function (cmd) {
        console.log(cmd);
        process.exec(cmd);
    },
};
