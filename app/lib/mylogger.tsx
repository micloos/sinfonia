
const LEVEL = Number(process.env.LOG);
const levels = ["DBG","INFO","WARN","ERROR","FATAL"];

export function mylog (level:string, file: string, func: string, mess: string, coisa: any)
{
    if (levels.indexOf(level)>= LEVEL) {
        console.log( level,"[",Date(),"]",file,func,mess,coisa);
    }
}