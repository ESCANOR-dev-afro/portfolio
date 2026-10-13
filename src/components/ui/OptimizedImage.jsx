import { useState, useEffect } from 'react';
import { ImageOff, Sparkles } from 'lucide-react';

/**
 * OptimizedImage Component
 * High-performance, bandwidth-resilient image renderer designed for 2G/3G/4G/5G networks.
 *
 * Features:
 * 1. Native deferred loading: `loading="lazy"` & `decoding="async"`
 * 2. Instant animated skeleton placeholder & shimmer state (prevents CLS layout shifts)
 * 3. Graceful fallback on network dropouts / 404s
 * 4. Smooth opacity crossfade upon transmission completion
 * 5. Responsive sizing constraints (`max-width: 100%`, `height: auto` or full frame)
 */
export default function OptimizedImage({
  src,
  alt = 'Asset preview',
  className = '',
  wrapperClassName = '',
  priority = false,
  fallbackSrc,
  objectFit = 'cover',
  aspectRatio,
  onClick,
  onLoad,
  onError,
  style,
  imgStyle,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeSrc, setActiveSrc] = useState(src);

  // Sync state whenever primary source URL changes
  useEffect(() => {
    setActiveSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.(e);
  };

  const handleError = (e) => {
    if (fallbackSrc && activeSrc !== fallbackSrc) {
      setActiveSrc(fallbackSrc);
      setIsLoaded(false);
    } else {
      setHasError(true);
      setIsLoaded(true);
      onError?.(e);
    }
  };

  const objectFitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div
      onClick={onClick}
      style={{
        aspectRatio: aspectRatio || undefined,
        ...style,
      }}
      className={`relative overflow-hidden w-full h-full max-w-full ${wrapperClassName}`}
    >
      {/* 1. Bandwidth-Resilient Shimmer Skeleton Loader (Active while downloading) */}
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 shimmer-skeleton flex items-center justify-center pointer-events-none"
        >
          {/* Subtle Cyberpunk HUD Pulse Point */}
          <div className="flex items-center space-x-1.5 opacity-40">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-orange animate-ping" />
            <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase select-none">
              LOADING
            </span>
          </div>
        </div>
      )}

      {/* 2. Error Fallback (Graceful placeholder on network loss) */}
      {hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-black/60 border border-white/10 text-white/40 text-center select-none">
          <ImageOff className="w-6 h-6 mb-1.5 text-cyber-orange/60" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">
            Asset Offline
          </span>
          <span className="text-[8px] font-mono text-white/30 mt-0.5 max-w-[140px] truncate">
            {alt}
          </span>
        </div>
      ) : (
        /* 3. Hardware-Accelerated Image Element */
        <img
          src={activeSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          onLoad={handleLoad}
          onError={handleError}
          style={imgStyle}
          className={`w-full h-full ${objectFitClass} max-w-full transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
}
