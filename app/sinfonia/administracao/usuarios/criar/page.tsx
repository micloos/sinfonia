import UserForm from '@/app/ui/administracao/usuarios/create-form';
import { fetchNiveis } from '@/app/lib/data';
import { mylog } from '@/app/lib/mylogger';

export default async function Page() {
  const niveis = await fetchNiveis();
  mylog("DBG",'/app/ui/administracao/usuarios/create-form', 'Page' , "niveis=",niveis);
  
  return (
    <main>
      <UserForm niveis={niveis} /> 
    </main>
  );
}