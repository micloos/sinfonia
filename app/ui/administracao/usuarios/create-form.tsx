'use client'

import { Niveis } from '@/app/lib/definitions';
import {
  UserIcon,
  UserCircleIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link'; 
import { Button } from '@/app/ui/button'; 
import { createUser, UserState } from '@/app/lib/usuarios/actions'; 
import { useActionState } from 'react';
import { mylog } from '@/app/lib/mylogger';



export default function UserForm({ niveis }: { niveis: Niveis[] }) {
  const initialState: UserState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createUser, initialState);

  mylog("DBG",'/app/ui/administracao/create-form', 'UserForm' , "niveis=", niveis);

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
        <div className="mb-2 inline-block w-1/3">
          <label htmlFor="username" className="mb-2 block text-sm font-medium">
            login
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="username"
                name="username"
                type="string"
                defaultValue=""
                placeholder="login"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        
        <div className="mb-4 inline-block w-2/3">
          <label htmlFor="cpf" className="mb-2 block text-sm font-medium">
            CPF (Somente Números)
          </label>
          <div className="relative mt-2 rounded-md w-70">
            <div className="relative">
              <input
                id="cpf"
                name="cpf"
                type="number"
                placeholder="CPF"
                className="peer inline w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                
              />
              <ExclamationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        
        <div className="mb-2 inline-block w-1/3">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Senha
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="senha"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
         </div>
         <div className="mb-2 inline-block w-1/3">
          <select id="nivel" name="nivel" className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'  >
            <option value="" disabled> Escolher nivel</option>           
            {niveis.map((nivel) => (
              <option key={nivel.idniv} value={nivel.idniv}>
                {nivel.niv}
              </option>
            ))}
             
          </select>
         </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/sinfonia/administracao/usuarios"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Voltar
        </Link>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
    
  );
}
