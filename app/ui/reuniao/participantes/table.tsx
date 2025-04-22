
import { fetchParticipantesByReuniao } from '@/app/lib/data';
import { mylog } from '@/app/lib/mylogger';
import { Participantes } from '@/app/lib/definitions';
import { AddParticipanteToReuniao, DeleteParticipantFromReuniao } from '../buttons';
import { Funcoes } from '../funcao';


const filename = "app/ui/reuniao/participantes/table";

export default async function ParticipantesByReuniao({rid, editable, currentPage}: { rid: number, editable: number, currentPage:number}) {
    mylog ("DBG",filename,"ParticiPantesByReuniao","{rid, editable, currentPage}=",{rid, editable,currentPage});
    const participantes = await fetchParticipantesByReuniao (rid, currentPage) as Participantes[];
    mylog ("DBG",filename,"ParticipantesByReuniao","participantes =",participantes);
    const testname = "ParticipantesByReuniao"+editable;
    mylog ("DBG",filename,"ParticipantesByReuniao","testname =",testname);
    return (
        <div className="rounded-md bg-gray-50 p-4 md:p-6" data-testid={testname}>
            <div className="flex justify-between">
            <div className={`w-7/8 mb-8 inline-block`}>
                Participantes
            </div>
            <div className="w-1/8 mb-8 inline-block">
                <AddParticipanteToReuniao rid={rid} editable={editable}/>
            </div>
            </div>
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                    <th scope="col" className="px-1 py-5 font-medium sm:pl-6">
                            Ações
                        </th>
                        <th scope="col" className="px-1 py-5 font-medium sm:pl-6">
                            Nome
                        </th>
                        <th scope="col" className="px-1 py-5 font-medium sm:pl-6">
                            Posição
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {participantes?.map((participante : Participantes) => (
                        <tr
                        key={participante.id}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                      >
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <DeleteParticipantFromReuniao id={participante.id} editable={editable} rid={rid}/>
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                                {participante.name}
                            </div>
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                                <Funcoes id={participante.id} funcao={participante.title} editable={editable}/>
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