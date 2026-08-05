
import Pagination from '@/app/ui/pagination';
import ParticipantesTable from '@/app/ui/administracao/participantes/table';
import Search from '@/app/ui/search';
{/* import { Suspense } from 'react'; */}
import { fetchParticipantesPages } from '@/app/lib/data';
import { CreateParticipante } from '@/app/ui/administracao/buttons';
import { mylog } from '@/app/lib/mylogger';

import { requireAuth} from '@/app/lib/auth/authorization';

const filename = 'app/sinfonia/administracao/participantes/page';

export default async function Page(props:  {
				  searchParams?: Promise<{
				  query?: string;
				  page?: string;
				  rid?: string;
				  }>;
				}) 
				  {
					try {
					const session = await requireAuth('1'); // Require at least 'admin' role
					const { user } = session;
					if (user) { mylog('INFO', filename, 'Page', 'user', user.Ds_LoginAcessoUsuarioSistemaReuniao); }
					  const searchParams = await props.searchParams;
					  

					  const rid = Number(searchParams?.rid) || 0;
					  if (rid > 0)
					  {
						mylog('DBG', filename, 'Page', 'rid',rid);
					  } else {
						mylog('DBG', filename, 'Page', 'No Reuniao',"");
					  }

					  const query = searchParams?.query || ''; 
					  {/* const searchParams = useSearchParams(); */}
					  {/* const query = searchParams.get('query') || ''; */}
					  const currentPage = Number(searchParams?.page) || 1;
					  
					  const totalPages = await fetchParticipantesPages(query);
					  
	return (
		<div className="w-full">
		<div className="flex w-full items-center justify-between">
		  <h1 className="text-2xl"> Participantes Usuais </h1>
		</div>
		<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
		   <Search placeholder="Procurar Usuario.." />
	           <CreateParticipante />	   
		</div>
		{/*
		<Suspense key={query + currentPage} fallback={<UsersTableSkeleton />}>
		*/}
		<ParticipantesTable query={query} currentPage={currentPage} rid={rid}/>
		<div className="mt-5 flex w-full justify-center">
		  <Pagination totalPages={totalPages} />
		</div>
		
</div>
	)
} catch(error:any) {
						return (
							<div className="text-red-500">
								{error.message}
							</div>
						);
					}
}
