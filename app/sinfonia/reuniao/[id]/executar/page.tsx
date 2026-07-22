import ReuniaoForm from '@/app/ui/reuniao/edit-form';

import PautaList from '@/app/ui/reuniao/pautalist';
import { fetchReuniaoById, fetchAssuntosPages, fetchDelibValores } from '@/app/lib/reuniao/data';
import { notFound } from 'next/navigation';
import SearchAssunto from '@/app/ui/reuniao/searchassunto';
import { mylog } from '@/app/lib/mylogger';
import Pagination from '@/app/ui/pagination';
import { ValoresDeliberacao } from '@/app/lib/definitions';


 
const filename = 'app/sinfonia/reuniao/[id]/executar/page';


export default async function Page(props: {
        searchParams?: Promise<{ 
            query?: string;
            page?: string; 
            pendente?: number;
        }>;
        params?: Promise<{
            id:string;
        }>;
}) 
{
  
  const sparams = await props.searchParams;
  const query = sparams?.query || '';
  const currentPage = sparams?.page || '1';
  const pendente = sparams?.pendente || 2;


  mylog('DBG', filename, 'Page', 'sparams=',sparams);
  mylog('DBG', filename, 'Page', 'query=',query);
  mylog('DBG', filename, 'Page', 'page=',currentPage);
  mylog('DBG', filename, 'Page', 'pendente=',pendente);
  const params = await props.params;
  mylog('DBG', filename, 'Page', 'params=',params);
  mylog('DBG', filename, 'Page', 'sparams=',sparams);
  const id = params?.id || '1';
  const totalPages = await fetchAssuntosPages(query,id,1);
  const valores = await fetchDelibValores() as ValoresDeliberacao[];
  const [reuniao] = await Promise.all([
    fetchReuniaoById(id),
  ]);

  mylog('DBG', filename, 'Page', 'reuniao=',reuniao);
  
const withbackbutton = 1;
const withsavebutton = 0;
const rid=Number(id);

mylog('DBG',filename,"Page","rid=",rid);

mylog('DBG', filename, 'Page', 'reuniao=',reuniao);


  if (!reuniao) {
	  notFound();
  }
  return (
    <main>
      
      <ReuniaoForm reuniao={reuniao} withsavebutton={withsavebutton} withbackbutton={withbackbutton} />
      <div className="mt-4 flex w-full items-center justify-between gap-2 md:mt-8">
           <SearchAssunto placeholder="Procurar..." />
      </div>
      <PautaList query={query} currentPage={currentPage} reuniao={rid} pendente={2} valores={valores} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
    
    
  );
}
