import UserForm from '@/app/ui/administracao/usuarios/edit-form';
import { fetchUserById, fetchNiveis } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { UserType, Niveis } from '@/app/lib/definitions';
 
export default async function Page(props: {params: Promise<{ id: string }> }) {
  const params = await props.params;
  console.log("Edit USers params= ",params)
  const id = params.id;
  console.log(id);
  const [user] = await Promise.all([
	  fetchUserById(id),
  ]) as UserType[];
  
  const niveis = await fetchNiveis() as Niveis[];
  console.log(niveis)
console.log("Page edit user, user=",user)
  if (!user) {
	  notFound();
  }
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
      <UserForm user={user} niveis={niveis} />
    </main>
  );
}
