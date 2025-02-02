import React from 'react';
import Navbar from './navbar/Navbar';
import Hero from './Hero';
import Features from './Features';
import EventSlider from './EventSlider';
import ArtistSpotlight from './ArtistSpotlight';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Footer from './footer/Footer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <EventSlider />
      {/* <ArtistSpotlight /> */}
      <HowItWorks />
      <Testimonials />
      <Footer />
    </>
  );
}