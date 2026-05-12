import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
  const qc = useQueryClient();
  const primary = data?.settings.primary_color;
  const siteTitle = data?.settings.site_title;

  useEffect(() => {
    if (primary) document.documentElement.style.setProperty("--primary", primary);
    if (siteTitle) document.title = siteTitle;
  }, [primary, siteTitle]);

  useEffect(() => {
    const tables = ["identity","stats","experience","projects","project_images","skills","education","current_study","certifications","site_settings"];
    const ch = supabase.channel("portfolio-live");
    tables.forEach((t) => ch.on("postgres_changes", { event: "*", schema: "public", table: t }, () => qc.invalidateQueries({ queryKey: ["portfolio"] })));
    ch.subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [qc]);

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
