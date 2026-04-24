import { mylog } from "@/app/lib/mylogger";
const filename = 'app/sinfonia/administracao/assuntos/[id]/parametrize/page';

import { AdminAssuntoParametersType, AdminAssuntoType } from "@/app/lib/definitions";
import { updateAssunto } from "@/app/lib/administracao/actions";
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export async function EditParamsAssunto({
    assunto,
    assuntoParameters,
}: {
    assunto: AdminAssuntoType;
    assuntoParameters: AdminAssuntoParametersType;
}) 


{
  
    mylog("DBG", filename, 'AssEditTable' , "assunto=", assunto);
    mylog("DBG", filename, 'AssEditTable' , "assuntoParameters=", assuntoParameters);
    const updateAssuntoWithId = updateAssunto.bind(null, assunto.id.toString());
    return (
        <div>
        <h1 className="text-2xl" >Parametrizar Assunto: {assunto?.id} </h1>
        <form action={updateAssuntoWithId}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
            <div className="mb-4 inline-block w-full">
                <label htmlFor="nome" className="mb-2 block text-sm font-medium">
                    Nome:
                </label>
                <div className="relative mt-2 rounded-md w-auto">
                    <div className="relative">
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            defaultValue={assunto?.nome}
                            className="peer inline w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-4 inline-block w-full">
                <label htmlFor="descricao" className="mb-2 block text-sm font-medium">
                    Descrição:
                </label>
                <div className="relative mt-2 rounded-md w-auto">
                    <div className="relative">
                        <input
                            type="text"
                            id="descricao"
                            name="descricao"
                            defaultValue={assunto?.descricao}
                            className="peer inline w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                    </div>
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
                            defaultValue={assunto?.retornavel}
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
                            defaultValue={assunto?.modeloDespacho}
                            className="peer inline w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                    </div>
                </div>
            </div>
            </div>
        </div>


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
                    defaultChecked={assuntoParameters?.ind_addref === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_defesa === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_estagio === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_novo_orient === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_orientador === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_a_creditos === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_deliber === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_interessado === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_novo_plan === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_plano === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_banca === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_disc_esp === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_motivo === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_novo_prof === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_relator === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_cred_disc === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_disser_tese === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_nao_pub === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_obs === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_sol_praz === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_data_apres === 'S'}
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
                    defaultChecked={assuntoParameters?.ind_data_dep === 'S'}
                    className="mb-2 mr-4"
                />
                
                

            </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/sinfonia/administracao/assuntos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Voltar
        </Link>
        <Button type="submit">Salvar</Button>
      </div>
        </form>

        </div>
    )
}