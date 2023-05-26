// pages/_app.js
import '../styles/globals.css';
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import Script from 'next/script';

export default function App({ Component, pageProps }: any) {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-XF32STW6F7"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XF32STW6F7', {
          page_path: window.location.pathname,
          });`,
        }}
      />
    </UserProvider>
  );
}
