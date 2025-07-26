import React from 'react';
import AdSenseComponent from './AdSense';

interface InContentAdProps {
  client: string;
  slot: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * InContentAd - A component for displaying ads between content sections
 * 
 * This component is designed to be placed between sections of content,
 * with styling that helps it blend with the content while still being
 * distinguishable as an advertisement.
 */
const InContentAd: React.FC<InContentAdProps> = ({
  client,
  slot,
  className = '',
  style = {},
}) => {
  return (
    <div className={`in-content-ad-container my-8 w-full max-w-[728px] mx-auto ${className}`}>
      <div className="text-center text-xs text-gray-400 mb-2">Advertisement</div>
      <div className="gradient-border">
        <AdSenseComponent
          client={client}
          slot={slot}
          format="auto"
          responsive={true}
          style={{
            minHeight: '280px',
            ...style
          }}
        />
      </div>
    </div>
  );
};

export default InContentAd;