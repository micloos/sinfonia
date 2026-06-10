"use client";

import { AssuntoParameters, Assuntos } from "@/app/lib/definitions";
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

import { useState, useActionState, useEffect } from 'react';
import { createItemObject} from "@/app/lib/reuniao/pauta/actions";
import { Button } from "../button";

import type { AddPautaFormData, Banca, ItemReuniaoState, Interessado, AdReferendumType, Apresentacao, Plano, Orientador, 
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
   Shadow} from "@/app/lib/reuniao/definitions";
// import { set, string } from "zod";
// import { create } from "domain";
// import BancaTable from "./pauta/banca";



const filename = 'app/ui/reuniao/addpauta';

export default  function AddPauta( {reuniao, assuntos, indices, itemReuniao, itemReuniaoObject}: {  
    reuniao:number;
    assuntos: Assuntos[];
    indices: AssuntoParameters[];
    itemReuniao: number;
    itemReuniaoObject: ItemReuniaoResponse;
}) 
{
  const initialState : ItemReuniaoState = { message:null};
//  const sparams = useSearchParams();
  // const cd_assunto =  sparams.get('cd_assunto') || '1';
  mylog("DBG",filename, 'AddPauta' , "reuniaoNumber=", reuniao);
  // mylog("DBG",filename, 'AddPauta Teste' , "assuntos[10]=", assuntos[10]);
  
  mylog("DBG",filename, 'AddPauta Teste' , "itemReuniao=", itemReuniao);
  mylog("DBG",filename, 'AddPauta Teste' , "itemReuniaoObject=", itemReuniaoObject);
  const [cd_itemReuniao, createItemReuniao] = useState(0);

  const listaItemReuniao = itemReuniaoObject ? [itemReuniaoObject] : [];
  mylog("ERROR",filename, 'AddPauta Teste' , "listaItemReuniao=", listaItemReuniao);
  // mylog("ERROR",filename, 'AddPauta Teste' , "listaitemReuniao=", JSON.stringify(listaItemReuniao[0].banca));

  useEffect (() => {
        if (itemReuniao) {
          createItemReuniao(itemReuniao);
        } else {
          const createNextItem = async () => {
            
            createItemReuniao(0)
          }
      createNextItem()
      console.log(filename, 'AddPauta', 'useEffect createNextItem itemReuniao=', itemReuniao);
    }
  },[itemReuniao])
  

  mylog("DBG",filename, 'AddPauta Teste' , "cd_ItemReuniao =", cd_itemReuniao);
  

  const [state,formaction] = useActionState( createItemObject,initialState)

  mylog("DBG",filename, 'AddPauta Teste','state = ',state);


  const [formData, setFormData] = useState<AddPautaFormData>({
      bancaMembers: itemReuniaoObject ? itemReuniaoObject.banca : [],
      interessado: itemReuniaoObject ? { nm_interessado: itemReuniaoObject.nm_Interessado, ds_areainteressado: itemReuniaoObject.ds_AreaInteressado, ds_nivelinteressado: itemReuniaoObject.ds_NivelInteressado } : { nm_interessado: '', ds_areainteressado: '', ds_nivelinteressado: '' },
      adReferendum: itemReuniaoObject ? { ind_adreferendum: itemReuniaoObject.Ind_AdReferendum, ds_AdReferendum: itemReuniaoObject.ds_AdReferendum, dt_AdReferendum: itemReuniaoObject.dt_AdReferendum } : { ind_adreferendum: '', ds_AdReferendum: '', dt_AdReferendum: '' } as AdReferendumType,
      apresentacao: itemReuniaoObject ? { dt_apresentacao: itemReuniaoObject.dt_Apresentacao } as Apresentacao : { dt_apresentacao: '' } as Apresentacao,
      planotrabalho: itemReuniaoObject ? { ds_TituloPlanoTrabalho: itemReuniaoObject.ds_TituloPlanoTrabalho } as Plano : { ds_TituloPlanoTrabalho: '' } as Plano,
      ds_TituloDissertacaoTese: (itemReuniaoObject && itemReuniaoObject.ds_TituloDissertacaoTese) ? { ds_TituloDissertacaoTese : itemReuniaoObject.ds_TituloDissertacaoTese } as TituloTese: {ds_TituloDissertacaoTese: ''} as TituloTese,
      orientador: itemReuniaoObject ? { nm_Orientador: itemReuniaoObject.nm_Orientador, ds_LotOrientador: itemReuniaoObject.ds_LotOrientador } : { nm_Orientador: '', ds_LotOrientador: '' } as Orientador,
      observacao: (itemReuniaoObject && itemReuniaoObject.ds_ObservacaoItem) ? { ds_ObservacaoItem: itemReuniaoObject.ds_ObservacaoItem } as Observacao : { ds_ObservacaoItem: '' } as Observacao,
      observacaoNP: (itemReuniaoObject && itemReuniaoObject.ds_ObservacaoNaoPublicavelItem) ? { ds_ObservacaoNaoPublicavelItem: itemReuniaoObject.ds_ObservacaoNaoPublicavelItem } as ObservacaoNP : { ds_ObservacaoNaoPublicavelItem: '' } as ObservacaoNP,
      relatorData: (itemReuniaoObject && itemReuniaoObject.nm_Relator) ? { nm_Relator: itemReuniaoObject.nm_Relator, ds_ObservacaoRelator: itemReuniaoObject.ds_ObservacaoRelator, ds_LotRelator: itemReuniaoObject.ds_LotRelator } as Relator : { nm_Relator: '', ds_ObservacaoRelator: '', ds_LotRelator: '' } as Relator,
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
      disciplinaEspecial: (itemReuniaoObject) ? itemReuniaoObject.disciplinaEspecial : [] as DisciplinaEspecial[]
  });
mylog ("ERROR",filename, 'AddPauta', 'creditos = ', formData.creditos);


// const [numAssunto, setNumAssunto] = useState<number>(0);

const shadowData = {} as Shadow; 

const handleObservacaoChange = (observacaoData: Observacao) => {
    setFormData(prev => ({ 
        ...prev,
        observacao: observacaoData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

const handleObservacaoNPChange = (observacaoNPData: ObservacaoNP) => {
    setFormData(prev => ({ 
        ...prev,
        observacaoNP: observacaoNPData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

  const handleDepositoChange = (depositoData: Deposito) => {
    setFormData(prev => ({ 
        ...prev,
        deposito: depositoData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

  const handleNovoOrientadorChange = (novoOrientadorData: NovoOrientador) => {
    setFormData(prev => ({ 
        ...prev,
        novoOrientador: novoOrientadorData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

  const handleDissertacaoTeseChange = (dissertacaoTeseData: TituloTese) => {
    setFormData(prev => ({ 
        ...prev,
        ds_TituloDissertacaoTese: dissertacaoTeseData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }



const handleOrientadorChange = (orientadorData: Orientador) => {
    setFormData(prev => ({ 
        ...prev,
        orientador: orientadorData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

const handleDisciplinaEspecialChange = (disciplinaEspecialData: DisciplinaEspecial[]) => {
    setFormData(prev => ({ ...prev, disciplinaEspecial: disciplinaEspecialData  }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  };

  const handleBancaChange = (bancaData: Banca[]) => {
    setFormData(prev => ({ ...prev, bancaMembers: bancaData }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  };

const handleCreditosChange = (creditosData: Credito[]) => {
    setFormData(prev => ({ ...prev, creditos: creditosData }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  };

const handleNovoProfessorChange = (novoProfessorData: NovoProfessor) => {
    setFormData(prev => ({ ...prev, novoProfessor: novoProfessorData }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  };

const handleInteressadoChange = (interessadoData: Interessado, shadowData: Orientador ) => {
    setFormData(prev => ({ 
        ...prev,
        orientador: shadowData,
        interessado: interessadoData
    }));
    mylog ("DBG",filename, 'AddPauta', 'HandleInterassodChange formData = ', formData);
  }

const handleAdReferendumChange = (adReferendumData: AdReferendumType) => {
    setFormData(prev => ({ 
        ...prev,
        adReferendum: adReferendumData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

  const handleApresentacaoChange = (apresentacaoData: Apresentacao) => {
    setFormData(prev => ({ 
        ...prev,
        apresentacao: apresentacaoData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

  const handleDefesaChange = (defesaData: Defesa) => {
    setFormData(prev => ({ 
        ...prev,
        defesa: defesaData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

  const handlePlanoChange = (planoData: Plano) => {
    setFormData(prev => ({ 
        ...prev,
        planotrabalho: planoData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

  const handleCredenciamentoDisciplinaChange = (credenciamentoDisciplinaData: CredenciamentoDisciplina) => {
    setFormData(prev => ({ 
        ...prev,
        credenciamentoDisciplina: credenciamentoDisciplinaData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

  const handleAssuntoChange = (assunto: Assunto) => {
    setFormData(prev => ({ 
        ...prev,
        cd_AssuntoReuniao: assunto
    }));
    // setNumAssunto(Number(assunto.cd_AssuntoReuniao)-1);
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

  const handleMotivoChange = (motivoData: MotivoAssunto) => {
    setFormData(prev => ({ 
        ...prev,
        ds_MotivoItem: motivoData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

  const handleNovoPlanoChange = (novoPlanoData: NovoPlano) => {
    setFormData(prev => ({ 
        ...prev,
        novoPlano: novoPlanoData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

  const handleEstagioChange = (estagioData: Estagio) => {
    setFormData(prev => ({ 
        ...prev,
        estagio: estagioData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

  const handleRelatorChange = (relatorData: Relator) => {
    setFormData(prev => ({ 
        ...prev,
        relatorData: relatorData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

  const handlePrazoChange = (prazoData: Prazo) => {
    setFormData(prev => ({ 
        ...prev,
        prazo: prazoData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

  return (
    <main>
      <h1 className="mb-10 font-bold text-xl">Adicionar Pauta para Reunião {reuniao}  Item {cd_itemReuniao} </h1>
     {/* <form  action={handleSubmit}> */}
      <form  action={formaction}> 
        <input type="hidden" id="cd_reuniao" name="cd_reuniao" value={reuniao} />
        <input type="hidden" id="cd_itemreuniao" name="cd_itemreuniao" value={cd_itemReuniao} />
        <input type="hidden" id="cd_AssuntoReuniao" name="cd_AssuntoReuniao" value={formData.cd_AssuntoReuniao.cd_AssuntoReuniao} />
        
        <SelectAssunto assuntos={assuntos} data={formData.cd_AssuntoReuniao}  onChange={handleAssuntoChange} />
        {/* DONE Assunto Reuniao */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_Interessado === 'S' && (<AddPautaInteressado data={formData.interessado} onChange={handleInteressadoChange} shadow={shadowData} isRequired />)}
        {/* DONE Interessado */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_Orientador === 'S' && (<AddPautaOrientador data={formData.orientador} onChange={handleOrientadorChange}  />)}
        {/* DONE Orientador */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_NovoOrientador === 'S' && ( <AddNovoOrientador data={formData.novoOrientador} onChange={handleNovoOrientadorChange} />)}  {/* 9 10 */}
        {/* DONE Novo Orientador */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_AdReferendum === 'S' && (<AddAdReferendum data={formData.adReferendum || { ind_adreferendum: 'N', ds_AdReferendum: '', dt_AdReferendum: '' }} onChange={handleAdReferendumChange} />)}
        {/* DONE Ad Referendum */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_Defesa === 'S' && (<AddDefesa data={formData.defesa}  onChange={handleDefesaChange}/>)}
        {/* DONE Defesa */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_DataApresentacao === 'S' && ( <AddDtApresentacao data={formData.apresentacao} onChange={handleApresentacaoChange} isRequired/>)}
        {/* DONE Data Apresentacao */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_PlanoTrabalho === 'S' && ( <AddPlano data={formData.planotrabalho} onChange={handlePlanoChange}  />)}
        {/* DONE Plano de Trabalho */}
        
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_AtribuiCreditos === 'S' && ( <AddCreditos data={formData.creditos} onChange={handleCreditosChange} />)}
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
                                        maxMembers={10}
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
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_ObservacaoAssunto === 'S' && ( <AddObservacao data= {formData.observacao} onChange={handleObservacaoChange} />)}
        {/* DONE Observacao Assunto */}
        {indices[Number(formData.cd_AssuntoReuniao.cd_AssuntoReuniao)-1].Ind_ObservacaoNaoPublicavel === 'S' && ( <AddObsNaoPub data={formData.observacaoNP} onChange={handleObservacaoNPChange} />)}
        {/* DONE Observacao Nao Publicavel */}

        <Button type="submit">Salvar Pauta</Button>
      </form>
    </main>
  );
}