import { Observacao } from "@/app/lib/reuniao/definitions";
import Myhr from "./myhr";
import { useState } from "react";

export default function AddObservacao ({ data, onChange }: { data: Observacao; onChange: (data: Observacao) => void }) {
    const [observacao, setObservacao] = useState<Observacao>(data || { ds_ObservacaoItem: '' });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedObservacao = { ...observacao, [name]: value };
        setObservacao(updatedObservacao);
        onChange(updatedObservacao);
      };
    return (
        <div className="rounded-md bg-gray-50 p-4 md:p-2">
                    <div className="mb-4 inline-block pr-4 w-full">
                                    <label htmlFor="ds_ObservacaoItem" className="block text-sm font-medium text-gray-700">
                                        Observação:
                                    </label>
                                    <div className="relative mt-2 rounded-md  ">
                                        <div className="relative">
                                            <input 
                                                id="ds_ObservacaoItem" 
                                                name="ds_ObservacaoItem"
                                                type="string"
                                                placeholder="Observação" 
                                                value={data.ds_ObservacaoItem}                                                   
                                                onChange={handleChange}
                                                className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Myhr />
                </div>
    )
}