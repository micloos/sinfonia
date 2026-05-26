'use client';

import { Banca } from "@/app/lib/reuniao/definitions";

interface BancaProps {
  data: Banca[];
  title?: string;
}

export default function BancaTable({ data, title = "Banca Examinadora" }: BancaProps) {
// Ainda nao tem membros na Banca
    if (data.length === 0) {
    return (
      <div className="border rounded-lg p-4">
        <h3 className="font-bold mb-2">{title}</h3>
        <p className="text-gray-500 text-center py-4">Não tem membros da Banca</p>
      </div>
    );
}

// Agora tem membros na Banca
    return (
        <div className="rounded-md bg-gray-50 p-4 md:p-2">
            <h3 className="font-bold p-4 bg-gray-50 border-b">{title}</h3>
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th className="border-b p-2">Ações</th>
                        <th className="border-b p-2">Tipo Examinador</th>
                        <th className="border-b p-2">Nome</th>
                        <th className="border-b p-2">Lotação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((member) => (
                        <tr key={member.nm_ExaminadorBanca}>
                            <td className="border-b p-2"></td>
                            <td className="border-b p-2">{member.Cd_TipoExaminador}</td>
                            <td className="border-b p-2">{member.nm_ExaminadorBanca}</td>
                            <td className="border-b p-2">{member.ds_LotExaminadorBanca}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )





}