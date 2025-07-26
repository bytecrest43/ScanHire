import React from 'react';
import AdSenseComponent from './AdSense';

interface ResponsiveAdProps {
  client: string;
  slot: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * ResponsiveAd - A component for displaying responsive ads
 * 
 * This component is designed to adapt to different container sizes
 * and screen widths, making it suitable for various placements.
 */
const ResponsiveAd: React.FC<ResponsiveAdProps> = ({
  client,
  slot,
  className = '',
  style = {},
}) => {
  return (
    <div className={`responsive-ad-container my-6 w-full ${className}`}>
      <AdSenseComponent
        client={client}
        slot={slot}
        format="auto"
        responsive={true}
        style={{
          minHeight: '250px',
          ...style
        }}
      />
    </div>
  );
};

export default ResponsiveAd;