import React from 'react';
import { UserData } from '../types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface DocumentPreviewProps {
  data: UserData;
  id: string;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ data, id: elementId }) => {
  const displayDate = data.date ? format(new Date(data.date), 'dd MMM yyyy', { locale: id }) : '....................';

  return (
    <div 
      id={elementId}
      className="bg-white w-[480px] min-h-[620px] p-[50px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] overflow-hidden font-sans text-[#1e293b] relative flex flex-col"
    >
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-2.5 mb-8">
        <h2 className="text-lg font-bold uppercase tracking-widest leading-tight">Surat Pernyataan Diri</h2>
      </div>

      {/* Body */}
      <div className="text-[13px] leading-relaxed flex-1">
        <p className="mb-6">Saya yang bertanda tangan di bawah ini:</p>

        <div className="space-y-4 mb-8">
          <div className="flex items-end">
            <span className="w-[140px] font-bold text-[#1e293b]">Nama</span>
            <span className="flex-1 border-b border-[#ddd] pb-0.5 min-h-[20px]">{data.name}</span>
          </div>
          
          <div className="flex items-end">
            <span className="w-[140px] font-bold text-[#1e293b]">Alamat</span>
            <span className="flex-1 border-b border-[#ddd] pb-0.5 min-h-[20px] leading-tight">{data.address}</span>
          </div>
          
          <div className="flex items-end">
            <span className="w-[140px] font-bold text-[#1e293b]">Umur</span>
            <span className="flex-1 border-b border-[#ddd] pb-0.5 min-h-[20px]">{data.age ? `${data.age} Tahun` : ''}</span>
          </div>
          
          <div className="flex items-end">
            <span className="w-[140px] font-bold text-[#1e293b]">No. Identitas</span>
            <span className="flex-1 border-b border-[#ddd] pb-0.5 min-h-[20px]">{data.idNumber}</span>
          </div>
        </div>

        <p className="mt-8 text-justify">
          Menyatakan dengan sesungguhnya bahwa data yang saya input di atas adalah benar dan dapat 
          dipertanggungjawabkan sesuai dengan peraturan yang berlaku.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 flex justify-end">
        <div className="w-[150px] text-center">
          <p className="text-[11px] mb-1">Jakarta, {displayDate}</p>
          <div className="h-10 flex items-center justify-center py-1">
            {data.signature ? (
               <img src={data.signature} alt="Signature" className="max-h-full object-contain mix-blend-multiply" />
            ) : (
              <em className="font-serif text-[#3b82f6] opacity-60 text-xs italic">Sign Verified</em>
            )}
          </div>
          <div className="border-t border-black mt-1 py-1 font-bold text-xs uppercase truncate">
            ( {data.name || 'Pemberi Pernyataan'} )
          </div>
        </div>
      </div>

      {/* Page Number */}
      <div className="absolute bottom-5 right-5 text-[10px] text-[#999]">
        Page 1 of 1
      </div>
    </div>
  );
};
