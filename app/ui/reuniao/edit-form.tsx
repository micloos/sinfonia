'use client';

import { Reunioes } from '@/app/lib/definitions';
import {
  UserCircleIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/oldbutton';
import { updateReuniao } from '@/app/lib/reuniao/actions';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale,} from  "react-datepicker";
import { pt } from 'date-fns/locale/pt';
import { mylog } from '@/app/lib/mylogger';
registerLocale('pt',pt);

const filename = 'app/ui/reuniao/edit-form';

export default function EditReuniaoForm({
  reuniao,
  withsavebutton,
  withbackbutton
}: {
  reuniao: Reunioes;
  withsavebutton: number;
  withbackbutton: number
}) {
  const functionname = 'EditReuniaoForm';
  mylog('DBG', filename, functionname, 'reuniao=',reuniao);

  const [reuniaoDate, setReuniaoDate] = useState(new Date(reuniao.d_ini));
  const [docDate, setDocDate] = useState(new Date(reuniao.d_lim));
  const updateReuniaoWithId = updateReuniao.bind(null, reuniao.id.toString());
  const ifactive = (reuniao.active == 'N')? "hidden": "";
  mylog('DBG', filename, functionname, 'ifactive=',ifactive);
  const ifsave = (withsavebutton == 0) ? "hidden" : "";
  mylog('DBG', filename, functionname, 'ifsave=',ifsave);
  const ifback = (withbackbutton == 0) ? "hidden" : "";
  mylog('DBG', filename, functionname, 'ifback=',ifback);
  return (
    <form action={updateReuniaoWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className={`w-full mb-8 inline-block ${ifactive}`}>
          Reuniao fechada
        </div>
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
                disabled={withsavebutton == 0}
                className="peer inline w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BuildingOffice2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                disabled={withsavebutton == 0}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-2 inline-block w-1/2">
          <label htmlFor="d_ini" className="mb-2 block text-sm font-medium">
            Data da Reunião:
          </label>
          <DatePicker disabled={withsavebutton == 0} showTimeSelect locale="pt" dateFormat="dd/MM/yy HH:mm" selected={reuniaoDate} onChange={(date) => date && setReuniaoDate(date)} />
        </div>
        
        <div className="mb-2 inline-block w-1/2">
        <label htmlFor="d_ini" className="mb-2 block text-sm font-medium">
            Data Final para Apresentação de Documentos:
        </label>
            <DatePicker disabled={withsavebutton == 0} locale="pt" dateFormat="dd/MM/yy" selected={docDate}  onChange={(date) => date && setDocDate(date)} />
        </div>
{/*     <div className="mb-4 inline-block w-2/3">
          <label htmlFor="cpf" className="mb-2 block text-sm font-medium">
            CPF (Somente Números)
          </label>
          <div className="relative mt-2 rounded-md w-70">
            <div className="relative">
              <input
                id="cpf"
                name="nome"
                type="number"
                defaultValue={user.cpf}
                placeholder="CPF"
                className="peer inline w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <ExclamationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        
        <div className="mb-2 inline-block w-1/3">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Senha
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="password"
                name="password"
                type="string"
                defaultValue="******"
                placeholder="login"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
         </div>
         
         <div className="mb-2 inline-block w-1/3">
          <select id="nivel" name="nivelId" className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500' defaultValue={user.nivel} >
            <option value="" disabled> Escolher nivel</option>
            
            {niveis.map((nivel) => (
              <option key={nivel.idniv} value={nivel.idniv}>
                {nivel.niv}
              </option>
            ))}
             
          </select>
         </div>
         */}
      <div>
        <div className="w-1/2">
           <p>Reuniao: </p>
           <p>{reuniao.id}</p>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/sinfonia/reuniao"
            className={`${ifback} flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200`}
          >
          Voltar
          </Link>
          <Button className = {`${ifsave}`} disabled={Number(reuniao.active) == 0} type="submit">Salvar</Button>
         </div>
       </div>
       </div>
    </form>
    
  );
}
