declare const _default: {
    /**
     * 检测port端口是否被占用
     * @param {number} port
     * @returns {Promise<number>}
     */
    portIsOccupied(port: number): Promise<number>;
    /**
     * 执行 cmd 命令
     * @param {String} cmd
     */
    exec(cmd: string): void;
};
export default _default;
