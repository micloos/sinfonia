'use client';

// import { fetchOrdemDia } from '@/app/lib/reuniao/data';
import { mylog } from '@/app/lib/mylogger';
import type { OrdemDia } from '@/app/lib/definitions';
import { AddOrdemDiaToReuniao, DeleteOrdemDiaFromReuniao, EditOrdemDia } from '../buttons';
import { useEffect, useState } from 'react';



{/*
import {Table} from "antd";
import { useState, useCallback, useEffect } from 'react';
import { DndProvider, useDrag, useDrop} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper"
*/}

const filename = "app/ui/reuniao/ordemdia/tableclient";

{/*
    
const type = "DraggableBodyRow";


const DraggableBodyRow = ({ 
    index, 
    moveRow, 
    className, 
    style, 
    ...restProps 
}: any) => {
    const ref = useRef(null);
    const [{isOver, dropClassname}, drop] = useDrop(() => ({
        accept: type,
        collect: (monitor) => {
            const {index: dragIndex} = monitor.getItem() || {index: -1};
            if (dragIndex === index) {
                return {}      
            }
            return {
                isOver: monitor.isOver(),
                dropClassname: dragIndex < index ? "drop-over-downward" : "drop-over-upward",

            };
        },
        drop: (item: any) => {
            moveRow(item.index, index);
            item.index = index;

        }   
    }), 
    [index])
    };
*/}


export default function OrdemDia({rid, editable, currentPage}: { rid: number, editable: number, currentPage:number}) {
    
    const [ordemdia, setOrdemDia] = useState<OrdemDia[]>([]);
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
                
                <tbody className="bg-white">
                    {ordemdia?.map((ordemdia : OrdemDia) => (
                        
                        <tr
                        key={ordemdia.id}
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
                                {ordemdia.seq}
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
                    </tr>
                    

                    ))}
                </tbody>
               
            </table>
            </div>

        </div>
    )

}