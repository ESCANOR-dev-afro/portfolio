/**
 * File & Image Upload Utilities for Portfolio Admin Dashboard
 * Supports Base64 compression, device gallery pickers, and resume document uploads.
 */

/**
 * Compresses and converts an image File object to a high-quality, lightweight Base64 Data URL.
 * Automatically resizes large images (e.g., 4000px down to max 1600px) and compresses them,
 * reducing multi-megabyte photos to lean ~100–300KB strings that save safely in localStorage.
 *
 * @param {File} file - The image file selected from device gallery / picker
 * @param {number} maxWidth - Maximum bounding width (default: 1600)
 * @param {number} maxHeight - Maximum bounding height (default: 1200)
 * @param {number} quality - Compression quality (0.1 to 1.0, default: 0.85)
 * @returns {Promise<{ dataUrl: string, width: number, height: number, sizeFormatted: string, originalName: string }>}
 */
export async function compressAndConvertToBase64(
  file,
  maxWidth = 1440,
  maxHeight = 1080,
  quality = 0.80
) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file provided'));
    }

    // For SVG or GIF images, preserve them directly as data URL without raster canvas compression
    if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          dataUrl: reader.result,
          width: 0,
          height: 0,
          sizeFormatted: formatBytes(file.size),
          originalName: file.name,
        });
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio constraint
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve({
            dataUrl: e.target.result,
            width: img.width,
            height: img.height,
            sizeFormatted: formatBytes(file.size),
            originalName: file.name,
          });
        }

        // Enable high-fidelity bilinear smoothing for crisp typography
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw and compress image
        ctx.drawImage(img, 0, 0, width, height);

        // Prefer image/webp for optimal compression (typically 30-50% smaller than jpeg), fallback to image/jpeg
        let compressedDataUrl;
        try {
          compressedDataUrl = canvas.toDataURL('image/webp', quality);
          if (!compressedDataUrl.startsWith('data:image/webp')) {
            compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          }
        } catch {
          compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        const approximateBytes = Math.round((compressedDataUrl.length * 3) / 4);

        resolve({
          dataUrl: compressedDataUrl,
          width,
          height,
          sizeFormatted: formatBytes(approximateBytes),
          originalName: file.name,
        });
      };

      img.onerror = () => {
        // Fallback to raw data URL
        resolve({
          dataUrl: e.target.result,
          width: 0,
          height: 0,
          sizeFormatted: formatBytes(file.size),
          originalName: file.name,
        });
      };

      img.src = e.target.result;
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Reads any resume document (.doc, .docx, .pdf) from user device into Base64 format.
 *
 * @param {File} file - Selected document file
 * @returns {Promise<{ dataUrl: string, name: string, sizeFormatted: string, mimeType: string, uploadedAt: string }>}
 */
export async function readDocumentFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No document file provided'));

    const reader = new FileReader();
    reader.onload = (e) => {
      resolve({
        dataUrl: e.target.result,
        name: file.name,
        sizeFormatted: formatBytes(file.size),
        mimeType: file.type || 'application/octet-stream',
        uploadedAt: new Date().toISOString(),
      });
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Triggers browser download for a Data URL or static file path
 *
 * @param {string} dataUrlOrPath - Base64 Data URL or public file path
 * @param {string} filename - Target filename for download
 * @param {string} mimeType - Optional MIME type
 */
export function downloadFileFromDataUrl(dataUrlOrPath, filename, mimeType = 'application/octet-stream') {
  if (!dataUrlOrPath) return;

  // If it's a Base64 data URL
  if (dataUrlOrPath.startsWith('data:')) {
    const link = document.createElement('a');
    link.href = dataUrlOrPath;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // If it's a regular file path (e.g., /Samuel_Patrick_Master_CV.doc)
  const link = document.createElement('a');
  link.href = dataUrlOrPath;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Helper to format byte counts cleanly
 */
export function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
