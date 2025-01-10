import Pagination from '@/app/ui/pagination';
import ReunioesTable from '@/app/ui/reuniao/table';
import Search from '@/app/ui/search';
import { fetchReunioesPages } from '@/app/lib/data';
import { CreateReuniao } from '@/app/ui/reuniao/buttons';


export default async function Page(props: {
		searchParams?: Promise<{
		query?: string;
		page?: string;
		}>;
	}) 
{
	const searchParams = await props.searchParams;
	console.log('Reunioes SearchParams',searchParams);
	const query = searchParams?.query || ''; 
	const currentPage = Number(searchParams?.page) || 1;
	console.log ('In Reunioes.page query=' , query );
	const totalPages = await fetchReunioesPages(query,1);
	console.log(`total pages ${totalPages}`);
	
	return (
<div className="w-full">
	<div className="mt-4 flex w-4/5 items-center justify-between gap-2 md:mt-8">
	   <Search placeholder="Procurar..." />
	   <CreateReuniao />	   
	</div>
	<ReunioesTable query={query} currentPage={currentPage}  />
	<div className="mt-5 flex w-full justify-center">
	  <Pagination totalPages={totalPages} />
	</div>
</div>
	)
}
