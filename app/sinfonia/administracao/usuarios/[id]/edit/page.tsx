import UserForm from '@/app/ui/administracao/usuarios/edit-form';
import { fetchUserById, fetchNiveis } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { UserType, Niveis } from '@/app/lib/definitions';
import { mylog } from '@/app/lib/mylogger';
 
export default async function Page(props: {params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  mylog("DBG",'/app/sinfonia/administracao/usuarios/[id]/edit/page', 'Page' , "params=", params);
  const id = params.id;
  mylog("DBG",'/app/sinfonia/administracao/usuarios/[id]/edit/page', 'Page' , "id=", id);
  const [user] = await Promise.all([
	  fetchUserById(id),
  ]) as UserType[];
  
  const niveis = await fetchNiveis() as Niveis[];
  mylog("DBG",'/app/sinfonia/administracao/usuarios/[id]/edit/page', 'Page' , "niveis=", niveis);
  mylog("DBG",'/app/sinfonia/administracao/usuarios/[id]/edit/page', 'Page' , "user=", user);
  if (!user) {
	  notFound();
  }
  return (
    <main>
      <UserForm user={user} niveis={niveis} />
    </main>
  );
}
