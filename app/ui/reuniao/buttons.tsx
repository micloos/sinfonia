import { PencilIcon,  PlusIcon, TrashIcon, UserGroupIcon, CalendarIcon, BoltSlashIcon, BoltIcon, DocumentDuplicateIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteReuniao, editReuniao, escOrdemDoDia, ordemDoDia, reativarReuniao, comporPauta, escParticipante, deleteOrdemDia } from '@/app/lib/reuniao/actions';
import { escParticipantReuniao, deleteParticipantFromReuniao,  escParticipantForReuniao } from '@/app/lib/participantes/actions';

import { participantes } from '@/app/lib/participantes/navigations'; 
import Tooltip from '@mui/material/Tooltip';
import { mylog } from '@/app/lib/mylogger';

const filename = "/app/ui/reuniao/buttons";

export function CreateReuniao() {
  return (
    <Link
      href="/sinfonia/reuniao/criar"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Criar Reunião</span>{' '}
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

export function UpdateReuniao({ id, active }: { id: string, active: string }) {
  mylog("DBG",filename, 'UpdateReuniao' , "active=", active);
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

export function Participantes({ id, active}: { id: string, active: string }) {
	const participantesWithId = participantes.bind(null, id);
  mylog("DBG",filename, 'Participantes' , "active=", active);
  return (
    <form action={participantesWithId}>
      <Tooltip title="Participantes">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Participantes</span>
        <UserGroupIcon className="w-5" />
      </button>
      </Tooltip>
    </form>
  );
}

export function EscParticipant({ id, active}: { id: string, active: string }) {
  mylog("DBG",filename, 'UpdateReuniao' , "active=", active);
  const editReuniaoWithId = escParticipante.bind(null, id);
  return (
    <form action={editReuniaoWithId} >
    <Tooltip title="Participantes">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Editar</span>  
      <UserGroupIcon className="w-5" />
      </button>             
    </Tooltip>
    </form>
  );
}

export function EscParticipantes({ id, active}: { id: string, active: string }) {
  const escParticipantReuniaoWithId = escParticipantReuniao.bind(null, Number(id));
  mylog("DBG",filename, 'EscParticipantes' , "active=", active);
  return (
    <form action={escParticipantReuniaoWithId}>
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
  mylog("DBG",filename, 'EscOrdemDoDia' , "active=", active);
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

  if (active === 'S') {
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
  mylog("DBG",filename, 'ComporPauta' , "active=", active);
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

export function AddOrdemDiaToReuniao({ rid, editable }: { rid: number, editable: number }) {
  const OrdemDoDiaWithId = ordemDoDia.bind(null, rid);
  mylog("DBG",filename, 'AddOrdemDiaToReuniao' , "rid=", rid);
  if (editable==1){
  return (
    <form action={OrdemDoDiaWithId}>
      <Tooltip title="OrdemDia">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Ordem do Dia</span>
        <PlusIcon className="w-5" />
      </button>
      </Tooltip>
    </form>
  );
} else {
  return (<p></p>);
}
}

export function AddParticipanteToReuniao({ rid, editable }: { rid: number, editable: number }) {
  const escParticipanteForReuniaoWithId = escParticipantForReuniao.bind(null, rid);
  mylog("DBG",filename, 'AddParticipanteToReuniao' , "rid=", rid);
  if (editable==1){
  return (
    <form action={escParticipanteForReuniaoWithId}>
      <Tooltip title="Participantes">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Participantes</span>
        <PlusIcon className="w-5" />
      </button>
      </Tooltip>
    </form>
  );
} else {
  return (<p></p>);
}
}

export function DeleteParticipantFromReuniao({id, editable, rid}: {id: number, editable: number, rid:number}) {
  const deleteParticipantFromReuniaoWithId = deleteParticipantFromReuniao.bind(null,id,rid);
  mylog("DBG",filename, 'DeleteParticipantFromReuniao' , "id=", {id,rid});
  if (editable==1) {
    return(
      <form action={deleteParticipantFromReuniaoWithId}>
      <Tooltip title="Excluir">

      <button className="rounded-md border p-2 hover:bg-gray-100" >
        <span className="sr-only">OrdemDoDia</span>
        <TrashIcon className="w-5" />
      </button>
      </Tooltip>
      </form>
    )
  } else {
    return (<p/>)
  }
}

export function DeleteOrdemDiaFromReuniao({id, editable, rid}: {id: number, editable: number, rid:number}) {
  mylog("DBG",filename, 'DeleteOrdemDiaFromReuniao' , "{id,editable,rid}=", {id,editable,rid});
  const deleteOrdemDiaFromReuniaoWithId = deleteOrdemDia.bind(null,id,rid);

  if (editable==1) {
    return(
      <form action={deleteOrdemDiaFromReuniaoWithId}>
      <Tooltip title="Excluir">

      <button className="rounded-md border p-2 hover:bg-gray-100" >
        <span className="sr-only">OrdemDoDia</span>
        <TrashIcon className="w-5" />
      </button>
      </Tooltip>
      </form>
    )
  } else {
    return (<p/>)
  }
}

export function EditOrdemDia({id, editable, rid}: {id: number, editable: number, rid:number}) {
  const deleteParticipantFromReuniaoWithId = deleteParticipantFromReuniao.bind(null,id,rid);
  mylog("DBG",filename, 'EditOrdemDia' , "{id,editable,rid}=", {id,editable,rid});
  if (editable==1) {
    return(
      <form action={deleteParticipantFromReuniaoWithId}>
      <Tooltip title="Editar">

      <button className="rounded-md border p-2 hover:bg-gray-100" >
        <span className="sr-only">OrdemDoDia</span>
        <PencilIcon className="w-5" />
      </button>
      </Tooltip>
      </form>
    )
  } else {
    return (<p/>)
  }
}


export function DeleteParticipante ({id,active}: {id:number, active:string})
{
  mylog("DBG",filename, 'DeleteParticipante' , "{id, active}=", {id, active});
  return (
      <Tooltip title="Excluir">
      <button className="rounded-md border p-2 hover:bg-gray-100" >
        <span className="sr-only">OrdemDoDia</span>
        <XCircleIcon className="w-5" />
      </button>
      </Tooltip>    
    
  )
}
