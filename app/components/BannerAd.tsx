import React from 'react';
import AdSenseComponent from './AdSense';

interface BannerAdProps {
  client: string;
  slot: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * BannerAd - A component for displaying horizontal banner ads
 * 
 * This component is optimized for horizontal banner placements
 * and uses the base AdSenseComponent with appropriate settings.
 */
const BannerAd: React.FC<BannerAdProps> = ({
  client,
  slot,
  className = '',
  style = {},
}) => {
  return (
    <div className={`banner-ad-container my-6 mx-auto max-w-[970px] ${className}`}>
      <AdSenseComponent
        client={client}
        slot={slot}
        format="horizontal"
        responsive={true}
        style={{
          minHeight: '90px',
          ...style
        }}
      />
    </div>
  );
};

export default BannerAd;