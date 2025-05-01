import { twoDigitFormat } from "./numbers.js";
export default (() => {
    return class Logger {
        static log(messenger, message){
            let d = new Date();
            console.log(`[${d.getUTCFullYear()}-${twoDigitFormat(d.getUTCMonth())}-${twoDigitFormat(d.getUTCDate())} ${twoDigitFormat(d.getUTCHours())}:${twoDigitFormat(d.getUTCMinutes())}Z] ${messenger} > ${message}`);
        }
        static error(messenger, message){
            let d = new Date();
            console.error(`[${d.getUTCFullYear()}-${twoDigitFormat(d.getUTCMonth())}-${twoDigitFormat(d.getUTCDate())} ${twoDigitFormat(d.getUTCHours())}:${twoDigitFormat(d.getUTCMinutes())}Z] ${messenger} > ${message}`);
        }
    }
})();