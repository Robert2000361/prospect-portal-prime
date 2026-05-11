import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Save, Trash2, ArrowUp, ArrowDown, X, Star, Image as ImageIcon } from "lucide-react";
import {
  Card, SectionTitle, Field, inputCls, btnPrimary, btnGhost, btnDanger,
  TagInput, FileUploadButton, useInvalidate,
} from "./shared";

type Project = {
  id?: string; title: string; description: string; long_description: string | null;
  tech_stack: string[]; github_url: string | null; live_url: string | null;
  is_featured: boolean; sort_order: number;
};
type ProjectImage = { id: string; project_id: string; image_url: string; caption: string | null; sort_order: number; is_cover: boolean };

const empty: Project = { title: "", description: "", long_description: "", tech_stack: [], github_url: "", live_url: "", is_featured: false, sort_order: 0 };

export default function ProjectsPanel() {
  const [rows, setRows] = useState<Project[]>([]);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const invalidate = useInvalidate();

  const load = async () => {
    setLoading(true);
    const [p, im] = await Promise.all([
      supabase.from("projects").select("*").order("sort_order"),
      supabase.from("project_images").select("*").order("sort_order"),
    ]);
    setRows((p.data ?? []) as Project[]);
    setImages((im.data ?? []) as ProjectImage[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const payload: any = { ...editing };
    const isNew = !payload.id;
    if (isNew) delete payload.id;
    const { error } = isNew
      ? await supabase.from("projects").insert(payload)
      : await supabase.from("projects").update(payload).eq("id", payload.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Project saved");
    setEditing(null);
    await load();
    invalidate();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete project (and its images)?")) return;
    await supabase.from("project_images").delete().eq("project_id", id);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    await load(); invalidate();
  };

  const move = async (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= rows.length) return;
    const a = rows[idx], b = rows[j];
    await supabase.from("projects").update({ sort_order: b.sort_order }).eq("id", a.id!);
    await supabase.from("projects").update({ sort_order: a.sort_order }).eq("id", b.id!);
    await load(); invalidate();
  };

  const projectImages = (pid: string) => images.filter((i) => i.project_id === pid).sort((a, b) => a.sort_order - b.sort_order);

  const addImage = async (projectId: string, url: string) => {
    const existing = projectImages(projectId);
    const { error } = await supabase.from("project_images").insert({
      project_id: projectId, image_url: url, sort_order: existing.length, is_cover: existing.length === 0,
    });
    if (error) return toast.error(error.message);
    await load(); invalidate();
  };

  const removeImage = async (id: string) => {
    if (!confirm("Remove this image?")) return;
    await supabase.from("project_images").delete().eq("id", id);
    await load(); invalidate();
  };

  const setCover = async (img: ProjectImage) => {
    await supabase.from("project_images").update({ is_cover: false }).eq("project_id", img.project_id);
    await supabase.from("project_images").update({ is_cover: true }).eq("id", img.id);
    await load(); invalidate();
  };

  const updateCaption = async (id: string, caption: string) => {
    await supabase.from("project_images").update({ caption }).eq("id", id);
    await load(); invalidate();
  };

  const moveImage = async (img: ProjectImage, dir: -1 | 1) => {
    const list = projectImages(img.project_id);
    const idx = list.findIndex((x) => x.id === img.id);
    const j = idx + dir;
    if (j < 0 || j >= list.length) return;
    const other = list[j];
    await supabase.from("project_images").update({ sort_order: other.sort_order }).eq("id", img.id);
    await supabase.from("project_images").update({ sort_order: img.sort_order }).eq("id", other.id);
    await load(); invalidate();
  };

  return (
    <div className="space-y-5">
      <SectionTitle title="Projects">
        <button className={btnPrimary} onClick={() => setEditing({ ...empty, sort_order: rows.length })}>
          <Plus className="h-3.5 w-3.5" /> Add Project
        </button>
      </SectionTitle>

      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {rows.length === 0 && <p className="text-sm text-muted-foreground">No projects yet.</p>}
          {rows.map((p, i) => {
            const imgs = projectImages(p.id!);
            const cover = imgs.find((x) => x.is_cover) ?? imgs[0];
            return (
              <Card key={p.id} className="!p-4">
                <div className="mb-3 flex items-start gap-3">
                  <div className="h-16 w-24 shrink-0 overflow-hidden rounded bg-muted">
                    {cover ? <img src={cover.image_url} className="h-full w-full object-cover" alt="" /> : <div className="flex h-full w-full items-center justify-center text-muted-foreground"><ImageIcon className="h-5 w-5" /></div>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      {p.title}
                      {p.is_featured && <Star className="h-3 w-3 text-primary" />}
                    </p>
                    <p className="line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => move(i, -1)}><ArrowUp className="h-3 w-3 text-muted-foreground hover:text-primary" /></button>
                    <button onClick={() => move(i, 1)}><ArrowDown className="h-3 w-3 text-muted-foreground hover:text-primary" /></button>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="mb-1.5 text-[11px] font-semibold uppercase text-muted-foreground">Gallery ({imgs.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {imgs.map((im) => (
                      <div key={im.id} className="group relative h-14 w-14 overflow-hidden rounded border border-border">
                        <img src={im.image_url} className="h-full w-full object-cover" alt="" />
                        {im.is_cover && <span className="absolute left-0.5 top-0.5 rounded bg-primary/90 px-1 text-[8px] font-bold text-primary-foreground">COVER</span>}
                        <div className="absolute inset-0 hidden items-center justify-center gap-0.5 bg-background/85 group-hover:flex">
                          {!im.is_cover && (
                            <button onClick={() => setCover(im)} title="Set cover"><Star className="h-3 w-3 text-primary" /></button>
                          )}
                          <button onClick={() => moveImage(im, -1)}><ArrowUp className="h-3 w-3" /></button>
                          <button onClick={() => moveImage(im, 1)}><ArrowDown className="h-3 w-3" /></button>
                          <button onClick={() => removeImage(im.id)}><Trash2 className="h-3 w-3 text-destructive" /></button>
                        </div>
                      </div>
                    ))}
                    <FileUploadButton
                      bucket="project-images"
                      prefix={p.id}
                      label="Add"
                      onUploaded={(url) => addImage(p.id!, url)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button className={btnGhost} onClick={() => setEditing({ ...p })}>Edit</button>
                  <button className={btnDanger} onClick={() => remove(p.id!)}><Trash2 className="h-3 w-3" /></button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur" onClick={() => setEditing(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">{editing.id ? "Edit" : "New"} Project</h3>
              <button onClick={() => setEditing(null)}><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-4">
              <Field label="Title"><input className={inputCls} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
              <Field label="Short description"><textarea className={`${inputCls} min-h-[60px]`} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></Field>
              <Field label="Long description (optional)"><textarea className={`${inputCls} min-h-[100px]`} value={editing.long_description ?? ""} onChange={(e) => setEditing({ ...editing, long_description: e.target.value })} /></Field>
              <Field label="Tech stack">
                <TagInput value={editing.tech_stack} onChange={(v) => setEditing({ ...editing, tech_stack: v })} />
              </Field>
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="GitHub URL"><input className={inputCls} value={editing.github_url ?? ""} onChange={(e) => setEditing({ ...editing, github_url: e.target.value })} /></Field>
                <Field label="Live URL"><input className={inputCls} value={editing.live_url ?? ""} onChange={(e) => setEditing({ ...editing, live_url: e.target.value })} /></Field>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.is_featured} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} />
                Featured project
              </label>
              {!editing.id && <p className="text-xs text-muted-foreground">Save first, then add images from the project card.</p>}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button className={btnGhost} onClick={() => setEditing(null)}>Cancel</button>
              <button className={btnPrimary} onClick={save} disabled={saving}>
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
