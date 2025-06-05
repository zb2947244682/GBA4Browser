// 创建AudioWorkletProcessor来处理音频
class GBAAdvAudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.leftChannel = null;
        this.rightChannel = null;
        
        // 处理来自主线程的消息
        this.port.onmessage = (e) => {
            if (e.data.type === 'buffer') {
                this.leftChannel = e.data.leftChannel;
                this.rightChannel = e.data.rightChannel;
            }
        };
    }

    process(inputs, outputs, parameters) {
        // 只使用第一个输出
        const output = outputs[0];
        const leftOutput = output[0];
        const rightOutput = output[1];

        // 如果没有接收到缓冲区，则输出静音
        if (!this.leftChannel || !this.rightChannel) {
            for (let i = 0; i < leftOutput.length; i++) {
                leftOutput[i] = 0;
                rightOutput[i] = 0;
            }
            return true;
        }

        // 复制缓冲区数据到输出
        for (let i = 0; i < leftOutput.length; i++) {
            if (i < this.leftChannel.length) {
                leftOutput[i] = this.leftChannel[i];
                rightOutput[i] = this.rightChannel[i];
            } else {
                leftOutput[i] = 0;
                rightOutput[i] = 0;
            }
        }

        // 清除缓冲区
        this.leftChannel = null;
        this.rightChannel = null;
        
        // 通知主线程我们已处理完缓冲区
        this.port.postMessage({ type: 'processed' });
        
        return true;
    }
}

registerProcessor('gba-adv-audio-processor', GBAAdvAudioProcessor); 