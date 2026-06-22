'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { ImprimirDocument } from '@/app/ui/imprimirDocument';
import type { ImprimirData, Reunioes, Participantes, OrdemDia, BancaCompleta } from '@/app/lib/definitions';
import { fetchAssuntos, fetchPauta, fetchBancas, fetchOrdemDia, fetchParticipantesByReuniao, fetchReuniaoById, fetchAssuntoParameters } from '@/app/lib/reuniao/data';
import { ItemReuniao } from '@/app/lib/reuniao/definitions';
import Tooltip from '@mui/material/Tooltip';
import { PrinterIcon } from '@heroicons/react/24/outline';


interface DownloadButtonProps {
    id: string;
    tipo: string;
  fileName?: string;
  buttonText?: string;
}

type DownloadStatus = 'idle' | 'generating' | 'success' | 'error';

export const DownloadButton = ({
  id,
  tipo,
  fileName = `${tipo}-${id}.pdf`,
}: DownloadButtonProps) => {
  const [status, setStatus] = useState<DownloadStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const data:ImprimirData = {
    tipo: tipo, 
    reuniao: {
        id: Number(id),  
        d_lim: '31/01/2026',
        d_ini: '31/02/2026',
        d_end: '31/03/2026',
	    sala: '222',
	    predio: 'ensino',
	    active: 'N',
	    sequencia: null
    },
    participantes:[],
    ordemDia:[],
    assuntos:[],
    items:[],
    assuntoParameters:[],
    bancas:[]
};
  const generateAndDownloadPdf = async (): Promise<void> => {
    setStatus('generating');
    setError(null);

    try {
      // Generate the PDF as a blob
      const reuniao: Reunioes = await fetchReuniaoById(id);
      console.log("reuniao = ",reuniao);
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: 'long', day: 'numeric' };
      const d_end_date = new Date(reuniao.d_lim);
      reuniao.d_end = new Intl.DateTimeFormat('pt-BR',options).format(d_end_date);
      reuniao.d_ini = reuniao.d_ini.toString();
      reuniao.d_lim = reuniao.d_lim.toString();
      data.reuniao=reuniao;
      const participantes: Participantes[] = await fetchParticipantesByReuniao(Number(id),0) as Participantes[];
      data.participantes=participantes;
      const ordemdia:OrdemDia[] = await fetchOrdemDia (Number(id),0);
      data.ordemDia = ordemdia;
      data.assuntos = await fetchAssuntos();
      data.items = await fetchPauta(Number(id)) as ItemReuniao[];
      let listaItems = '(';
      for (let i=0; i < data.items.length; i++) {
        listaItems = listaItems + data.items[i].Cd_ItemReuniao;
        if (i<data.items.length-1) {listaItems=listaItems+','}
      }
      listaItems= listaItems+')';
      console.log(listaItems);
      data.bancas = listaItems==='()'?[]:await fetchBancas(listaItems) as BancaCompleta[];
      data.assuntoParameters = await fetchAssuntoParameters();
      console.log("data=",data)
      const blob = await pdf(<ImprimirDocument data={data} />).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
      console.error('PDF generation error:', err);
    }
  };

  // Status-based styling
  {/*
  const getButtonText = (): string => {
    switch (status) {
      case 'generating':
        return 'Generating...';
      case 'success':
        return '✓ Downloaded!';
      case 'error':
        return '❌ Error - Try Again';
      default:
        return buttonText;
    }
  };
 
   */}
  const getButtonClass = (): string => {
    const base = 'w-5';
    switch (tipo) {
      case 'ata':
        return `${base} text-red-500`;
      case 'deliberacao':
        return `${base} text-green-500`;
      default:
        return `${base}`;
    }
  };


  return (
    <form>
      
      <Tooltip title={tipo} >
      <button
        onClick={generateAndDownloadPdf}
        disabled={status === 'generating'}
        className="rounded-md border p-2 hover:bg-gray-100"
        >
        {/* className={getButtonClass()}  */}
    
        {/* getButtonText()*/}
        <PrinterIcon className={getButtonClass()} />
      </button>
      </Tooltip>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

    </form>
  );
};