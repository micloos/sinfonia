"use client"
import { ClipboardDocumentListIcon, PencilIcon,  PlusIcon, TrashIcon, UserGroupIcon, CalendarIcon, BoltSlashIcon, PlayIcon,
          BoltIcon, DocumentDuplicateIcon, XCircleIcon, 
          CheckIcon,
          
          XMarkIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteReuniao, editReuniao, escOrdemDoDia, addOrdemDia, editOrdemDia, reativarReuniao, 
          comporPauta, escParticipante, deleteOrdemDia, addPendentes, executarReuniao, executarItemReuniao,
          fecharReuniao
      } from '@/app/lib/reuniao/actions';
import { escParticipantReuniao, deleteParticipantFromReuniao,  escParticipantForReuniao } from '@/app/lib/participantes/actions';
// import { editAssuntoFromReuniao, deleteAssuntoFromReuniao } from '@/app/lib/reuniao/actions';
import { deleteAssuntoFromReuniao } from '@/app/lib/reuniao/actions';
import { participantes } from '@/app/lib/participantes/navigations'; 
import Tooltip from '@mui/material/Tooltip';
import { mylog } from '@/app/lib/mylogger';
import { Button } from '../button';
import { useState } from 'react';



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


export function FecharReuniao({reuniao}:{reuniao: string}) {

  mylog("INFO",filename,"FecharReuniao","reuniao",reuniao)

  const [errorMsg,setErrorMsg] = useState<string | null>(null);

  // const fecharReuniaoWithId = fecharReuniao.bind(null, reuniao);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg(null);


    const result = await fecharReuniao(reuniao);

    if (!result.success) {
      // Trigger the local state popup modal
      setErrorMsg(result.error || 'Something went wrong.');
      mylog("INFO",filename,'fecharReuniao',"errorMsg = ",errorMsg)
    } else {
      alert('Profile updated successfully!');
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <Tooltip title="Fechar Reuniao">
        <Button type='submit' >
          <span> Fechar Reuniao </span>
        </Button>
      </Tooltip>
    </form>
    {errorMsg && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-xs shadow-xl text-center">
            <h3 className="text-red-600 font-bold mb-2">Não foi possivel fechar</h3>
            <p className="text-gray-700 text-sm mb-4">{errorMsg}</p>
            <button onClick={() => setErrorMsg(null)} className="bg-gray-800 text-white px-4 py-1.5 rounded text-sm">
              OK
            </button>
          </div>
        </div>)} 
    </div>
    
    
  )
}

export function DeleteAssuntoFromReuniao({ id }: { id: string }) {
  const deleteAssuntoFromReuniaoWithId = deleteAssuntoFromReuniao.bind(null, id);
  return (
    <form action={deleteAssuntoFromReuniaoWithId}>
      <Tooltip title="Excluir">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Apagar</span>       
            <TrashIcon className="w-5"  />      
      </button>
      </Tooltip>
    </form>

  );
}

