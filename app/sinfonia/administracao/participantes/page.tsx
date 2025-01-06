
import Pagination from '@/app/ui/pagination';
import ParticipantesTable from '@/app/ui/administracao/participantes/table';
import Search from '@/app/ui/search';
{/* import { Suspense } from 'react'; */}
import { fetchParticipantesListPages } from '@/app/lib/data';
import { CreateParticipantesList } from '@/app/ui/administracao/buttons';


export default async function Page(props: {
				  searchParams?: Promise<{
				  query?: string;
				  page?: string;
				  }>;
				}) 
				  {
					  const searchParams = await props.searchParams;
					  
					  const query = searchParams?.query || ''; 
					  {/* const searchParams = useSearchParams(); */}
					  {/* const query = searchParams.get('query') || ''; */}
					  const currentPage = Number(searchParams?.page) || 1;
					  
					  const totalPages = await fetchParticipantesListPages(query);
					  
	return (
		<div className="w-full">
		<div className="flex w-full items-center justify-between">
		  <h1 className="text-2xl"> Usuários </h1>
		</div>
		<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
		   <Search placeholder="Procurar Usuario.." />
	           <CreateParticipantesList />	   
		</div>
		{/*
		<Suspense key={query + currentPage} fallback={<UsersTableSkeleton />}>
		*/}
		<ParticipantesTable query={query} currentPage={currentPage} />
		<div className="mt-5 flex w-full justify-center">
		  <Pagination totalPages={totalPages} />
		</div>
		
</div>
	)
}