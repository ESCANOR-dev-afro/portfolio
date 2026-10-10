/**
 * Re-export certificates from centralized portfolioData store
 * Ensures backwards compatibility across any legacy imports
 */
export {
  certificates,
  claudeCertificates,
  certificateCategories,
  default as portfolioData,
} from './portfolioData';
