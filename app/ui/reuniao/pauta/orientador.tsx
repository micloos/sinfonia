import { Orientador } from "@/app/lib/reuniao/definitions";
import { useState } from "react";
import Myhr from "./myhr";

interface OrientadorSubformProps {
  data: Orientador;
  onChange: (data: Orientador) => void;
  isRequired?: boolean;
}

export default  function AddPautaOrientador({ data, onChange, isRequired = false }: OrientadorSubformProps) {
  const [orientador, setOrientador] = useState<Orientador>(data || { nm_Orientador: '', ds_LotOrientador: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedOrientador = { ...orientador, [name]: value };
    setOrientador(updatedOrientador);
    onChange(updatedOrientador);
  }
  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-2">
      <div className="mb-4 inline-block pr-4 border-r-4 w-4/5">
        <label htmlFor="nm_Orientador" className="block text-sm font-medium">
          Orientador
        </label>
        <div className="relative mt-2 rounded-md w-70  ">
            <div className="relative">
              <input 
                id="nm_Orientador" 
                name="nm_Orientador"
                type="string"
                placeholder="Orientador"        
                className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outlie-2 placeholder:text-gray-500"
                value={orientador.nm_Orientador}
                onChange={handleChange}      
                required={isRequired}      
              />
              
          </div>
        </div>
      </div>
      <div className="mb-4 inline-block w-1/5">
        <label htmlFor="ds_LotOrientador" className="mb-2 block text-sm font-medium">
          Lotação do Orientador
        </label>
        <div className="relative mt-2 rounded-md ">
            <div className="relative pr-4">  
                <input id="ds_LotOrientador" name="ds_LotOrientador" 
                    type="string"
                    className="peer inline w-full rounded-md border-gray-400 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    placeholder="Lotação do Orientador" 
                    value={orientador.ds_LotOrientador} 
                    onChange={handleChange}
                />
            </div>
        </div>
      </div>
      <Myhr />         
    </div>
  );
}