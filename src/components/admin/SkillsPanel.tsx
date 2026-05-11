import { CrudPanel } from "./CrudPanel";
import { Field, inputCls } from "./shared";

type Skill = { id?: string; name: string; category: string; proficiency_level: number; icon_url: string | null; sort_order: number };

export default function SkillsPanel() {
  return (
    <CrudPanel<Skill>
      cfg={{
        table: "skills",
        title: "Skills",
        empty: { name: "", category: "General", proficiency_level: 50, icon_url: null, sort_order: 0 },
        rowLabel: (r) => `${r.name}`,
        rowSubtitle: (r) => `${r.category} · ${r.proficiency_level}%`,
        renderForm: (r, set) => (
          <>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Name"><input className={inputCls} value={r.name} onChange={(e) => set({ ...r, name: e.target.value })} /></Field>
              <Field label="Category" hint="e.g. Cloud, DevOps Tools, Languages">
                <input className={inputCls} value={r.category} onChange={(e) => set({ ...r, category: e.target.value })} />
              </Field>
            </div>
            <Field label={`Proficiency: ${r.proficiency_level}%`}>
              <input type="range" min={0} max={100} value={r.proficiency_level} onChange={(e) => set({ ...r, proficiency_level: Number(e.target.value) })} className="w-full" />
            </Field>
          </>
        ),
      }}
    />
  );
}
