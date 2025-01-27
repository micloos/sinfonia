'use client'
import { redirect } from "next/navigation";
import { mylog } from "../mylogger";

const filename='app/lib/participantes/navigations'

export async function participantes (id: string)
{
    mylog ("DBG", filename, "participantes", "id=",id);
    const goto =  "/sinfonia/reuniao/participantes/"+id+"/edit";
    redirect(goto);
}