'use client';

import Myhr from "./myhr";
import { mylog } from "@/app/lib/mylogger";
import { useState } from 'react';
// import { useDebouncedCallback } from 'use-debounce';
// import { Button } from "../../button";
import { Banca, BancaFormData } from "@/app/lib/reuniao/definitions";
import { Tooltip } from "@mui/material";
import {  TrashIcon } from '@heroicons/react/24/outline';
import { deleteBancaItem } from "@/app/lib/reuniao/pauta/actions";

const filename = 'app/ui/reuniao/pauta/addbanca';

const tiposExaminadores = [
  'Titular',
    'Titular',
    'Titular',
    'Titular',
    'Titular',
    'Titular',
    'Suplente',  
    'Suplente',
    'Suplente',
    'Suplente',
    'Suplente',
    
];


interface BancaTableProps {
  data: Banca[];
  onChange: (data: Banca[]) => void;
  maxMembers?: number;
  readOnly?: boolean;
}

export default function AddBanca({ 
  data = [], 
  onChange, 
  maxMembers = 20,
  readOnly = false 
}: BancaTableProps) {
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<BancaFormData>({
        nm_ExaminadorBanca: '',
        ds_LotExaminadorBanca: '',
        Cd_TipoExaminador: 0
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === 'Cd_TipoExaminador' ? parseInt(value) || 0 : value 
        }));
    }

        const addMember = () => {
            if (data.length >= maxMembers) {
                alert(`Maximum ${maxMembers} family members allowed`);
                return;
            }

            if (!formData.nm_ExaminadorBanca || !formData.ds_LotExaminadorBanca || !formData.Cd_TipoExaminador) {
                alert('Please fill in all required fields');
                return;
            }

            const newMember: Banca = {
                    Cd_BancaExaminadoraReuniao: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
                    ...formData
            };
            const updated = [...data, newMember];
            onChange(updated);
    
            // Reset form
            setFormData({ nm_ExaminadorBanca: '', ds_LotExaminadorBanca: '', Cd_TipoExaminador: 0 });
            setIsAdding(false);
        };
        const updateMember = () => {
            if (!editingId) return;

            if (!formData.nm_ExaminadorBanca || !formData.ds_LotExaminadorBanca || !formData.Cd_TipoExaminador) {
                alert('Please fill in all required fields');
                return;
            }

            const updated = data.map(member => 
                member.Cd_BancaExaminadoraReuniao === editingId 
                ? { ...member, ...formData }
                : member
            );
    
            onChange(updated);
            cancelEdit();
        };

        const deleteMember = (id: string) => {
            if (confirm('Tem certeza de querer remover esse membro?')) {
                const updated = data.filter(member => member.Cd_BancaExaminadoraReuniao  !== id);
                deleteBancaItem(id);
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
            setFormData({ nm_ExaminadorBanca: '', ds_LotExaminadorBanca: '', Cd_TipoExaminador: 0 });
            mylog("DBG",filename, 'AddBanca', 'Edit cancelled', 'form reset');
        };

        const cancelAdd = () => {
            setIsAdding(false);
            setFormData({ nm_ExaminadorBanca: '', ds_LotExaminadorBanca: '', Cd_TipoExaminador: 0    });
        };

        return (
        <div className="family-members-table">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Banca Examinadora:</h3>
                {!readOnly && data.length < maxMembers && !isAdding && !editingId && (
                  <button
                    type="button"
                    onClick={() => setIsAdding(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    + Incluir Examinador
                  </button>
                )}
            </div>
            <input type="hidden" name="banca_json" value={JSON.stringify(data)} />
            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h4 className="font-semibold mb-3">
                    {isAdding ? 'Incluir Examinador' : 'Editar Examinador'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Examinador *
                        </label>
                        <input
                            type="text"
                            name="nm_ExaminadorBanca"
                            value={formData.nm_ExaminadorBanca}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Full name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Tipo Examinador *
                        </label>
                        <select
                            name="Cd_TipoExaminador"
                            value={formData.Cd_TipoExaminador}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">[Selectionar Tipo]</option>
                            <option value="6">Suplente</option>                            
                            <option value="1">Titular</option>                            
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Lotação *
                        </label>
                        <input
                            type="string"
                            name="ds_LotExaminadorBanca"
                            value={formData.ds_LotExaminadorBanca}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Lotação"
                            min="0"
                            max="120"
                        />
                    </div>          
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={isAdding ? addMember : updateMember}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        {isAdding ? 'Add Member' : 'Update Member'}
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
              <tr>
                {!readOnly && (
                  <th className="px-4 py-2 border-b text-left">Ações</th>
                )}
                <th className="px-4 py-2 border-b text-left">Tipo: </th>
                <th className="px-4 py-2 border-b text-left">Nome: </th>
                <th className="px-4 py-2 border-b text-left">Lotação: </th>
              </tr>
            </thead>
            <tbody key="tableBody">
              {data.map((member) => (
                <tr key={member.Cd_BancaExaminadoraReuniao} className="hover:bg-gray-50">
                    {!readOnly && (
                    <td className="px-4 py-2 border-b">
                      <div className="flex gap-2">
                        
                        <Tooltip title="Excluir" placement="top">
                        <button
                          type="button"
                          onClick={() => deleteMember(member.Cd_BancaExaminadoraReuniao)}
                          className="rounded-md border p-2 hover:bg-gray-100"
                          disabled={!!editingId || isAdding}
                        >
                          <TrashIcon className="w-5" />
                        </button>
                        </Tooltip>
                      </div>
                    </td>
                  )}
                  <td className="px-4 py-2 border-b">{tiposExaminadores[member.Cd_TipoExaminador]}</td>
                  <td className="px-4 py-2 border-b">{member.nm_ExaminadorBanca}</td>
                  <td className="px-4 py-2 border-b">{member.ds_LotExaminadorBanca}</td>
                 {/* <td className="px-4 py-2 border-b">{JSON.stringify(member)}</td> */}
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={readOnly ? 5 : 6} className="px-4 py-2 text-sm text-gray-600">
                  Total: {data.length} Membros {data.length !== 1 ? 's' : ''}
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

