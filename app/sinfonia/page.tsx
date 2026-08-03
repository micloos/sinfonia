import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { mylog } from "@/app/lib/mylogger";

export default async function Home() {
  const session = await auth();
  if(!session) {
    redirect('/login');
  }

  mylog("DBG","/app/sinfonia/page","Home","session=",session);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20 ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <h1 className="text-4xl"> Bem vindo à Sinfonia {session.user?.username} </h1>
      </main>

    </div>
  );
}
