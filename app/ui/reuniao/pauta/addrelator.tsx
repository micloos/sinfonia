import Myhr from "./myhr";

export default function AddRelator () {
    return(
        <div className="rounded-md bg-gray-50 p-4 md:p-2">
            <div className="mb-4 inline-block pr-4 border-r-4 w-4/5">
                <label htmlFor="nm_relator" className="block text-sm font-medium">
                    Relator:
                </label>
                <div className="relative mt-2 rounded-md w-70  ">
                    <div className="relative">
                        <input 
                            id="nm_relator" 
                            name="nm_relator"
                            type="string"
                            placeholder="Relator"        
                            className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outlie-2 placeholder:text-gray-500"
                        />
                    </div>
                </div>                    
            </div>
            <div className="mb-4 inline-block w-1/5">
                <label htmlFor="ds_lotRelator" className="mb-2 block text-sm font-medium">
                    Lotação do Relator
                </label>
                <div className="relative mt-2 rounded-md ">
                    <div className="relative pr-4">  
                        <input id="ds_lotRelator" name="ds_lotRelator" 
                            type="string"
                            className="peer inline w-full rounded-md border-gray-400 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Lotação do Relator" 
                        />
                    </div>
                </div>
            </div>
            <div className="mb-4 inline-block w-full">
                <label htmlFor="ds_ObservacaoRelator" className="mb-2 block text-sm font-medium">
                    Observação Relator:
                </label>
                <div className="relative mt-2 rounded-md ">
                    <div className="relative pr-4">  
                        <input id="ds_ObservacaoRelator" name="ds_ObservacaoRelator" 
                            type="string"
                            className="peer inline w-full rounded-md border-gray-400 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Observação Relator" 
                        />
                    </div>
                </div>
            </div>
            <Myhr />
        </div>
        
    )
}