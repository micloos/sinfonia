import Myhr from "./myhr"

export default  function Interessado() {
  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-2">
      <div className="mb-4 inline-block pr-4 w-2/3">
        <label htmlFor="interessado" className="block text-sm font-medium text-gray-700">
          Interessado  
        </label>
        <div className="relative mt-2 rounded-md w-70 ">
            <div className="relative">
              <input 
                id="interessado" 
                name="interessado"
                type="string"
                placeholder="Interessado"        
                className="peer inline w-full rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"      
            />
          </div>
        </div>
      </div>  
      
      <div className="mb-4 inline-block p-4 w-1/6">
        <label htmlFor="ds_area" className="block text-sm font-medium text-gray-700">
          Área
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <select id="ds_area" name="ds_area" className="peer w-full inline rounded-md border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
              <option value="0">Escolhe Area</option>
              <option key="TNA" value="TNA">TNA</option>
              <option key="TNM" value="TNM">TNM</option>
              <option key="TNR" value="TNR">TNR</option>
              <option key="N" value="N">Nenhuma</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mb-4 inline-block w-1/6">
        <label htmlFor="ds_nivel" className="block text-sm font-medium text-gray-700">
          Nivel
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <select id="ds_nivel" name="ds_nivel" className="peer w-full inline rounded-md border-gray-200 py-2 pl-10 test-sm outline-2 placeholder:text-gray-500">
              <option value="0" >Escolhe Nivel</option>
              <option key="Mestrado" value="Mestrado">Mestrado</option>
              <option key="Doutorado" value="Doutorado">Doutorado</option>
              <option key="Mestrado e Doutorado" value="Mestrado e Doutorado">Mestrado e Doutorado</option>
              <option key="Doutorado Direto" value="Doutorado Direto">Doutorado Direto</option>
              <option key="N" value="N">Sem</option>
            </select>
          </div>
        </div>    
      </div> 
      <Myhr />
    </div>
  );
}