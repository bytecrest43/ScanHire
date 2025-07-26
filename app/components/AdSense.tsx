import React, { useEffect, useState, useRef } from 'react';

interface AdProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}


const AdSenseComponent: React.FC<AdProps> = ({
  client,
  slot,
  format = 'auto',
  responsive = true,
  style = {},
  className = '',
}) => {
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const adContainerRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef<boolean>(false);

  // The AdSense script is already loaded in root.tsx, so we just need to check if it's ready
  useEffect(() => {
    // Check if AdSense is already available
    if (window.adsbygoogle) {
      setIsScriptLoaded(true);
      return;
    }

    // If not available yet, set up a small delay to check again
    const checkInterval = setInterval(() => {
      if (window.adsbygoogle) {
        setIsScriptLoaded(true);
        clearInterval(checkInterval);
      }
    }, 100);
    
    // Clean up interval on unmount
    return () => {
      clearInterval(checkInterval);
    };
  }, []);

  // Initialize the ad when the script is loaded and props change
  useEffect(() => {
    if (!isScriptLoaded || !adContainerRef.current) return;
    
    // Reset states
    setIsError(false);
    setIsLoaded(false);
    
    try {
      // Clear previous ad if any
      while (adContainerRef.current.firstChild) {
        adContainerRef.current.removeChild(adContainerRef.current.firstChild);
      }
      

      isInitializedRef.current = false;
      
      // Create new ad
      const adElement = document.createElement('ins');
      adElement.className = 'adsbygoogle';
      adElement.style.display = 'block';
      adElement.dataset.adClient = client;
      adElement.dataset.adSlot = slot;
      
      if (format) {
        adElement.dataset.adFormat = format;
      }
      
      if (responsive) {
        adElement.dataset.fullWidthResponsive = 'true';
      }
      
      adContainerRef.current.appendChild(adElement);
      

      if (!isInitializedRef.current) {

        if (!window.adsbygoogle) {
          // Create an object that matches our type definition
          window.adsbygoogle = Object.assign([], {
            push: (params: any) => { /* Implementation would be provided by AdSense script */ }
          });
        }
        
        try {
          window.adsbygoogle.push({});
          isInitializedRef.current = true;
        } catch (pushError) {
          console.error('Error pushing to adsbygoogle:', pushError);
          setIsError(true);
        }
      }
      
      // Simulate ad loading (actual loading is handled by AdSense)
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Error initializing AdSense ad:', error);
      setIsError(true);
    }
  }, [isScriptLoaded, client, slot, format, responsive]);

  if (isError) {
    return null;
  }

  return (
    <div 
      className={`ad-container rounded-2xl overflow-hidden ${!isLoaded ? 'min-h-[100px]' : ''} ${className}`}
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%',
        ...style 
      }}
    >
      {!isLoaded && (
        <div className="ad-placeholder animate-pulse bg-gray-100 w-full h-full min-h-[100px] rounded-2xl">
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400 text-sm">Advertisement</span>
          </div>
        </div>
      )}
      <div 
        ref={adContainerRef}
        style={{ 
          position: isLoaded ? 'relative' : 'absolute',
          visibility: isLoaded ? 'visible' : 'hidden',
          width: '100%',
          height: isLoaded ? 'auto' : '0',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};

export default AdSenseComponent;