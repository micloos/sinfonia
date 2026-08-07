import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import AssuntosTable from '@/app/ui/administracao/assuntos/table';
import { CreateAssunto } from '@/app/ui/administracao/buttons';

import { mylog } from '@/app/lib/mylogger';

const filename = 'app/sinfonia/administracao/assuntos/page';

import { fetchAssuntosPages } from '@/app/lib/data';
import { requireAuth } from '@/app/lib/auth/authorization';

export default async function AdmAssuntosPage(props:  {
				  searchParams?: Promise<{
				  query?: string;
				  page?: string;
				  }>;
				}) {
                    try {
                    const session = await requireAuth('1'); // Require at least 'admin' role
                    const { user } = session;
                    if (user) { mylog('INFO', filename, 'Page', 'user', user.Ds_LoginAcessoUsuarioSistemaReuniao); }
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  mylog('DBG', filename, 'Page', 'query', query);
  mylog('DBG', filename, 'Page', 'Rendering','Assuntos Page');
  const totalPages = await fetchAssuntosPages(query);
  return (
    <main>
      <h1>Assuntos Reunião</h1>
      {/* Add your content here */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Procurar Assunto.." />
          <CreateAssunto />	   
      </div>
      <AssuntosTable query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
} catch (error: any) {
    return (
      <div className="text-red-500">
        {error.message}
      </div>
    );
  }
}