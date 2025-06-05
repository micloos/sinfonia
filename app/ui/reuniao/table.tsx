import { UpdateReuniao, DeleteReuniao, EscParticipantes, EscOrdemDoDia, ReativarReuniao, ComporPauta   } from '@/app/ui/reuniao/buttons';
import { fetchFilteredReunioes } from '@/app/lib/reuniao/data';
import { Reunioes } from '@/app/lib/definitions';
import * as moment from 'moment-timezone';

const tz ="UTC";

export default async function ReunioesTable({
  query,
  currentPage,
  activer,
}: {
  query: string;
  currentPage: number;
  activer: string;
}) {
  const reunioes = await fetchFilteredReunioes(query, currentPage, activer ) as Reunioes[];
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr><th scope="col" className="px-1 py-5 font-medium sm:pl-6">
                 Acoes
                </th>
                <th scope="col" className="px-1 py-5 font-medium sm:pl-6">
                 N
                </th>
                <th scope="col" className="px-1 py-5 font-medium">
                  Data Inicio
                </th>
                <th scope="col" className="px-1 py-5 font-medium">
                  Data Fim
                </th>
                <th scope="col" className="px-1 py-5 font-medium">
                  Prédio
                </th>
                <th scope="col" className="px-1 py-5 font-medium">
                  Sala
                </th>
                <th scope="col" className="px-1 py-5 font-medium">
                  Data Limite
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {reunioes?.map((reuniao : Reunioes) => (
                <tr
                  key={reuniao.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-start ">
                      <DeleteReuniao id={reuniao.id.toString()} /> 
                      <UpdateReuniao id={reuniao.id.toString()}  active={reuniao.active} />
                      <EscParticipantes id={reuniao.id.toString()} active={reuniao.active} />
                      <EscOrdemDoDia id={reuniao.id.toString()}  active={reuniao.active} />
                      <ComporPauta id={reuniao.id.toString()}  active={reuniao.active} />
                      <ReativarReuniao id={reuniao.id.toString()}  active={reuniao.active} />
                    </div>
                    
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                       {reuniao.id}
                    </div>
                  </td>
                  <td className="py-3 pr-0">
                    <div className="flex justify-start gap-3">
                      {moment.tz(reuniao.d_ini,tz).format('DD/MM/YY HH:mm')}
                    </div>
                  </td>
                  <td className="px-0 py-3">
                    {/*moment(reuniao.d_end).format('DD/MM/YY HH:mm')*/}
                    {reuniao.d_end? moment.default(reuniao.d_end).format('DD/MM/YY'):'Sem'}
                  </td>
                  <td className="py-3">
		                {reuniao.predio}
                  </td>
                  <td className="whitespace-nowrap py-3">
                    {reuniao.sala} 
                  </td>
                  <td className="py-3">
                    {moment.tz(reuniao.d_lim,tz).format('DD/MM/YY')} 
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
