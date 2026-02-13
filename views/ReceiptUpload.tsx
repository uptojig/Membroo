
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const ReceiptUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-8 text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-50">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Upload Successful!</h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Your receipt has been submitted for verification. We'll notify you once points are added.
        </p>
        <button 
          onClick={() => { setIsSuccess(false); setFile(null); }}
          className="mt-8 px-8 py-3 bg-sky-500 text-white rounded-2xl font-bold shadow-lg shadow-sky-200 active:scale-95 transition-all"
        >
          Upload Another
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 pt-8 space-y-6 animate-in slide-in-from-right-4 duration-500">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Earn Points</h2>
        <p className="text-sm text-slate-500">Upload your receipt and get rewarded.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 block ml-1">Receipt Photo</label>
          <div className={`relative border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all ${
            file ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-slate-50'
          }`}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            {file ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-sky-600">
                  <FileText size={32} />
                </div>
                <p className="text-sm font-bold text-slate-800 truncate max-w-[200px]">{file.name}</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">Tap to change</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-500">
                  <Upload size={32} />
                </div>
                <p className="text-sm font-bold text-slate-800">Choose a photo</p>
                <p className="text-xs text-slate-400 mt-1 px-4">Ensure date and total amount are clearly visible.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start space-x-3">
          <AlertCircle size={18} className="text-amber-600 mt-0.5" />
          <div className="text-xs text-amber-800 leading-relaxed">
            <p className="font-bold mb-1">Important:</p>
            Receipts must be from the last 7 days. Each receipt can only be used once.
          </div>
        </div>

        <button 
          type="submit"
          disabled={!file || isUploading}
          className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center space-x-2 ${
            !file || isUploading 
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
            : 'bg-sky-500 text-white shadow-sky-200 active:scale-95'
          }`}
        >
          {isUploading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Uploading...</span>
            </>
          ) : (
            <span>Submit Receipt</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReceiptUpload;
