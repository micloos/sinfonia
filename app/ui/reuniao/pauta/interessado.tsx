export default async function Interessado() {
  return (
    <div>
    <input 
        id="interessado" 
        name="interessado"
        type="string"
        placeholder="Interessado"
        className="peer inline w-2/3 rounded-md border-gray-200 py-2 pl-10 test-sm outlie-2 placeholder:text-gray-500"      
    />
    <select id="ds_area" name="ds_area" className="peer inline w-1/6 rounded-md border-gray-200 py-2 pl-10 test-sm outlie-2 placeholder:text-gray-500">
        <option value="0" disabled>Escolhe Area</option>
        <option key="TNA" value="TNA">TNA</option>
        <option key="TNM" value="TNM">TNM</option>
        <option key="TNR" value="TNR">TNR</option>
        <option key="N" value="N">Nenhuma</option>
    </select>
    <select id="ds_nivel" name="ds_nivel" className="peer inline w-1/6 rounded-md border-gray-200 py-2 pl-10 test-sm outlie-2 placeholder:text-gray-500">
        <option value="0" disabled>Escolhe Nivel</option>
        <option key="Mestrado" value="Mestrado">Mestrado</option>
        <option key="Doutorado" value="Doutorado">Doutorado</option>
        <option key="Mestrado e Doutorado" value="Mestrado e Doutorado">Mestrado e Doutorado</option>
        <option key="Doutorado Direto" value="Doutorado Direto">Doutorado Direto</option>
        <option key="Mestrado e Doutorado" value="Mestrado e Doutorado">Mestrado e Doutorado</option>
        <option key="N" value="N">Sem</option>
    </select>
    </div>
  );
}