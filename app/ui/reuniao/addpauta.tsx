


export default async function AddPauta(props: {
  reuniao: number;
}) {
  const { reuniao } = props;
  // mylog("DBG",filename, 'CreatePautaForm' , "reuniaoNumber=", reuniaoNumber);
  return (
    <main>
      <h1>Adicionar Pauta</h1>
      <p>Reunião Número: {reuniao}</p>
      {/* Add your form implementation here */}
      <form>
        {/* Form fields go here */}
        <button type="submit">Adicionar Pauta</button>
      </form>
    </main>
  );
}