import '@/styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import Layout from '../components/Layout';
import { GA_TRACKING_ID } from '../../lib/gtag';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Script Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', { debug_mode: true });
          `,
        }}
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
