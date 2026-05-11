import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const Index = () => {
  const { data } = usePortfolioData();
  const primary = data?.settings.primary_color;
  const siteTitle = data?.settings.site_title;

  useEffect(() => {
    if (primary) document.documentElement.style.setProperty("--primary", primary);
    if (siteTitle) document.title = siteTitle;
  }, [primary, siteTitle]);

  return (
    <div className="noise-bg min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
