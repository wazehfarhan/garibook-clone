import { useEffect } from "react";
import AOS from "aos";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BookingForm from "../components/BookingForm";
import Stats from "../components/Stats";
import Services from "../components/Services";
import FreedomSection from "../components/FreedomSection";
import MoreThanMiles from "../components/MoreThanMiles";
import BookingArrival from "../components/BookingArrival";
import SmartDriver from "../components/SmartDriver";
import FeaturedBy from "../components/FeaturedBy";
import TestimonialSection from "../components/TestimonialSection";
import BlogSection from "../components/BlogSection";
import DownloadApp from "../components/DownloadApp";
import Footer from "../components/Footer";

function Home() {
  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: "ease" });
  }, []);

  return (
    <div className="homepage-wrapper">
      <Navbar />
      <main>
        <Hero />
        <section
          className="happy-client-wrapper"
          id="homepage_happy_client_wrapper"
        >
          <BookingForm />
          <Stats />
        </section>
        <Services />
        <FreedomSection />
        <MoreThanMiles />
        <BookingArrival />
        <SmartDriver />
        <FeaturedBy />
        <TestimonialSection />
        <BlogSection />
        <DownloadApp />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
