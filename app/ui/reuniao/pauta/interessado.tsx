import Myhr from "./myhr"
import type { Interessado  } from "@/app/lib/reuniao/definitions"
import { useState } from 'react';

interface InteressadoSubformProps {
  data: Interessado;
  onChange: (data: Interessado) => void;
  isRequired?: boolean;
}



export default  function AddPautaInteressado({ data, onChange, isRequired = false }: InteressadoSubformProps) 
{
  const [interessado, setInteressado] = useState<Interessado>(data || { nm_interessado: '', ds_areainteressado: '', ds_nivelinteressado: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedInteressado = { ...interessado, [name]: value };
    setInteressado(updatedInteressado);
    onChange(updatedInteressado);
  };

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-2">
      <div className="mb-4 inline-block pr-4 w-2/3">
        <label htmlFor="nm_interessado" className="block text-sm font-medium text-gray-700">
          Interessado  
        </label>
        <div className="relative mt-2 rounded-md w-70 ">
            <div className="relative">
              <input 
                id="nm_interessado" 
                name="nm_interessado"
                type="string"
                placeholder="Interessado"  
                value = {interessado.nm_interessado}
                onChange={handleChange}      
                required={isRequired}
                className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      
            />
          </div>
        </div>
      </div>  
      
      <div className="mb-4 inline-block p-4 w-1/6">
        <label htmlFor="ds_areainteressado" className="block text-sm font-medium text-gray-700">
          Área
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <select id="ds_areainteressado" name="ds_areainteressado" 
              className="peer w-full inline rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={interessado.ds_areainteressado}
              onChange={handleChange} 
            >
              <option value="0">Escolhe Area</option>
              <option key="TNA" value="TNA">TNA</option>
              <option key="TNM" value="TNM">TNM</option>
              <option key="TNR" value="TNR">TNR</option>
              <option key="N" value="N">Nenhuma</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mb-4 inline-block w-1/6">
        <label htmlFor="ds_nivelinteressado" className="block text-sm font-medium text-gray-700">
          Nivel
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <select id="ds_nivelinteressado" name="ds_nivelinteressado" 
              className="peer w-full inline rounded-md border-gray-200 py-2 pl-10 test-sm outline-2 placeholder:text-gray-500"
              value={interessado.ds_nivelinteressado}
              onChange={handleChange} 
            >
              <option value="0" >Escolhe Nivel</option>
              <option key="Mestrado" value="Mestrado">Mestrado</option>
              <option key="Doutorado" value="Doutorado">Doutorado</option>
              <option key="Mestrado e Doutorado" value="Mestrado e Doutorado">Mestrado e Doutorado</option>
              <option key="Doutorado Direto" value="Doutorado Direto">Doutorado Direto</option>
              <option key="N" value="N">Sem</option>
            </select>
          </div>
        </div>    
      </div> 
      <Myhr />
    </div>
  );
}