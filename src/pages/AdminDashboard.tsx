import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogOut, ExternalLink } from "lucide-react";

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/admin" replace />;
  if (!isAdmin) return <Navigate to="/admin" replace />;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-bold text-primary">Portfolio Admin</h1>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:border-primary hover:text-primary"
            >
              <ExternalLink className="h-3.5 w-3.5" /> View Live Site
            </a>
            <span className="text-xs text-muted-foreground">{user.email}</span>
            <button
              onClick={() => supabase.auth.signOut()}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:border-destructive hover:text-destructive"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-xl border border-border bg-card p-8">
          <h2 className="mb-2 text-xl font-bold text-foreground">Welcome, admin 👋</h2>
          <p className="text-sm text-muted-foreground">
            Milestone 1 is live: backend, schema, public site driven by live data, and
            authentication are all working. The full CRUD dashboard panels (Identity, Stats,
            Experience, Projects, Skills, Education, Current Learning, Certifications, Site
            Settings) ship in Milestones 2–4.
          </p>
        </div>
      </main>
    </div>
  );
}
