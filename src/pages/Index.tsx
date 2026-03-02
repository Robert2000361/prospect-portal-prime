import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="noise-bg min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ProjectsSection />
    <AboutSection />
    <ExperienceSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
