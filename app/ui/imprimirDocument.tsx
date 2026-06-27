import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { ImprimirData } from '@/app/lib/definitions';
import * as moment from 'moment-timezone';

const tz ="UTC";

// Style types are automatically inferred
const styles = StyleSheet.create({
  page: {
    padding: 30,
    paddingBottom: 60,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    color: '#0000cc',
    borderBottomColor: '#cccccc',
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    fontSize: 14,
    flexDirection: 'row',
    color: '#0000cc',
    justifyContent: 'space-between',
  },
  
  twocol: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 8,
  },
  title3: {
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 4,
    marginBottom: 4,
  },
  blue: {
    color: '#0000cc',
  },
    red: {
    color: '#cc0000',
  },
  bold: {
    fontWeight: 'bold',
  },
  viewcenter: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    alt: "assinatura"
  },
  section: {
    fontSize: 12,
    marginVertical: 4,
    textAlign: 'justify',
    textIndent: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowHeader: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 6,
    fontWeight: 'bold',
  },
  sectionTitle: {
    backgroundColor: '#f5f5f5',
    color: '#0000cc',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
  },
  sectionSubTitle: {
    backgroundColor: '#f5f5f5',
    color: '#0000cc',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 4,
  },
  inlineImage: {
    width: 80,
    height: 80
  },
  assinatura: {
    width: 120,
    height: 120
  },
  horizontalBar: {
    width: '100%',        // Makes it wide enough to fill container
    height: 3,            // Height of the bar
    backgroundColor: '#eeeeee',
    marginVertical: 2,   // Spacing above and below
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#000000',
  },
  indentado: {
    marginLeft: 30,
  }
});

interface ImprimirProps {
  data: ImprimirData;
}

