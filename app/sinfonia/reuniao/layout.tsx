import SideNav from '@/app/ui/sidenav';

export default function Layout( { children }:{ children: React.ReactNode }) {
	return (
		<div className="flex flex-col md:flex-row md:overflow-hidden">
      <div className="w-1/2 md:w-48">
        <SideNav basepage={'reuniao'} />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
	);
}

