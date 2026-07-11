"use client";

import { useState } from "react";
import SearchableSelect, { SearchResult } from "../searchableSelect";
import { fetchUsers } from "@/app/lib/reuniao/data";
import { Interessado } from "@/app/lib/reuniao/definitions";
import { mylog } from "@/app/lib/mylogger";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const filename = "app/sinfonia/reuniao/relatorios/searchUser.tsx";

export default function SearchUser() {
    const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

    const [interessado, setInteressado] = useState<Interessado>({ nm_Interessado: '', ds_AreaInteressado: '', ds_NivelInteressado: '' });
    const [selectedUser, setSelectedUser] = useState<SearchResult | null>(null);

    mylog("DBG",filename, 'SearchUser' , "selectedUser=", selectedUser);
    const handleselect = async (user: SearchResult) => {
    mylog("DBG",filename, 'handleselect' , "user=", user);
    setSelectedUser(user);
        console.log('Selected user:', user);
    const updatedInteressado = { 
      ...interessado, 
      nm_Interessado: user.name, 
      ds_AreaInteressado: user.ds_AreaInteressado || '', 
      ds_NivelInteressado: user.ds_NivelInteressado || '' 
    };
    console.log('Interessado',interessado);
    
    setInteressado(updatedInteressado);
    const params = new URLSearchParams(searchParams);
		params.set('page','1');
		if (user.name && user.name.length > 0) {
			params.set('query', user.name);
		} else {
			params.delete('query');
		}
	        replace (`${pathname}?${params.toString()}`);
	}  
  



const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => 
{
    const { name, value } = e.target;
    const updatedInteressado = { ...interessado, [name]: value };
    mylog("DBG",filename, 'handleChange' , "{name, value}=", { name, value });
    setInteressado(updatedInteressado);
}

    return (
        <div>
            <SearchableSelect searchFunction={fetchUsers} onSelect={handleselect} onchange={handleChange} />
        </div>
    );
}