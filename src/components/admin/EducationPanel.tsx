import { CrudPanel } from "./CrudPanel";
import { Field, inputCls } from "./shared";

type Edu = {
  id?: string; institution: string; degree: string; field: string | null;
  start_year: number | null; end_year: number | null; is_current: boolean;
  description: string | null; logo_url: string | null; sort_order: number;
};

export default function EducationPanel() {
  return (
    <CrudPanel<Edu>
      cfg={{
        table: "education",
        title: "Education",
        empty: { institution: "", degree: "", field: "", start_year: null, end_year: null, is_current: false, description: "", logo_url: null, sort_order: 0 },
        rowLabel: (r) => `${r.degree} — ${r.institution}`,
        rowSubtitle: (r) => `${r.start_year ?? ""} → ${r.is_current ? "Present" : r.end_year ?? ""}`,
        renderForm: (r, set) => (
          <>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Degree"><input className={inputCls} value={r.degree} onChange={(e) => set({ ...r, degree: e.target.value })} /></Field>
              <Field label="Institution"><input className={inputCls} value={r.institution} onChange={(e) => set({ ...r, institution: e.target.value })} /></Field>
              <Field label="Field"><input className={inputCls} value={r.field ?? ""} onChange={(e) => set({ ...r, field: e.target.value })} /></Field>
              <div />
              <Field label="Start Year"><input type="number" className={inputCls} value={r.start_year ?? ""} onChange={(e) => set({ ...r, start_year: e.target.value ? Number(e.target.value) : null })} /></Field>
              <Field label="End Year"><input type="number" className={inputCls} value={r.end_year ?? ""} disabled={r.is_current} onChange={(e) => set({ ...r, end_year: e.target.value ? Number(e.target.value) : null })} /></Field>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={r.is_current} onChange={(e) => set({ ...r, is_current: e.target.checked })} />
              Currently studying
            </label>
            <Field label="Description"><textarea className={`${inputCls} min-h-[100px]`} value={r.description ?? ""} onChange={(e) => set({ ...r, description: e.target.value })} /></Field>
          </>
        ),
      }}
    />
  );
}
