/**
 * Re-export skills from centralized portfolioData store
 * Ensures backwards compatibility across any legacy imports
 */
export {
  primarySkills,
  secondarySkills,
  default as portfolioData,
} from './portfolioData';
