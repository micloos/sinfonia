import { DisciplinaEspeciaisFormData, DisciplinaEspecial } from "@/app/lib/reuniao/definitions";
import Myhr from "./myhr";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers"
import utc from 'dayjs/plugin/utc'
import "dayjs/locale/pt-br"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { Tooltip } from "@mui/material";
import {  TrashIcon } from '@heroicons/react/24/outline';
import { useState } from "react";

const filename = "AddDisciplina.tsx";

dayjs.extend(utc);

interface AddDisciplinaProps {
    data: DisciplinaEspecial[]; 
    onChange: (data: DisciplinaEspecial[]) => void; 
    maxMembers?: number;
    readOnly?: boolean;
}

export default function AddDisciplina ({
            data = [], 
            onChange, 
            maxMembers = 10,
            readOnly = false 
}: AddDisciplinaProps) {
    const datastring = JSON.stringify(data);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    console.log ("DBG",filename, 'AddDisciplina', 'data = ', datastring);

    const [formData, setFormData] = useState<DisciplinaEspeciaisFormData>({
        nm_DisciplinaEspecial: '',
        qt_Creditos: 0,
        dt_PeriodoInicial: '',
        dt_PeriodoFinal: '',
        ds_Frequencia: '',
        ds_Conceito: '',
    });

    const [docDateIni, setDocDateIni] = useState(formData.dt_PeriodoInicial ? dayjs.utc(formData.dt_PeriodoInicial) : dayjs.utc());
    const [docDateFim, setDocDateFim] = useState(formData.dt_PeriodoFinal ? dayjs.utc(formData.dt_PeriodoFinal) : dayjs.utc());


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]:  name === 'qt_Creditos' ? parseInt(value) || 0 : value
        }));
    }

    const handleInitChange = (date: dayjs.Dayjs | null) => {
            if(date) 
              {setDocDateIni(date); console.log(docDateIni.toISOString())
                setFormData(prev => ({
                  ...prev,
                  dt_PeriodoInicial: date.toISOString()
                }))
              }
    }

    const handleFimChange = (date: dayjs.Dayjs | null) => {
            if(date) 
              {setDocDateFim(date); console.log(docDateFim.toISOString())
                setFormData(prev => ({
                  ...prev,
                  dt_PeriodoFinal: date.toISOString()
                }))
              }
   }

   const updateMember = () => {
      if (!editingId) return;

      {/* if (!formData.Cd_TipoAtribuidorCredito || !formData.ds_TituloTrabalho ) {
                alert('Prencha os campos obrigatórios');
                return;
            } */}

      const updated = data.map(member => 
                member.cd_DisciplinaEspecial === editingId 
                ? { ...member, ...formData }
                : member
            );
    
            onChange(updated);
            cancelEdit();
        };


    const addMember = () => {
           if (data.length >= maxMembers) {
             alert(`Maximum ${maxMembers} family members allowed`);
             return;
           }
   
           console.log("addMember - formData before validation:", formData);
   
   
           const newMember: DisciplinaEspecial = {
                       cd_DisciplinaEspecial: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
                       ...formData
               };
           
           const updated = [...data, newMember];
           onChange(updated);
       
           // Reset form
           setFormData({ 
            nm_DisciplinaEspecial: '',
            qt_Creditos: 0,
            dt_PeriodoInicial: '',
            dt_PeriodoFinal: '',
            ds_Frequencia: '',
            ds_Conceito: '',
           });
           setIsAdding(false);
       };



    const deleteMember = (id: string) => {
            if (confirm('Vc tem certeza de querer remover isso?')) {
                const updated = data.filter(member => member.cd_DisciplinaEspecial  !== id);
                
                onChange(updated);
            }
    };

    const cancelEdit = () => {
            setEditingId(null);
            setFormData({
                       nm_DisciplinaEspecial: '',
        qt_Creditos: 0,
        dt_PeriodoInicial: '',
        dt_PeriodoFinal: '',
        ds_Frequencia: '',
        ds_Conceito: '',
            })
        };

    const cancelAdd = () => {
            setIsAdding(false);
            setFormData({
                nm_DisciplinaEspecial: '',
                qt_Creditos: 0,
                dt_PeriodoInicial: '',
                dt_PeriodoFinal: '',
                ds_Frequencia: '',
                ds_Conceito: '',
            })
        };


    return (
        <div className="family-members-table">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">
                            Adicionar Disciplina Especial:
                </h3>
                {!readOnly && data.length < maxMembers && !isAdding && !editingId && (
                  <button
                    type="button"
                    onClick={() => setIsAdding(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    + Incluir Disciplina
                  </button>
                )}
            </div>
            {/* Debug: Exibir dados atuais 
            <div className="mb-4 inline-block pr-4 w-full">
                {datastring}
            </div>*/ }
            <input type="hidden" name="disciplinas_json" value={JSON.stringify(data)} />
        {/* DONE Implementar formulário de disciplina especial */}
            {(isAdding || editingId) && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h4 className="font-semibold mb-3">
                    {isAdding ? 'Incluir Disciplina' : 'Editar Disciplina'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                  <div>
                        <label className="block text-sm font-medium mb-1">
                            Disciplina Especial: 
                        </label>
                        <input
                            type="text"
                            name="nm_DisciplinaEspecial"
                            value={formData.nm_DisciplinaEspecial}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Nome da Disciplina"
                        />
                  </div>
                </div>
                <div className="grid grid-cols-5 md:grid-cols-5 gap-4 mb-4">
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <label className="block text-sm font-medium mb-1">
                            Início: 
                        </label>
                        <div className="w-full" >
                            <DatePicker defaultValue={docDateIni}
                              onChange={handleInitChange} />
                            <input type="hidden" id="dt_PeriodoInicial" name="dt_PeriodoInicial" value={docDateIni.toISOString()}
                            />
                        </div>
                        </LocalizationProvider>
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <label className="block text-sm font-medium mb-1">
                            Fim: 
                        </label>
                        <div className="w-full" >
                            <DatePicker defaultValue={docDateFim}
                              onChange={handleFimChange} />
                            <input type="hidden" id="dt_PeriodoFinal" name="dt_PeriodoFinal" value={docDateFim.toISOString()}
                            />
                        </div>
                        </LocalizationProvider>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Frequência: 
                        </label>
                        <input
                            type="text"
                            name="ds_Frequencia"
                            value={formData.ds_Frequencia}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Frequência"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Conceito: 
                        </label>
                        <input
                            type="text"
                            name="ds_Conceito"
                            value={formData.ds_Conceito}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Conceito"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Qtd Créditos: 
                        </label>
                        <input
                            type="number"
                            name="qt_Creditos"
                            value={formData.qt_Creditos}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Créditos"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={isAdding ? addMember : updateMember}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        {isAdding ? 'Incluir Disciplina' : 'Atualizar Disciplina'}
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
                <th className="px-4 py-2 border-b text-left">Disciplina: </th>
                <th className="px-4 py-2 border-b text-left">Inicio: </th>
                <th className="px-4 py-2 border-b text-left">Fim: </th>
                
                <th className="px-4 py-2 border-b text-left">Frequência: </th>
                <th className="px-4 py-2 border-b text-left">Conceito: </th>
                <th className="px-4 py-2 border-b text-left">Créditos: </th>
                
              </tr>
            </thead>
            <tbody key={"body"}>
              {data.map((member) => ( 
                <tr key={member.cd_DisciplinaEspecial} className="hover:bg-gray-50">
                    {!readOnly && (
                    <td className="px-4 py-2 border-b">
                     <div className="flex gap-2">
                        
                        <Tooltip title="Excluir" placement="top">
                        <button
                          type="button"
                          onClick={() => deleteMember(member.cd_DisciplinaEspecial)}
                          className="rounded-md border p-2 hover:bg-gray-100"
                          disabled={!!editingId || isAdding}
                        >
                          <TrashIcon className="w-5" />
                        </button>
                        </Tooltip>
                      </div> 
                    </td>
                  )}
                    <td className="px-4 py-2 border-b">{member.nm_DisciplinaEspecial} </td>
                    <td className="px-4 py-2 border-b">{member.dt_PeriodoInicial? dayjs(member.dt_PeriodoInicial).locale('pt-br').format('DD/MM/YYYY') : ''}</td>
                    <td className="px-4 py-2 border-b">{member.dt_PeriodoFinal? dayjs(member.dt_PeriodoFinal).locale('pt-br').format('DD/MM/YYYY') : ''}</td>

                  {/* <td className="px-4 py-2 border-b">{JSON.stringify(tipos[1])}</td> */}
                  <td className="px-4 py-2 border-b">{member.ds_Frequencia}</td>
                  <td className="px-4 py-2 border-b">{member.ds_Conceito}
                    {/* {JSON.stringify(member)} */}
                  </td>
                  <td className="px-4 py-2 border-b">{member.qt_Creditos}</td>

                  
                </tr>
              ))
              }
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={readOnly ? 5 : 6} className="px-4 py-2 text-sm text-gray-600">
                  Total: {data.length} Disciplina{data.length !== 1 ? 's' : ''}
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
    )
}