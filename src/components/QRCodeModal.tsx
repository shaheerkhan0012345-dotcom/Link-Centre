import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import QRCode from 'qrcode';
import { X, Download, QrCode, Sparkles, Check } from 'lucide-react';
import { Profile, ThemeMode } from '../types';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  theme: ThemeMode;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  profile,
  theme,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloaded, setDownloaded] = useState(false);
  const currentUrl = window.location.href;

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        currentUrl,
        {
          width: 240,
          margin: 2,
          color: {
            dark: '#5B21B6',
            light: '#FFFFFF',
          },
        },
        (error) => {
          if (error) console.error('QR Code render error:', error);
        }
      );
    }
  }, [isOpen, currentUrl]);

  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.name.toLowerCase().replace(/\s+/g, '-')}-link-center-qr.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className={`w-full max-w-sm rounded-3xl p-6 sm:p-8 relative border shadow-2xl text-center overflow-hidden ${
            theme === 'dark'
              ? 'bg-[#181028] text-white border-purple-500/20'
              : 'bg-white text-gray-900 border-purple-200'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-purple-400 hover:bg-purple-500/10 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400">
              <QrCode size={28} />
            </div>
          </div>

          <h2 className="text-xl font-bold tracking-tight mb-1">Scan QR Code</h2>
          <p className="text-xs text-purple-300/70 mb-6">
            Scan with your mobile camera to open {profile.name}'s Link Center instantly.
          </p>

          {/* QR Code Canvas Box */}
          <div className="relative inline-block p-4 rounded-2xl bg-white shadow-xl border-4 border-purple-500/30 mb-6">
            <canvas ref={canvasRef} className="mx-auto rounded-lg" />
            <div className="mt-2 text-[10px] font-mono font-semibold text-purple-900 uppercase">
              {profile.handle}
            </div>
          </div>

          {/* Download PNG Button */}
          <button
            onClick={handleDownloadPNG}
            className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            {downloaded ? <Check size={16} /> : <Download size={16} />}
            <span>{downloaded ? 'Downloaded Image!' : 'Download QR Code (PNG)'}</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
