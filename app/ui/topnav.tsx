'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { links } from '@/app/lib/nav';
import clsx from 'clsx';

export default function TopNav () {
	const pathname = usePathname();
  console.log('Top Nav for pathname:',pathname);

  return (
    <nav className="flex-wrap pl-60">
      <ul className="flex border-b">
          {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
		    "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
		    {
			    'bg-sky-100 text-blue-600': ((link.href !== '/sinfonia') && pathname.includes(link.href) )
		    },
	    )}
          
		    >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
      {/*		
	      links.map((link) => {
	      return ("<li> "+ link.name + " </li>");
              });
      */} 
      </ul>
   </nav>
  );
}