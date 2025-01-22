import { fetchParticipantesByReuniao } from '@/app/lib/data';
import { mylog } from '@/app/lib/mylogger';


const filename = "app/ui/reuniao/participantes/table";

export default async function ParticipantesByReuniao({rid}: { rid: number}) {

    const participantes = await fetchParticipantesByReuniao (rid);
    mylog ("DBG",filename,"ParticipantesByReuniao","participantes =",participantes);
    return (
        <div>
            <h1> Participantes </h1>
        </div>
    )

}