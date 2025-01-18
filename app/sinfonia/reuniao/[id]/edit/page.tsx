import ReuniaoForm from '@/app/ui/reuniao/edit-form';
import { fetchReuniaoById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: {params: Promise<{ id: string }> }) {
  const params = await props.params;
  console.log("Edit Reuniao params= ",params)
  const id = params.id;
  console.log(id);
  const [reuniao] = await Promise.all([
	  fetchReuniaoById(id),
  ]);

const withbackbutton = 1;
const withsavebutton = Number(reuniao.active);

console.log("Page edit Reuniao, reuniao=",reuniao)
  if (!reuniao) {
	  notFound();
  }
  return (
    <main>
      <ReuniaoForm reuniao={reuniao} withsavebutton={withsavebutton} withbackbutton={withbackbutton} />
    </main>
  );
}
