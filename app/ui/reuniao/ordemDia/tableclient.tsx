'use client';

// import { fetchOrdemDia } from '@/app/lib/reuniao/data';
import { mylog } from '@/app/lib/mylogger';
import type { OrdemDia } from '@/app/lib/definitions';
import { AddOrdemDiaToReuniao, DeleteOrdemDiaFromReuniao, EditOrdemDia } from '../buttons';

import { reorderOrdemDiaDo } from '@/app/lib/reuniao/actions';

import { useEffect, useState } from 'react';

import { Reorder } from 'motion/react';






const filename = "app/ui/reuniao/ordemdia/tableclient";
    
/**
 * OrdemDia component displays a list of agenda items for a meeting.
 * It fetches the data from an API and allows editing, adding, and deleting items.
 *
 * @param {Object} props - The component props.
 * @param {number} props.rid - The ID of the meeting.
 * @param {number} props.editable - Indicates if the items are editable.
 * @param {number} props.currentPage - The current page number for pagination.
 */


export default function OrdemDia({rid, editable, currentPage}: { rid: number, editable: number, currentPage:number}) {

    const [ordemdia, setOrdemDia] = useState<OrdemDia[]>([]);

    function reorderOrdemDia(ordemDia: OrdemDia[]) {
        mylog ("DBG", filename, "OrdemDia", "reoderOrdemDia", ordemDia);
        ordemDia.forEach((item, index) => {item.seq = index + 1;});
        // Update the ordemDia state with the new order
        setOrdemDia(ordemDia);
        // Here you would typically send the reordered list to the server
        const newseq = ordemDia.map((item, index) => ({ id: item.id, seq: index + 1 }));
        mylog ("DBG", filename, "OrdemDia", "reorderOrdemDia", `New sequence: ${JSON.stringify(newseq)}`);
        reorderOrdemDiaDo(newseq)
                .then(() => {
                    mylog ("DBG", filename, "OrdemDia", "reorderOrdemDiaDo", "Reordered successfully");
                })
                .catch((error) => {
                    mylog ("ERR", filename, "OrdemDia", "reorderOrdemDiaDo", error);
                });
        // For now, we just log it
        console.log("Reordered OrdemDia:", ordemDia);
    }
    
    
    useEffect(() => {
        const fetchOrdemDia = async (rid: number, currentPage: number) => {
            mylog ("DBG", filename, "OrdemDia", "fetchOrdemDia", {rid, currentPage});
            const response = await fetch(`/api/ordemlist?id=${rid}&page=${currentPage}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const ordemDiaData = await response.json() as OrdemDia[];
            mylog ("DBG", filename, "OrdemDia", "fetchOrdemDia", ordemDiaData);
            setOrdemDia(ordemDiaData);
        }
        fetchOrdemDia(rid, currentPage);
    }, [rid, currentPage]);

    mylog ("DBG",filename,"OrdemDia","{rid, editable, currentPage}=",{rid, editable,currentPage});
    // const ordemdia = await fetchOrdemDia (rid, currentPage) as OrdemDia[];
    // setOrdemDia ( [{"id":1726,"seq":1,"assunto":"petit gateau","deliberacao":"","publicavel":"S"},{"id":1729,"seq":2,"assunto":"Primeiro Teste de Ordem do Dia","deliberacao":"","publicavel":"S"},{"id":1730,"seq":3,"assunto":"Comer bananas faz bem?","deliberacao":"","publicavel":"S"}]);
    mylog ("DBG",filename,"OrdemDia","ordemdia =",ordemdia);

    return (
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
            <div className="flex justify-between">
            <div className={`w-7/8 mb-8 inline-block`}>
                Ordem do Dia
            </div>
            <div className="w-1/8 mb-8 inline-block">
                <AddOrdemDiaToReuniao rid={rid} editable={editable}/>
            </div>
            </div>
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                    <th scope="col" className="px-1 py-5 w-1/5 font-medium sm:pl-6">
                            Ações
                        </th>
                        <th scope="col" className="px-1 py-5 w-1/10 font-medium sm:pl-6">
                            Sequência
                        </th>
                        <th scope="col" className="px-1 py-5 w-1/3 font-medium sm:pl-6">
                            Assunto
                        </th>
                        <th scope="col" className="px-1 py-5 w-1/3 font-medium sm:pl-6">
                            Deliberacao
                        </th>
                        <th scope="col" className="px-1 py-5 w-1/10 font-medium sm:pl-6">
                            Publicável
                        </th>
                    </tr>
                </thead>
                
                
                    <Reorder.Group
                        axis="y"
                        as="tbody"
                        values={ordemdia}
                        onReorder={reorderOrdemDia}>
                    {ordemdia?.map((ordemdia : OrdemDia, index) => (
                        <Reorder.Item
                        key={ordemdia.id}
                        value={ordemdia}
                        as="tr"
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                      >
                        
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-start ">
                            <EditOrdemDia id={ordemdia.id} editable={editable} rid={rid} />
                            <DeleteOrdemDiaFromReuniao id={ordemdia.id} editable={editable} rid={rid} />
                        </div>
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                                {index + 1}
                            </div>
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex text-wrap items-center gap-3">
                                {ordemdia.assunto}
                            </div>
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex text-wrap items-center gap-3">
                                {ordemdia.deliberacao}
                            </div>
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                                {ordemdia.publicavel}
                            </div>
                        </td>
                    
                    </Reorder.Item>
                    ))}
                    </Reorder.Group>
                
            </table>
            </div>
         </div>
    )

}