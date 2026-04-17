import React from 'react';
import { UserData } from '../types';
import { SignaturePad } from './SignaturePad';

interface DocumentFormProps {
  data: UserData;
  onChange: (newData: Partial<UserData>) => void;
}

export const DocumentForm: React.FC<DocumentFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const labelStyle = "block text-[11px] font-semibold text-[#64748b] mb-1.5 uppercase tracking-wider";
  const inputStyle = "w-full px-3 py-2 border border-[#e2e8f0] rounded-md text-sm text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all bg-white";

  return (
    <div className="space-y-4">
      {/* Nama */}
      <div className="form-group">
        <label className={labelStyle}>Nama Lengkap</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          autoComplete="off"
          className={inputStyle}
        />
      </div>

      {/* Alamat */}
      <div className="form-group">
        <label className={labelStyle}>Alamat Sesuai KTP</label>
        <textarea
          name="address"
          value={data.address}
          onChange={handleChange}
          rows={2}
          autoComplete="off"
          className={inputStyle}
        />
      </div>

      <div className="flex gap-4">
        {/* Umur */}
        <div className="form-group flex-1">
          <label className={labelStyle}>Umur</label>
          <input
            type="number"
            name="age"
            value={data.age}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/* Tanggal */}
        <div className="form-group flex-[2]">
          <label className={labelStyle}>Tanggal Dokumen</label>
          <input
            type="date"
            name="date"
            value={data.date}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
      </div>

      {/* No Identitas */}
      <div className="form-group">
        <label className={labelStyle}>Nomor Identitas (KTP)</label>
        <input
          type="text"
          name="idNumber"
          value={data.idNumber}
          onChange={handleChange}
          autoComplete="off"
          className={inputStyle}
        />
      </div>

      {/* Tanda Tangan */}
      <div className="form-group">
        <label className={labelStyle}>Tanda Tangan Digital</label>
        <SignaturePad 
          onSave={(dataUrl) => onChange({ signature: dataUrl })}
          onClear={() => onChange({ signature: null })}
          existingSignature={data.signature}
        />
      </div>
    </div>
  );
};
