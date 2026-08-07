import Pagination from '@/app/ui/pagination';
import ReunioesTable from '@/app/ui/reuniao/table';
import Search from '@/app/ui/search';
import { fetchReunioesPages } from '@/app/lib/reuniao/data';
import { CreateReuniao } from '@/app/ui/reuniao/buttons';
import { mylog } from '@/app/lib/mylogger';


const filename = 'app/sinfonia/reuniao/fechadas/page';
import { requireAuth } from '@/app/lib/auth/authorization';

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
						if (user) { mylog('INFO', filename, 'Page', 'user', user.Ds_LoginAcessoUsuarioSistemaReuniao); }
	const searchParams = await props.searchParams;
	mylog("DBG",'/app/sinfonia/reuniao/fechadas/page', 'Page' , "searchParams=", searchParams);
	const query = searchParams?.query || ''; 
	const currentPage = Number(searchParams?.page) || 1;
	mylog("DBG",'/app/sinfonia/reuniao/fechadas/page', 'Page' , "query=", query);
	const totalPages = await fetchReunioesPages(query,1);
	mylog("DBG",'/app/sinfonia/reuniao/fechadas/page', 'Page' , "totalPages=", totalPages);
	return (
<div className="w-full">
	<div className="mt-4 flex w-4/5 items-center justify-between gap-2 md:mt-8">
	   <Search placeholder="Procurar..." />
	   <CreateReuniao />	   
	</div>
	<ReunioesTable query={query} currentPage={currentPage} activer='S' />
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