export function AddAssunto({ reuniao }: { reuniao: number }) {
  return (
    <Link
      href={`/sinfonia/reuniao/${reuniao}/0/addpauta`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Criar Assunto</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function AddAssuntoToReuniaoFromAssunto({ id, afrom, reuniao }: { id: string, afrom: number, reuniao: number }) {
  return (
    <Tooltip title="Criar Volta">
    <Link
      href={`/sinfonia/reuniao/${reuniao}/${id}/addpauta?afrom=${afrom}`}
      className="rounded-md border p-2 hover:bg-gray-100">
      
      <span className="sr-only">Criar Assunto</span>
      <PlusIcon className="w-5" />
    </Link>
    </Tooltip>
  );
}


export function EditAssuntoFromReuniao({ id, reuniao }: { id: string, reuniao: number }) {
  
  mylog("DBG",filename, 'EditAssuntoFromReuniao' , "id=", id);
  return (
    
      <Tooltip title="Editar">
      <Link href={`/sinfonia/reuniao/${reuniao}/${id}/addpauta`} className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Editar</span>
        <PencilIcon className="w-5" />
      </Link>
      </Tooltip>
    
  );
}

export function AddPendenteToReuniao ({ id, reuniao }: { id: string, reuniao: number }) {
  
  mylog("DBG",filename, 'EditAssuntoFromReuniao' , "id=", id);
  return (
    
      <Tooltip title="Adicionar">
      <Link href={`/sinfonia/reuniao/${reuniao}/${id}/addpauta`} className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Adicionar</span>
        <PlusIcon className="w-5" />
      </Link>
      </Tooltip>
    
  );
}



export function AddAssuntosPendente ({reuniao}:{ reuniao: number}) {
  mylog("DBG", filename, "AddAssuntoPendente", "reuniao = ", reuniao)
  const addPendentesWithId = addPendentes.bind(null,reuniao);
  return (
    <form action={addPendentesWithId}>
      <Tooltip title="Assuntos Pendentes">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Pendentes</span>       
            <ClipboardDocumentListIcon className="w-5"  />      
      </button>
      
      </Tooltip>
    </form>
    

  )
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

export function ExecutarReuniao({ id, active }: { id: string, active: string }) {
  mylog("DBG",filename, 'UpdateReuniao' , "active=", active);
  const executarReuniaoWithId = executarReuniao.bind(null, id);
  return (
    <form action={executarReuniaoWithId} >
    <Tooltip title="Executar">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Executar</span>  
      <PlayIcon className="w-5" />
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
        <span className="sr-only">Pauta</span>
        <DocumentDuplicateIcon className="w-5" />
      </button>
      </Tooltip>
    </form>
  );
}


{/*
export function ImprimirPauta ({id}: {id : string}) {
  const imprimirPautaWithId = imprimirCoisas.bind(null,id,"pauta");
  return (
    <form action={imprimirPautaWithId}>
      <Tooltip title="Imprimir Pauta">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Imprimir Pauta</span>
        <PrinterIcon className="w-5" />
      </button>
      </Tooltip>
    </form>
  )
}

export function ImprimirAta ({id}: {id : string}) {
  const imprimirAtaWithId = imprimirCoisas.bind(null,id,"ata");
  return (
    <form action={imprimirAtaWithId}>
      <Tooltip title="Imprimir Ata">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Imprimir Ata</span>
        <PrinterIcon className="w-5 text-red-500" />
      </button>
      </Tooltip>
    </form>
  )
}

export function ImprimirDeliberacao ({id}: {id : string}) {
  const imprimirDeliberacaoWithId = imprimirCoisas.bind(null,id,"deliberacao");
  return (
    <form action={imprimirDeliberacaoWithId}>
      <Tooltip title="Imprimir Deliberacao">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Imprimir Deliberacao</span>
        <PrinterIcon className="w-5 text-green-600" />
      </button>
      </Tooltip>
    </form>
  )
}
*/}

export function AddAssuntoToReuniao({ reuniao }: { reuniao: number }) {
  // const addAssuntoToReuniaoWithId = addOrdemDia.bind(null, reuniao);
  mylog("DBG",filename, 'AddAssuntoToReuniao' , "reuniao=", reuniao);
  return (
    <form >
    </form>
  );
}


export function ExecPositivo({ id, reuniao, assunto, selected, toset }: { id: string, reuniao: number, assunto: string, selected: boolean, toset: number }) {
  const execPositivoWithId = executarItemReuniao.bind(null, reuniao, id, assunto, "positivo", toset);
  mylog("DBG",filename, 'ExecPositivo' , "id,reuniao,assunto,selected,toset", {id, reuniao, assunto, selected, toset});
  const classname = selected ? "rounded-md border p-2 hover:bg-gray-100 bg-yellow-300" : "rounded-md border p-2 hover:bg-gray-100";
  return (
    <form action={execPositivoWithId}>
      <Tooltip title="Executar Positivo">
      <button className={classname}>
        <span className="sr-only">Executar Positivo</span>
        <CheckIcon  className="w-5 text-green-600" />
      </button>
      </Tooltip>
    </form>
  );
}

export function ExecMedio({ id, reuniao, assunto }: { id: string, reuniao: number, assunto: string }) {
  mylog("DBG",filename, 'ExecMedio' , "id=", id);
  mylog("DBG",filename,"ExecMedio","assunto = ", assunto)
  return (
      <Tooltip title="Editar">
      <Link href={`/sinfonia/reuniao/${reuniao}/${id}/execpauta`} className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Editar</span>
        <PencilIcon className="w-5" />
      </Link>
      </Tooltip>
  );
}

export function ExecNegativo({ id, reuniao, assunto, selected, toset}: { id: string, reuniao: number, assunto: string , selected?: boolean, toset: number }) {
  const execNegativoWithId = executarItemReuniao.bind(null, reuniao, id, assunto, "negativo", toset);
  mylog("DBG",filename, 'ExecNegativo' , "id,reuniao,assunto,selected,toset", {id, reuniao, assunto, selected, toset});
  const classname = selected ? "rounded-md border p-2 hover:bg-gray-100 bg-yellow-300" : "rounded-md border p-2 hover:bg-gray-100";
  return (
    <form action={execNegativoWithId}>
      <Tooltip title="Executar Negativo">
      <button className={classname}>
        <span className="sr-only">Executar Negativo</span>
        <XMarkIcon className="w-5 text-red-600" />
      </button>
      </Tooltip>
    </form>
  );
}


// Participantes da Reuniao

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

// Ordem do Dia da Reuniao

export function AddOrdemDiaToReuniao({ rid, editable, oid }: { rid: number, editable: number, oid: string }) {
  const OrdemDoDiaWithId = addOrdemDia.bind(null, rid, oid);
  mylog("DBG",filename, 'AddOrdemDiaToReuniao' , "rid,oid=", {rid,oid});
  if (editable==1){
  return (
    <form action={OrdemDoDiaWithId}>
      <Tooltip title="Ordem do Dia">
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
  const editOrdemDiaWithId = editOrdemDia.bind(null,rid,String(id));
  mylog("INFO",filename, 'EditOrdemDia' , "{id,editable,rid}=", {id,editable,rid});
  if (editable==1) {
    return(
      <form action={editOrdemDiaWithId}>
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
