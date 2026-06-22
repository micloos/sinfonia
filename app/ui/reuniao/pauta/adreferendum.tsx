
import Myhr from "./myhr"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import "dayjs/locale/pt-br"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { useState } from "react"
import { AdReferendumType } from "@/app/lib/reuniao/definitions"

dayjs.extend(utc);

interface AdReferendumSubformProps {
  data: AdReferendumType;
  onChange: (data: AdReferendumType) => void;
  isRequired?: boolean;
}

export default  function AdReferendum({ data, onChange }: AdReferendumSubformProps) {
    const [adReferendum, setAdReferendum] = useState<AdReferendumType>(data || { Ind_AdReferendum: 'N', ds_AdReferendum: '', dt_AdReferendum: '' });
    const [docDate, setDocDate] = useState(data.dt_AdReferendum ? dayjs(data.dt_AdReferendum) : dayjs.utc());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedAdReferendum = { ...adReferendum, [name]: value };
    setAdReferendum(updatedAdReferendum);
    onChange(updatedAdReferendum);
  };

    return (
        <div className="rounded-md bg-gray-50 p-4 md:p-2">
            <div id="Ind_AdReferendum" className="mb-4 inline-block pr-4 w-1/6">
                <label htmlFor="Ind_AdReferendum" className="mb2 block text-sm font-medium">
                    Ad Referendum
                </label>
                <input 
                    type="checkbox"
                    id="Ind_AdReferendum"
                    name="Ind_AdReferendum"
                    value="S"
                    className="mb-2 mr-4"
                    checked={adReferendum.Ind_AdReferendum === 'S'}
                    onChange={(e) => {
                        const value = e.target.checked ? 'S' : 'N';
                        const updatedAdReferendum = { ...adReferendum, Ind_AdReferendum: value };
                        setAdReferendum(updatedAdReferendum);
                        onChange(updatedAdReferendum);
                        }    }                
                />
            </div>
            <div id="ds_AdReferendum" className="mb-4 inline-block pr-4 w-2/3">
                <label htmlFor="ds_AdReferendum" className="mb2 block text-sm font-medium">
                    Observação Ad Referendum
                </label>
                <input
                    type="string"
                    id="ds_AdReferendum"
                    name="ds_AdReferendum"
                    placeholder="Observacao"
                    value={adReferendum.ds_AdReferendum?? ''}
                    onChange = {handleChange}
                    className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <div className="mb-4 inline-block pr-4 w-1/6">
                <label htmlFor="dt_AdReferendum" className="mb2 block text-sm font-medium" >
                    Data
                </label>
                <div className="w-full" >
                <DatePicker defaultValue={docDate}
                   onChange={(date) => {if(date && date.isValid()) {setDocDate(date)}}} />
                   <input type="hidden" id="dt_adreferendum" name="dt_adreferendum" value={docDate.toISOString()}
                />
                </div>
            </div>
            </LocalizationProvider>
            <Myhr />
        </div>
    )
}