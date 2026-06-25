'use client';

import Myhr from "./myhr";
import { mylog } from "@/app/lib/mylogger";
import { useState } from 'react';
// import { useDebouncedCallback } from 'use-debounce';
// import { Button } from "../../button";
import { CreditosFormData, Credito, AtribuidorName } from "@/app/lib/reuniao/definitions";
import { Tooltip } from "@mui/material";
import {  TrashIcon } from '@heroicons/react/24/outline';

import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import "dayjs/locale/pt-br"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { deleteCreditosItem } from "@/app/lib/reuniao/pauta/actions";



const filename = 'app/ui/reuniao/pauta/addcreditos';


dayjs.extend(utc);


interface CreditosTableProps {
  data: Credito[];
  tipoAttrCreditos: AtribuidorName[];
  onChange: (data: Credito[]) => void;
  maxMembers?: number;
  readOnly?: boolean;
}

export default function AddCreditos({ 
  data = [],
  tipoAttrCreditos = [], 
  onChange, 
  maxMembers = 10,
  readOnly = false 
}: CreditosTableProps) {
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<CreditosFormData>({
        Cd_TipoAtribuidorCredito: '0',
        ds_TituloTrabalho: '',
        ds_TituloPeriodicoLivroCongresso: '',
        ds_Pais: '',
        dt_PeriodoInicial: '',
        dt_PeriodoFinal: '',
        ds_Paginas: '',
        ds_Ano: '',
        nu_Volume: ''
    });

    const [tipos, setTiposAtribuidorCredito] = useState<AtribuidorName[]>([]);

    const [docDateIni, setDocDateIni] = useState(formData.dt_PeriodoInicial ? dayjs.utc(formData.dt_PeriodoInicial) : dayjs.utc());
    const [docDateFim, setDocDateFim] = useState(formData.dt_PeriodoFinal ? dayjs.utc(formData.dt_PeriodoFinal) : dayjs.utc());
    setTiposAtribuidorCredito(tipoAttrCreditos)
    console.log("AddCreditos - data", data);
    console.log("AddCreditos - formData", formData);

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]:  name === 'Cd_TipoAtribuidorCredito' ? parseInt(value) || 0 : value
        }));

        console.log("handleInputChange - formData", formData);
        console.log("handleInputChange - data", data);
      }
    const handleInitChange = (date: dayjs.Dayjs | null) => {
        if(date && date.isValid()) 
          {setDocDateIni(date); console.log(docDateIni.toISOString())
            setFormData(prev => ({
              ...prev,
              dt_PeriodoInicial: date.toISOString()
            }))
          }
        }
    const handleFimChange = (date: dayjs.Dayjs | null) => {
        if(date && date.isValid()) 
          {setDocDateFim(date); console.log(docDateFim.toISOString())
            setFormData(prev => ({
              ...prev,
              dt_PeriodoFinal: date.toISOString()
            }))
          }
        }


      const addMember = () => {
        if (data.length >= maxMembers) {
          alert(`Maximum ${maxMembers} family members allowed`);
          return;
        }

        console.log("addMember - formData before validation:", formData);


        const newMember: Credito = {
                    cd_AtribuidorCredito: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
                    ...formData
            };
        
        const updated = [...data, newMember];
        onChange(updated);
    
        // Reset form
        setFormData({ 
            Cd_TipoAtribuidorCredito: '0',
            ds_TituloTrabalho: '',
            ds_TituloPeriodicoLivroCongresso: '',
            ds_Pais: '',
            dt_PeriodoInicial: '',
            dt_PeriodoFinal: '',
            ds_Paginas: '',
            ds_Ano: '',
            nu_Volume: ''
        });
        setIsAdding(false);
    };

    const updateMember = () => {
      if (!editingId) return;

      if (!formData.Cd_TipoAtribuidorCredito || !formData.ds_TituloTrabalho ) {
                alert('Prencha os campos obrigatórios');
                return;
            }

      const updated = data.map(member => 
                member.cd_AtribuidorCredito === editingId 
                ? { ...member, ...formData }
                : member
            );
    
            onChange(updated);
            cancelEdit();
        };

        const deleteMember = (id: string) => {
            if (confirm('Vc tem certeza de querer remover isso?')) {
                const updated = data.filter(member => member.cd_AtribuidorCredito  !== id);
                deleteCreditosItem(id);
                onChange(updated);
            }
        };
{/*}
        const startEdit = (member: Banca) => {
            setEditingId(member.id_ExaminadorBanca);
            setFormData({
                nm_ExaminadorBanca: member.nm_ExaminadorBanca,
                ds_LotExaminadorBanca: member.ds_LotExaminadorBanca,
                Cd_TipoExaminador: member.Cd_TipoExaminador
            });
            setIsAdding(false);
        };
*/}
        const cancelEdit = () => {
            setEditingId(null);
            setFormData({ Cd_TipoAtribuidorCredito: '0',
            ds_TituloTrabalho: '',
            ds_TituloPeriodicoLivroCongresso: '',
            ds_Pais: '',
            dt_PeriodoInicial: '',
            dt_PeriodoFinal: '',
            ds_Paginas: '',
            ds_Ano: '',
            nu_Volume: ''});
            mylog("DBG",filename, 'AddBanca', 'Edit cancelled', 'form reset');
        };

        const cancelAdd = () => {
            setIsAdding(false);
            setFormData({ Cd_TipoAtribuidorCredito: '0',
            ds_TituloTrabalho: '',
            ds_TituloPeriodicoLivroCongresso: '',
            ds_Pais: '',
            dt_PeriodoInicial: '',
            dt_PeriodoFinal: '',
            ds_Paginas: '',
            ds_Ano: '',
            nu_Volume: ''    });
        };

        return (
        <div className="family-members-table">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Créditos Especiais:</h3>
                {!readOnly && data.length < maxMembers && !isAdding && !editingId && (
                  <button
                    type="button"
                    onClick={() => setIsAdding(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    + Incluir Paper
                  </button>
                )}
            </div>
            <input type="hidden" name="creditos_json" value={JSON.stringify(data)} />
            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h4 className="font-semibold mb-3">
                    {isAdding ? 'Incluir Paper' : 'Editar Paper'}
                </h4>
                <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-4">
                  <div>
                        <label className="block text-sm font-medium mb-1">
                            Tipo de Crédito *
                        </label>
                        <select
                            name="Cd_TipoAtribuidorCredito"
                            value={formData.Cd_TipoAtribuidorCredito}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">[Selectionar Tipo]</option>
                            {tipos.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.name}
                                </option>
                            ))}
                        </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Titulo do Trabalho *
                        </label>
                        <input
                            type="text"
                            name="ds_TituloTrabalho"
                            value={formData.ds_TituloTrabalho}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Titulo do Trabalho"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Título do Períodico/Livro/Congresso
                        </label>
                        <input
                            type="string"
                            name="ds_TituloPeriodicoLivroCongresso"
                            value={formData.ds_TituloPeriodicoLivroCongresso}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Título do Periódico/Livro/Congresso"
                            min="0"
                            max="120"
                        />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Volume:
                        </label>
                        <input
                            type="string"
                            name="nu_Volume"
                            value={formData.nu_Volume}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Volume"
                            min="0"
                            max="120"
                        />
                    </div>    
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Páginas:
                        </label>
                        <input
                            type="string"
                            name="ds_Paginas"
                            value={formData.ds_Paginas}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Páginas"
                            min="0"
                            max="120"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Pais:
                        </label>
                        <input
                            type="string"
                            name="ds_Pais"
                            value={formData.ds_Pais}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Pais"
                            min="0"
                            max="120"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Ano:
                        </label>
                        <input
                            type="string"
                            name="ds_Ano"
                            value={formData.ds_Ano}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Ano"
                            min="0"
                            max="120"
                        />
                    </div>
                    </div>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <div className="mb-4 inline-block pr-4 w-1/4">
                          <label htmlFor="dt_PeriodoInicial" >
                              Data Inicial:
                          </label>
                          <div className="w-full" >
                            <DatePicker defaultValue={docDateIni}
                              onChange={(date) => {if (date && date.isValid()) {handleInitChange(date)}}} />
                            <input type="hidden" id="dt_PeriodoInicial" name="dt_PeriodoInicial" value={docDateIni.toISOString()}
                            />
                          </div>
                        </div>
                      </LocalizationProvider>  
                    </div>
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <div className="mb-4 inline-block pr-4 w-1/4">
                          <label htmlFor="dt_PeriodoFinal" >
                              Data Final:
                          </label>
                          <div className="w-full" >
                            <DatePicker defaultValue={docDateFim}
                              onChange={(date) => {if (date && date.isValid()) {handleFimChange(date)}}} />
                            <input type="hidden" id="dt_PeriodoFinal" name="dt_PeriodoFinal" value={docDateFim.toISOString()}
                            />
                          </div>
                        </div>
                      </LocalizationProvider>  
                    </div>         
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={isAdding ? addMember : updateMember}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        {isAdding ? 'Incluir Paper' : 'Atualizar Paper'}
                    </button>
                    <button
                        type="button"
                        onClick={isAdding ? cancelAdd : cancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        )}

      {/* Members Table */}
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr key="header">
                {!readOnly && (
                  <th className="px-4 py-2 border-b text-left">Ações</th>
                )}
                <th className="px-4 py-2 border-b text-left">Tipo: </th>
                <th className="px-4 py-2 border-b text-left">Título: </th>
                <th className="px-4 py-2 border-b text-left">Periódico: </th>
                
                <th className="px-4 py-2 border-b text-left">Volume: </th>
                <th className="px-4 py-2 border-b text-left">Páginas: </th>
                <th className="px-4 py-2 border-b text-left">País: </th>
                <th className="px-4 py-2 border-b text-left">Ano: </th>

                <th className="px-4 py-2 border-b text-left">Inicio: </th>
                <th className="px-4 py-2 border-b text-left">Fim: </th>
              </tr>
            </thead>
            <tbody key={"body"}>
              {data.map((member) => ( 
                <tr key={member.cd_AtribuidorCredito} className="hover:bg-gray-50">
                    {!readOnly && (
                    <td className="px-4 py-2 border-b">
                      <div className="flex gap-2">
                        
                        <Tooltip title="Excluir" placement="top">
                        <button
                          type="button"
                          onClick={() => deleteMember(member.cd_AtribuidorCredito)}
                          className="rounded-md border p-2 hover:bg-gray-100"
                          disabled={!!editingId || isAdding}
                        >
                          <TrashIcon className="w-5" />
                        </button>
                        </Tooltip>
                      </div>
                    </td>
                  )}
                  <td className="px-4 py-2 border-b">{tipos[Number(member.Cd_TipoAtribuidorCredito)-1].name} </td>
                  {/* <td className="px-4 py-2 border-b">{JSON.stringify(tipos[1])}</td> */}
                  <td className="px-4 py-2 border-b">{member.ds_TituloTrabalho}</td>
                  <td className="px-4 py-2 border-b">{member.ds_TituloPeriodicoLivroCongresso}
                    {/* {JSON.stringify(member)} */}
                  </td>
                  <td className="px-4 py-2 border-b">{member.nu_Volume}</td>
                  <td className="px-4 py-2 border-b">{member.ds_Paginas}</td>
                  <td className="px-4 py-2 border-b">{member.ds_Pais}</td>
                  <td className="px-4 py-2 border-b">{member.ds_Ano}</td>
                  <td className="px-4 py-2 border-b">{member.dt_PeriodoInicial? dayjs(member.dt_PeriodoInicial).locale('pt-br').format('DD/MM/YYYY') : ''}</td>
                  <td className="px-4 py-2 border-b">{member.dt_PeriodoFinal? dayjs(member.dt_PeriodoFinal).locale('pt-br').format('DD/MM/YYYY') : ''}</td>
                  
                </tr>
              ))
              }
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={readOnly ? 5 : 6} className="px-4 py-2 text-sm text-gray-600">
                  Total: {data.length} Atribuidor{data.length !== 1 ? 'es' : ''}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">

        </div>
      )}
      <Myhr />
    </div>
  );

}; 

