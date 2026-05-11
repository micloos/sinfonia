import Myhr from "./myhr";


export default  function AddPautaOrientador() {
  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-2">
      <div className="mb-4 inline-block pr-4 border-r-4 w-4/5">
        <label htmlFor="orientador" className="block text-sm font-medium">
          Orientador
        </label>
        <div className="relative mt-2 rounded-md w-70  ">
            <div className="relative">
              <input 
                id="orientador" 
                name="orientador"
                type="string"
                placeholder="Orientador"        
                className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outlie-2 placeholder:text-gray-500"      
              />
          </div>
        </div>
      </div>
      <div className="mb-4 inline-block w-1/5">
        <label htmlFor="lotOrientador" className="mb-2 block text-sm font-medium">
          Lotação do Orientador
        </label>
        <div className="relative mt-2 rounded-md ">
            <div className="relative pr-4">  
                <input id="lotOrientador" name="lotOrientador" 
                    type="string"
                    className="peer inline w-full rounded-md border-gray-400 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    placeholder="Lotação do Orientador" 
                />
            </div>
        </div>
      </div>
      <Myhr />         
    </div>
  );
}