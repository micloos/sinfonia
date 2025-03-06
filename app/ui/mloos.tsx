'use client'

import { PowerIcon } from '@heroicons/react/24/outline';
import { sriracha } from '@/app/ui/fonts';
import Modal from '@/app/lib/modal';
import { useState } from 'react';
import  mylogout  from '@/app/lib/mylogout';


{/* import { signOut } from '@/auth'; */}

export default function MLoosFooter() {
  const [showModal, setShowModal] = useState(false);
    return (
        <footer>
        <div className="flex px-3 py-4 justify-between">
        
       
        {/* action={async () => {
            'use server';
            await signOut({redirectTo: "/login" });
          }}
            */}
          

        
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3" 
               onClick={()=> setShowModal(true)}>
              <PowerIcon className="w-6" />
            </button>    
            <p className={`${sriracha.className}`} > MLoos Consulting LTDA</p>
        </div>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)} >
           <form action={async () => {
            await mylogout()}} >

          <p>Voce tem certeza que deseja sair?</p>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3" >
            <PowerIcon className="w-6" />
            
          </button>
          </form>
        </Modal>
        </footer>
);
}