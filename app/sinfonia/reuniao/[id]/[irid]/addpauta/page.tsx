import AddPauta from '@/app/ui/reuniao/addpauta';
import { mylog } from '@/app/lib/mylogger';
import ReuniaoForm from '@/app/ui/reuniao/edit-form';
import { fetchReuniaoById } from '@/app/lib/reuniao/data2';
import { fetchAssuntos, fetchTipoAtribuidorCredito } from '@/app/lib/reuniao/data';
import { Assuntos } from '@/app/lib/definitions';
import { fetchIndices, fetchItemObject } from "@/app/lib/reuniao/data";
import { ItemReuniaoResponse } from '@/app/lib/reuniao/definitions';
{/* import { notFound } from 'next/navigation'; */}

const filename="/app/sinfonia/reuniao/[id]/[irid]/addpauta/page";

export default async function Page(props: {
  searchParams?: Promise<{ 
    afrom?: string;
    pendente?:number; 
  }>,
  params?: Promise<{
    id:string;
    irid:string;
  }>
}
) {
  const params = await props.params;
  const sparams = await props.searchParams;
  mylog("DBG",filename, 'Page' , "params=", params);
  mylog("DBG",filename, 'Page' , "sparams=", sparams);
  const id = params?.id || '1';
  const irid = Number(params?.irid) || 0;
  const nid = Number(id);
  const safrom = sparams?.afrom || '';
  const afrom = Number(safrom) || 0;
  const pendente = sparams?.pendente || 0
  const [reuniao] = await Promise.all([
      fetchReuniaoById(id),
    ]);
  // mylog("DBG",filename, 'Page' , "id=", nid);
  mylog("DBG",filename, 'Page' , "irid=", irid);
  mylog("DBG",filename, 'Page' , "afrom=", afrom);
  mylog("DBG",filename, 'Page' , "pendente=", pendente);
  const assuntos = await fetchAssuntos() as Assuntos[];
  const indices = await fetchIndices();
  const tipoAtrrCreditos = await fetchTipoAtribuidorCredito();
  const itemReuniaoObject = irid > 0 ? await fetchItemObject(irid) as ItemReuniaoResponse : await fetchItemObject(afrom) as ItemReuniaoResponse;
  if (afrom > 0) {
    itemReuniaoObject.Cd_AssuntoReuniao = assuntos.filter(retorno => (retorno.id===Number(itemReuniaoObject.Cd_AssuntoReuniao)))[0].Cd_AssuntoReuniaoRetornavel;
    itemReuniaoObject.cd_ReuniaoOrigem = itemReuniaoObject.cd_Reuniao;
  }
  // mylog("DBG",filename, 'Page' , "assuntos=", assuntos);
  // mylog("DBG",filename, 'Page' , "indices=", indices);
  // mylog("DBG",filename, 'Page' , "itemReuniao=", itemReuniaoObject);
  // mylog("DBG",filename, 'Page' , "assuntos[10]=", assuntos[10]);
  // mylog("DBG",filename, 'Page' , "indices[10]=", indices[10]);
  console.log(filename, 'Page', 'itemReuniaoObject=', itemReuniaoObject);
  return (
	<main>
    <ReuniaoForm reuniao={reuniao} withsavebutton={0} withbackbutton={1}/>
	  <AddPauta reuniao={nid} assuntos={assuntos} indices={indices} tiposAttrCreditos={tipoAtrrCreditos} itemReuniao={irid} itemReuniaoObject={itemReuniaoObject} />
	</main>
  );
}