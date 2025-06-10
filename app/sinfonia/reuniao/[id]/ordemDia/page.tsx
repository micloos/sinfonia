import ReuniaoForm from '@/app/ui/reuniao/edit-form';
import { fetchReuniaoById } from '@/app/lib/reuniao/data';
import { notFound } from 'next/navigation';
import { mylog } from '@/app/lib/mylogger';
import  OrdemDia  from '@/app/ui/reuniao/ordemDia/tableclient';
// import Pagination from '@/app/ui/pagination';

 
const filename = 'app/sinfonia/reuniao/[id]/ordemDia/page';


export default async function OrdemDiaPage(props: {
  searchParams?: Promise<{ 
    page?: string; 
  }>,
  params?: Promise<{
    id:string;
  }>
}) 
{
  const sparams = await props.searchParams;
  const params = await props.params;
  mylog('DBG', filename, 'Page', 'params=',params);
  mylog('DBG', filename, 'Page', 'sparams=',sparams);
  const id = params?.id || '1';
  const currentPage = Number(sparams?.page) || 1;
  // const totalPages = await fetchOrdemDiaPages(id);
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
      <OrdemDia rid={Number(id)} currentPage={currentPage} editable={withsavebutton} />
      <div className="mt-5 flex w-full justify-center">
      {/*  <Pagination totalPages={totalPages} /> */}
      </div>
    </main>
    
    
  );
}
