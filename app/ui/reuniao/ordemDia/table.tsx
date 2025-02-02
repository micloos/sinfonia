
import { fetchOrdemDia } from '@/app/lib/data';
import { mylog } from '@/app/lib/mylogger';
import type { OrdemDia } from '@/app/lib/definitions';
import { AddOrdemDiaToReuniao, DeleteOrdemDiaFromReuniao, EditOrdemDia } from '../buttons';


const filename = "app/ui/reuniao/participantes/table";

export default async function OrdemDia({rid, editable, currentPage}: { rid: number, editable: number, currentPage:number}) {
    mylog ("DBG",filename,"OrdemDia","{rid, editable, currentPage}=",{rid, editable,currentPage});
    const ordemdia = await fetchOrdemDia (rid, currentPage) as OrdemDia[];
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
                        <th scope="col" className="px-1 py-5 w-2/3 font-medium sm:pl-6">
                            Assunto
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