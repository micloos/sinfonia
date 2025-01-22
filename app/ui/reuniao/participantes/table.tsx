import { fetchParticipantesByReuniao } from '@/app/lib/data';
import { mylog } from '@/app/lib/mylogger';
import { Participantes } from '@/app/lib/definitions';


const filename = "app/ui/reuniao/participantes/table";

export default async function ParticipantesByReuniao({rid}: { rid: number}) {

    const participantes = await fetchParticipantesByReuniao (rid) as Participantes[];
    mylog ("DBG",filename,"ParticipantesByReuniao","participantes =",participantes);
    return (
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
            <div className={`w-full mb-8 inline-block`}>
                Participantes
            </div>
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
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
                            <div className="flex items-center gap-3">
                                {participante.name}
                            </div>
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                                {participante.title}
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