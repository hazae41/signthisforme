import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta key="application-name" name="application-name" content="Brume Wallet" />
        <meta key="description" name="description" content="The private wallet" />
        <meta key="color-scheme" name="color-scheme" content="dark light" />
        <meta key="theme-color-light" name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta key="theme-color-dark" name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta key="apple-mobile-web-app-capable" name="apple-mobile-web-app-capable" content="yes" />
        <meta key="apple-mobile-web-app-title" name="apple-mobile-web-app-title" content="Brume Wallet" />
        <meta key="apple-mobile-web-app-status-bar-style" name="apple-mobile-web-app-status-bar-style" content="white" />
        <meta key="referrer" name="referrer" content="no-referrer" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
