import { CrudPanel } from "./CrudPanel";
import { Field, inputCls } from "./shared";

type Stat = { id?: string; label: string; value: string; icon: string | null; sort_order: number };

export default function StatsPanel() {
  return (
    <CrudPanel<Stat>
      cfg={{
        table: "stats",
        title: "Stats",
        empty: { label: "", value: "", icon: "", sort_order: 0 },
        rowLabel: (r) => `${r.value} — ${r.label}`,
        renderForm: (r, set) => (
          <>
            <Field label="Label"><input className={inputCls} value={r.label} onChange={(e) => set({ ...r, label: e.target.value })} /></Field>
            <Field label="Value"><input className={inputCls} value={r.value} onChange={(e) => set({ ...r, value: e.target.value })} /></Field>
            <Field label="Icon name (lucide)" hint="e.g. Award, Code, Briefcase">
              <input className={inputCls} value={r.icon ?? ""} onChange={(e) => set({ ...r, icon: e.target.value })} />
            </Field>
          </>
        ),
      }}
    />
  );
}
