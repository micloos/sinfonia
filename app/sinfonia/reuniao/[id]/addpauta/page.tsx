import CreatePautaForm from '@/app/ui/reuniao/addpauta';
import { mylog } from '@/app/lib/mylogger';
{/* import { notFound } from 'next/navigation'; */}

const filename="/app/sinfonia/reuniao/[id]/addpauta/page";

export default async function Page(props: {
  params?: Promise<{
    id:string;
  }>
}
) {
  const params = await props.params;
  const id = params?.id || '1';
  const nid = Number(id);
  mylog("DBG",filename, 'Page' , "id=", id);
  return (
	<main>
	  <CreatePautaForm reuniaoNumber={nid} />
	</main>
  );
}