import { fetchFilteredPauta } from '@/app/lib/reuniao/data';
import { PautaRed } from '@/app/lib/definitions';
// import AddPauta  from './addpauta';
import { AddAssuntoToReuniao } from './buttons';

export default async function PautaList({ reuniao }: { reuniao: number }) {
    const pautaItems = await fetchFilteredPauta(reuniao,'',1) as PautaRed[];
    return (
        <div className="rounded-md bg-gray-50 p-4 md:p-6" >
            <div className="flex justify-between">
                <div className={`w-7/8 mb-8 inline-block`}>
                    Pauta da Reuniao {reuniao}
                </div>
                <div className="w-1/8 mb-8 inline-block">
                                <AddAssuntoToReuniao reuniao={reuniao} />
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
                                Cod.
                            </th>
                            <th scope="col" className="px-1 py-5 font-medium sm:pl-6">
                                Assunto
                            </th>
                            <th scope="col" className="px-1 py-5 font-medium sm:pl-6">
                                Interessado
                            </th>
                            <th scope="col" className="px-1 py-5 font-medium sm:pl-6">
                                Area
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                                        {pautaItems?.map((pauta : PautaRed) => (
                                            <tr
                                            key={pauta.iid}
                                            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                          >
                                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                                {/* <EditAssuntoFromReuniao id={pauta.iid} /> */}
                                                {/* <DeleteAssuntoFromReuniao id={pauta.iid} /> */}
                                            </td>
                                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                                <div className="flex items-center gap-3">
                                                    {pauta.assunto}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                                <div className="flex items-center gap-3">
                                                    {pauta.interessado}
                                                </div>
                                            </td>
                                        </tr>
                    
                                        ))}
                    </tbody>
                </table>
            </div>
        </div>  
    );
}