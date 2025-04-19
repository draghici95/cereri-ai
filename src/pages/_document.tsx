import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ro">
      <Head>
        {/* Meta tags SEO */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Generează cereri oficiale gratuite: demisie, concediu, eveniment. Format profesional, PDF & Word. Rapid și fără bătăi de cap."
        />
        <meta
          name="keywords"
          content="cerere demisie, cerere concediu, PDF cerere, model cerere 2025"
        />
        <meta name="author" content="Cereri.ai" />

        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="FfSA2WOqUhqFJ_UEL82pFNdda8zDuKQHF58ha7tEh_U" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Schema.org (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Cereri.ai",
              url: "https://cereri-ai.vercel.app",
              description: "Generează rapid cereri oficiale în format PDF și Word.",
              applicationCategory: "Productivity",
              inLanguage: "ro",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "RON"
              }
            }),
          }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BZH2CDNGKD"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BZH2CDNGKD');
            `,
          }}
        />

        {/* Google Ads Conversion Tracking */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-954838666"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-954838666');
              gtag('event', 'conversion', {
                'send_to': 'AW-954838666/XxA2CKuW37oaEIrdpscD'
              });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
