import Myhr from "./myhr"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import "dayjs/locale/pt-br"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { useState } from "react"
import { Defesa } from "@/app/lib/reuniao/definitions"

dayjs.extend(utc);


interface DefesaSubformProps {
    data: Defesa;
    onChange: (data: Defesa) => void;
    isRequired?: boolean;
}
export default function AddDefesa ({data}: DefesaSubformProps ) {
    
    const [docDate, setDocDate] = useState(data.Dt_Defesa ? dayjs.utc(data.Dt_Defesa) : dayjs.utc());

    console.log("docDate:", docDate);
    return (
        <div className="rounded-md bg-gray-50 p-4 md:p-2">
            
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <div className="mb-4 inline-block pr-4 w-1/4">
                <label htmlFor="dt_defesa" >
                    Data da Defesa
                </label>
                <div className="w-full" >
                <DatePicker 
                    defaultValue={docDate}
                    onChange={(date) => {if(date) {setDocDate(date)}}} />
                    <input type="hidden" id="Dt_Defesa" name="Dt_Defesa" value={docDate.toISOString()}
                />
                </div>
            </div>
            </LocalizationProvider>
            <Myhr />
        </div>
    )

}