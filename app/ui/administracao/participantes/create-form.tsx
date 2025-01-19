'use client'

import {
  UserIcon,
  UserCircleIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button'; 
import { createParticipante, ParticipanteState } from '@/app/lib/actions'; 
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { mylog } from '@/app/lib/mylogger';



export default function UserForm() {
  const initialState: ParticipanteState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createParticipante, initialState);
  const router = useRouter();

  mylog("DBG",'/app/ui/administracao/participantes/create-form', 'UserForm' , "Begin", "");

  return (
     <form action={formAction}>
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
                defaultValue=""
                placeholder="Nome"
                className="peer inline w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='name-error'
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.nome &&
              state.errors.nome.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))
            }
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button type="button" onClick={() => router.back()}>
          Voltar
        </button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
    
  );
}
