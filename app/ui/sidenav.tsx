
import NavLinks from '@/app/ui/nav-links';


export default function SideNav(props: {basepage: string}) {
	const basepage=props.basepage;
  const datatest = "sidenav"+basepage;
  return (
    <div className="flex h-2/3 flex-col px-3 py-4 md:px-2" data-testid={datatest} >
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks basepage={basepage} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        
    </div>
  </div>
  );
}
