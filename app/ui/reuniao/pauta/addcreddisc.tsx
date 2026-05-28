import { CredenciamentoDisciplina } from "@/app/lib/reuniao/definitions";
import Myhr from "./myhr";
import { useState } from "react";


export default function AddCredenciamentoDisciplina ({ data, onChange }: { data: CredenciamentoDisciplina; onChange: (credenciamentoDisciplina: CredenciamentoDisciplina) => void }) {
const [credenciamentoDisciplina, setCredenciamentoDisciplina] = useState <CredenciamentoDisciplina>(data || { Nm_CredProfessorResponsavel   : '' , ds_CredenciamentoDisciplina: '' });
               
               const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                   const { name, value } = e.target;
                   const updatedCredenciamentoDisciplina = { ...credenciamentoDisciplina, [name]: value };
                       setCredenciamentoDisciplina(updatedCredenciamentoDisciplina);
                       onChange(updatedCredenciamentoDisciplina);
                     };


    return(
        <div className="rounded-md bg-gray-50 p-4 md:p-2">
            <div className="mb-4 inline-block pr-4 w-1/2">
                <label htmlFor="ds_CredenciamentoDisciplina" className="block text-sm font-medium text-gray-700">
                    Credenciamento de Disciplina:
                </label>
                <div className="relative mt-2 rounded-md  ">
                    <div className="relative">
                        <input 
                            id="ds_CredenciamentoDisciplina" 
                            name="ds_CredenciamentoDisciplina"
                            type="string"
                            placeholder="Disciplina"
                            value={data.ds_CredenciamentoDisciplina}        
                            onChange={handleChange}
                            className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      
                        />
                    </div>
                </div>
            </div>
            <div className="mb-4 inline-block pr-4 w-1/2">
                <label htmlFor="Nm_CredProfessorResponsavel" className="block text-sm font-medium text-gray-700">
                    Professor(es) Responsável(eis):
                </label>
                <div className="relative mt-2 rounded-md  ">
                    <div className="relative">
                        <input 
                            id="Nm_CredProfessorResponsavel" 
                            name="Nm_CredProfessorResponsavel"
                            type="string"
                            placeholder="Nome(s) do(s) Professor(es)"        
                            value={data.Nm_CredProfessorResponsavel}
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