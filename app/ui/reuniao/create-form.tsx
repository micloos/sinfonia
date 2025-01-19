'use client';

import {
  UserIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/oldbutton';
import { createReuniao, ReuniaoState } from '@/app/lib/actions';
import { Reunioes } from '@/app/lib/definitions'; 
import { useActionState, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import { mylog } from '@/app/lib/mylogger';
import { pt } from 'date-fns/locale/pt';
registerLocale('pt',pt);

export default function ReuniaoForm({reuniao,reuniaoNumber}: {reuniao: Reunioes;reuniaoNumber: number}) {
  const initialState: ReuniaoState = { message:null, errors: {}}
  
  
  const [reuniaoDate, setReuniaoDate] = useState(new Date());
  const [state, formAction] = useActionState(createReuniao, initialState);
  mylog("DBG",'/app/ui/reuniao/create-form', 'ReuniaoForm' , "state=", state);
  const [docDate, setDocDate] = useState(new Date());
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4 inline-block w-1/2">
         
          <label htmlFor="nome" className="mb-2 block text-sm font-medium">
            Prédio
          </label>
          <div className="relative mt-2 rounded-md w-70">
            <div className="relative">
              <input
                id="predio"
                name="predio"
                type="string"
                defaultValue={reuniao.predio}
                placeholder="predio"
                className="peer inline w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-2 inline-block w-1/2">
          <label htmlFor="username" className="mb-2 block text-sm font-medium">
            Sala
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="sala"
                name="sala"
                type="string"
                defaultValue={reuniao.sala}
                placeholder="sala"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-2 inline-block w-1/2">
          <label htmlFor="d_ini" className="mb-2 block text-sm font-medium">
            Data da Reunião:
          </label>
          <DatePicker showTimeSelect locale="pt" dateFormat="dd/MM/yy HH:mm" selected={reuniaoDate} onChange={(date) => date && setReuniaoDate(date)} />
          <input type="hidden" id="d_ini" name="d_ini" value={reuniaoDate.toISOString()} />
        </div>
        
        <div className="mb-2 inline-block w-1/2">
        <label htmlFor="d_ini" className="mb-2 block text-sm font-medium">
            Data Final para Apresentação de Documentos:
        </label>
            <DatePicker locale="pt" dateFormat="dd/MM/yy" selected={docDate} onChange={(date) => date && setDocDate(date)} />
            <input type="hidden" id="d_lim" name="d_lim" value={docDate.toISOString()} />
        </div>
      <div>
        <div className="w-1/2">
           <p>Reunião: </p>
           <p>{reuniaoNumber}</p>
           <input type="hidden" id="id" name="id" value={reuniaoNumber} />
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/reuniao"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
          Voltar
          </Link>
          <Button type="submit">Salvar</Button>
         </div>
       </div>
       </div>
    </form>
    
  );
}
