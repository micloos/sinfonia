'use client'

import { mylog } from "@/app/lib/mylogger"
import { createOrdem, OrdemState } from '@/app/lib/reuniao/actions';
import { useActionState } from 'react';

const filename="app/ui/reuniao/addordemdia";

export default function OrdemDiaForm ({reuniaoNumber}:{reuniaoNumber:number})  {
   mylog("DBG",filename,"OrdemDiaForm","reuniaoNumber=",reuniaoNumber);
   const initialState: OrdemState = { message:null, errors: {}}
   const [state, formAction] = useActionState(createOrdem, initialState);
    mylog("DBG",filename,"OrdemDiaForm","stae,formAction=",{state,formAction})
    return (
      <div>
         
      </div>
    )
}