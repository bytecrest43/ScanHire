/**
 * Type definitions for Google AdSense
 */

interface Window {
  adsbygoogle: Array<any> & {
    push: (params: any) => void;
  };
}