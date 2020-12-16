"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const child_process_1 = __importDefault(require("child_process"));
exports.default = {
    /**
     * 检测port端口是否被占用
     * @param {number} port
     * @returns {Promise<number>}
     */
    portIsOccupied(port) {
        const server = net_1.default.createServer().listen(port);
        return new Promise((resolve, reject) => {
            server.on('listening', () => {
                server.close();
                resolve(port);
            });
            server.on('error', (err) => {
                if (err.name === 'EADDRINUSE') {
                    resolve(this.portIsOccupied(port + 1)); //注意这句，如占用端口号+1
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
    exec(cmd) {
        console.log(cmd);
        child_process_1.default.exec(cmd);
    },
};
