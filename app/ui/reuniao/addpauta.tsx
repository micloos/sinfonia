"use client";

import { AssuntoParameters, Assuntos } from "@/app/lib/definitions";
import { mylog } from "@/app/lib/mylogger";
import {useSearchParams} from 'next/navigation';
import AddPautaInteressado from "./pauta/interessado";    
import AddPautaOrientador from "./pauta/orientador";
import AddAdReferendum from "./pauta/adreferendum";
import AddDefesa from "./pauta/adddefesa";
import AddPlano from "./pauta/addplano";
import AddBanca from "./pauta/addbanca";
import AddRelator from "./pauta/addrelator";
import AddCreditos from "./pauta/addcreditos";
import AddPrazo from "./pauta/addpraz";


// import Interessado from "./pauta/interessado";
import SelectAssunto from "./pauta/selectAssunto";
import AddCredenciamentoDisciplina from "./pauta/addcreddisc";
import AddObsNaoPub from "./pauta/addobsnaopub";
import AddObservacao from "./pauta/addobservacao";
import AddMotivo from "./pauta/addmotivo";
import AddNovoPlano from "./pauta/addnovoplano";
import AddNovoOrientador from "./pauta/addnovoorient";
import AddNovoProfessor from "./pauta/addnovoprof";
import AddDeposito from "./pauta/adddeposito";
import AddTituloTese from "./pauta/addtitulotese";
import AddDtApresentacao from "./pauta/adddtapresent";
import AddDisciplina from "./pauta/adddisciplina";
import AddEstagio from "./pauta/addestagio";


const filename = 'app/ui/reuniao/addpauta';

export default  function AddPauta( {reuniao, assuntos, indices}: {  
    reuniao:number;
    assuntos: Assuntos[];
    indices: AssuntoParameters[];
}) 
{
  const sparams = useSearchParams();
  // const params = await props.params;
  //const reuniao = params?.reuniao || 1;
  // const assuntos = params?.assuntos || [];
  const assunto =  sparams.get('assunto') || '';
  mylog("DBG",filename, 'AddPauta' , "reuniaoNumber=", reuniao);
  mylog("DBG",filename, 'AddPauta Teste' , "assuntos[10]=", assuntos[10]);
 
  // mylog("DBG",filename, 'AddPauta Teste' , "indices=", indices);


  
  const numAssunto = Number(assunto)?Number(assunto)-1:0;
  mylog("DBG",filename, 'AddPauta Teste','numAssunto = ',numAssunto)
  mylog("DBG",filename, 'AddPauta Teste' , "assunto=", assuntos[numAssunto]);
  mylog("DBG",filename, 'AddPauta Teste' , "indices=", indices[numAssunto]);



  return (
    <main>
      <h1 className="mb-10 font-bold text-xl">Adicionar Pauta para Reunião {reuniao}</h1>
      <form>
        <SelectAssunto assuntos={assuntos} assunto={assunto}   />
        {indices[numAssunto].Ind_Interessado === 'S' && (<AddPautaInteressado />)}
        {indices[numAssunto].Ind_Orientador === 'S' && (<AddPautaOrientador />)}
        {indices[numAssunto].Ind_NovoOrientador === 'S' && ( <AddNovoOrientador />)}  {/* 9 10 */}
        {indices[numAssunto].Ind_AdReferendum === 'S' && (<AddAdReferendum />)}
        {indices[numAssunto].Ind_Defesa === 'S' && (<AddDefesa />)}
        {indices[numAssunto].Ind_DataApresentacao === 'S' && ( <AddDtApresentacao />)}
        {indices[numAssunto].Ind_PlanoTrabalho === 'S' && ( <AddPlano />)}
        
        
        {indices[numAssunto].Ind_AtribuiCreditos === 'S' && ( <AddCreditos />)}
        
        {indices[numAssunto].Ind_SolicitaPrazo === 'S' && ( <AddPrazo />)}
        {indices[numAssunto].Ind_NovoPlano === 'S' && ( <AddNovoPlano />)}  {/* 11 12 */}
        
        
        
        {indices[numAssunto].Ind_DataDeposito === 'S' && ( <AddDeposito />)}  {/* 16 18 */}
        {indices[numAssunto].Ind_DissertacaoTese === 'S' && ( <AddTituloTese />)}  {/* 16 17 18 */}
        
        {indices[numAssunto].Ind_BancaExaminadora === 'S' && ( <AddBanca />)} {/* 2 .. */}
        
        {indices[numAssunto].Ind_DisciplinaEspecial === 'S' && ( <AddDisciplina />)} {/* 20 */}
        {indices[numAssunto].Ind_Estagio === 'S' && ( <AddEstagio />)} {/* 38 */}
        
        {indices[numAssunto].Ind_Relator === 'S' && ( <AddRelator />)}
        {indices[numAssunto].Ind_CredenciamentoDisciplina === 'S' && ( <AddCredenciamentoDisciplina />)}
        {indices[numAssunto].Ind_NovoProfessor === 'S' && ( <AddNovoProfessor />)}  {/* 26 30 31 32 */}


        {indices[numAssunto].Ind_MotivoAssunto === 'S' && ( <AddMotivo />)}  {/* 9 10 11 12 */}
        {indices[numAssunto].Ind_ObservacaoAssunto === 'S' && ( <AddObservacao />)}
        {indices[numAssunto].Ind_ObservacaoNaoPublicavel === 'S' && ( <AddObsNaoPub />)}

        <button type="submit">Adicionar Pauta</button>
      </form>
    </main>
  );
}