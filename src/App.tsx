/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { UserData } from './types';
import { DocumentForm } from './components/DocumentForm';
import { DocumentPreview } from './components/DocumentPreview';
import { generatePDF } from './lib/pdf-generator';
import { FileDown, FileText } from 'lucide-react';

export default function App() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    address: '',
    age: '',
    date: new Date().toISOString().split('T')[0],
    idNumber: '',
    signature: null,
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleDataChange = (newData: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    await generatePDF('pdf-document-preview', `Dokumen_${userData.name || 'Baru'}`);
    setIsGenerating(false);
  };

  const isFormComplete = userData.name && userData.address && userData.signature;

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans">
      {/* Header */}
      <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-2 font-bold text-xl text-[#2563eb]">
          <FileText size={24} strokeWidth={2.5} />
          DocuFlow
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-[#dcfce7] text-[#166534] px-2 py-1 rounded-full text-[11px] font-medium">
            Live Preview Active
          </span>
          <button
            onClick={handleDownload}
            disabled={!isFormComplete || isGenerating}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-all shadow-sm active:scale-95 ${
              isFormComplete && !isGenerating
              ? 'bg-[#2563eb] text-white hover:bg-blue-700'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed uppercase text-[12px]'
            }`}
          >
            {isGenerating ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <FileDown size={16} />
            )}
            Download PDF
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-[380px_1fr] overflow-hidden">
        {/* Sidebar */}
        <section className="bg-white border-r border-[#e2e8f0] p-6 overflow-y-auto custom-scrollbar">
          <div className="mb-6 pb-6 border-b border-[#f1f5f9]">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Input Data</h2>
            <p className="text-xs text-slate-500 mt-1">Lengkapi kolom di bawah untuk mengisi dokumen.</p>
          </div>
          
          <DocumentForm data={userData} onChange={handleDataChange} />
          
          <div className="mt-12 pt-6 border-t border-[#f1f5f9]">
            <p className="text-[11px] text-[#64748b] leading-relaxed">
              Data yang Anda masukkan akan diproses secara lokal untuk menghasilkan dokumen PDF. Kami tidak menyimpan data pribadi Anda di server kami.
            </p>
          </div>
        </section>

        {/* Preview Area */}
        <section className="bg-[#cbd5e1] p-10 flex justify-center items-start overflow-y-auto custom-scrollbar">
          <div className="origin-top transform scale-[0.85] lg:scale-100 transition-transform duration-500">
            <DocumentPreview data={userData} id="pdf-document-preview" />
          </div>
        </section>
      </main>
    </div>
  );
}
