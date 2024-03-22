import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"  />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" /> 
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
