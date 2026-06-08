import Myhr from "./myhr"
import type { Orientador, Interessado, Shadow  } from "@/app/lib/reuniao/definitions"
import { useState } from 'react';
import SearchableSelect from "@/app/ui/reuniao/searchableSelect";
import { SearchResult } from "@/app/lib/reuniao/pauta/actions";
import { fetchUsers } from "@/app/lib/reuniao/data";
import { mylog } from "@/app/lib/mylogger";

const filename = "app/ui/reuniao/pauta/interessado";

interface InteressadoSubformProps {
  data: Interessado; 
  shadow: Orientador;
  onChange: (data: Interessado, shadow: Shadow) => void;
  isRequired?: boolean;
}



export default  function AddPautaInteressado({ data, onChange, isRequired = false , shadow }: InteressadoSubformProps) 
{
  const [interessado, setInteressado] = useState<Interessado>(data || { nm_interessado: '', ds_areainteressado: '', ds_nivelinteressado: '' });
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
    const updatedOrientador = {...orientador, [name]: value}
    setInteressado(updatedInteressado);
    setShadow(updatedOrientador)
    onChange(updatedInteressado, updatedOrientador);
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
      nm_interessado: user.name, 
      ds_areainteressado: user.ds_AreaInteressado || '', 
      ds_nivelinteressado: user.ds_NivelInteressado || '' 
    };
    const updatedOrientador = {
      ...orientador,           
        nm_Orientador: user.nm_Orientador || '',
        ds_LotOrientador: user.ds_LotOrientador || '',
      } ;
    
    console.log('Updated shadow:', updatedOrientador);
    setInteressado(updatedInteressado);
    setShadow(updatedOrientador);
    console.log('Updated orientador:', orientador);
    onChange(updatedInteressado, updatedOrientador);
  };


  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-2">
      <div className="mb-4 inline-block pr-4 w-2/3">
        <label htmlFor="nm_interessado" className="block text-sm font-medium text-gray-700">
          Interessado  
        </label>
       <div className="relative mt-2 rounded-md w-70 ">
            <div className="relative">
              <SearchableSelect
                  
                  onSelect={handleUserSelect}
                  value={interessado.nm_interessado}
                  searchFunction={fetchUsers}
                  placeholder="Search by name, email, or department..."
              />
{/*              <input 
                id="nm_interessado" 
                name="nm_interessado"
                type="string"
                placeholder="Interessado"  
                value = {interessado.nm_interessado}
                onChange={handleChange}      
                required={isRequired}
                
                className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      
            />
            */}
            <input type="hidden" name="nm_interessado" value={interessado.nm_interessado} readOnly />
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