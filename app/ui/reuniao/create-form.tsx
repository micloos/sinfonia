'use client';

import {
  UserIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/oldbutton';
import { createReuniao, ReuniaoState } from '@/app/lib/reuniao/actions';
import { Reunioes } from '@/app/lib/definitions'; 
import { useActionState, useState } from 'react';
import { mylog } from '@/app/lib/mylogger';


import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/pt-br';
import { DateTimePicker, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

dayjs.extend(utc);

export default function ReuniaoForm({reuniao,reuniaoNumber}: {reuniao: Reunioes;reuniaoNumber: number}) {
  const initialState: ReuniaoState = { message:null, errors: {}}
  
  
  const [reuniaoDate, setReuniaoDate] = useState(dayjs.utc());
  const [state, formAction] = useActionState(createReuniao, initialState);
  mylog("DBG",'/app/ui/reuniao/create-form', 'ReuniaoForm' , "state=", state);
  const [docDate, setDocDate] = useState(dayjs.utc());
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
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
          <DateTimePicker defaultValue={reuniaoDate} onChange={(date) => {if(date) {setReuniaoDate(date)}}} />
          <input type="hidden" id="d_ini" name="d_ini" value={reuniaoDate.toISOString()} />
        </div>
        
        <div className="mb-2 inline-block w-1/2">
        <label htmlFor="d_ini" className="mb-2 block text-sm font-medium">
            Data Final para Apresentação de Documentos:
        </label>
            <DatePicker defaultValue={docDate}  
            onChange={(date) => {if(date) {setDocDate(date)}}} />
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
            href="/sinfonia/reuniao"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
          Voltar
          </Link>
          <Button type="submit">Salvar</Button>
         </div>
       </div>
       </div>
    </form>
    </LocalizationProvider>
  );
}
