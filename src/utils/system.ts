
import net from 'net';
import process from 'child_process';


export default  {
    /**
     * 检测port端口是否被占用
     * @param {number} port  
     * @returns {Promise<number>}
     */
    portIsOccupied(port: number): Promise<number> {
        const server = net.createServer().listen(port)
        return new Promise((resolve, reject) => {
            server.on('listening', () => {
                server.close()
                resolve(port)
            })

            server.on('error', (err) => {
                if (err.name === 'EADDRINUSE') {
                    resolve(this.portIsOccupied(port + 1))//注意这句，如占用端口号+1
                } else {
                    reject(err)
                }
            })
        })

    },
    /**
     * 执行 cmd 命令
     * @param {String} cmd
     */
     exec(cmd: string){
        console.log(cmd);
        process.exec(cmd)

    },


}