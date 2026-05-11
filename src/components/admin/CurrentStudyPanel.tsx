import { CrudPanel } from "./CrudPanel";
import { Field, inputCls } from "./shared";

type CS = { id?: string; title: string; platform: string | null; progress_percent: number; url: string | null; icon_url: string | null; sort_order: number };

export default function CurrentStudyPanel() {
  return (
    <CrudPanel<CS>
      cfg={{
        table: "current_study",
        title: "Currently Learning",
        empty: { title: "", platform: "", progress_percent: 0, url: "", icon_url: null, sort_order: 0 },
        rowLabel: (r) => r.title,
        rowSubtitle: (r) => `${r.platform ?? ""} · ${r.progress_percent}%`,
        renderForm: (r, set) => (
          <>
            <Field label="Title"><input className={inputCls} value={r.title} onChange={(e) => set({ ...r, title: e.target.value })} /></Field>
            <Field label="Platform"><input className={inputCls} value={r.platform ?? ""} onChange={(e) => set({ ...r, platform: e.target.value })} /></Field>
            <Field label="URL"><input className={inputCls} value={r.url ?? ""} onChange={(e) => set({ ...r, url: e.target.value })} /></Field>
            <Field label={`Progress: ${r.progress_percent}%`}>
              <input type="range" min={0} max={100} value={r.progress_percent} onChange={(e) => set({ ...r, progress_percent: Number(e.target.value) })} className="w-full" />
            </Field>
          </>
        ),
      }}
    />
  );
}
