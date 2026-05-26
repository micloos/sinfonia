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

import { useState, useActionState, useEffect } from 'react';
import { createItemObject} from "@/app/lib/reuniao/pauta/actions";
import { Button } from "../button";

import type { AddPautaFormData, Banca, ItemReuniaoState, Interessado, AdReferendumType, Apresentacao, Plano, Orientador,  Observacao, ObservacaoNP, ItemReuniaoResponse, Relator } from "@/app/lib/reuniao/definitions";
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
  const sparams = useSearchParams();
  const cd_assunto =  sparams.get('cd_assunto') || '1';
  mylog("DBG",filename, 'AddPauta' , "reuniaoNumber=", reuniao);
  // mylog("DBG",filename, 'AddPauta Teste' , "assuntos[10]=", assuntos[10]);
  
  const numAssunto = Number(cd_assunto)?Number(cd_assunto)-1:0;
  mylog("DBG",filename, 'AddPauta Teste','numAssunto = ',numAssunto)
  mylog("DBG",filename, 'AddPauta Teste' , "assunto=", assuntos[numAssunto]);
  mylog("DBG",filename, 'AddPauta Teste' , "indices=", indices[numAssunto]);
  mylog("DBG",filename, 'AddPauta Teste' , "itemReuniao=", itemReuniao);
  mylog("DBG",filename, 'AddPauta Teste' , "itemReuniaoObject=", itemReuniaoObject);
  const [cd_itemReuniao, createItemReuniao] = useState(0);

  const listaItemReuniao = itemReuniaoObject ? [itemReuniaoObject] : [];
  mylog("DBG",filename, 'AddPauta Teste' , "listaItemReuniao=", listaItemReuniao);

  useEffect (() => {
        if (itemReuniao) {
          createItemReuniao(itemReuniao);
        } else {
          const createNextItem = async () => {
            
            createItemReuniao(0)
          }
      createNextItem()
    }
  },[itemReuniao])
  

  mylog("DBG",filename, 'AddPauta Teste' , "cd_ItemReuniao =", cd_itemReuniao);
  mylog("DBG",filename, 'AddPauta Teste','numAssunto = ',numAssunto);

  const [state,formaction] = useActionState( createItemObject,initialState)

  mylog("DBG",filename, 'AddPauta Teste','state = ',state);

  const [formData, setFormData] = useState<AddPautaFormData>({
      bancaMembers: itemReuniaoObject ? itemReuniaoObject.banca : [],
      interessado: itemReuniaoObject ? { nm_interessado: itemReuniaoObject.nm_Interessado, ds_areainteressado: itemReuniaoObject.ds_AreaInteressado, ds_nivelinteressado: itemReuniaoObject.ds_NivelInteressado } : { nm_interessado: '', ds_areainteressado: '', ds_nivelinteressado: '' },
      adReferendum: itemReuniaoObject ? { ind_adreferendum: itemReuniaoObject.Ind_AdReferendum, ds_AdReferendum: itemReuniaoObject.ds_AdReferendum, dt_AdReferendum: itemReuniaoObject.dt_AdReferendum } : { ind_adreferendum: '', ds_AdReferendum: '', dt_AdReferendum: '' } as AdReferendumType,
      apresentacao: itemReuniaoObject ? { dt_apresentacao: itemReuniaoObject.dt_Apresentacao } as Apresentacao : { dt_apresentacao: '' } as Apresentacao,
      planotrabalho: itemReuniaoObject ? { ds_TituloPlanoTrabalho: itemReuniaoObject.ds_TituloPlanoTrabalho } as Plano : { ds_TituloPlanoTrabalho: '' } as Plano,
      orientador: itemReuniaoObject ? { nm_orientador: itemReuniaoObject.nm_Orientador, ds_LotOrientador: itemReuniaoObject.ds_LotOrientador } : { nm_orientador: '', ds_LotOrientador: '' } as Orientador,
      observacao: (itemReuniaoObject && itemReuniaoObject.ds_ObservacaoItem) ? { ds_ObservacaoItem: itemReuniaoObject.ds_ObservacaoItem } as Observacao : { ds_ObservacaoItem: '' } as Observacao,
      observacaoNP: (itemReuniaoObject && itemReuniaoObject.ds_ObservacaoNaoPublicavelItem) ? { ds_ObservacaoNaoPublicavelItem: itemReuniaoObject.ds_ObservacaoNaoPublicavelItem } as ObservacaoNP : { ds_ObservacaoNaoPublicavelItem: '' } as ObservacaoNP,
      relatorData: (itemReuniaoObject && itemReuniaoObject.nm_Relator) ? { nm_Relator: itemReuniaoObject.nm_Relator, ds_ObservacaoRelator: itemReuniaoObject.ds_ObservacaoRelator, ds_LotRelator: itemReuniaoObject.ds_LotRelator } as Relator : { nm_Relator: '', ds_ObservacaoRelator: '', ds_LotRelator: '' } as Relator,
      cd_AssuntoReuniao: (itemReuniaoObject && itemReuniaoObject.Cd_AssuntoReuniao) ? itemReuniaoObject.Cd_AssuntoReuniao : cd_assunto,
  });

mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);

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



