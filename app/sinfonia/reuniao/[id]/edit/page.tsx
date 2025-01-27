import ReuniaoForm from '@/app/ui/reuniao/edit-form';
import { fetchReuniaoById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { mylog } from '@/app/lib/mylogger';
import ParticipantesByReuniao from '@/app/ui/reuniao/participantes/table';
 
const filename = 'app/sinfonia/reuniao/[id]/edit/page';

export default async function Page(props: {params: Promise<{ id: string }> }) {
  const params = await props.params;
  mylog('DBG', filename, 'Page', 'params=',params);
  const id = params.id;
  const [reuniao] = await Promise.all([
	  fetchReuniaoById(id),
  ]);

  mylog('DBG', filename, 'Page', 'reuniao=',reuniao);
  
const withbackbutton = 1;
const withsavebutton = reuniao.active==='N'?1:0;
const rid=Number(id);

mylog('DBG',filename,"Page","rid=",rid);

mylog('DBG', filename, 'Page', 'reuniao=',reuniao);


  if (!reuniao) {
	  notFound();
  }
  return (
    <main>
      <ReuniaoForm reuniao={reuniao} withsavebutton={withsavebutton} withbackbutton={withbackbutton} />
      <ParticipantesByReuniao rid={rid} editable={withsavebutton} />
    </main>
    
    
  );
}
