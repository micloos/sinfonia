'use client';

import { ParticipanteType } from '@/app/lib/definitions';
import {
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateParticipante } from '@/app/lib/participantes/actions';
import { mylog } from '@/app/lib/mylogger';
import { useRouter } from 'next/navigation';


export default function EditParticipanteForm({
  user,
}: {
  user: ParticipanteType;
}) {
  mylog("DBG",'/app/ui/administracao/participantes/edit-form', 'EditParticipanteForm' , "user=", user);
  const router= useRouter();
  const updateParticipanteWithId = updateParticipante.bind(null, user.id.toString());
  return (
    <form action={updateParticipanteWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4 inline-block w-2/3">
         
          <label htmlFor="nome" className="mb-2 block text-sm font-medium">
            Nome
          </label>
          <div className="relative mt-2 rounded-md w-70">
            <div className="relative">
              <input
                id="nome"
                name="nome"
                type="string"
                defaultValue={user.name}
                placeholder="Nome"
                className="peer inline w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              <input id="id" name="id" type="hidden" value={user.id} />
            </div>
          </div>
        </div>
      </div>  
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/sinfonia/administracao/usuarios"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
        <button type="button" onClick={() => router.back()}>
            Voltar
        </button>
        </Link>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
    
  );
}
