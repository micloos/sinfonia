'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
import { links as linksi, linksa, linksr, linksd } from '@/app/lib/nav';
import { HomeIcon } from '@heroicons/react/24/outline';


export default function NavLinks(props: {basepage: string}) {
	const basepage = props.basepage;
	const pathname = usePathname();
	let links = [];
  switch (basepage) {
    case 'administracao': 
      links = linksa;
      break;
    case 'reuniao': 
      links = linksr;
      break;
    case 'documentos': 
      links = linksd;
      break;
    case 'inicio':
      links = linksi;
      break;
    default: {links[0]={ name: 'Início', href: '/', icon: HomeIcon,  pname: 'Início', }}
  }
		 



  return (
    <>
          {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            data-testid={link.name}           
            className={clsx(
		    "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
		    {
			    'bg-sky-100 text-blue-600': pathname === link.href,
		    },
	    )}
          
		    >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
