"use client";

import { AssuntoParameters, Assuntos, TipoDeliberacao } from "@/app/lib/definitions";
import { mylog } from "@/app/lib/mylogger";
// import {useSearchParams} from 'next/navigation';
import AddPautaInteressado from "./pauta/interessado";    
import AddPautaOrientador from "./pauta/orientador";
import AddAdReferendum from "./pauta/adreferendum";
import AddDefesa from "./pauta/adddefesa";
import AddPlano from "./pauta/addplano";
import AddBanca from "./pauta/addbanca";
import AddRelator from "./pauta/addrelator";
import AddCreditos from "./pauta/addcreditos";
import AddPrazo from "./pauta/addpraz";
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
import ExecDeliberacao from "./pauta/deliberacao";

import { useState, useActionState, useEffect } from 'react';
import { execItemObject} from "@/app/lib/reuniao/pauta/actions";
import { Button } from "../button";

import type { ExecutarPautaFormData, Banca, ItemReuniaoState, Interessado, AdReferendumType, Apresentacao, Plano, Orientador, 
   Observacao, ObservacaoNP, ItemReuniaoResponse, Relator, TituloTese, MotivoAssunto,
   Assunto,
   NovoOrientador, NovoProfessor,
   NovoPlano, Defesa,
   CredenciamentoDisciplina,
   Deposito,
   Estagio,
   Prazo,
   Credito,
   DisciplinaEspecial,
   AtribuidorName,
   Deliberacao
  } from "@/app/lib/reuniao/definitions";

// import { set, string } from "zod";
// import { create } from "domain";
// import BancaTable from "./pauta/banca";



const filename = 'app/ui/reuniao/addpauta';

