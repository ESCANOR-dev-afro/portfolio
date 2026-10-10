import { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  X,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Edit3,
} from 'lucide-react';
import { compressAndConvertToBase64 } from '../../utils/fileUploadHelper';

/**
 * Image Uploader Component with Device Gallery Sync & Base64 Compression
 * Allows picking any image from mobile/desktop gallery, compressing it,
 * and saving it directly into application state with zero server requirements.
 */
export default function ImageUploader({
  label = 'Screenshot / Visual Asset',
  value = '',
  onChange,
  icon: Icon = ImageIcon,
  hint = 'Upload from your device gallery or enter a public path.',
  recommendedSize = '1600x1200 or mobile portrait',
}) {
  const fileInputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isManualInput, setIsManualInput] = useState(false);
  const [imageMeta, setImageMeta] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    try {
      const result = await compressAndConvertToBase64(file);
      setImageMeta({
        name: result.originalName,
        dimensions: result.width && result.height ? `${result.width}×${result.height}` : null,
        size: result.sizeFormatted,
      });
      onChange(result.dataUrl);
    } catch (err) {
      console.error('Image upload failed:', err);
      setErrorMsg('Failed to process image. Please try another file.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClearImage = () => {
    onChange('');
    setImageMeta(null);
    setErrorMsg('');
  };

  const hasImage = Boolean(value && value.trim());
  const isBase64 = value?.startsWith('data:image');

  return (
    <div className="space-y-2 text-left">
      {/* Label Row */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono text-white/75 uppercase tracking-wider flex items-center space-x-1.5">
          <Icon className="w-3.5 h-3.5 text-orange-400" />
          <span>{label}</span>
        </label>
        <button
          type="button"
          onClick={() => setIsManualInput(!isManualInput)}
          className="text-[10px] font-mono text-orange-400/80 hover:text-orange-300 transition-colors flex items-center space-x-1 cursor-pointer"
        >
          <Edit3 className="w-3 h-3" />
          <span>{isManualInput ? 'Show Visual Uploader' : 'Enter URL / Path Manually'}</span>
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Image Control Area */}
      {isManualInput ? (
        // Manual URL / Path Input
        <div className="space-y-1.5">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. /screenshots/tasfued-landing.png or https://example.com/image.png"
            className="w-full bg-black/70 border border-white/20 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-xl px-4 py-2.5 text-white text-xs font-mono outline-none transition-all placeholder:text-white/25"
          />
          <p className="text-[10px] font-mono text-white/40">
            Direct path to static file in <code>/public</code> or full external image URL.
          </p>
        </div>
      ) : hasImage ? (
        // Active Image Preview Card
        <div className="p-3 rounded-xl bg-black/60 border border-orange-500/40 relative overflow-hidden flex flex-col sm:flex-row items-center gap-3.5 group shadow-inner">
          {/* Thumbnail Box */}
          <div className="w-full sm:w-28 h-20 sm:h-20 rounded-lg bg-black/80 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center relative">
            <img
              src={value}
              alt="Uploaded Asset"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 text-[8px] font-mono text-white/70">
              {isBase64 ? 'LOCAL UPLOAD' : 'STATIC PATH'}
            </span>
          </div>

          {/* Info & Action Controls */}
          <div className="flex-1 min-w-0 space-y-1 text-left w-full sm:w-auto">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-white font-mono truncate">
                {imageMeta?.name || (isBase64 ? 'Device Uploaded Image' : value.split('/').pop() || 'Asset Attached')}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono">
                SYNCED
              </span>
            </div>

            <p className="text-[10px] text-white/50 font-mono">
              {imageMeta?.dimensions ? `${imageMeta.dimensions} • ` : ''}
              {imageMeta?.size ? `${imageMeta.size} • ` : ''}
              Ready for live portfolio view
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="px-2.5 py-1 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-400 text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center space-x-1"
              >
                <RefreshCw className={`w-3 h-3 ${isProcessing ? 'animate-spin' : ''}`} />
                <span>Replace from Device</span>
              </button>

              <button
                type="button"
                onClick={handleClearImage}
                className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-[10px] font-mono transition-all cursor-pointer flex items-center space-x-1"
              >
                <X className="w-3 h-3" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Empty Upload Dropzone Button
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="w-full p-4 rounded-xl border-2 border-dashed border-white/20 hover:border-orange-500/60 bg-white/[0.02] hover:bg-orange-500/[0.05] transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer group text-center"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 group-hover:border-orange-500/40 group-hover:bg-orange-500/20 flex items-center justify-center text-orange-400 transition-all shadow-[0_0_12px_rgba(255,87,34,0.15)]">
            {isProcessing ? (
              <RefreshCw className="w-5 h-5 animate-spin text-orange-400" />
            ) : (
              <Upload className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            )}
          </div>

          <div>
            <span className="text-xs font-mono font-bold text-white group-hover:text-orange-400 transition-colors block">
              {isProcessing ? 'Processing & Compressing Image...' : 'Click to Upload from Device / Gallery'}
            </span>
            <span className="text-[10px] font-mono text-white/40 block mt-0.5">
              PNG, JPG, WebP, SVG • {recommendedSize}
            </span>
          </div>
        </button>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="p-2 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] font-mono flex items-center space-x-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <p className="text-[10px] font-mono text-white/40">
        {hint}
      </p>
    </div>
  );
}
