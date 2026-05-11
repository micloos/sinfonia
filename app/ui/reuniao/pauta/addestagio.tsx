import Myhr from "./myhr";

export default function AddEstagio () {
    return (
        <div className="rounded-md bg-gray-50 p-4 md:p-2">
            <div className="mb-4 inline-block pr-4 w-full">
                <label htmlFor="ds_EstagioDisciplina" className="block text-sm font-medium text-gray-700">
                    Matéria Estágio:
                </label>
                <div className="relative mt-2 rounded-md  ">
                    <div className="relative">
                        <input 
                            id="ds_EstagioDisciplina" 
                            name="ds_EstagioDisciplina"
                            type="string"
                            placeholder="Materia"        
                            className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      
                        />
                    </div>
                </div>
            </div>
            <div className="mb-4 inline-block pr-4 w-1/3">
                Inicio Estagio
            </div>
            <div className="mb-4 inline-block pr-4 w-1/3">
                Fim Estagio
            </div>
            <div className="mb-4 inline-block pr-4 w-1/3">
                Creditos Estagio
            </div>
            <Myhr />
        </div>
    )
}