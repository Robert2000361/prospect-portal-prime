import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Save, Trash2 } from "lucide-react";
import {
  Card, Field, SectionTitle, inputCls, btnPrimary, btnGhost, btnDanger,
  FileUploadButton, TagInput, useInvalidate,
} from "./shared";

type Identity = {
  id?: string;
  name: string;
  title: string;
  bio: string;
  avatar_url: string | null;
  cv_url: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  typewriter_titles: string[];
};

const empty: Identity = {
  name: "", title: "", bio: "", avatar_url: null, cv_url: null,
  email: "", phone: "", location: "", github_url: "", linkedin_url: "", twitter_url: "",
  typewriter_titles: [],
};

export default function IdentityPanel() {
  const [data, setData] = useState<Identity>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const invalidate = useInvalidate();

  useEffect(() => {
    supabase.from("identity").select("*").limit(1).maybeSingle().then(({ data }) => {
      if (data) setData({ ...empty, ...data, typewriter_titles: data.typewriter_titles ?? [] });
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const payload = { ...data };
    const { error } = data.id
      ? await supabase.from("identity").update(payload).eq("id", data.id)
      : await supabase.from("identity").insert(payload).select().single();
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Identity saved");
    invalidate();
  };

  if (loading) return <Loader2 className="h-5 w-5 animate-spin text-primary" />;

  return (
    <div className="space-y-5">
      <SectionTitle title="Identity & Hero">
        <button onClick={save} disabled={saving} className={btnPrimary}>
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          Save
        </button>
      </SectionTitle>

      <Card>
        <div className="mb-5 flex items-center gap-5">
          <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-primary/40 bg-muted">
            {data.avatar_url ? (
              <img src={data.avatar_url} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl text-primary">
                {data.name.charAt(0) || "?"}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <FileUploadButton
              bucket="avatars"
              accept="image/png,image/jpeg,image/webp"
              maxMB={5}
              label="Upload Avatar"
              onUploaded={(url) => setData({ ...data, avatar_url: url })}
            />
            {data.avatar_url && (
              <button className={btnDanger} onClick={() => setData({ ...data, avatar_url: null })}>
                <Trash2 className="h-3 w-3" /> Remove
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name"><input className={inputCls} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} /></Field>
          <Field label="Job Title"><input className={inputCls} value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></Field>
          <Field label="Email"><input className={inputCls} value={data.email ?? ""} onChange={(e) => setData({ ...data, email: e.target.value })} /></Field>
          <Field label="Phone"><input className={inputCls} value={data.phone ?? ""} onChange={(e) => setData({ ...data, phone: e.target.value })} /></Field>
          <Field label="Location"><input className={inputCls} value={data.location ?? ""} onChange={(e) => setData({ ...data, location: e.target.value })} /></Field>
          <Field label="GitHub URL"><input className={inputCls} value={data.github_url ?? ""} onChange={(e) => setData({ ...data, github_url: e.target.value })} /></Field>
          <Field label="LinkedIn URL"><input className={inputCls} value={data.linkedin_url ?? ""} onChange={(e) => setData({ ...data, linkedin_url: e.target.value })} /></Field>
          <Field label="Twitter URL"><input className={inputCls} value={data.twitter_url ?? ""} onChange={(e) => setData({ ...data, twitter_url: e.target.value })} /></Field>
        </div>

        <div className="mt-4">
          <Field label="Bio (use blank line for paragraph break)" hint={`${data.bio.length} chars`}>
            <textarea
              className={`${inputCls} min-h-[160px]`}
              value={data.bio}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
            />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Typewriter Titles" hint="Press Enter to add each title">
            <TagInput
              value={data.typewriter_titles}
              onChange={(v) => setData({ ...data, typewriter_titles: v })}
              placeholder="e.g. DevOps Engineer"
            />
          </Field>
        </div>

        <div className="mt-5 border-t border-border pt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground">CV / Resume (PDF)</p>
          <div className="flex flex-wrap items-center gap-3">
            <FileUploadButton
              bucket="cv-files"
              accept="application/pdf"
              maxMB={10}
              label="Upload CV"
              onUploaded={(url) => setData({ ...data, cv_url: url })}
            />
            {data.cv_url && (
              <>
                <a href={data.cv_url} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                  Open current CV
                </a>
                <button className={btnDanger} onClick={() => setData({ ...data, cv_url: null })}>
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
