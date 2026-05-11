import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Save, Trash2, ArrowUp, ArrowDown, X } from "lucide-react";
import { Card, SectionTitle, btnPrimary, btnGhost, btnDanger, useInvalidate } from "./shared";

export type CrudConfig<T extends { id?: string; sort_order?: number }> = {
  table: string;
  empty: T;
  title: string;
  rowLabel: (row: T) => string;
  rowSubtitle?: (row: T) => string | null;
  renderForm: (row: T, set: (next: T) => void) => React.ReactNode;
  orderBy?: keyof T;
};

export function CrudPanel<T extends { id?: string; sort_order?: number }>({ cfg }: { cfg: CrudConfig<T> }) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<T | null>(null);
  const [saving, setSaving] = useState(false);
  const invalidate = useInvalidate();

  const load = async () => {
    setLoading(true);
    const orderCol = (cfg.orderBy as string) ?? "sort_order";
    const { data, error } = await supabase.from(cfg.table as any).select("*").order(orderCol);
    if (error) toast.error(error.message);
    setRows((data ?? []) as unknown as T[]);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const startNew = () => {
    setEditing({ ...cfg.empty, sort_order: rows.length } as T);
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const payload: any = { ...editing };
    const isNew = !payload.id;
    if (isNew) delete payload.id;
    const { error } = isNew
      ? await supabase.from(cfg.table as any).insert(payload)
      : await supabase.from(cfg.table as any).update(payload).eq("id", payload.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    await load();
    invalidate();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this entry? This cannot be undone.")) return;
    const { error } = await supabase.from(cfg.table as any).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    await load();
    invalidate();
  };

  const move = async (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= rows.length) return;
    const a = rows[idx], b = rows[j];
    await supabase.from(cfg.table as any).update({ sort_order: b.sort_order ?? j }).eq("id", a.id!);
    await supabase.from(cfg.table as any).update({ sort_order: a.sort_order ?? idx }).eq("id", b.id!);
    await load();
    invalidate();
  };

  return (
    <div className="space-y-5">
      <SectionTitle title={cfg.title}>
        <button className={btnPrimary} onClick={startNew}>
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </SectionTitle>

      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      ) : (
        <div className="space-y-2">
          {rows.length === 0 && <p className="text-sm text-muted-foreground">No entries yet. Click Add to create one.</p>}
          {rows.map((r, i) => (
            <Card key={r.id} className="!p-3">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-0.5">
                  <button className="text-muted-foreground hover:text-primary" onClick={() => move(i, -1)} aria-label="Up">
                    <ArrowUp className="h-3 w-3" />
                  </button>
                  <button className="text-muted-foreground hover:text-primary" onClick={() => move(i, 1)} aria-label="Down">
                    <ArrowDown className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{cfg.rowLabel(r)}</p>
                  {cfg.rowSubtitle && (
                    <p className="truncate text-xs text-muted-foreground">{cfg.rowSubtitle(r)}</p>
                  )}
                </div>
                <button className={btnGhost} onClick={() => setEditing({ ...r })}>Edit</button>
                <button className={btnDanger} onClick={() => remove(r.id!)}>
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur" onClick={() => setEditing(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">{editing.id ? "Edit" : "New"} {cfg.title.replace(/s$/, "")}</h3>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {cfg.renderForm(editing, setEditing)}
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
