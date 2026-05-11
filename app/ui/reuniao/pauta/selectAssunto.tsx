'use client';

import { Assuntos } from "@/app/lib/definitions";
import { mylog } from "@/app/lib/mylogger";
import {useSearchParams, useRouter} from 'next/navigation';


export default  function SelectAssunto({assuntos, assunto}: {assuntos: Assuntos[]; assunto: string}) {
  const filename = 'app/ui/reuniao/pauta/selectAssunto';
  const functionname = 'SelectAssunto';
  mylog('DBG', filename, functionname, 'rendering SelectAssunto','');
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (selectedValue) {
      params.set('assunto', selectedValue);
    } else {
      params.delete('assunto');
    }
    replace(`?${params.toString()}`);
  };
  mylog('DBG', filename, functionname, 'assunto=', assunto);
  return (
    <div className="mb-4">
        <select
        id="selectassunto" 
        name="selectassunto"
        onChange={handleSelect}
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