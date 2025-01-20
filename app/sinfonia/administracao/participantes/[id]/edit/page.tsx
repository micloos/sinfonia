import ParticipanteForm from '@/app/ui/administracao/participantes/edit-form';
import { fetchParticipanteById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { ParticipanteType } from '@/app/lib/definitions';
import { mylog } from '@/app/lib/mylogger';
 
export default async function Page(props: {params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  mylog("DBG",'/app/sinfonia/administracao/participantes/[id]/edit/page', 'Page' , "params=", params);
  const id = params.id;
  mylog("DBG",'/app/sinfonia/administracao/participantes/[id]/edit/page', 'Page' , "id=", id);
  const [user] = await Promise.all([
	  fetchParticipanteById(id),
  ]) as ParticipanteType[];
  
  mylog("DBG",'/app/sinfonia/administracao/participantes/[id]/edit/page', 'Page' , "user=", user);
  if (!user) {
	  notFound();
  }
  return (
    <main>
      <ParticipanteForm user={user} />
    </main>
  );
}
