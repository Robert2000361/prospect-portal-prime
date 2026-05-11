import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Loader2, LogOut, ExternalLink, User, BarChart3, Briefcase, FolderKanban,
  Wrench, GraduationCap, BookOpen, Award, Settings, Menu, X,
} from "lucide-react";

import IdentityPanel from "@/components/admin/IdentityPanel";
import StatsPanel from "@/components/admin/StatsPanel";
import ExperiencePanel from "@/components/admin/ExperiencePanel";
import ProjectsPanel from "@/components/admin/ProjectsPanel";
import SkillsPanel from "@/components/admin/SkillsPanel";
import EducationPanel from "@/components/admin/EducationPanel";
import CurrentStudyPanel from "@/components/admin/CurrentStudyPanel";
import CertificationsPanel from "@/components/admin/CertificationsPanel";
import SiteSettingsPanel from "@/components/admin/SiteSettingsPanel";

const TABS = [
  { id: "identity", label: "Identity & Hero", icon: User, Comp: IdentityPanel },
  { id: "stats", label: "Stats", icon: BarChart3, Comp: StatsPanel },
  { id: "projects", label: "Projects", icon: FolderKanban, Comp: ProjectsPanel },
  { id: "experience", label: "Experience", icon: Briefcase, Comp: ExperiencePanel },
  { id: "skills", label: "Skills", icon: Wrench, Comp: SkillsPanel },
  { id: "education", label: "Education", icon: GraduationCap, Comp: EducationPanel },
  { id: "learning", label: "Currently Learning", icon: BookOpen, Comp: CurrentStudyPanel },
  { id: "certifications", label: "Certifications", icon: Award, Comp: CertificationsPanel },
  { id: "settings", label: "Site Settings", icon: Settings, Comp: SiteSettingsPanel },
];

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const [active, setActive] = useState("identity");
  const [open, setOpen] = useState(false);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }
  if (!user || !isAdmin) return <Navigate to="/admin" replace />;

  const Active = TABS.find((t) => t.id === active)!.Comp;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-card transition-transform md:relative md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <span className="text-sm font-bold text-primary">Portfolio Admin</span>
          <button className="md:hidden" onClick={() => setOpen(false)}><X className="h-4 w-4" /></button>
        </div>
        <nav className="space-y-0.5 p-3">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                onClick={() => { setActive(t.id); setOpen(false); }}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-xs font-medium transition ${isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
              >
                <Icon className="h-3.5 w-3.5" /> {t.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-5">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setOpen(true)}><Menu className="h-4 w-4" /></button>
            <h1 className="text-base font-semibold text-foreground">{TABS.find((t) => t.id === active)?.label}</h1>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:border-primary hover:text-primary">
              <ExternalLink className="h-3 w-3" /> Live Site
            </a>
            <span className="hidden text-xs text-muted-foreground sm:inline">{user.email}</span>
            <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:border-destructive hover:text-destructive">
              <LogOut className="h-3 w-3" /> Sign out
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-5xl">
            <Active />
          </div>
        </main>
      </div>
    </div>
  );
}
