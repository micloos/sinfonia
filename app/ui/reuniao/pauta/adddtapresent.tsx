import Myhr from "./myhr"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import "dayjs/locale/pt-br"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { useState } from "react"
import { Apresentacao } from "@/app/lib/reuniao/definitions"

dayjs.extend(utc);

interface ApresentacaoSubformProps {
  data: Apresentacao;
  onChange: (data: Apresentacao) => void;
  isRequired?: boolean;
}


export default function AddDtApresentacao ({data}: ApresentacaoSubformProps) {
    const [docDate, setDocDate] = useState(data.dt_apresentacao ? dayjs.utc(data.dt_apresentacao) : dayjs.utc());

    return (
        <div className="rounded-md bg-gray-50 p-4 md:p-2">
            
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <div className="mb-4 inline-block pr-4 w-1/4">
                <label htmlFor="dt_Apresentacao" >
                    Data da Apresentação:
                </label>
                <div className="w-full" >
                <DatePicker defaultValue={docDate}
                   onChange={(date) => {if(date && date.isValid()) {setDocDate(date)}}} />
                   <input type="hidden" id="dt_Apresentacao" name="dt_Apresentacao" value={docDate.toISOString()}
                />
                </div>
            </div>
            </LocalizationProvider>
            <Myhr />
        </div>
    )

}