import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Devotional from "@/components/Devotional";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <main className="flex-1">
      <LoadingScreen />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Devotional />
      <Events />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
