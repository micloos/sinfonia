import { Estagio } from "@/app/lib/reuniao/definitions";
import Myhr from "./myhr";
import { useState } from "react";

import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import "dayjs/locale/pt-br"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { mylog } from "@/app/lib/mylogger";

dayjs.extend(utc);

interface EstagioSubformProps {
  data: Estagio;
  onChange: (data: Estagio) => void;
  isRequired?: boolean;
}


export default function AddEstagio ({ data, onChange }: EstagioSubformProps) {
    const [estagio, setEstagio] = useState<Estagio>(data || { ds_EstagioDisciplina: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedEstagio = { ...estagio, [name]: value };
        setEstagio(updatedEstagio);
        onChange(updatedEstagio);
      };
    mylog("ERROR",'addestagio', 'AddEstagio', 'estagio = ', estagio);
    const [docDateIni, setDocDateIni] = useState(data.dt_EstagioPeriodoInicio ? dayjs.utc(data.dt_EstagioPeriodoInicio) : dayjs.utc());
    const [docDateFim, setDocDateFim] = useState(data.dt_EstagioPeriodoFim ? dayjs.utc(data.dt_EstagioPeriodoFim) : dayjs.utc());
    return (
        <div className="rounded-md bg-gray-50 p-4 md:p-2">
            <div className="mb-4 inline-block pr-4 w-full">
                <label htmlFor="ds_EstagioDisciplina" className="block text-sm font-medium text-gray-700">
                    Matéria Estágio:
                </label>
                <div className="relative mt-2 rounded-md  ">
                    <div className="relative">
                        <input 
                            id="ds_EstagioDisciplina" 
                            name="ds_EstagioDisciplina"
                            type="string"
                            placeholder="Materia"   
                            value={estagio.ds_EstagioDisciplina}
                            onChange={handleChange}     
                            className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      
                        />
                    </div>
                </div>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <div className="mb-4 inline-block pr-4 w-1/4">
                <label htmlFor="dt_EstagioPeriodoInicio" >
                    Inicio Estágio:
                </label>
                <div className="w-full" >
                <DatePicker defaultValue={docDateIni}
                   onChange={(date) => {if(date && date.isValid()) {setDocDateIni(date)}}} />
                   <input type="hidden" id="dt_EstagioPeriodoInicio" name="dt_EstagioPeriodoInicio" value={docDateIni.toISOString()}
                />
                </div>
            </div>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <div className="mb-4 inline-block pr-4 w-1/4">
                <label htmlFor="dt_EstagioPeriodoFim" >
                    Fim Estágio:
                </label>
                <div className="w-full" >
                <DatePicker defaultValue={docDateFim}
                   onChange={(date) => {if(date && date.isValid()) {setDocDateFim(date)}}} />
                   <input type="hidden" id="dt_EstagioPeriodoFim" name="dt_EstagioPeriodoFim" value={docDateFim.toISOString()}
                />
                </div>
            </div>
            </LocalizationProvider>            <div className="mb-4 inline-block pr-4 w-1/3">
            <label htmlFor="qt_EstagioCreditos" className="block text-sm font-medium text-gray-700">
                Creditos Estagio
            </label>
                <div className="relative mt-2 rounded-md  ">
                    <div className="relative">
                        <input 
                            id="qt_EstagioCreditos" 
                            name="qt_EstagioCreditos"
                            type="string"
                            placeholder="Creditos"   
                            value={estagio.qt_EstagioCreditos}
                            onChange={handleChange}     
                            className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      
                        />
                    </div>
                </div>
            </div>
            <Myhr />
        </div>
    )
}