import { UpdateUser, DeleteUser } from '@/app/ui/administracao/buttons';
import { fetchFilteredUsers } from '@/app/lib/data';
import { UserType } from '@/app/lib/definitions';

export default async function UsersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const users = await fetchFilteredUsers(query, currentPage) as UserType[];

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
                <th scope="col" className="px-3 py-5 font-medium">
                  CPF
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Login
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Nível
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users?.map((user : UserType) => (
                <tr
                  key={user.cpf}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{user.nome}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/*user.cpf*/}  ********
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
		    {user.username}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {user.nivel} 
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateUser cpf={user.cpf} />
                      <DeleteUser cpf={user.cpf} />
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
