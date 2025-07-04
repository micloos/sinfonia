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


import { mylog } from '@/app/lib/mylogger';
import moment from 'moment-timezone';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/pt-br';
import { DateTimePicker, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
dayjs.extend(utc);

moment.tz.setDefault('UTC');
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
  {/* Gambearra mestre */}
  const initdate = dayjs.utc(reuniao.d_ini);
  const docudate = dayjs.utc(reuniao.d_lim);
  mylog("DBG",filename,functionname,"ISO=",initdate);
  {/* Gambearra mestre fim*/}
  const [reuniaoDate, setReuniaoDate] = useState(initdate);
  const [docDate, setDocDate] = useState(docudate);
  const updateReuniaoWithId = updateReuniao.bind(null, reuniao.id.toString());
  const ifactive = (reuniao.active == 'N')? "hidden": "";
  mylog('DBG', filename, functionname, 'ifactive=',ifactive);
  const ifsave = (withsavebutton == 0) ? "hidden" : "";
  mylog('DBG', filename, functionname, 'ifsave=',ifsave);
  const ifback = (withbackbutton == 0) ? "hidden" : "";
  mylog('DBG', filename, functionname, 'ifback=',ifback);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
    <form action={updateReuniaoWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className={`w-full mb-8 inline-block ${ifactive}`}>
          Reuniao fechada
        </div>
        <div className="mb-4 inline-block w-1/2">
         
          <label htmlFor="predio" className="mb-2 block text-sm font-medium">
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
          <label htmlFor="sala" className="mb-2 block text-sm font-medium">
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
          <label htmlFor="dataReuniao" className="mb-2 block text-sm font-medium">
            Data da Reunião:
          </label>
          {/*
          <DatePicker id="dataReuniao" disabled={withsavebutton == 0} showTimeSelect locale="pt-BR" dateFormat="dd/MM/yy HH:mm" 
                       selected={reuniaoDate} 
                       onChange={(date) => {if (date) { const newdate = new Date(moment(date).tz(localTZ).tz('UTC').format()); setReuniaoDate(newdate)}}} 
                       />
                       */}
          
          <DateTimePicker disabled={withsavebutton == 0} defaultValue={reuniaoDate} onChange={(date) => {if(date) {setReuniaoDate(date)}}} />
          <input type="hidden" id="d_ini" name="d_ini" value={reuniaoDate.toISOString()} />
        </div>
        
        <div className="mb-2 inline-block w-1/2">
        <label htmlFor="dataDocumentos" className="mb-2 block text-sm font-medium">
            Data Final para Apresentação de Documentos:
        </label>
            <DatePicker disabled={withsavebutton == 0} defaultValue={docDate}  
            onChange={(date) => {if(date) {setDocDate(date)}}} />
            <input type="hidden" id="d_lim" name="d_lim" value={docDate.toISOString()} />
        </div>
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
    </LocalizationProvider>
  );
}
