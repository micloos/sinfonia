import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteUser } from '@/app/lib/usuarios/actions';
import { deleteFromParticipantesList } from '@/app/lib/participantes/actions';
import { mylog } from '@/app/lib/mylogger';
import { addParticipanteToReuniao } from '@/app/lib/reuniao/actions';

export function CreateUser() {
  return (
    <Link
      href="/sinfonia/administracao/usuarios/criar"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Criar Usuário</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateUser({ cpf }: { cpf: string }) {
  return (
    <Link
      href={`/sinfonia/administracao/usuarios/${cpf}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteUser({ cpf }: { cpf: string }) {
	const deleteUserWithId = deleteUser.bind(null, cpf);
  return (
    <form action={deleteUserWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Apagar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function DeleteParticipante({ id }: { id: number }) {
	const deleteParticipantesListWithId = deleteFromParticipantesList.bind(null, id);
  return (
    <form action={deleteParticipantesListWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Apagar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function UpdateParticipante({ id }: { id: number }) {
  return (
    <Link
      href={`/sinfonia/administracao/participantes/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function CreateParticipante() {
  return (
    <Link
      href="/sinfonia/administracao/participantes/criar"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Criar Participante</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function AddParticipante({ id, rid }: { id: number, rid: number }) {
  mylog("DBG",'/app/ui/administracao/button', 'AddParticipante' , "{id, rid}=", {id, rid});
  const addParticipanteWithReuniao = addParticipanteToReuniao.bind(null,id,rid);
  return (
    <form action={addParticipanteWithReuniao}>
    <button className="rounded-md border p-2 hover:bg-gray-100" aria-label='Adicionar Participante'>
        <span className="sr-only">Adicionar a Reuniao</span>
        <PlusIcon className="w-5" />
    </button>
    </form>
  )
}
