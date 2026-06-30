import { Relator } from "@/app/lib/reuniao/definitions";
import Myhr from "./myhr";
import { useState } from "react";

interface RelatorSubformProps {
  data: Relator;
  onChange: (data: Relator) => void;
}



export default function AddRelator ({ data, onChange }: RelatorSubformProps) {
    const [relatorData, setRelatorData] = useState<Relator>(data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedRelator = { ...relatorData, [name]: value };
        setRelatorData(updatedRelator);
        console.log("Updated Relator Data:", updatedRelator); // Log the updated relator data
        onChange(updatedRelator);
    };
    
    return(
        <div className="rounded-md bg-gray-50 p-4 md:p-2">
            <div className="mb-4 inline-block pr-4 border-r-4 w-4/5">
                <label htmlFor="nm_Relator" className="block text-sm font-medium">
                    Relator:
                </label>
                <div className="relative mt-2 rounded-md w-70  ">
                    <div className="relative">
                        <input 
                            id="nm_Relator" 
                            name="nm_Relator"
                            type="string"
                            placeholder="Relator"
                            value={data.nm_Relator}
                            onChange={handleChange}        
                            className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outlie-2 placeholder:text-gray-500"
                        />
                    </div>
                </div>                    
            </div>
            <div className="mb-4 inline-block w-1/5">
                <label htmlFor="ds_LotRelator" className="mb-2 block text-sm font-medium">
                    Lotação do Relator
                </label>
                <div className="relative mt-2 rounded-md ">
                    <div className="relative pr-4">  
                        <input id="ds_LotRelator" name="ds_LotRelator" 
                            type="string"
                            className="peer inline w-full rounded-md border-gray-400 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            value={(data.ds_LotRelator)?data.ds_LotRelator:''}
                            onChange={handleChange}
                            placeholder="Lotação do Relator" 
                        />
                    </div>
                </div>
            </div>
            <div className="mb-4 inline-block w-full">
                <label htmlFor="ds_ObservacaoRelator" className="mb-2 block text-sm font-medium">
                    Observação Relator:
                </label>
                <div className="relative mt-2 rounded-md ">
                    <div className="relative pr-4">  
                        <input id="ds_ObservacaoRelator" name="ds_ObservacaoRelator" 
                            type="string"
                            className="peer inline w-full rounded-md border-gray-400 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Observação Relator" 
                            value={(data.ds_ObservacaoRelator)?data.ds_ObservacaoRelator:''}
                            onChange={handleChange} 
                        />
                    </div>
                </div>
            </div>
            <Myhr />
        </div>
        
    )
}