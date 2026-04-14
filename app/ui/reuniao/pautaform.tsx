'use client';


import { mylog } from '@/app/lib/mylogger';
import Interessado from '@/app/ui/reuniao/pauta/interessado';

export default function PautaForm({reuniao}:{reuniao: number}) {
    mylog('DBG', 'app/ui/reuniao/pautaform', 'PautaForm', 'reuniao=', reuniao);
    const banana = true; // This is just a placeholder, replace with actual logic if needed
    return (
        <form  className="rounded-md bg-gray-50 p-4 md:p-6">
             {banana?<Interessado />:<div />}
        </form>
    )
}
