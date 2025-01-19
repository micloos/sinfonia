import ParticipantForm from '@/app/ui/administracao/participantes/create-form';
import { mylog } from '@/app/lib/mylogger';

export default async function Page() {
  
  mylog("DBG",'/app/sinfonia/administracao/participantes/criar', 'Page' , "Begin","");
  
  return (
    <main>
      <ParticipantForm /> 
    </main>
  );
}