export const ImprimirDocument = ({ data }: ImprimirProps) => {
  const { tipo, reuniao } = data;
  const titulo1 = (tipo === 'pauta'? 'Pauta': (tipo === 'ata')? 'Ata': 'Deliberação');
  console.log (reuniao.d_lim);
  
  const toprintordemdia = tipo === 'pauta'?  
     data.ordemDia.map((item)=>(
          <View key={item.id} style={styles.row} wrap={false} >
            <View key={'ordem'+item.id} style={styles.section}>
              <Text >
                {item.seq.toString()} 
              </Text>
              <Text style={styles.indentado}>
                {item.assunto}
              </Text>            
            </View>
          </View>
        )) : (tipo === 'ata')?
        data.ordemDia.map((item)=>(
          <View key={item.id} style={styles.row}  wrap={false} >
            <View key={'ordem'+item.id} style={styles.section}>
            <Text >
              {item.seq.toString()} 
            </Text>
            <Text style={styles.indentado}>
              {item.assunto}
            </Text>
            <Text style={[styles.indentado,styles.blue]}>
              {item.deliberacao}
            </Text>
            </View>
          </View>
        )): 
        data.ordemDia.filter(item => item.publicavel==='S').map((item)=>(
          <View key={item.id} style={styles.row}  wrap={false} >
            <View key={'ordem'+item.id} style={styles.section}>
            <Text >
              {item.seq.toString()} 
            </Text>
            <Text style={styles.indentado}>
              {item.assunto}
            </Text>
            <Text style={[styles.indentado,styles.blue]}>
              {item.deliberacao}
            </Text>
            </View>
          </View>
        ))
        
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View fixed>
          <View key="header" style={styles.header} >
            <View>
              <Text style={styles.title}> INSTITUTO DE PESQUISAS ENERGÉTICAS E NUCLEARES </Text>
              <Text style={styles.title}> Programa de Technologia Nuclear </Text>
              <Text style={styles.title}> {titulo1} da {reuniao.id.toString()}ª Reunião - {moment.tz(reuniao.d_ini,tz).format('DD/MM/YYYY')} </Text>
            </View>
            <Image src='/logo.png' style={styles.inlineImage} />          
          </View>
          <View style={styles.horizontalBar} />
        </View>
        {/* Footer */}
      <View style={styles.footer} fixed >
          <View key="footer" style={[styles.horizontalBar,styles.footer]} />

          <Text>GEN - Gerência de Ensino </Text>
          <Text 
        
          render={({ pageNumber, totalPages }) => ( 
          `${pageNumber} / ${totalPages}`
            )}  
        />
      </View>
        {/* General Reuniao Info */}
        <View style={styles.section}>
          <Text style={styles.section}>Pauta da {reuniao.id.toString()}ª reunião da Comissão de Pós-Graduação, realizada em {reuniao.d_ini}, às 9:00 , 
            na sala {reuniao.sala} do Prédio {reuniao.predio}, com a participação dos integrantes abaixo 
            relacionados tomaram as deliberações indicadas nas paginas seguintes:</Text> 
        </View>
        
        <View style={[styles.section,styles.indentado]}>
          <Text style={styles.subtitle}> Comissão de Pós-Graduação </Text>
          <View style={styles.twocol}>
            <Text style={styles.bold}> Presidente: </Text>
            <Text> {data.participantes.filter(user => (user.title==='Presidente'))[0].name}</Text>
          </View>
          <View style={styles.twocol}>
            <Text style={styles.bold}> Vice Presidente: </Text><Text> {data.participantes.filter(user => (user.title==='Vice Presidente'))[0].name}</Text>
          </View>
          <View style={styles.twocol}>
            <Text style={styles.bold}> Assistente: </Text><Text> {data.participantes.filter(user => (user.title==='Assistente'))[0].name}</Text>
          </View>
          <View style={styles.title3}>
            <Text> Representantes do Corpo Docente: </Text>
          </View>
          
            {data.participantes.filter(user => (user.title==='Docente')).map((item) => (
              <View key={item.id} style={styles.row}>
              <Text> {item.name}</Text>
              </View>
            ))}
          <View style={styles.title3}>
            <Text> Representantes do Corpo Discente: </Text>
          </View>
          
            {data.participantes.filter(user => (user.title==='Discente')).map((item) => (
              <View key={'disc'+item.id} style={styles.row}>
              <Text> {item.name}</Text>
              </View>
            ))} 
          
        </View>
        <View  >
          <Text style={styles.sectionTitle} >ORDEM DO DIA</Text>
        </View>
        <View>
          {toprintordemdia}
        </View>
        <View>
          <Text style={styles.sectionTitle}> EXPEDIENTE </Text>
        </View>
        {data.assuntos.map((item)=>
          (
            <View key={item.id} >
              <View key={'assunto'+item.id} style={styles.sectionSubTitle}>
                <Text> {item.assunto} </Text>
              </View>
              {data.items.filter(assuntoid => (Number(assuntoid.Cd_AssuntoReuniao) === item.id)).length > 0?
              <View>
                <Text></Text>
              </View> : <View><Text style={styles.section}>NÃO HOUVE OCORRÊNCIA </Text></View>
              }
               {data.items.filter(assuntoid => (Number(assuntoid.Cd_AssuntoReuniao) === item.id)).map((assunto, index)=>(
                  < View key={'pauta'+item.id+'.'+index} wrap={false} style={styles.section}>
                    <Text style={styles.bold} > {item.id.toString()}.{(index+1).toString()} {assunto.nm_Interessado} - {assunto.ds_AreaInteressado} </Text>
                    {(data.assuntoParameters[Number(item.id)-1].Ind_Orientador==='S')?<Text>Orientador(a): Prof(a) Dr(a) {assunto.nm_Orientador} - {assunto.ds_LotOrientador} </Text>:<Text></Text>}
                    {(data.assuntoParameters[Number(item.id)-1].Ind_NovoOrientador==='S')?<Text>Novo Orientador(a): Prof(a) Dr(a) {assunto.nm_NovoOrientador}  </Text>:<Text></Text>}
                    <Text> Nivel: {assunto.ds_NivelInteressado} </Text>
                    {(data.assuntoParameters[Number(item.id)-1].Ind_DataApresentacao==='S')? <Text> Data de Apresentação: {moment.tz(assunto.dt_Apresentacao, tz).format('DD/MM/YYYY')} </Text>:<Text></Text>}
                    {(data.assuntoParameters[Number(item.id)-1].Ind_Defesa)==='S'? <Text> Data da Defesa: {moment.tz(assunto.Dt_Defesa, tz).format('DD/MM/YYYY')} </Text>:<Text></Text>}
                    {(data.assuntoParameters[Number(item.id)-1].Ind_DataDeposito==='S')? <Text> Data de Apresentação: {moment.tz(assunto.dt_Deposito, tz).format('DD/MM/YYYY')} </Text>:<Text></Text>}
                    {(data.assuntoParameters[Number(item.id)-1].Ind_PlanoTrabalho==='S')? <Text> Plano de Trabalho: {assunto.ds_TituloPlanoTrabalho} </Text>:<Text></Text>}
                    {(data.assuntoParameters[Number(item.id)-1].Ind_NovoPlano==='S')?<Text>Novo Plano de Trabalho: {assunto.ds_TituloPlanoTrabalho_NovoPlano} </Text>:<Text></Text>}
                    {(data.assuntoParameters[Number(item.id)-1].Ind_DissertacaoTese==='S')?<Text>Dissertação / Tese: {assunto.ds_TituloDissertacaoTese} </Text>:<Text></Text>}
                    {(data.assuntoParameters[Number(item.id)-1].Ind_BancaExaminadora==='S')?<View key={'banca'+assunto.Cd_ItemReuniao} ><Text>Banca: </Text>
                        {data.bancas.filter(bancamember => (bancamember.Cd_ItemReuniao === Number(assunto.Cd_ItemReuniao)))
                        .map((member)=>(
                        <Text key={'examinador'+member.Cd_BancaExaminadoraReuniao}>{(Number(member.Cd_TipoExaminador) < 6)?'Titular :':'Suplente :' } {member.nm_ExaminadorBanca} - {member.ds_LotExaminadorBanca}</Text>
                      ))}</View>
                    :<Text></Text>}
                    {(data.assuntoParameters[Number(item.id)-1].Ind_DisciplinaEspecial==='S')?<View key={'discesc'+assunto.Cd_ItemReuniao} >
                        {data.discEspecial.filter(bancamember => (bancamember.Cd_ItemReuniao === assunto.Cd_ItemReuniao))
                        .map((member,index)=>(
                          <View key={'disciplina'+member.cd_DisciplinaEspecial} wrap={false}>
                        <Text style={styles.bold}>Disciplina {index+1}: {member.nm_DisciplinaEspecial} </Text>
                        <Text> Periodo: {moment.tz(member.dt_PeriodoInicial, tz).format('DD/MM/YYYY')} a {moment.tz(member.dt_PeriodoFinal, tz).format('DD/MM/YYYY')}</Text>
                        <Text> Conceito: {member.ds_Conceito} </Text>
                        <Text> Frequencia: {member.ds_Frequencia}%</Text>
                        <Text> Créditos: {member.qt_Creditos} </Text>
                        </View>
                      ))}
                      </View>
                    :<Text>Indice = {data.assuntoParameters[Number(item.id)-1].Ind_DisciplinaEspecial}</Text>}
                    {(data.assuntoParameters[Number(item.id)-1].Ind_Estagio==='S')?
                      <View key={'estagio'+assunto.Cd_AssuntoReuniao}>
                        <Text>Periodo Programa PAE: {moment.tz(assunto.dt_EstagioPeriodoInicio, tz).format('DD/MM/YYYY')} a {moment.tz(assunto.dt_EstagioPeriodoFim, tz).format('DD/MM/YYYY')}</Text>
                      </View>
                    :<Text></Text>}
                    {(data.assuntoParameters[Number(item.id)-1].Ind_CredenciamentoDisciplina==='S')?
                      <View>
                        <Text>Disciplina: {assunto.ds_CredenciamentoDisciplina} </Text>
                        <Text>Responsável(eis): Prof.(a) Dr.(a) {assunto.Nm_CredProfessorResponsavel}   </Text>
                      </View>
                    :<Text></Text>}
                    {(data.assuntoParameters[Number(item.id)-1].Ind_NovoProfessor==='S')?
                      <Text>Novo Responsável: Prof.(a) Dr.(a) {assunto.Nm_CredNovoProfessor} </Text>:<Text></Text>}
                    {(data.assuntoParameters[Number(item.id)-1].Ind_MotivoAssunto==='S')?
                      <Text>Motivo: {assunto.ds_MotivoItem} </Text>:<Text></Text>}

                    {(data.assuntoParameters[Number(item.id)-1].Ind_AtribuiCreditos==='S')?
                    <Text>Tem publicacoes</Text>
                    : <Text>Nao tem publicacoes</Text>}



                    {(data.assuntoParameters[Number(item.id)-1].Ind_Relator==='S') ? <View key={'orientador'+assunto.Cd_ItemReuniao}>
                      <Text>Relator Indicado: {assunto.nm_Relator} - {assunto.ds_lotRelator} </Text> 
                      {(assunto.ds_ObservacaoRelator && assunto.ds_ObservacaoRelator.length>0)?
                      <Text>Observação do Relator: {assunto.ds_ObservacaoRelator} </Text>
                      :<Text></Text>}
                    </View>
                     :<Text></Text>}
                    {(data.assuntoParameters[Number(item.id)-1].Ind_SolicitaPrazo==='S')?
                      <Text> Prazo de {data.tipoPrazos[Number(assunto.Cd_TipoSolicitacaoPrazo)-1]} Solicitado: {assunto.qt_SolicitacaoPrazoDiasSolicitados} </Text>
                      :<Text></Text>  
                    }
                  
                    {tipo !== 'deliberacao' && assunto.ds_ObservacaoNaoPublicavelItem && assunto.ds_ObservacaoNaoPublicavelItem.length>0?
                      <Text>Observação Não Publicavel: {assunto.ds_ObservacaoNaoPublicavelItem} </Text>:<Text></Text>}

                  
                    {(assunto.Ind_AdReferendum==='S')?
                    <View key={'adref'+item.id} style={styles.red}>
                      <Text style={styles.red}>
                        Ad Referendum em {moment.tz(assunto.dt_AdReferendum, tz).format('DD/MM/YYYY')} </Text>
                        <Text style={styles.red}> Motivo: {assunto.ds_AdReferendum} </Text>                   
                    </View>
                    :<View><Text></Text></View>}
                    
                    {tipo === 'pauta' && assunto.ds_ObservacaoItem && assunto.ds_ObservacaoItem.length>0? <Text>Observação: {assunto.ds_ObservacaoItem}</Text>:<Text></Text>}
                    
                    {(tipo === 'ata' || tipo ==='deliberacao')? <Text style={styles.blue}> Obs: {assunto.Cd_ClassificacaoDeliberacao} {assunto.Ds_ObservacaoDeliberacao} </Text>: <Text></Text>} 
                  </View>
                ) 
              )} 
            </View>
            )
          
          )}
        
      
        {/* Items Table Header 
        <View style={[styles.row, styles.rowHeader]}>
          <Text>Description</Text>
          <Text>Qty</Text>
          <Text>Unit Price</Text>
          <Text>Total</Text>
        </View>

        {/* Items 
        {items.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text>{item.description}</Text>
            <Text>{item.quantity}</Text>
            <Text>${item.unitPrice.toFixed(2)}</Text>
            <Text>${item.total.toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals 
        <View style={styles.totalRow}>
          <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text>Tax: ${tax.toFixed(2)}</Text>
        </View>
        <View style={[styles.totalRow, { borderTopWidth: 2 }]}>
          <Text style={{ fontWeight: 'bold' }}>Total: ${total.toFixed(2)}</Text>
        </View>
*/}
{/* Assinatura 
          <View key='assinatura' style={styles.viewcenter}>
            <Image src='/assinatura.png' style={styles.assinatura}/>
            <Text style={[styles.bold,styles.section]}> {data.participantes.filter(user => (user.title==='Presidente'))[0].name}</Text>
            <Text style={styles.section}>Presidente </Text>
            <Text style={styles.section}> Comissão de Pós-Graduação </Text>
          </View> */} 


      </Page>
    </Document>
  );
};