export default  function ExecutarPauta( {reuniao, assuntos, indices, tiposAttrCreditos, itemReuniao, itemReuniaoObject,deliberacoes}: {  
    reuniao:number;
    assuntos: Assuntos[];
    indices: AssuntoParameters[];
    tiposAttrCreditos: AtribuidorName[];
    itemReuniao: number;
    itemReuniaoObject: ItemReuniaoResponse;
    deliberacoes: TipoDeliberacao[];
}) 
{
  const initialState : ItemReuniaoState = { message:null};
//  const sparams = useSearchParams();
  // const cd_assunto =  sparams.get('cd_assunto') || '1';
  mylog("DBG",filename, 'ExecutarPauta' , "reuniaoNumber=", reuniao);
  // mylog("DBG",filename, 'ExecutarPauta Teste' , "assuntos[10]=", assuntos[10]);
  
  mylog("DBG",filename, 'ExecutarPauta Teste' , "itemReuniao=", itemReuniao);
  mylog("DBG",filename, 'ExecutarPauta Teste' , "itemReuniaoObject=", itemReuniaoObject);
  const [cd_itemReuniao, createItemReuniao] = useState(0);

  const listaItemReuniao = itemReuniaoObject ? [itemReuniaoObject] : [];
  const tipoAttrCreditos: AtribuidorName[] = tiposAttrCreditos ? tiposAttrCreditos:[];
  console.log("executar ",deliberacoes );
  mylog("INFO",filename, 'ExecutarPauta Teste' , "listaItemReuniao=", listaItemReuniao);
  

  useEffect (() => {
        if (itemReuniao) {
          createItemReuniao(itemReuniao);
        } else {
          const createNextItem = async () => {
            
            createItemReuniao(0)
          }
      createNextItem()
      console.log(filename, 'ExecutarPauta', 'useEffect createNextItem itemReuniao=', itemReuniao);
    }
  },[itemReuniao])
  

  mylog("DBG",filename, 'ExecutarPauta Teste' , "cd_ItemReuniao =", cd_itemReuniao);
  

  const [state,formaction] = useActionState( execItemObject,initialState)

  mylog("DBG",filename, 'ExecutarPauta Teste','state = ',state);


  const [formData, setFormData] = useState<ExecutarPautaFormData>({
      Cd_ClassificacaoDeliberacao: (itemReuniaoObject && itemReuniaoObject.ds_ObservacaoItem) ? { Cd_ClassificacaoDeliberacao: itemReuniaoObject.Cd_ClassificacaoDeliberacao} as Deliberacao:  {Cd_ClassificacaoDeliberacao: "1"} as Deliberacao,
      observacao: (itemReuniaoObject && itemReuniaoObject.ds_ObservacaoItem) ? { ds_ObservacaoItem: itemReuniaoObject.ds_ObservacaoItem } as Observacao : { ds_ObservacaoItem: '' } as Observacao,
      bancaMembers: itemReuniaoObject ? itemReuniaoObject.banca : [],
      interessado: itemReuniaoObject ? { nm_Interessado: itemReuniaoObject.nm_Interessado, ds_AreaInteressado: itemReuniaoObject.ds_AreaInteressado, ds_NivelInteressado: itemReuniaoObject.ds_NivelInteressado } : { nm_Interessado: '', ds_AreaInteressado: '', ds_NivelInteressado: '' },
      adReferendum: itemReuniaoObject ? { Ind_AdReferendum: itemReuniaoObject.Ind_AdReferendum, ds_AdReferendum: itemReuniaoObject.ds_AdReferendum, dt_AdReferendum: itemReuniaoObject.dt_AdReferendum } : { Ind_AdReferendum: '', ds_AdReferendum: '', dt_AdReferendum: '' } as AdReferendumType,
      apresentacao: itemReuniaoObject ? { dt_apresentacao: itemReuniaoObject.dt_Apresentacao } as Apresentacao : { dt_apresentacao: '' } as Apresentacao,
      planotrabalho: itemReuniaoObject ? { ds_TituloPlanoTrabalho: itemReuniaoObject.ds_TituloPlanoTrabalho } as Plano : { ds_TituloPlanoTrabalho: '' } as Plano,
      ds_TituloDissertacaoTese: (itemReuniaoObject && itemReuniaoObject.ds_TituloDissertacaoTese) ? { ds_TituloDissertacaoTese : itemReuniaoObject.ds_TituloDissertacaoTese } as TituloTese: {ds_TituloDissertacaoTese: ''} as TituloTese,
      orientador: itemReuniaoObject ? { nm_Orientador: itemReuniaoObject.nm_Orientador, ds_LotOrientador: itemReuniaoObject.ds_LotOrientador } : { nm_Orientador: '', ds_LotOrientador: '' } as Orientador,
      
      observacaoNP: (itemReuniaoObject && itemReuniaoObject.ds_ObservacaoNaoPublicavelItem) ? { ds_ObservacaoNaoPublicavelItem: itemReuniaoObject.ds_ObservacaoNaoPublicavelItem } as ObservacaoNP : { ds_ObservacaoNaoPublicavelItem: '' } as ObservacaoNP,
      relatorData: (itemReuniaoObject && itemReuniaoObject.nm_Relator ) ? { nm_Relator: itemReuniaoObject.nm_Relator, ds_ObservacaoRelator: itemReuniaoObject.ds_ObservacaoRelator, ds_LotRelator: itemReuniaoObject.ds_LotRelator } as Relator : { nm_Relator: '', ds_ObservacaoRelator: '', ds_LotRelator: '' } as Relator,

      cd_AssuntoReuniao: (itemReuniaoObject && itemReuniaoObject.Cd_AssuntoReuniao) ? {cd_AssuntoReuniao : itemReuniaoObject.Cd_AssuntoReuniao } as Assunto : {cd_AssuntoReuniao : '1'} as Assunto,
      ds_MotivoItem: (itemReuniaoObject && itemReuniaoObject.ds_MotivoItem) ? { ds_MotivoItem: itemReuniaoObject.ds_MotivoItem } as MotivoAssunto : { ds_MotivoItem: '' } as MotivoAssunto,
      novoOrientador: (itemReuniaoObject && itemReuniaoObject.nm_NovoOrientador) ? { nm_NovoOrientador: itemReuniaoObject.nm_NovoOrientador } as NovoOrientador : { nm_NovoOrientador: '' } as NovoOrientador,
      novoPlano: (itemReuniaoObject && itemReuniaoObject.ds_TituloPlanoTrabalho_NovoPlano) ? { ds_TituloPlanoTrabalho_NovoPlano: itemReuniaoObject.ds_TituloPlanoTrabalho_NovoPlano } as NovoPlano : { ds_TituloPlanoTrabalho_NovoPlano: '' } as NovoPlano,
      novoProfessor: (itemReuniaoObject && itemReuniaoObject.Nm_CredNovoProfessor) ? { nm_CredNovoProfessor: itemReuniaoObject.Nm_CredNovoProfessor } as NovoProfessor : { nm_CredNovoProfessor: '' } as NovoProfessor,
      credenciamentoDisciplina: (itemReuniaoObject && itemReuniaoObject.ds_CredenciamentoDisciplina) ? { ds_CredenciamentoDisciplina: itemReuniaoObject.ds_CredenciamentoDisciplina, Nm_CredProfessorResponsavel: itemReuniaoObject.Nm_CredProfessorResponsavel } as CredenciamentoDisciplina : { ds_CredenciamentoDisciplina: '', Nm_CredProfessorResponsavel: '' } as CredenciamentoDisciplina,
      defesa: (itemReuniaoObject ) ? { Dt_Defesa: itemReuniaoObject.Dt_Defesa } as Defesa : { Dt_Defesa: '' } as Defesa,
      deposito: (itemReuniaoObject && itemReuniaoObject.dt_Deposito) ? { dt_Deposito: itemReuniaoObject.dt_Deposito } as Deposito : { dt_Deposito: '' } as Deposito,
      estagio: (itemReuniaoObject && itemReuniaoObject.ds_EstagioDisciplina) ? { ds_EstagioDisciplina: itemReuniaoObject.ds_EstagioDisciplina, dt_EstagioPeriodoInicio: itemReuniaoObject.dt_EstagioPeriodoInicio, dt_EstagioPeriodoFim: itemReuniaoObject.dt_EstagioPeriodoFim, qt_EstagioCreditos: Number(itemReuniaoObject.qt_EstagioCreditos) } as Estagio : { ds_EstagioDisciplina: '', dt_EstagioPeriodoInicio: '', dt_EstagioPeriodoFim: '', qt_EstagioCreditos: 0 } as Estagio,
      prazo: (itemReuniaoObject && itemReuniaoObject.Cd_TipoSolicitacaoPrazo) ? { Cd_TipoSolicitacaoPrazo: Number(itemReuniaoObject.Cd_TipoSolicitacaoPrazo), qt_SolicitacaoPrazoDiasSolicitados: Number(itemReuniaoObject.qt_SolicitacaoPrazoDiasSolicitados) } as Prazo : { Cd_TipoSolicitacaoPrazo: 0, qt_SolicitacaoPrazoDiasSolicitados: 0 } as Prazo,
      creditos: (itemReuniaoObject) ? itemReuniaoObject.creditos : [] as Credito[],
      disciplinaEspecial: (itemReuniaoObject) ? itemReuniaoObject.disciplinaEspecial : [] as DisciplinaEspecial[],
      cd_ReuniaoOrigem: (itemReuniaoObject) ? itemReuniaoObject.cd_ReuniaoOrigem : ''
  });
mylog ("DBG",filename, 'ExecutarPauta', 'creditos = ', formData.creditos);


// const [numAssunto, setNumAssunto] = useState<number>(0);



const handleObservacaoChange = (observacaoData: Observacao) => {
    setFormData(prev => ({ 
        ...prev,
        observacao: observacaoData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }

const handleObservacaoNPChange = (observacaoNPData: ObservacaoNP) => {
    setFormData(prev => ({ 
        ...prev,
        observacaoNP: observacaoNPData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }

  const handleDepositoChange = (depositoData: Deposito) => {
    setFormData(prev => ({ 
        ...prev,
        deposito: depositoData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }

  const handleNovoOrientadorChange = (novoOrientadorData: NovoOrientador) => {
    setFormData(prev => ({ 
        ...prev,
        novoOrientador: novoOrientadorData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }

  const handleDissertacaoTeseChange = (dissertacaoTeseData: TituloTese) => {
    setFormData(prev => ({ 
        ...prev,
        ds_TituloDissertacaoTese: dissertacaoTeseData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }



const handleOrientadorChange = (orientadorData: Orientador) => {
    setFormData(prev => ({ 
        ...prev,
        orientador: orientadorData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }

const handleDisciplinaEspecialChange = (disciplinaEspecialData: DisciplinaEspecial[]) => {
    setFormData(prev => ({ ...prev, disciplinaEspecial: disciplinaEspecialData  }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  };

  const handleBancaChange = (bancaData: Banca[]) => {
    setFormData(prev => ({ ...prev, bancaMembers: bancaData }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  };

const handleCreditosChange = (creditosData: Credito[]) => {
    setFormData(prev => ({ ...prev, creditos: creditosData }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  };

const handleNovoProfessorChange = (novoProfessorData: NovoProfessor) => {
    setFormData(prev => ({ ...prev, novoProfessor: novoProfessorData }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  };

const handleInteressadoChange = (interessadoData: Interessado ) => {
    setFormData(prev => ({ 
        ...prev,
        interessado: interessadoData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'HandleInterassodChange shadowData = ', formData);
  }

const handleAdReferendumChange = (adReferendumData: AdReferendumType) => {
    setFormData(prev => ({ 
        ...prev,
        adReferendum: adReferendumData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }

  const handleApresentacaoChange = (apresentacaoData: Apresentacao) => {
    setFormData(prev => ({ 
        ...prev,
        apresentacao: apresentacaoData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }

  const handleDefesaChange = (defesaData: Defesa) => {
    setFormData(prev => ({ 
        ...prev,
        defesa: defesaData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }

  const handlePlanoChange = (planoData: Plano) => {
    setFormData(prev => ({ 
        ...prev,
        planotrabalho: planoData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }

  const handleCredenciamentoDisciplinaChange = (credenciamentoDisciplinaData: CredenciamentoDisciplina) => {
    setFormData(prev => ({ 
        ...prev,
        credenciamentoDisciplina: credenciamentoDisciplinaData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }

 

  const handleMotivoChange = (motivoData: MotivoAssunto) => {
    setFormData(prev => ({ 
        ...prev,
        ds_MotivoItem: motivoData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }

  const handleNovoPlanoChange = (novoPlanoData: NovoPlano) => {
    setFormData(prev => ({ 
        ...prev,
        novoPlano: novoPlanoData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }

  const handleEstagioChange = (estagioData: Estagio) => {
    setFormData(prev => ({ 
        ...prev,
        estagio: estagioData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }

  const handleRelatorChange = (relatorData: Relator) => {
    setFormData(prev => ({ 
        ...prev,
        relatorData: relatorData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }

  const handlePrazoChange = (prazoData: Prazo) => {
    setFormData(prev => ({ 
        ...prev,
        prazo: prazoData
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }

  const handleDeliberacaoChange = (delib: Deliberacao) => {
    mylog ("INFO",filename, 'ExecutarPauta', 'assunto(delib) = ', delib);
    setFormData(prev => ({ 
        ...prev,
        Cd_ClassificacaoDeliberacao: delib
    }));
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }
  
 const handleAssuntoChange = (assunto: Assunto) => {
    
    setFormData(prev => ({ 
        ...prev,
        cd_AssuntoReuniao: assunto
    }));
    // setNumAssunto(Number(assunto.cd_AssuntoReuniao)-1);
    mylog ("DBG",filename, 'ExecutarPauta', 'formData = ', formData);
  }


  return (
    <main>
      <h1 className="mb-10 font-bold text-xl">Executar Item de Pauta {cd_itemReuniao} para Reunião {reuniao} </h1>
     {/* <form  action={handleSubmit}> */}
      <form  action={formaction}> 
        <input type="hidden" id="cd_reuniao" name="cd_reuniao" value={reuniao} />
        <input type="hidden" id="Cd_ItemReuniao" name="Cd_ItemReuniao" value={cd_itemReuniao} />
        <input type="hidden" id="cd_AssuntoReuniao" name="cd_AssuntoReuniao" value={formData.cd_AssuntoReuniao.cd_AssuntoReuniao} />
        <input type="hidden" id="cd_ReuniaoOrigem" name="cd_ReuniaoOrigem" value={formData.cd_ReuniaoOrigem} />
        <input type="hidden" id="Cd_ClassificacaoDeliberacao" name="Cd_ClassificacaoDeliberacao" value={formData.Cd_ClassificacaoDeliberacao.Cd_ClassificacaoDeliberacao} />
        
        <ExecDeliberacao assuntos = {deliberacoes} data= {formData.Cd_ClassificacaoDeliberacao} onChange={handleDeliberacaoChange}/> 
                
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_ObservacaoAssunto === 'S' && ( <AddObservacao data= {formData.observacao} onChange={handleObservacaoChange} />)}
        {/* DONE Observacao Assunto */}

        <Button type="submit">Salvar Deliberaçao</Button>
        <SelectAssunto assuntos={assuntos} data={formData.cd_AssuntoReuniao}  onChange={handleAssuntoChange} />
        {/* DONE Assunto Reuniao */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_Interessado === 'S' && (<AddPautaInteressado data={formData.interessado} onChange={handleInteressadoChange}  isRequired />)}
        {/* DONE Interessado */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_Orientador === 'S' && (<AddPautaOrientador data={formData.orientador} onChange={handleOrientadorChange}  />)}
        {/* DONE Orientador */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_NovoOrientador === 'S' && ( <AddNovoOrientador data={formData.novoOrientador} onChange={handleNovoOrientadorChange} />)}  {/* 9 10 */}
        {/* DONE Novo Orientador */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_AdReferendum === 'S' && (<AddAdReferendum data={formData.adReferendum || { Ind_AdReferendum: 'N', ds_AdReferendum: '', dt_AdReferendum: '' }} onChange={handleAdReferendumChange} />)}
        {/* DONE Ad Referendum */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_Defesa === 'S' && (<AddDefesa data={formData.defesa}  onChange={handleDefesaChange}/>)}
        {/* DONE Defesa */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_DataApresentacao === 'S' && ( <AddDtApresentacao data={formData.apresentacao} onChange={handleApresentacaoChange} isRequired/>)}
        {/* DONE Data Apresentacao */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_PlanoTrabalho === 'S' && ( <AddPlano data={formData.planotrabalho} onChange={handlePlanoChange}  />)}
        {/* DONE Plano de Trabalho */}
        
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_AtribuiCreditos === 'S' && ( <AddCreditos data={formData.creditos} onChange={handleCreditosChange} tipoAttrCreditos={tipoAttrCreditos} />)}
        {/* DONE Creditos */}
        
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_SolicitaPrazo === 'S' && ( <AddPrazo data={formData.prazo} onChange={handlePrazoChange}/>)}
        {/* DONE Prazo */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_NovoPlano === 'S' && ( <AddNovoPlano data={formData.novoPlano} onChange={handleNovoPlanoChange}/>)}  {/* 11 12 */}
        {/* DONE Novo Plano */}
        
        
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_DataDeposito === 'S' && ( <AddDeposito data={formData.deposito} onChange={handleDepositoChange} />)}  {/* 16 18 */}
        {/* DONE Data Deposito */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_DissertacaoTese === 'S' && ( <AddTituloTese 
                                                        data={formData.ds_TituloDissertacaoTese}
                                                        onChange={handleDissertacaoTeseChange}
                                                      />)}  {/* 16 17 18 */}
        {/* DONE Titulo Tese */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_BancaExaminadora === 'S' && ( <AddBanca
                                        data={formData.bancaMembers}
                                        onChange={handleBancaChange}
                                        maxMembers={10}
                                      />)} {/* 2 .. */}
        {/* DONE Banca Examinadora */}
        
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_DisciplinaEspecial === 'S' && ( <AddDisciplina 
                                        data={formData.disciplinaEspecial}
                                        onChange={handleDisciplinaEspecialChange} 
                                        maxMembers={100}
                                    />)} {/* 20 */}
        {/* DONE Disciplina Especial Importante*/}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_Estagio === 'S' && ( <AddEstagio data={formData.estagio} onChange={handleEstagioChange}/>) }{/* 38 */}
        {/* DONE Estagio */}
        
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_Relator === 'S' && ( <AddRelator 
                                                        data={formData.relatorData }
                                                        onChange = {handleRelatorChange}
                                                      />)}
        {/* DONE Relator */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_CredenciamentoDisciplina === 'S' && ( <AddCredenciamentoDisciplina data={formData.credenciamentoDisciplina} onChange={handleCredenciamentoDisciplinaChange} />)}
        {/* DONE Credenciamento Disciplina */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_NovoProfessor === 'S' && ( <AddNovoProfessor data={formData.novoProfessor} onChange={handleNovoProfessorChange} />)}  {/* 26 30 31 32 */}
        {/* DONE Novo Professor */}

        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_MotivoAssunto === 'S' && ( <AddMotivo data={formData.ds_MotivoItem} onChange={handleMotivoChange} />)}  {/* 9 10 11 12 */}
        {/* DONE Motivo Assunto */}

        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_ObservacaoNaoPublicavel === 'S' && ( <AddObsNaoPub data={formData.observacaoNP} onChange={handleObservacaoNPChange} />)}
        {/* DONE Observacao Nao Publicavel */}

       
      </form>
    </main>
  );
}