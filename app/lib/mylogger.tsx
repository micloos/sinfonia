export function mylog (level:string, file: string, func: string, mess: string, coisa: any)
{
    console.log( level,"[",Date(),"]",file,func,mess,coisa);
}