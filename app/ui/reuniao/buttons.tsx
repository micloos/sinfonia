import { PencilIcon,  PlusIcon, TrashIcon, UserGroupIcon, CalendarIcon, BoltSlashIcon, BoltIcon, DocumentDuplicateIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteReuniao, editReuniao, escParticipant, escOrdemDoDia, reativarReuniao, comporPauta } from '@/app/lib/actions';
import Tooltip from '@mui/material/Tooltip';

export function CreateReuniao() {
  return (
    <Link
      href="/sinfonia/reuniao/criar"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Criar Reuniao</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DeleteReuniao({ id }: { id: string }) {
	const deleteReuniaoWithId = deleteReuniao.bind(null, id);
  return (
    <form action={deleteReuniaoWithId}>
      <Tooltip title="Excluir">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Apagar</span>       
            <TrashIcon className="w-5"  />      
      </button>
      </Tooltip>
    </form>
  );
}

export function EscParticipant({ id, active}: { id: string, active: string }) {
	const escParticipantWithId = escParticipant.bind(null, id);
  console.log('PArticipante active',active)
  return (
    <form action={escParticipantWithId}>
      <Tooltip title="Participantes">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Participantes</span>
        <UserGroupIcon className="w-5" />
      </button>
      </Tooltip>
    </form>
  );
}

export function EscOrdemDoDia({ id, active }: { id: string, active: string }) {
	const escOrdemDoDiaWithId = escOrdemDoDia.bind(null, id);
  console.log("EscOrdemDoDia", active);
  return (
    <form action={escOrdemDoDiaWithId}>
      <Tooltip title="Ordem do Dia">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">OrdemDoDia</span>
        <CalendarIcon className="w-5" />
      </button>
      </Tooltip>
    </form>
  );
}

export function ReativarReuniao({ id, active }: { id: string, active: string }) {
	const reativarReuniaoWithId = reativarReuniao.bind(null, id);

  if (active === 'N') {
  return (
    <form action={reativarReuniaoWithId}>
      <Tooltip title="Reativar">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">ReativarReuniao</span>
        <BoltSlashIcon className="w-5" />
      </button>
      </Tooltip>
    </form>
  )
} else {
  return (
    <Tooltip title="Ativo">
    <button className="rounded-md border p-2 hover:bg-gray-100">
    <span className="sr-only">ReativarReuniao</span>
    <BoltIcon className="w-5" />
    </button> 
    </Tooltip>
  )
};
}

export function ComporPauta({id,active}: {id: string, active: string }) {
  console.log("ComporPauta", active);
  const comporPautaWithId = comporPauta.bind(null, id);
  return (
    <form action={comporPautaWithId}>
      <Tooltip title="Pauta">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">OrdemDoDia</span>
        <DocumentDuplicateIcon className="w-5" />
      </button>
      </Tooltip>
    </form>
  );
}

export function UpdateReuniao({ id, active }: { id: string, active: string }) {
  console.log("UpdateReuniao", active);
  const editReuniaoWithId = editReuniao.bind(null, id);
  return (
    <form action={editReuniaoWithId} >
    <Tooltip title="Editar">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Editar</span>  
      <PencilIcon className="w-5" />
      </button>             
    </Tooltip>
    </form>
  );
}


export function DeleteParticipante ({id,active}: {id:number, active:string})
{
  console.log("DeleteParticipante", id, active);
  return (
      <Tooltip title="Excluir">
      <button className="rounded-md border p-2 hover:bg-gray-100" >
        <span className="sr-only">OrdemDoDia</span>
        <XCircleIcon className="w-5" />
      </button>
      </Tooltip>    
    
  )
}