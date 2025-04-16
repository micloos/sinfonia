import "@/app/ui/global.css";
import TopNav from '@/app/ui/topnav';
import MLoosFooter from '@/app/ui/mloos';
import Ipen from '@/app/ui/ipen';



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head> 
        <title> Sinfonia </title>
      </head>
      <body className="h-screen">
        <header className="w-full flex-none" id="imageHeader">
	        <Ipen />
	      </header>
        <header className="w-full flex-none height" id="navigationHeader">
	        <TopNav />
	      </header>
	      <div className="flex-grow p-6 md:overflow-y-auto md:p-12i">
          {children}
        </div>  
        < MLoosFooter />
      </body>
    </html>
  );
}
