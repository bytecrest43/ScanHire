export const USE_TEST_ADS = import.meta.env.VITE_USE_TEST_ADS === 'true';


export const ADSENSE_PUBLISHER_ID = USE_TEST_ADS 
  ? import.meta.env.VITE_ADSENSE_TEST_PUBLISHER_ID // Google's test publisher ID
  : import.meta.env.VITE_ADSENSE_PRODUCTION_PUBLISHER_ID; // Your production publisher ID

// Ad unit IDs for different placements
export const AD_UNITS = {
  // Banner ad units (horizontal, typically at the top of pages)
  BANNER: {
    HOME: USE_TEST_ADS 
      ? import.meta.env.VITE_BANNER_HOME_TEST_ID 
      : import.meta.env.VITE_BANNER_HOME_PRODUCTION_ID,
    UPLOAD: USE_TEST_ADS 
      ? import.meta.env.VITE_BANNER_UPLOAD_TEST_ID 
      : import.meta.env.VITE_BANNER_UPLOAD_PRODUCTION_ID,
  },
  
  // Responsive ad units (adapt to container size)
  RESPONSIVE: {
    HOME: USE_TEST_ADS 
      ? import.meta.env.VITE_RESPONSIVE_HOME_TEST_ID 
      : import.meta.env.VITE_RESPONSIVE_HOME_PRODUCTION_ID,
    UPLOAD: USE_TEST_ADS 
      ? import.meta.env.VITE_RESPONSIVE_UPLOAD_TEST_ID 
      : import.meta.env.VITE_RESPONSIVE_UPLOAD_PRODUCTION_ID,
  },
  
  // In-content ad units (between content sections)
  IN_CONTENT: {
    RESUME: USE_TEST_ADS 
      ? import.meta.env.VITE_IN_CONTENT_RESUME_TEST_ID 
      : import.meta.env.VITE_IN_CONTENT_RESUME_PRODUCTION_ID,
  }
};

// Export a helper function to get the full client ID string
export const getClientId = () => `${ADSENSE_PUBLISHER_ID}`;