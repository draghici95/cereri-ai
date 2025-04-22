declare global {
    interface Window {
      gtag: (...args: any[]) => void;
    }
  }
  
  export const GA_TRACKING_ID = 'G-8ZH2CDNGKD';
  
  export const pageview = (url: string) => {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      debug_mode: true,
    });
  };
  