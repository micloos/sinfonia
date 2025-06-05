'use client';

import { mylog } from '@/app/lib/mylogger';
import { useEffect, useState } from 'react';


export default function OrderTable ({rid}:{rid:number})  {
    // const filename="app/ui/reuniao/dynamicorder";

    const [data, setData] = useState(0)

    mylog("DBG", "app/ui/reuniao/dynamicorder", "OrderTable", "rid=", rid);

    useEffect(() => {
        const getOrder = async (rid:number) => {
            const response = await fetch("/api/getnextsequence?rid=$rid".replace("$rid", rid.toString()));
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            // const response = rid;
            setData(responseData.nextCd);
        }
        getOrder(rid);
    }, [rid]);

    return (
        <div>
            {data ? (
              <pre> Proxima sequencia para reuniao {rid} e {data} </pre>
            ) : (
                <p> Carregando </p>
            )}
        </div>
    );

}