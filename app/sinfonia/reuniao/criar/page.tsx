import ReuniaoForm from '@/app/ui/reuniao/create-form';
import { fetchNextReuniao } from '@/app/lib/reuniao/data';
import { mylog } from '@/app/lib/mylogger';
{/* import { notFound } from 'next/navigation'; */}
 
export default async function Page() {
  const reuniao={id:0,sala:"222",predio:"ensino",d_ini:"",d_end:"",d_lim:"",active:"S",sequencia:null};
  const reuniaoNumber = await fetchNextReuniao();
  reuniao.id=reuniaoNumber;
  mylog("DBG",'/app/sinfonia/reuniao/criar/page', 'Page' , "reuniaoNumber=", reuniaoNumber);
  return (
	<main>
	  <ReuniaoForm reuniao={reuniao} reuniaoNumber={reuniaoNumber} />
	</main>
  );
}