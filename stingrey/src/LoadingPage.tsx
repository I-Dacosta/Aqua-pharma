import React from 'react';
import { Navbar } from '@/components/marketing/Navbar';
import { Hero } from '@/components/marketing/Hero';
import { MediaCards } from '@/components/marketing/MediaCards';
import { Footer } from '@/components/marketing/Footer';

export default function LoadingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MediaCards />
      </main>
      <Footer />
    </>
  );
}
