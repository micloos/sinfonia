'use client';

import { TipoDeliberacao } from "@/app/lib/definitions";
import { mylog } from "@/app/lib/mylogger";
import { Deliberacao } from "@/app/lib/reuniao/definitions";
import { useState } from "react";

interface AssuntoSubformProps {
  assuntos: TipoDeliberacao[];
  data: Deliberacao;
  onChange: (data: Deliberacao) => void;
  isRequired?: boolean;
}


export default  function Deliberar({assuntos, data, onChange}: AssuntoSubformProps) {
  const filename = 'app/ui/reuniao/pauta/selectAssunto';
  const functionname = 'SelectAssunto';
  mylog('DBG', filename, functionname, 'assuntos = ',assuntos);
  console.log('INFO',filename, "data = ", data)
  const [assuntoData, setAssunto] = useState <Deliberacao>(data || { Cd_ClassificacaoDeliberacao: '0' });
  console.log('INFO',filename, "assuntodata = ", assuntoData)
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
        console.log("delib",name,value)
        const updatedSelect = { ...assuntoData, [name]: value };
        setAssunto(updatedSelect);
        console.log("delib =",assuntoData)
        onChange(updatedSelect);
  }


  mylog('DBG', filename, functionname, 'assunto=',assuntoData);
  return (
    <div className="mb-4">
        <select
        id="Cd_ClassificacaoDeliberacao" 
        name="Cd_ClassificacaoDeliberacao"
        value={assuntoData.Cd_ClassificacaoDeliberacao}
        onChange={handleChange}
        className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
          <option value="" disabled> Escolher nivel</option>           
            {assuntos.map((assunto) => (
              <option key={"delib"+assunto.id} value={assunto.id}>
                {assunto.nome}
              </option>
            ))}
        </select>
        <hr/>
    </div>
  )
}