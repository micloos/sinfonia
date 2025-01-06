import UserForm from '@/app/ui/administracao/usuarios/create-form';
import { fetchNiveis } from '@/app/lib/data';

export default async function Page() {
  const niveis = await fetchNiveis();
  console.log(niveis);
  
  return (
    <main>
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/administracao/usuarios' },
          {
            label: 'Edit User',
            href: `/administracao/usuarios/${id}/edit`,
            active: true,
          },
        ]}
      /> */}
      <UserForm niveis={niveis} /> 
    </main>
  );
}