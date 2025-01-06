import { UpdateParticipantesList, DeleteParticipantesList } from '@/app/ui/administracao/buttons';
import { fetchFilteredParticipantesList } from '@/app/lib/data';
import { ParticipanteList } from '@/app/lib/definitions';

export default async function ParticipantesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const participantes = await fetchFilteredParticipantesList(query, currentPage) as ParticipanteList[];

  console.log(participantes);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Usuário
                </th>                
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {participantes?.map((user : ParticipanteList) => (
                <tr
                  key={user.name}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{user.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateParticipantesList id={user.id} /> 
                      <DeleteParticipantesList id={user.id} />
                    </div>
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
