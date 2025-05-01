import { twoDigitFormat } from "./numbers.js";
export default (() => {
    return class Logger {
        static dateString(){
            let d = new Date();
            return `${d.getUTCFullYear()}/${twoDigitFormat(d.getUTCMonth())}/${twoDigitFormat(d.getUTCDate())} ${twoDigitFormat(d.getUTCHours())}:${twoDigitFormat(d.getUTCMinutes())}:${twoDigitFormat(d.getUTCSeconds())}Z`;
        }
        static log(messenger, message){
            console.log(`[${Logger.dateString()}] ${messenger} > ${message}`);
        }
        static error(messenger, message){
            let d = new Date();
            console.error(`[${Logger.dateString()}] ${messenger} > ${message}`);
        }
    }
})();