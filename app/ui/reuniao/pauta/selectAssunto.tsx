'use client';

import { Assuntos } from "@/app/lib/definitions";
import { mylog } from "@/app/lib/mylogger";
import { Assunto } from "@/app/lib/reuniao/definitions";
import { useState } from "react";

interface AssuntoSubformProps {
  assuntos: Assuntos[];
  data: Assunto;
  onChange: (data: Assunto) => void;
  isRequired?: boolean;
}


export default  function SelectAssunto({assuntos, data, onChange}: AssuntoSubformProps) {
  const filename = 'app/ui/reuniao/pauta/selectAssunto';
  const functionname = 'SelectAssunto';
  mylog('DBG', filename, functionname, 'rendering SelectAssunto','');

  const [assuntoData, setAssunto] = useState <Assunto>(data || { cd_AssuntoReuniao: '0' });
  
  // const searchParams = useSearchParams();
  // const { replace } = useRouter();
  //const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //const selectedValue = event.target.value;
    //const params = new URLSearchParams(searchParams);
    //if (selectedValue) {
      //params.set('cd_assunto', selectedValue);
    //} else {
      //params.delete('cd_assunto');
    // }
    // replace(`?${params.toString()}`);
  // };
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        const updatedSelect = { ...assuntoData, [name]: value };
        setAssunto(updatedSelect);
        onChange(updatedSelect);
  }


  mylog('DBG', filename, functionname, 'assunto=',assuntoData);
  return (
    <div className="mb-4">
        <select
        id="cd_AssuntoReuniao" 
        name="cd_AssuntoReuniao"
        value={assuntoData.cd_AssuntoReuniao}
        onChange={handleChange}
        className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
          <option value="" disabled> Escolher nivel</option>           
            {assuntos.map((assunto) => (
              <option key={assunto.id} value={assunto.id}>
                {assunto.assunto}
              </option>
            ))}
        </select>
        <hr/>
    </div>
  )
}