
import { AttrCreditos, BancaCompleta, ImprimirData, RelatReuniao, TipoDeliberacao, TipoPrazos } from "@/app/lib/definitions";
import { fetchUserItensHistory,  fetchUserReuniaoHistory, fetchAssuntos, fetchBancas, fetchDisciplinasEspeciais, fetchAssuntoParameters, fetchTipoPrazos, fetchTipoAtribuidorCredito, fetchAtribuidorCredito, fetchTipoDeliberacao } from "@/app/lib/reuniao/data";
import { DisciplinaEspeciais } from "@/app/lib/reuniao/definitions";
import Relatorio from "@/app/ui/reuniao/relatorios/relatorio";
import SearchUser from "@/app/ui/reuniao/relatorios/searchUser";
// import { fetchUserHistory } from "@/app/lib/data";





    


export default async function Page(props:  {
				  searchParams?: Promise<{
				  query?: string;
				  page?: string;}>;
                }) 
    {
    const searchParams = await props.searchParams;

    const interessado = searchParams?.query || ''; 
					  {/* const searchParams = useSearchParams(); */}
					  {/* const query = searchParams.get('query') || ''; */}
    
    
    const data:ImprimirData = {
        tipo: 'ata', 
        reuniao: {
            id: 0,  
            d_lim: '31/01/2026',
            d_ini: '31/02/2026',
            d_end: '31/03/2026',
	        sala: '222',
	        predio: 'ensino',
	        active: 'N',
	        sequencia: null
        },
        participantes:[],
        ordemDia:[],
        assuntos:[],
        items:[],
        assuntoParameters:[],
        bancas:[],
        tipoPrazos:[],
        tipoAttrCreditos:[],
        attrCreditos:[],
        discEspecial:[],
        tipoDeliberacao:[]
}
    data.items  = interessado.length>0 && await fetchUserItensHistory(interessado) || [];
    let listaReuniao = '(';
    for (let i=0; i < data.items.length; i++) {
        listaReuniao = listaReuniao + data.items[i].cd_Reuniao;
        if (i<data.items.length-1) {listaReuniao=listaReuniao+','}
}
      listaReuniao= listaReuniao+')';
    
    let listaItems = '(';
    for (let i=0; i < data.items.length; i++) {
        listaItems = listaItems + data.items[i].Cd_ItemReuniao;
        if (i<data.items.length-1) {listaItems=listaItems+','}
}
      listaItems= listaItems+')'
	


    const reunioes: RelatReuniao[] = interessado.length>0 && await fetchUserReuniaoHistory(listaReuniao) || [];

    data.assuntos = await fetchAssuntos();
    data.bancas = listaItems==='()'?[]:await fetchBancas(listaItems) as BancaCompleta[];
    data.discEspecial = listaItems==='()'?[]:await fetchDisciplinasEspeciais(listaItems) as DisciplinaEspeciais[];
    data.assuntoParameters = await fetchAssuntoParameters();
    data.tipoPrazos = await fetchTipoPrazos() as TipoPrazos[];
    data.tipoAttrCreditos = await fetchTipoAtribuidorCredito();
    data.attrCreditos = await fetchAtribuidorCredito(listaItems) as AttrCreditos[];
    data.tipoDeliberacao = await fetchTipoDeliberacao() as TipoDeliberacao[];


 
    console.log("Page render", { reunioes, interessado, data });


    return (
        <main>
            <h2>Relatório de Usuário</h2>
            <SearchUser />
            <Relatorio reunioes={reunioes} interessado_name={interessado} data={data} />

        </main>
    );
}