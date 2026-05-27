import { useState } from "react";
import Myhr from "./myhr";
import { MotivoAssunto } from "@/app/lib/reuniao/definitions";

export default function AddMotivo ({ data, onChange }: { data: MotivoAssunto; onChange: (motivo: MotivoAssunto) => void }) {
    const [motivo, setMotivo] = useState <MotivoAssunto>(data || { ds_MotivoItem: '' });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedMotivo = { ...motivo, [name]: value };
            setMotivo(updatedMotivo);
            onChange(updatedMotivo);
          };
    
    
    return (
            <div className="rounded-md bg-gray-50 p-4 md:p-2">
                        <div className="mb-4 inline-block pr-4 w-full">
                                        <label htmlFor="ds_MotivoItem" className="block text-sm font-medium text-gray-700">
                                            Motivo:
                                        </label>
                                        <div className="relative mt-2 rounded-md  ">
                                            <div className="relative">
                                                <input 
                                                    id="ds_MotivoItem" 
                                                    name="ds_MotivoItem"
                                                    type="string"
                                                    placeholder="Motivo"
                                                    value={data.ds_MotivoItem}
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