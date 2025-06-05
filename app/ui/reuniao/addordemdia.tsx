'use client'

import { mylog } from "@/app/lib/mylogger"
import { createOrdem } from '@/app/lib/reuniao/actions';
import { OrdemState } from "@/app/lib/reuniao/definitions";

import { Button } from "@/app/ui/button"; 
import  Link  from "next/link";
import React, { useActionState } from 'react';
import  OrderTable  from "@/app/ui/reuniao/dynamicorder";

const filename="app/ui/reuniao/addordemdia";

export default function CreateOrdemDiaForm ({reuniaoNumber}:{reuniaoNumber:number})  {
    mylog("DBG",filename,"CreateOrdemDiaForm","reuniaoNumber=",reuniaoNumber);

    const initialState: OrdemState = { message:null, errors: {}}
    const [state, formAction] = useActionState(createOrdem, initialState);
    mylog("DBG",filename,"CreateOrdemDiaForm","state,formAction=",{state,formAction})
    
    return (
      <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full">
      
         <h1 className="mb-10 font-bold text-xl"> Criar Ordem do Dia para reuniao {reuniaoNumber.toString()} </h1>
         <input type="hidden" name="id" value={reuniaoNumber} />
 


          <fieldset className="mb-4 w-full">
            <label htmlFor="assunto" className="mb-2 text-sm font-medium">
              Assunto:
            </label>
            <div>
            <textarea
              id="assunto"
              name="assunto"
              rows={5}
              cols={60}
              className=""
              aria-label="assunto"
              placeholder="Assunto"
              defaultValue={""}
            />
            </div>
          </fieldset>
          <fieldset className="mb-4 w-full">
            <label htmlFor="assunto" className="mb-2 text-sm font-medium">
              Deliberação:
            </label>
            <div>
            <textarea
              id="deliberacao"
              name="deliberacao"
              rows={5}
              cols={60}
              className=""
              aria-label="deliberacao"
              placeholder="Deliberação"
              defaultValue={""}
              disabled={true}
            />
            </div>
          </fieldset>  
          <div className="mb-4 inline-block w-1/2">
          <input type="checkbox" name="publicavel" defaultChecked={true} value="S" className="mb-2 mr-4" />
            <label htmlFor="publicavel" className="mb-2 text-sm font-medium left-40">
              Publicável:
            </label>
          </div>
          <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/sinfonia/reuniao"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
          Voltar
          </Link>
          <Button type="submit">Salvar</Button>
         </div>   
      </div>
      < OrderTable rid={reuniaoNumber}/>
      </form>

    )
}