import { ObservacaoNP } from "@/app/lib/reuniao/definitions";
import Myhr from "./myhr";
import { useState } from "react";

interface ObservacaoNPSubformProps {
  data: ObservacaoNP;
  onChange: (data: ObservacaoNP) => void;
  isRequired?: boolean;
}



export default function AddObsNaoPub ({ data, onChange, isRequired }: ObservacaoNPSubformProps) {
        const [observacaoNP, setObservacaoNP] = useState<ObservacaoNP>(data || { ds_ObservacaoNaoPublicavelItem: '' });
        
          const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            const updatedObservacaoNP = { ...observacaoNP, [name]: value };
            setObservacaoNP(updatedObservacaoNP);
            onChange(updatedObservacaoNP);
          };
    return (
        <div className="rounded-md bg-gray-50 p-4 md:p-2">
            <div className="mb-4 inline-block pr-4 w-full">
                            <label htmlFor="ds_ObservacaoNaoPublicavelItem" className="block text-sm font-medium text-gray-700">
                                Observação não Publicavel
                            </label>
                            <div className="relative mt-2 rounded-md  ">
                                <div className="relative">
                                    <input 
                                        id="ds_ObservacaoNaoPublicavelItem" 
                                        name="ds_ObservacaoNaoPublicavelItem"
                                        type="string"
                                        placeholder="Observação"        
                                        value={data.ds_ObservacaoNaoPublicavelItem}
                                        onChange={handleChange}
                                        required={isRequired}
                                        className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      
                                    />
                                </div>
                            </div>
                        </div>
                        <Myhr />
        </div>
    )
}