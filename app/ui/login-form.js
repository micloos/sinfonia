'use client';

import {
  UserIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { useForm } from 'react-hook-form';
import { loginAction } from "@/app/lib/loginAction";
import { useState } from 'react';
import { mylog } from '../lib/mylogger';
{/*
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
*/}


export default function LoginForm() {
  const {handleSubmit, register, formState: {errors}} = useForm();
  const [errorMessage,setErrorMessage] = useState(null);
  mylog ("DBG","/app/ui/login-form","LoginForm","errorMessage=",errorMessage);
  const onSubmit= async (data)=>{ 
      const res = await loginAction(data);
      setErrorMessage(res?.error);
      console.log("Response",res);
  } 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-1 h-1/2 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <div className="w-full">
          <fieldset >
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="Usuario"
            >
              Usuario
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                type="text"
                {...register("username",{required:true})}
              />
              {
                errors.username?.type=='required'  && <p className='text-yellow-600'> Usuario mandatorio </p>
              }
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </fieldset>
          <fieldset className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="senha"
            >
              Senha
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                type="password"
                {...register("password", {required:true})}
              />
              {
                    errors.password?.type=='required'  && <p className='text-yellow-600'> Senha mandatoria </p>
              }
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </fieldset>
        </div>
        <fieldset className="p-3">
            <button className='bg-red-100 px-5 py-1 rounded-lg' type="submit"> Entrar </button>
        </fieldset>
        {/*
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Entrar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        */}
        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
          
        </div>
      </div>
    </form>
  );
}
