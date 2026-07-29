import CreateOrdemDiaForm from '@/app/ui/reuniao/addordemdia';
import { mylog } from '@/app/lib/mylogger';
{/* import { notFound } from 'next/navigation'; */}

const filename="/app/sinfonia/reuniao/[id]/[irid]/addordemdia/page";

export default async function Page(props: {
  params?: Promise<{
    id:string;
    oid:string;
  }>
}
) {
  const params = await props.params;
  const id = params?.id || '1';
  const nid = Number(id);
  const oid=params?.oid || '0';
  mylog("INFO",filename, 'Page' , "{id,oid}=", {id,oid});
  return (
	<main>
	  <CreateOrdemDiaForm reuniaoNumber={nid} ordemId={oid}/>
	</main>
  );
}