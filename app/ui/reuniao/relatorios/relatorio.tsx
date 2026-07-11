import { RelatReuniao,  ImprimirData } from "@/app/lib/definitions";
import * as moment from 'moment-timezone';

const tz ="UTC";


type RelatorioProps = {
  interessado_name: string;
  reunioes: RelatReuniao[]; // Adjusted type to match the expected structure
  data: ImprimirData
};
    


export default function Relatorio({ reunioes, interessado_name, data }: RelatorioProps) {

console.log("Relatorio render", { reunioes, interessado_name, data });

    return (
        <div>
            <div>
                <h1 className="flex font-bold">Nome: {interessado_name}</h1>
            </div>
            <div>
                {reunioes.map((reuniao, index) => (
                    <div key={index}>
                        <p className="bg-slate-300 flex">Reunião {reuniao.cd_reuniao} em {moment.tz(reuniao.dt_reuniao, tz).format('DD/MM/YYYY')}</p>
                        <ul>
                            {data.items
                                .filter(assunto => Number(assunto.cd_Reuniao) === Number(reuniao.cd_reuniao))
                                .map((assunto, itemIndex) => (
                                    <li key={itemIndex}>
                                        <p> {data.assuntos.filter(a => Number(a.id) === Number(assunto.Cd_AssuntoReuniao))[0]?.assunto || 'N/A'} </p>
                                        <p> Area: {assunto.ds_AreaInteressado} </p>
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_Orientador==='S')?<p>Orientador(a): Prof(a) Dr(a) {assunto.nm_Orientador} - {assunto.ds_LotOrientador} </p>:<p></p>}
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_NovoOrientador==='S')?<p>Novo Orientador(a): Prof(a) Dr(a) {assunto.nm_NovoOrientador}  </p>:<p></p>}
                                        <p> Nivel: {assunto.ds_NivelInteressado} </p>
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_DataApresentacao==='S')? <p> Data de Apresentação: {moment.tz(assunto.dt_Apresentacao, tz).format('DD/MM/YYYY')} </p>:<p></p>}
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_Defesa)==='S'? <p> Data da Defesa: {moment.tz(assunto.Dt_Defesa, tz).format('DD/MM/YYYY')} </p>:<p></p>}
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_DataDeposito==='S')? <p> Data de Deposito: {moment.tz(assunto.dt_Deposito, tz).format('DD/MM/YYYY')} </p>:<p></p>}
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_PlanoTrabalho==='S')? <p> Plano de Trabalho: {assunto.ds_TituloPlanoTrabalho} </p>:<p></p>}
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_NovoPlano==='S')?<p>Novo Plano de Trabalho: {assunto.ds_TituloPlanoTrabalho_NovoPlano} </p>:<p></p>}
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_DissertacaoTese==='S')?<p>Dissertação / Tese: {assunto.ds_TituloDissertacaoTese} </p>:<p></p>}
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_BancaExaminadora==='S')?<div key={'banca'+assunto.Cd_ItemReuniao} ><p>Banca: </p>
                                            {data.bancas.filter(bancamember => (bancamember.Cd_ItemReuniao === Number(assunto.Cd_ItemReuniao)))
                                                                .map((member)=>(
                                                    <p key={'examinador'+member.Cd_BancaExaminadoraReuniao}>{(Number(member.Cd_TipoExaminador) < 6)?'Titular :':'Suplente :' } {member.nm_ExaminadorBanca} - {member.ds_LotExaminadorBanca}</p>
                                                              ))}</div>
                                                            :<p></p>}
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_DisciplinaEspecial==='S')?<div key={'discesc'+assunto.Cd_ItemReuniao} >
                                            {data.discEspecial.filter(bancamember => (bancamember.Cd_ItemReuniao === assunto.Cd_ItemReuniao))
                                                                .map((member,index)=>(
                                                                  <div key={'disciplina'+member.cd_DisciplinaEspecial} className="flex-nowrap">
                                                                <p className="font-bold">Disciplina {index+1}: {member.nm_DisciplinaEspecial} </p>
                                                                <p> Periodo: {moment.tz(member.dt_PeriodoInicial, tz).format('DD/MM/YYYY')} a {moment.tz(member.dt_PeriodoFinal, tz).format('DD/MM/YYYY')}</p>
                                                                <p> Conceito: {member.ds_Conceito} </p>
                                                                <p> Frequencia: {member.ds_Frequencia}%</p>
                                                                <p> Créditos: {member.qt_Creditos} </p>
                                                                </div>
                                                              ))}
                                                              </div>
                                                            :<p></p>}
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_AtribuiCreditos==='S')?<div>
                                                              {data.attrCreditos.filter(bancamember => (bancamember.Cd_ItemReuniao === assunto.Cd_ItemReuniao)).map((member) => (
                                                                <div key={"attrcred"+assunto.Cd_ItemReuniao} >
                                                            <p className="font-bold">{data.tipoAttrCreditos.filter(tip => (tip.id === member.Cd_TipoAtribuidorCredito))[0].name }: {member.ds_TituloTrabalho} </p>
                                                            <p>Título Periódico/Livro/Congress: {member.ds_TituloPeriodicoLivroCongresso} </p>
                                                            <p>Periodo: {moment.tz(member.dt_PeriodoInicial,tz).format('DD/MM/YYYY')} a {moment.tz(member.dt_PeriodoFinal,tz).format('DD/MM/YYYY')}</p>
                                                            <p>Volume: {member.nu_Volume} </p>
                                                            <p>Páginas: {member.ds_Paginas}</p>
                                                            <p>País: {member.ds_Pais}</p>
                                                            <p>Ano: {member.ds_Ano}</p>
                                                            </div>
                                                            ))}
                                                            </div>
                                                            : <p></p>}
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_Estagio==='S')?
                                                              <div key={'estagio'+assunto.Cd_AssuntoReuniao}>
                                                                <p>Periodo Programa PAE: {moment.tz(assunto.dt_EstagioPeriodoInicio, tz).format('DD/MM/YYYY')} a {moment.tz(assunto.dt_EstagioPeriodoFim, tz).format('DD/MM/YYYY')}</p>
                                                              </div>
                                                            :<p></p>}
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_CredenciamentoDisciplina==='S')?
                                                              <div>
                                                                <p>Disciplina: {assunto.ds_CredenciamentoDisciplina} </p>
                                                                <p>Responsável(eis): Prof.(a) Dr.(a) {assunto.Nm_CredProfessorResponsavel}   </p>
                                                              </div>
                                                            :<p></p>}
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_NovoProfessor==='S')?
                                                              <p>Novo Responsável: Prof.(a) Dr.(a) {assunto.Nm_CredNovoProfessor} </p>:<p></p>}
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_MotivoAssunto==='S')?
                                                              <p>Motivo: {assunto.ds_MotivoItem} </p>:<p></p>}
                                        
                                        
                                        
                                        
                                        
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_Relator==='S') ? <div key={'relator'+assunto.Cd_ItemReuniao}>
                                                              {(assunto.nm_Relator && assunto.nm_Relator.length>0)?
                                                              <p>Relator Indicado: {assunto.nm_Relator} - {assunto.ds_LotRelator} </p>: <p></p>}
                                                              {(assunto.ds_ObservacaoRelator && assunto.ds_ObservacaoRelator.length>0)?
                                                              <p>Observação do Relator: {assunto.ds_ObservacaoRelator} </p>
                                                              :<p></p>}
                                                            </div>
                                                             :<p></p>}
                                        
                                                             
                                        {(data.assuntoParameters[Number(assunto.Cd_AssuntoReuniao)-1].Ind_SolicitaPrazo==='S')?
                                                                                  <p> Prazo de {(data.tipoPrazos && assunto.Cd_TipoSolicitacaoPrazo)?data.tipoPrazos[assunto.Cd_TipoSolicitacaoPrazo-1].nm_TipoSolicitacaoPrazo:''} Solicitado: {assunto.qt_SolicitacaoPrazoDiasSolicitados} </p>
                                                                                  :<p></p>  
                                                            }
                                                            {/*}
                                                                                    <Text> Prazo de {data.tipoPrazos[Number(assunto.Cd_TipoSolicitacaoPrazo)-1]} Solicitado: {assunto.qt_SolicitacaoPrazoDiasSolicitados} </Text>
                                        
                                                              */}
                                                          
                                                            {assunto.ds_ObservacaoNaoPublicavelItem && assunto.ds_ObservacaoNaoPublicavelItem.length>0?
                                                              <p>Observação Não Publicavel: {assunto.ds_ObservacaoNaoPublicavelItem} </p>:<p></p>}
                                        
                                                          
                                                            {(assunto.Ind_AdReferendum==='S')?
                                                            <div key={'adref'+assunto.Cd_AssuntoReuniao} className="text-red">
                                                              <p className="text-red">
                                                                Ad Referendum em {moment.tz(assunto.dt_AdReferendum, tz).format('DD/MM/YYYY')} </p>
                                                                <p className="text-red"> Motivo: {assunto.ds_AdReferendum} </p>                   
                                                            </div>
                                                            :<div><p></p></div>}
                                                            
                                                            
                                                            
                                                            <p className="text-blue"> Res: {data.tipoDeliberacao[Number(assunto.Cd_ClassificacaoDeliberacao)-1]?.nome} </p>                                                          
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
            
 