import React from 'react';
import Head from 'next/head'; 
import Hero from '@/components/Hero';

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Home | Andrew Tedjapratama</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Hero />
    </>
  );
};
export default LandingPage;
