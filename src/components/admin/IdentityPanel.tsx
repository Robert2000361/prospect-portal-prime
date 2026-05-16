import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileText, Loader2, Save, Trash2, Upload } from "lucide-react";
import {
  Card, Field, SectionTitle, inputCls, btnPrimary, btnGhost, btnDanger,
  FileUploadButton, TagInput, useInvalidate,
} from "./shared";

const CV_BUCKET = "cv-files";
const MAX_CV_MB = 10;

/** Extract storage object path from a public URL (strips ?query). */
function pathFromCvUrl(url: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const marker = `/object/public/${CV_BUCKET}/`;
    const idx = u.pathname.indexOf(marker);
    if (idx === -1) return null;
    return decodeURIComponent(u.pathname.slice(idx + marker.length));
  } catch {
    return null;
  }
}

function CvUploader({
  identityId,
  cvUrl,
  updatedAt,
  onSaved,
}: {
  identityId: string | undefined;
  cvUrl: string | null;
  updatedAt?: string | null;
  onSaved: (url: string | null, updatedAt: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const invalidate = useInvalidate();

  const currentPath = pathFromCvUrl(cvUrl);
  const fileName = currentPath?.split("/").pop() ?? null;

  const handleFile = async (file: File) => {
    if (!identityId) {
      toast.error("Save identity first before uploading a CV");
      return;
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Only PDF files are accepted");
      return;
    }
    if (file.size === 0) {
      toast.error("File appears to be empty or corrupted");
      return;
    }
    if (file.size > MAX_CV_MB * 1024 * 1024) {
      toast.error(`File exceeds ${MAX_CV_MB}MB limit`);
      return;
    }

    setBusy(true);
    setProgress(5);
    const tick = setInterval(() => {
      setProgress((p) => (p == null ? p : Math.min(p + 8, 90)));
    }, 200);

    try {
      // Remove old file (best-effort)
      if (currentPath) {
        await supabase.storage.from(CV_BUCKET).remove([currentPath]).catch(() => null);
      }

      const path = `cv-${Date.now()}.pdf`;
      const { error: upErr } = await supabase.storage.from(CV_BUCKET).upload(path, file, {
        cacheControl: "0",
        upsert: true,
        contentType: "application/pdf",
      });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from(CV_BUCKET).getPublicUrl(path);
      const bustedUrl = `${pub.publicUrl}?v=${Date.now()}`;

      const { data: updated, error: dbErr } = await supabase
        .from("identity")
        .update({ cv_url: bustedUrl, updated_at: new Date().toISOString() })
        .eq("id", identityId)
        .select()
        .single();
      if (dbErr) throw dbErr;

      setProgress(100);
      toast.success("CV uploaded and published");
      onSaved(bustedUrl, updated.updated_at);
      invalidate();
    } catch (err: any) {
      toast.error(err?.message ?? "Upload failed");
    } finally {
      clearInterval(tick);
      setBusy(false);
      setTimeout(() => setProgress(null), 600);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeCv = async () => {
    if (!identityId || !cvUrl) return;
    if (!confirm("Remove current CV?")) return;
    setBusy(true);
    try {
      if (currentPath) {
        await supabase.storage.from(CV_BUCKET).remove([currentPath]).catch(() => null);
      }
      const { data: updated, error } = await supabase
        .from("identity")
        .update({ cv_url: null, updated_at: new Date().toISOString() })
        .eq("id", identityId)
        .select()
        .single();
      if (error) throw error;
      toast.success("CV removed");
      onSaved(null, updated.updated_at);
      invalidate();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to remove");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-background/40 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
        CV / Resume (PDF, max {MAX_CV_MB}MB)
      </p>

      {cvUrl ? (
        <div className="mb-3 flex items-center gap-3 rounded-md border border-border/60 bg-card p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-primary/15 text-primary">
            <FileText className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">{fileName ?? "CV.pdf"}</p>
            {updatedAt && (
              <p className="text-[10px] text-muted-foreground">
                Last updated {new Date(updatedAt).toLocaleString()}
              </p>
            )}
          </div>
          <a href={cvUrl} target="_blank" rel="noopener noreferrer" className={btnGhost}>
            Open
          </a>
        </div>
      ) : (
        <p className="mb-3 text-xs text-muted-foreground">No CV uploaded yet.</p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy || !identityId}
          className={btnPrimary}
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          {cvUrl ? "Replace CV" : "Upload CV"}
        </button>
        {cvUrl && (
          <button type="button" className={btnDanger} onClick={removeCv} disabled={busy}>
            <Trash2 className="h-3 w-3" /> Remove
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </div>

      {progress != null && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

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
  updated_at?: string | null;
};

const empty: Identity = {
  name: "", title: "", bio: "", avatar_url: null, cv_url: null,
  email: "", phone: "", location: "", github_url: "", linkedin_url: "", twitter_url: "",
  typewriter_titles: [], updated_at: null,
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
          <CvUploader
            identityId={data.id}
            cvUrl={data.cv_url}
            updatedAt={data.updated_at}
            onSaved={(url, updatedAt) => setData((d) => ({ ...d, cv_url: url, updated_at: updatedAt }))}
          />
        </div>
      </Card>
    </div>
  );
}
