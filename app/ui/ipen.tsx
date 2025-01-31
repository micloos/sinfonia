'use client'

import Image from "next/image";

{/*
const BackgroundDiv = styled.div`
  background-image: url('/logo_ipen_ensino.png');
  background-position: left;
  background-repeat: no-repeat;
  height: 65px;
`;
*/}

export default function Ipen() {
	return (
		<div className="flex bg-blue-400 w-full justify-between" >
      <div>
          <Image
            src='/logo_ipen_ensino.png' 
            width={829}
            height={96}
            alt="Ipen"
                       />
      </div>
      <div>
           <Image
                src='/negativa.png' 
                height={96}
                width={400}
                alt="Governo Federal"
                className="justify-end"
                               />
      </div>
    </div>
	)
}
