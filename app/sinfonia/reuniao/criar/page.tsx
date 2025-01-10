import ReuniaoForm from '@/app/ui/reuniao/create-form';
import { fetchNextReuniao } from '@/app/lib/data';
{/* import { notFound } from 'next/navigation'; */}
 
export default async function Page() {
  const reuniao={id:0,sala:"222",predio:"ensino",d_ini:"",d_end:"",d_lim:"",active:"S",sequencia:null};
  console.log("Page Criar Reuniao")
  const reuniaoNumber = await fetchNextReuniao();
  reuniao.id=reuniaoNumber;
  console.log ("In Criar: reuniaoNumber =",reuniaoNumber)
  return (
	<main>
	  <ReuniaoForm reuniao={reuniao} reuniaoNumber={reuniaoNumber} />
	</main>
  );
}