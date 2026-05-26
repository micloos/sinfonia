import { Plano } from "@/app/lib/reuniao/definitions";
import Myhr from "./myhr";
import { useState } from "react";


    interface PlanoSubformProps {
      data: Plano;
      onChange: (data: Plano) => void;
      isRequired?: boolean;
    }

export default function AddPlano ({data, onChange, isRequired=false}: PlanoSubformProps) {

    const [plano, setPlano] = useState<Plano>(data || { ds_TituloPlanoTrabalho: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedPlano = { ...plano, [name]: value };
        setPlano(updatedPlano);
        onChange(updatedPlano);
    };

    
    return (
        <div className="rounded-md bg-gray-50 p-4 md:p-2">
            <div className="mb-4 inline-block pr-4 w-full">
                <label htmlFor="ds_TituloPlanoTrabalho" className="block text-sm font-medium text-gray-700">
                    Plano de Trabalho:
                </label>
                <div className="relative mt-2 rounded-md  ">
                    <div className="relative">
                        <input 
                            id="ds_TituloPlanoTrabalho" 
                            name="ds_TituloPlanoTrabalho"
                            type="string"
                            placeholder="Plano de Trabalho"        
                            className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      
                            value={plano.ds_TituloPlanoTrabalho}
                            onChange={handleChange}      
                            required={isRequired}
                        />
                    </div>
                </div>
            </div>
            <Myhr />
        </div>
    )
}