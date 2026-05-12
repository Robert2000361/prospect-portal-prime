import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

type AuthCtx = {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
};

const Ctx = createContext<AuthCtx>({ session: null, user: null, isAdmin: false, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let lastCheckedUserId: string | null = null;

    const checkRole = async (uid: string | null) => {
      if (!uid) {
        if (mounted) setIsAdmin(false);
        lastCheckedUserId = null;
        return;
      }
      if (lastCheckedUserId === uid) return;
      lastCheckedUserId = uid;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      if (mounted) setIsAdmin(!!data);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!mounted) return;
      setSession(s);
      setUser(s?.user ?? null);
      // Defer to avoid blocking the auth callback
      setTimeout(() => checkRole(s?.user?.id ?? null), 0);
    });

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!mounted) return;
      setSession(s);
      setUser(s?.user ?? null);
      checkRole(s?.user?.id ?? null).finally(() => {
        if (mounted) setLoading(false);
      });
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return <Ctx.Provider value={{ session, user, isAdmin, loading }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  return useContext(Ctx);
}
