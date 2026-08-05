
import Pagination from '@/app/ui/pagination';
import UsersTable from '@/app/ui/administracao/usuarios/table';
import Search from '@/app/ui/search';
{/* import { Suspense } from 'react'; */}
import { fetchUsersPages } from '@/app/lib/data';
import { CreateUser } from '@/app/ui/administracao/buttons';
import { requireAuth} from '@/app/lib/auth/authorization';
import { mylog } from '@/app/lib/mylogger';
const filename = 'app/sinfonia/administracao/usuarios/page';


export default async function Page(props: {
				  searchParams?: Promise<{
				  query?: string;
				  page?: string;
				  }>;
				}) 
				  {
					try {
					const session = await requireAuth('1'); // Require at least 'admin' role

					const { user } = session;
					if(user) { mylog('INFO', filename, 'Page', 'user', user.Ds_LoginAcessoUsuarioSistemaReuniao); }

					  const searchParams = await props.searchParams;
					  
					  const query = searchParams?.query || ''; 
					  {/* const searchParams = useSearchParams(); */}
					  {/* const query = searchParams.get('query') || ''; */}
					  const currentPage = Number(searchParams?.page) || 1;
					  
					  const totalPages = await fetchUsersPages(query);
					  
	return (
		<div className="w-full">
		<div className="flex w-full items-center justify-between">
		  <h1 className="text-2xl"> Usuários </h1>
		</div>
		<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
		   <Search placeholder="Procurar Usuario.." />
	           <CreateUser />	   
		</div>
		{/*
		<Suspense key={query + currentPage} fallback={<UsersTableSkeleton />}>
		*/}
		<UsersTable query={query} currentPage={currentPage} />
		<div className="mt-5 flex w-full justify-center">
		  <Pagination totalPages={totalPages} />
		</div>
		
</div>
)
					} catch (error: any) {
						return (
							<div className="text-red-500">
								{error.message}
							</div>
						);
					}
}
