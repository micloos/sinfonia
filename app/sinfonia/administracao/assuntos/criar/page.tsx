import AdmCreateAssuntoForm from '@/app/ui/administracao/assuntos/createtable';
import { mylog } from '@/app/lib/mylogger';
import { getNextAdmAssunto } from '@/app/lib/administracao/data';

const filename = 'app/sinfonia/administracao/assuntos/criar/page';

const nextNum = await getNextAdmAssunto();

export default async function Page() {
    mylog("DBG", filename, 'Page' , "titulo", "Rendering Create Assunto Page");
    return (
        <main>
            <AdmCreateAssuntoForm nextNum={nextNum} />
        </main>
    );
}