import { NovoProfessor } from "@/app/lib/reuniao/definitions";
import Myhr from "./myhr";
import { useState } from "react";

export default function AddNovoProfessor ({ data, onChange }: { data: NovoProfessor; onChange: (novoProfessor: NovoProfessor) => void }) {
       const [novoProfessor, setNovoProfessor] = useState <NovoProfessor>(data || { nm_NovoProfessor   : '' });
               
               const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                   const { name, value } = e.target;
                   const updatedNovoProfessor = { ...novoProfessor, [name]: value };
                       setNovoProfessor(updatedNovoProfessor);
                       onChange(updatedNovoProfessor);
                     };
               
            
    
    
    
    return(
        <div className="rounded-md bg-gray-50 p-4 md:p-2">
            <div className="mb-4 inline-block pr-4 w-full">
                <label htmlFor="nm_CredNovoProfessor" className="block text-sm font-medium text-gray-700">
                    Novo Professor Responsável:
                </label>
                <div className="relative mt-2 rounded-md  ">
                    <div className="relative">
                        <input 
                            id="nm_CredNovoProfessor" 
                            name="nm_CredNovoProfessor"
                            type="string"
                            placeholder="Professor"
                            onChange={handleChange} 
                            value={data.nm_CredNovoProfessor}     
                            className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      
                        />
                    </div>
                </div>
            </div>
            <Myhr />
        </div>
        )
}