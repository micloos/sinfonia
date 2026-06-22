import Myhr from "./myhr"
import type { Orientador, Interessado } from "@/app/lib/reuniao/definitions"
import { useState } from 'react';
import SearchableSelect from "@/app/ui/reuniao/searchableSelect";
import { SearchResult } from "@/app/lib/reuniao/pauta/actions";
import { fetchUsers } from "@/app/lib/reuniao/data";
import { mylog } from "@/app/lib/mylogger";

const filename = "app/ui/reuniao/pauta/interessado";

interface InteressadoSubformProps {
  data: Interessado; 
  shadow: Orientador;
  onChange: (data: Interessado) => void;
  isRequired?: boolean;
}



export default  function AddPautaInteressado({ data, onChange, isRequired = false , shadow }: InteressadoSubformProps) 
{
  const [interessado, setInteressado] = useState<Interessado>(data || { nm_Interessado: '', ds_AreaInteressado: '', ds_NivelInteressado: '' });
  const [selectedUser, setSelectedUser] = useState<SearchResult | null>(null);
  const [searchHistory, setSearchHistory] = useState<{ type: string; item: SearchResult; timestamp: string }[]>([]);
  const [orientador, setShadow] = useState<Orientador>(shadow);

  mylog('DBG', filename, 'AddPautaInteressado', 'data=', data);
  mylog('DBG', filename, 'AddPautaInteressado', 'isrequired=', isRequired);
  console.log('shadow=', shadow);
  console.log('orientador', orientador);
  mylog('DBG', filename, 'AddPautaInteressado', 'selectUser=', selectedUser);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedInteressado = { ...interessado, [name]: value }; 
    console.log('interessado',updatedInteressado);
    setInteressado(updatedInteressado);
    onChange(updatedInteressado);
  };

  const addToHistory = (type: string, item: SearchResult) => {
    setSearchHistory(prev => [...prev, 
      { type, item, timestamp: new Date().toLocaleTimeString() },
      ...prev.slice(0,4)
    ]);
    console.log('Search history updated:', searchHistory);
  }

  const handleUserSelect = (user: SearchResult) => {
    setSelectedUser(user);
    addToHistory('User', user);
    console.log('Selected user:', user);
    const updatedInteressado = { 
      ...interessado, 
      nm_Interessado: user.name, 
      ds_AreaInteressado: user.ds_AreaInteressado || '', 
      ds_NivelInteressado: user.ds_NivelInteressado || '' 
    };
    console.log('Interessado',interessado);
    const updatedOrientador = {
      ...orientador,           
        nm_Orientador: user.nm_Orientador || '',
        ds_LotOrientador: user.ds_LotOrientador || '',
      } ;
    
    console.log('Updated shadow:', updatedOrientador);
    setInteressado(updatedInteressado);
    setShadow(updatedOrientador);
    console.log('Updated orientador:', orientador);
    onChange(updatedInteressado);
  };


  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-2">
      <div className="mb-4 inline-block pr-4 w-2/3">
        <label className="block text-sm font-medium text-gray-700">
          Interessado  
        </label>
       <div className="relative mt-2 rounded-md w-70 ">
            <div className="relative">
              <SearchableSelect
                  onchange={handleChange}
                  onSelect={handleUserSelect}
                  value={interessado.nm_Interessado}
                  searchFunction={fetchUsers}
                  placeholder="Procurar interessado..."
              />
{/*              <input 
                id="nm_Interessado" 
                name="nm_Interessado"
                type="string"
                placeholder="Interessado"  
                value = {interessado.nm_Interessado}
                onChange={handleChange}      
                required={isRequired}
                
                className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      
            />
            */}            
            <input type="hidden" name="nm_Interessado" value={interessado.nm_Interessado} readOnly />

          </div>
        </div>
      </div>  
      
      <div className="mb-4 inline-block p-4 w-1/6">
        <label htmlFor="ds_AreaInteressado" className="block text-sm font-medium text-gray-700">
          Área
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <select id="ds_AreaInteressado" name="ds_AreaInteressado" 
              className="peer w-full inline rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={interessado.ds_AreaInteressado}
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
        <label htmlFor="ds_NivelInteressado" className="block text-sm font-medium text-gray-700">
          Nivel
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <select id="ds_NivelInteressado" name="ds_NivelInteressado" 
              className="peer w-full inline rounded-md border-gray-200 py-2 pl-10 test-sm outline-2 placeholder:text-gray-500"
              value={interessado.ds_NivelInteressado}
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