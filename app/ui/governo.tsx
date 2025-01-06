import Image from "next/image";


export default function Governo() {
	return (
           <div  className="bg-blue-400" >
	   <Image
	    src='/negativa.png' 
	    height={96}
	    width={400}
	    alt="Governo Federal"
	    className="block"
	   />
	   </div>
	);
}

