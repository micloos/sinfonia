import CreateOrdemDiaForm from '@/app/ui/reuniao/addordemdia';
import { mylog } from '@/app/lib/mylogger';
import { fetchOrdemDiaById } from '@/app/lib/reuniao/data';
{/* import { notFound } from 'next/navigation'; */}

const filename="/app/sinfonia/reuniao/[id]/[irid]/addordemdia/page";

export default async function Page(props: {
  params?: Promise<{
    id:string;
    irid:string;
  }>
}
) {
  const params = await props.params;
  mylog("INFO",filename, 'Page' , "params =",params)
  const id = params?.id || '1';
  const nid = Number(id);
  const oid=params?.irid || '0';
 
  const od = await fetchOrdemDiaById(Number(oid))
  const assunto = (oid === '0')?'':od.assunto
  const deliberacao = (oid !== '0')&&(od.deliberacao)?od.deliberacao:''

   mylog("INFO",filename, 'Page' , "od", od);
  return (
	<main>
	  <CreateOrdemDiaForm reuniaoNumber={nid} ordemId={oid} tipo='delib' assunto={assunto} deliberacao={deliberacao} />
	</main>
  );
}