const handleOrientadorChange = (orientadorData: Orientador) => {
    setFormData(prev => ({ 
        ...prev,
        orientador: orientadorData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  }

const handleBancaChange = (bancaData: Banca[]) => {
    setFormData(prev => ({ ...prev, bancaMembers: bancaData }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
  };

const handleInteressadoChange = (interessadoData: Interessado) => {
    setFormData(prev => ({ 
        ...prev,
        interessado: interessadoData
    }));
    mylog ("DBG",filename, 'AddPauta', 'formData = ', formData);
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

  const handlePlanoChange = (planoData: Plano) => {
    setFormData(prev => ({ 
        ...prev,
        planotrabalho: planoData
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

  

  return (
    <main>
      <h1 className="mb-10 font-bold text-xl">Adicionar Pauta para Reunião {reuniao}  Item {cd_itemReuniao} </h1>
     {/* <form  action={handleSubmit}> */}
      <form  action={formaction}> 
        <input type="hidden" id="cd_reuniao" name="cd_reuniao" value={reuniao} />
        <input type="hidden" id="cd_itemreuniao" name="cd_itemreuniao" value={cd_itemReuniao} />
        <input type="hidden" id="cd_AssuntoReuniao" name="cd_AssuntoReuniao" value={formData.cd_AssuntoReuniao} />
        
        <SelectAssunto assuntos={assuntos} assunto={formData.cd_AssuntoReuniao}   />
        {/* DONE Assunto Reuniao */}
        {indices[numAssunto].Ind_Interessado === 'S' && (<AddPautaInteressado data={formData.interessado} onChange={handleInteressadoChange } isRequired />)}
        {/* DONE Interessado */}
        {indices[numAssunto].Ind_Orientador === 'S' && (<AddPautaOrientador data={formData.orientador} onChange={handleOrientadorChange}  />)}
        {/* DONE Orientador */}
        {indices[numAssunto].Ind_NovoOrientador === 'S' && ( <AddNovoOrientador />)}  {/* 9 10 */}
        {/* TODO Novo Orientador */}
        {indices[numAssunto].Ind_AdReferendum === 'S' && (<AddAdReferendum data={formData.adReferendum || { ind_adreferendum: 'N', ds_AdReferendum: '', dt_AdReferendum: '' }} onChange={handleAdReferendumChange} />)}
        {/* DONE Ad Referendum */}
        {indices[numAssunto].Ind_Defesa === 'S' && (<AddDefesa />)}
        {/* TODO Defesa */}
        {indices[numAssunto].Ind_DataApresentacao === 'S' && ( <AddDtApresentacao data={formData.apresentacao} onChange={handleApresentacaoChange} isRequired/>)}
        {/* DONE Data Apresentacao */}
        {indices[numAssunto].Ind_PlanoTrabalho === 'S' && ( <AddPlano data={formData.planotrabalho} onChange={handlePlanoChange}  />)}
        {/* DONE Plano de Trabalho */}
        
        {indices[numAssunto].Ind_AtribuiCreditos === 'S' && ( <AddCreditos />)}
        {/* TODO Creditos */}
        
        {indices[numAssunto].Ind_SolicitaPrazo === 'S' && ( <AddPrazo />)}
        {/* TODO Prazo */}
        {indices[numAssunto].Ind_NovoPlano === 'S' && ( <AddNovoPlano />)}  {/* 11 12 */}
        {/* TODO Novo Plano */}
        
        
        {indices[numAssunto].Ind_DataDeposito === 'S' && ( <AddDeposito />)}  {/* 16 18 */}
        {/* TODO Data Deposito */}
        {indices[numAssunto].Ind_DissertacaoTese === 'S' && ( <AddTituloTese />)}  {/* 16 17 18 */}
        {/* TODO Titulo Tese */}
        {indices[numAssunto].Ind_BancaExaminadora === 'S' && ( <AddBanca
                                        data={formData.bancaMembers}
                                        onChange={handleBancaChange}
                                        maxMembers={10}
                                      />)} {/* 2 .. */}
        {/* DONE Banca Examinadora */}
        
        {indices[numAssunto].Ind_DisciplinaEspecial === 'S' && ( <AddDisciplina />)} {/* 20 */}
        {/* TODO Disciplina Especial */}
        {indices[numAssunto].Ind_Estagio === 'S' && ( <AddEstagio />)} {/* 38 */}
        {/* TODO Estagio */}
        
        {indices[numAssunto].Ind_Relator === 'S' && ( <AddRelator 
                                                        data={formData.relatorData }
                                                        onChange = {handleRelatorChange}
                                                      />)}
        {/* DONE Relator */}
        {indices[numAssunto].Ind_CredenciamentoDisciplina === 'S' && ( <AddCredenciamentoDisciplina />)}
        {/* TODO Credenciamento Disciplina */}
        {indices[numAssunto].Ind_NovoProfessor === 'S' && ( <AddNovoProfessor />)}  {/* 26 30 31 32 */}
        {/* TODO Novo Professor */}

        {indices[numAssunto].Ind_MotivoAssunto === 'S' && ( <AddMotivo />)}  {/* 9 10 11 12 */}
        {/* TODO Motivo Assunto */}
        {indices[numAssunto].Ind_ObservacaoAssunto === 'S' && ( <AddObservacao data= {formData.observacao} onChange={handleObservacaoChange} />)}
        {/* DONE Observacao Assunto */}
        {indices[numAssunto].Ind_ObservacaoNaoPublicavel === 'S' && ( <AddObsNaoPub data={formData.observacaoNP} onChange={handleObservacaoNPChange} />)}
        {/* DONE Observacao Nao Publicavel */}

        <Button type="submit">Adicionar Pauta</Button>
      </form>
    </main>
  );
}