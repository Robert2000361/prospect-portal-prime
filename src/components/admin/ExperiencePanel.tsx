import { CrudPanel } from "./CrudPanel";
import { Field, inputCls, FileUploadButton, btnDanger } from "./shared";
import { Trash2 } from "lucide-react";

type Exp = {
  id?: string; company: string; role: string;
  start_date: string | null; end_date: string | null;
  is_current: boolean; description: string | null; logo_url: string | null; sort_order: number;
};

export default function ExperiencePanel() {
  return (
    <CrudPanel<Exp>
      cfg={{
        table: "experience",
        title: "Experience",
        empty: { company: "", role: "", start_date: null, end_date: null, is_current: false, description: "", logo_url: null, sort_order: 0 },
        rowLabel: (r) => `${r.role} @ ${r.company}`,
        rowSubtitle: (r) => `${r.start_date ?? ""} → ${r.is_current ? "Present" : r.end_date ?? ""}`,
        renderForm: (r, set) => (
          <>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Role"><input className={inputCls} value={r.role} onChange={(e) => set({ ...r, role: e.target.value })} /></Field>
              <Field label="Company"><input className={inputCls} value={r.company} onChange={(e) => set({ ...r, company: e.target.value })} /></Field>
              <Field label="Start Date"><input type="date" className={inputCls} value={r.start_date ?? ""} onChange={(e) => set({ ...r, start_date: e.target.value || null })} /></Field>
              <Field label="End Date"><input type="date" className={inputCls} value={r.end_date ?? ""} disabled={r.is_current} onChange={(e) => set({ ...r, end_date: e.target.value || null })} /></Field>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={r.is_current} onChange={(e) => set({ ...r, is_current: e.target.checked, end_date: e.target.checked ? null : r.end_date })} />
              Currently working here
            </label>
            <Field label="Description (one bullet per line, prefix with • optional)">
              <textarea className={`${inputCls} min-h-[140px]`} value={r.description ?? ""} onChange={(e) => set({ ...r, description: e.target.value })} />
            </Field>
            <Field label="Company Logo">
              <div className="flex items-center gap-3">
                {r.logo_url && <img src={r.logo_url} alt="logo" className="h-10 w-10 rounded object-cover" />}
                <FileUploadButton bucket="avatars" prefix="logos" onUploaded={(url) => set({ ...r, logo_url: url })} />
                {r.logo_url && (
                  <button className={btnDanger} onClick={() => set({ ...r, logo_url: null })}>
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            </Field>
          </>
        ),
      }}
    />
  );
}
