import { fetchFilteredPauta, fetchFilteredPendingAssuntos } from '@/app/lib/reuniao/data';
import { PautaRed, ValoresDeliberacao } from '@/app/lib/definitions';
// import AddPauta  from './addpauta';
import { AddAssuntoToReuniao, EditAssuntoFromReuniao, DeleteAssuntoFromReuniao, AddAssuntoToReuniaoFromAssunto, AddPendenteToReuniao,
            ExecPositivo, ExecNegativo, ExecMedio
 } from './buttons';
import { mylog } from '@/app/lib/mylogger';

const fileName = 'pautalist.tsx';



export default async function PautaList(
    {query, currentPage, reuniao, pendente, valores }: { query: string; currentPage: string; reuniao: number; pendente: number; valores: ValoresDeliberacao[] }) 
    {
    mylog("DBG",fileName,'PautaList','pendente = ', pendente);
    mylog("DBG",fileName,'PautaList','query=',query)
    const pautaItems =  pendente != 1 ? await fetchFilteredPauta(reuniao,query,Number(currentPage)) as PautaRed[] : await fetchFilteredPendingAssuntos(query,Number(currentPage)) as PautaRed[] ;
    // mylog("DBG",fileName,'PautaList','pautaItems=',pautaItems);
    // mylog("DBG",fileName,'PautaList','valores=',valores);
    const positivos = valores.filter(v => v.Ind_DeliberacaoValor === 'P').map(v => v.Cd_ClassificacaoDeliberacao);
    const negativos = valores.filter(v => v.Ind_DeliberacaoValor === 'N').map(v => v.Cd_ClassificacaoDeliberacao);
    

    mylog("DBG",fileName,'PautaList','positivos=',positivos);
    mylog("DBG",fileName,'PautaList','negativos=',negativos);
    
    return (
        <div className="rounded-md bg-gray-50 p-4 md:p-6" >
            <div className="flex justify-between">
                <div className={`w-7/8 mb-8 inline-block`}>
                <h1 className="text-2xl">
                    {pendente == 0  && ( "Pauta da Reuniao  ") }
                    { pendente == 1 && ("Assuntos pendentes para a Reuniao  ") }
                    { pendente == 2 && ("Execução da Reuniao  ") }
                    {reuniao}
                </h1>
                </div>
                {pendente == 0 && (
                    <div className="w-1/8 mb-8 inline-block">
                        <AddAssuntoToReuniao reuniao={reuniao} />
                    </div>
                )}
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
                                            <td className="flex justify-start py-3 pl-6 pr-3">
                                                { pendente == 0 && <EditAssuntoFromReuniao id={pauta.iid} reuniao={reuniao} /> }
                                                { pendente == 1 && <AddPendenteToReuniao id={pauta.iid} reuniao={reuniao} />}
                                                { pendente != 2 && <DeleteAssuntoFromReuniao id={pauta.iid} /> }
                                                { pendente == 0 && pauta.assuntoRetornavel && (
                                                    <AddAssuntoToReuniaoFromAssunto id="0" reuniao={reuniao} afrom={Number(pauta.iid)} />
                                                )}
                                                { pendente == 2 && <ExecPositivo id={pauta.iid} reuniao={reuniao} assunto={pauta.assuntoId} 
                                                    selected={positivos.includes(Number(pauta.deliberacao))}
                                                        
                                                        
                                                    toset={(valores.filter(v => (v.cd_AssuntoReuniao === Number(pauta.assuntoId))).filter(v => v.Ind_DeliberacaoValor === 'P'))[0].Cd_ClassificacaoDeliberacao
                                                        }
                                                    />}
                                                { pendente == 2 && <ExecMedio id={pauta.iid} reuniao={reuniao}  assunto={pauta.assuntoId}/> }
                                                { pendente == 2 && <ExecNegativo id={pauta.iid} reuniao={reuniao} assunto={pauta.assuntoId}
                                                    selected={negativos.includes(Number(pauta.deliberacao))}
                                                    toset={(valores.filter(v => (v.cd_AssuntoReuniao === Number(pauta.assuntoId))).filter(v => v.Ind_DeliberacaoValor === 'N'))[0].Cd_ClassificacaoDeliberacao
                                                }/> }
                                            </td>
                                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                                <div className="flex items-center gap-3">
                                                    {pauta.assuntoId}
                                                </div>
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
                                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                                <div className="flex items-center gap-3">
                                                    {pauta.area}
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