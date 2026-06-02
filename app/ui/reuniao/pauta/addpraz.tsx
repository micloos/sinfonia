import { mylog } from "@/app/lib/mylogger";
import Myhr from "./myhr";
import { fetchPrazoNames } from "@/app/lib/reuniao/data";
import { Prazo, PrazoName } from "@/app/lib/reuniao/definitions";
import { useEffect, useState } from "react";

    const filename = "addpraz.tsx";

//    const prazoNames = fetchPrazoNames();
//    mylog("ERROR", filename, 'AddPrazo', 'prazoNames = ', prazoNames);

interface PrazoSubformProps {
  data: Prazo;
  onChange: (data: Prazo) => void;
  isRequired?: boolean;
}

export default function AddPrazo ({ data, onChange }: PrazoSubformProps) {
    const[prazoNames, setPrazoNames] = useState<PrazoName[]>([]);
    const [prazo, setPrazo] = useState<Prazo>(data || { Cd_TipoSolicitacaoPrazo: 0, qt_SolicitacaoPrazoDiasSolicitados: 0 });
    const handleChange= (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedPrazo = { ...prazo, [name]: value };
        setPrazo(updatedPrazo);
        onChange(updatedPrazo);
 //       console.log("Updated prazo: ", updatedPrazo);
 //       console.log("Current prazoNames: ", prazoNames);
      };
    useEffect(() => {
        mylog("ERROR", filename, 'AddPrazo', 'Component mounted, fetching prazo names...','');
        const loadPrazoNames = async () => {
            const prazoNames = await fetchPrazoNames();
            setPrazoNames(prazoNames);
            mylog("ERROR", filename, 'AddPrazo', 'Loaded prazo names: ', prazoNames);
        };
        loadPrazoNames();
    }, []);

//    mylog("ERROR", filename, 'AddPrazo', 'Rendering component with prazo: ', prazoNames);

    return(
        <div className="rounded-md bg-gray-50 p-4 md:p-2">
            Solicitação de Prazo:
            <Myhr />
            <div className="mb-4 inline-block p-4 w-1/6">
                <label htmlFor="Cd_TipoSolicitacaoPrazo" className="block text-sm font-medium text-gray-700">
                    Solicitação
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <select id="Cd_TipoSolicitacaoPrazo" name="Cd_TipoSolicitacaoPrazo" 
                            className="peer w-full inline rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            value={prazo.Cd_TipoSolicitacaoPrazo} onChange={handleChange}>
                        
                            <option value="0">Selecione um Tipo</option>
                            {prazoNames.map((name) => (
                                <option key={name.id} value={name.id}>
                                    {name.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>           
            </div>
            <div className="mb-4 inline-block pr-4 w-2/3">
                <label htmlFor="qt_SolicitacaoPrazoDiasSolicitados" className="block text-sm font-medium text-gray-700">
                    Qtd. Dias:  
                </label>
                <div className="relative mt-2 rounded-md w-1/6 ">
                    <div className="relative">
                    <input 
                        id="qt_SolicitacaoPrazoDiasSolicitados" 
                        name="qt_SolicitacaoPrazoDiasSolicitados"
                        type="number"
                        placeholder=""        
                        value={prazo.qt_SolicitacaoPrazoDiasSolicitados} onChange={handleChange}
                        className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      
                    />
                </div>
            </div>
      </div>
            <Myhr />

        </div>
    )
}