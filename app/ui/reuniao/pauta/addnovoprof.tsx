import Myhr from "./myhr";

export default function AddNovoProfessor () {
        return(
        <div className="rounded-md bg-gray-50 p-4 md:p-2">
            <div className="mb-4 inline-block pr-4 w-full">
                <label htmlFor="Nm_CredNovoProfessor" className="block text-sm font-medium text-gray-700">
                    Novo Professor Responsável:
                </label>
                <div className="relative mt-2 rounded-md  ">
                    <div className="relative">
                        <input 
                            id="Nm_CredNovoProfessor" 
                            name="Nm_CredNovoProfessor"
                            type="string"
                            placeholder="Professor"        
                            className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      
                        />
                    </div>
                </div>
            </div>
            <Myhr />
        </div>
        )
}