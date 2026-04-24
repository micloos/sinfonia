import { fetchFilteredAssuntos } from '@/app/lib/data';
import { AssuntosListType } from '@/app/lib/definitions';
import { UpdateAssunto, DeleteAssunto } from '@/app/ui/administracao/buttons';

export default async function AssuntosTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
    const assuntos = await fetchFilteredAssuntos(query, currentPage) as AssuntosListType[];
  
  
    return (
      <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Ações
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Num. Assunto
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Assunto
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Assunto Deliberação
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
            {assuntos?.map((assunto: AssuntosListType) => (
              <tr
                key={assunto.id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                    {/* Add your action buttons here */}
                    
                    <UpdateAssunto id={assunto.id} />
                    <DeleteAssunto id={assunto.id} />
                      
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {assunto.id}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {assunto.assunto}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {assunto.assuntoDeliberacao}
                </td>
              </tr>
            ))}
            </tbody>
            </table>
            </div>
          </div>
          </div>
    )
    }