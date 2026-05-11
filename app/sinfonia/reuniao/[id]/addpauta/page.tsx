import AddPauta from '@/app/ui/reuniao/addpauta';
import { mylog } from '@/app/lib/mylogger';
import ReuniaoForm from '@/app/ui/reuniao/edit-form';
import { fetchReuniaoById } from '@/app/lib/reuniao/data2';
import { fetchAssuntos } from '@/app/lib/reuniao/data';
import { Assuntos } from '@/app/lib/definitions';
import { fetchIndices } from "@/app/lib/reuniao/data";
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
  const [reuniao] = await Promise.all([
      fetchReuniaoById(id),
    ]);
  mylog("DBG",filename, 'Page' , "id=", nid);
  const assuntos = await fetchAssuntos() as Assuntos[];
  const indices = await fetchIndices();
  mylog("DBG",filename, 'Page' , "assuntos[10]=", assuntos[10]);
  mylog("DBG",filename, 'Page' , "indices[10]=", indices[10]);
  return (
	<main>
    <ReuniaoForm reuniao={reuniao} withsavebutton={0} withbackbutton={1}/>
	  <AddPauta reuniao={nid} assuntos={assuntos} indices={indices}/>
	</main>
  );
}