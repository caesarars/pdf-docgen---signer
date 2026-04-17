import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { RotateCcw } from 'lucide-react';

interface SignaturePadProps {
  onSave: (dataUrl: string) => void;
  onClear: () => void;
  existingSignature: string | null;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onClear, existingSignature }) => {
  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const clear = () => {
    sigCanvas.current?.clear();
    onClear();
  };

  const handleEnd = () => {
    if (sigCanvas.current?.isEmpty()) return;
    const canvas = sigCanvas.current?.getCanvas();
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      onSave(dataUrl);
    }
  };

  return (
    <div className="relative group">
      <div className="w-full h-24 bg-[#f1f5f9] border border-dashed border-[#e2e8f0] rounded-md overflow-hidden cursor-crosshair">
        <SignatureCanvas
          ref={(ref) => { sigCanvas.current = ref; }}
          penColor="#1e293b"
          onEnd={handleEnd}
          canvasProps={{
            className: "w-full h-full",
          }}
        />
        {!existingSignature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[12px] text-[#64748b] opacity-50">Click to sign here</span>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={clear}
        className="absolute top-1.5 right-1.5 p-1 bg-white border border-[#e2e8f0] rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-50"
      >
        <RotateCcw size={12} className="text-[#64748b]" />
      </button>
      {existingSignature && (
        <div className="mt-2 flex justify-end">
          <span className="text-[10px] font-bold text-[#2563eb] bg-[#dbeafe] px-1.5 py-0.5 rounded uppercase tracking-tighter">
            Signature Captured
          </span>
        </div>
      )}
    </div>
  );
};
