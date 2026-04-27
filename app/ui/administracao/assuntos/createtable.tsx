'use client'

import { AssuntoState, createAssunto } from '@/app/lib/administracao/actions';   
import { useActionState } from 'react';
import { mylog } from '@/app/lib/mylogger';
import { Button } from '@/app/ui/button';

export default function AdmCreateAssuntoForm({ nextNum }: { nextNum: number }) {
    const initialState: AssuntoState = { message: null, errors: {} };
    const [state, formAction] = useActionState(createAssunto, initialState);

    mylog("DBG",'/app/ui/administracao/assuntos/createtable', 'AdmCreateAssuntoForm' , "nextNum=", nextNum);

    return (
        
        <form action={formAction}>
            <input type="hidden" name="id" value={nextNum} />
            <div>
                <h1 className="text-2xl"> Criar Assunto {nextNum} </h1>
            </div>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4 inline-block w-full">
                    <label htmlFor="nome" className="mb-2 block text-sm font-medium">
                        Nome: 
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <input
                            id="nome"
                            name="nome"
                            type="string"
                            defaultValue=""
                            placeholder="Nome"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby='nome-error'
                        />
                    </div>
                    <div id="nome-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.nome &&
                            state.errors.nome.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>
                
                <div className="mb-4 inline-block w-full">
                    <label htmlFor="descricao" className="mb-2 block text-sm font-medium">
                        Descrição: 
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <input
                            id="descricao"
                            name="descricao"
                            type="string"
                            defaultValue=""
                            placeholder="Descrição"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby='descricao-error'
                        />
                    </div>
                    <div id="descricao-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.descricao &&
                            state.errors.descricao.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>
                <div className="mb-4 flex gap-10 justify-between w-full">
                    <div className="mb-4 inline-block">
                        <label htmlFor="retornavel" className="mb-2 block text-sm font-medium">
                            Retorno:
                        </label>
                        <div className="relative mt-2 rounded-md w-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    id="retornavel"
                                    name="retornavel"
                                    defaultValue=""
                                    className="peer inline w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>
            
                    <div className="mb-4 inline-block">
                        <label htmlFor="modeloDespacho" className="mb-2 block text-sm font-medium">
                            Modelo de Despacho:
                        </label>
                        <div className="relative mt-2 rounded-md w-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    id="modeloDespacho"
                                    name="modeloDespacho"
                                    defaultValue=""
                                    className="peer inline w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    <div className="rounded-md bg-gray-50 p-4 md:p-6">
                        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                        <h2 className="text-lg font-semibold">Parâmetros:</h2>
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                            <label htmlFor="ind_addref" className="mb-2 block text-sm font-medium">
                                Ad Referendum:
                            </label>
                            <input
                                type="checkbox"
                                id="ind_addref"
                                name="ind_addref"
                                value='S'
                                className="mb-2 mr-4"
                            />
                            <label htmlFor="ind_defesa" className="mb-2 block text-sm font-medium">
                                Defesa:
                            </label>
                            <input
                                type="checkbox"
                                id="ind_defesa"
                                name="ind_defesa"
                                value='S'
                                className="mb-2 mr-4"
                            />
                            <label htmlFor="ind_estagio" className="mb-2 block text-sm font-medium">
                                Estágio:
                            </label>
                            <input
                                type="checkbox"
                                id="ind_estagio"
                                name="ind_estagio"
                                value='S'
                                className="mb-2 mr-4"
                            />
                            <label htmlFor="ind_novo_orient" className="mb-2 block text-sm font-medium">
                                Novo Orientador:
                            </label>
                            <input
                                type="checkbox"
                                id="ind_novo_orient"
                                name="ind_novo_orient"
                                value='S'           
                                className="mb-2 mr-4"
                            />
                            <label htmlFor="ind_orientador" className="mb-2 block text-sm font-medium">
                                Orientador:
                            </label>
                            <input
                                type="checkbox"
                                id="ind_orientador"
                                name="ind_orientador"
                                value='S'
                                className="mb-2 mr-4"
                            />
                        </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <label htmlFor="ind_a_creditos" className="mb-2 block text-sm font-medium">
                        Atribuir Créditos:
                    </label>
                    <input
                        type="checkbox"
                        id="ind_a_creditos"
                        name="ind_a_creditos"
                        value='S'
                        className="mb-2 mr-4"
                    />
                    <label htmlFor="ind_deliber" className="mb-2 block text-sm font-medium">
                        Deliberação:
                    </label>
                    <input
                        type="checkbox"
                        id="ind_deliber"
                        name="ind_deliber"
                        value='S'
                        className="mb-2 mr-4"
                    />
                    <label htmlFor="ind_interessado" className="mb-2 block text-sm font-medium">
                        Interessado:
                    </label>
                    <input
                        type="checkbox"
                        id="ind_interessado"
                        name="ind_interessado"
                        value='S'
                    className="mb-2 mr-4"
                />
                <label htmlFor="ind_novo_plan" className="mb-2 block text-sm font-medium">
                    Novo Plano:
                </label>
                <input
                    type="checkbox"
                    id="ind_novo_plan"
                    name="ind_novo_plan"
                    value='S'
                    className="mb-2 mr-4"
                />
                <label htmlFor="ind_plano" className="mb-2 block text-sm font-medium">
                    Plano de Trabalho:
                </label>
                <input
                    type="checkbox"
                    id="ind_plano"
                    name="ind_plano"
                    value='S'
                    className="mb-2 mr-4"
                />                               
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <label htmlFor="ind_banca" className="mb-2 block text-sm font-medium">
                    Banca Examinadora:
                </label>
                <input
                    type="checkbox"
                    id="ind_banca"
                    name="ind_banca"
                    value='S'
                    className="mb-2 mr-4"
                />
                <label htmlFor="ind_disc_esp" className="mb-2 block text-sm font-medium">
                    Disciplina Especial:
                </label>
                <input
                    type="checkbox"
                    id="ind_disc_esp"
                    name="ind_disc_esp"
                    value='S'
                    className="mb-2 mr-4"
                />
                <label htmlFor="ind_motivo" className="mb-2 block text-sm font-medium">
                    Motivo:
                </label>
                <input
                    type="checkbox"
                    id="ind_motivo"
                    name="ind_motivo"
                    value='S'
                    className="mb-2 mr-4"
                />
                <label htmlFor="ind_novo_prof" className="mb-2 block text-sm font-medium">
                    Novo Professor:
                </label>
                <input
                    type="checkbox"
                    id="ind_novo_prof"
                    name="ind_novo_prof"
                    value='S'
                    className="mb-2 mr-4"
                />
                <label htmlFor="ind_relator" className="mb-2 block text-sm font-medium">
                    Relator:
                </label>
                <input
                    type="checkbox"
                    id="ind_relator"
                    name="ind_relator"
                    value='S'
                    className="mb-2 mr-4"
                />
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <label htmlFor="ind_cred_disc" className="mb-2 block text-sm font-medium">
                    Credenciamento de Disciplina:
                </label>
                <input
                    type="checkbox"
                    id="ind_cred_disc"
                    name="ind_cred_disc"
                    value='S'
                    className="mb-2 mr-4"
                />
                <label htmlFor="ind_disser_tese" className="mb-2 block text-sm font-medium">
                    Dissertação/Tese:
                </label>
                <input
                    type="checkbox"
                    id="ind_disser_tese"
                    name="ind_disser_tese"
                    value='S'
                    className="mb-2 mr-4"
                />
                <label htmlFor="ind_nao_pub" className="mb-2 block text-sm font-medium">
                    Não Publicável:
                </label>
                <input
                    type="checkbox"
                    id="ind_nao_pub"
                    name="ind_nao_pub"
                    value='S'
                    className="mb-2 mr-4"
                />
                <label htmlFor="ind_obs" className="mb-2 block text-sm font-medium">
                    Observação:
                </label>
                <input
                    type="checkbox"
                    id="ind_obs"
                    name="ind_obs"
                    value='S'
                    className="mb-2 mr-4"
                />
                <label htmlFor="ind_sol_praz" className="mb-2 block text-sm font-medium">
                    Solicitar Prazo:
                </label>
                <input
                    type="checkbox"
                    id="ind_sol_praz"
                    name="ind_sol_praz"
                    value='S'
                    className="mb-2 mr-4"
                />
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">    
                <label htmlFor="ind_data_apres" className="mb-2 block text-sm font-medium">
                    Data de Apresentação:
                </label>
                <input
                    type="checkbox"
                    id="ind_data_apres"
                    name="ind_data_apres"
                    value='S'
                    className="mb-2 mr-4"
                />
                <label htmlFor="ind_data_dep" className="mb-2 block text-sm font-medium">
                    Data de Depósito:
                </label>
                <input
                    type="checkbox"
                    id="ind_data_dep"
                    name="ind_data_dep"
                    value='S'
                    className="mb-2 mr-4"
                />
            </div>
        </div>
        </div>    
            
                
                <Button type="submit">Criar Assunto</Button>
            </div>
        </form>
    );
}