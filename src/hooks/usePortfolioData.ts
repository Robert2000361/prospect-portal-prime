import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const navLinks = NAV_LINKS;

async function fetchAll() {
  const [
    identityRes,
    statsRes,
    experienceRes,
    projectsRes,
    projectImagesRes,
    skillsRes,
    educationRes,
    currentStudyRes,
    certsRes,
    settingsRes,
  ] = await Promise.all([
    supabase.from("identity").select("*").limit(1).maybeSingle(),
    supabase.from("stats").select("*").order("sort_order"),
    supabase.from("experience").select("*").order("sort_order"),
    supabase.from("projects").select("*").order("sort_order"),
    supabase.from("project_images").select("*").order("sort_order"),
    supabase.from("skills").select("*").order("sort_order"),
    supabase.from("education").select("*").order("sort_order"),
    supabase.from("current_study").select("*").order("sort_order"),
    supabase.from("certifications").select("*").order("sort_order"),
    supabase.from("site_settings").select("*"),
  ]);

  const settings: Record<string, string> = {};
  (settingsRes.data ?? []).forEach((s: any) => (settings[s.key] = s.value));

  return {
    identity: identityRes.data,
    stats: statsRes.data ?? [],
    experience: experienceRes.data ?? [],
    projects: projectsRes.data ?? [],
    projectImages: projectImagesRes.data ?? [],
    skills: skillsRes.data ?? [],
    education: educationRes.data ?? [],
    currentStudy: currentStudyRes.data ?? [],
    certifications: certsRes.data ?? [],
    settings,
  };
}

export function usePortfolioData() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: fetchAll,
    staleTime: 60_000,
  });
}

export type PortfolioData = Awaited<ReturnType<typeof fetchAll>>;
