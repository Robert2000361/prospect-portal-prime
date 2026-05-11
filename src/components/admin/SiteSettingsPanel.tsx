import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { Card, Field, inputCls, btnPrimary, SectionTitle, useInvalidate } from "./shared";

type Setting = { id?: string; key: string; value: string | null; type: string };

const KNOWN: { key: string; label: string; type: "text" | "boolean" | "color"; hint?: string }[] = [
  { key: "site_title", label: "Site Title", type: "text" },
  { key: "footer_text", label: "Footer Text", type: "text" },
  { key: "open_to_work", label: "Open to Work badge", type: "boolean" },
  { key: "primary_color", label: "Primary Color (HSL: H S% L%)", type: "color", hint: "e.g. 40 90% 55%" },
];

export default function SiteSettingsPanel() {
  const [map, setMap] = useState<Record<string, Setting>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const invalidate = useInvalidate();

  useEffect(() => {
    supabase.from("site_settings").select("*").then(({ data }) => {
      const m: Record<string, Setting> = {};
      (data ?? []).forEach((s: any) => (m[s.key] = s));
      KNOWN.forEach((k) => { if (!m[k.key]) m[k.key] = { key: k.key, value: "", type: k.type }; });
      setMap(m);
      setLoading(false);
    });
  }, []);

  const update = (key: string, value: string) => setMap({ ...map, [key]: { ...map[key], value } });

  const save = async () => {
    setSaving(true);
    for (const k of Object.values(map)) {
      const payload = { key: k.key, value: k.value, type: k.type };
      const { error } = k.id
        ? await supabase.from("site_settings").update(payload).eq("id", k.id)
        : await supabase.from("site_settings").insert(payload);
      if (error) { toast.error(error.message); setSaving(false); return; }
    }
    setSaving(false);
    toast.success("Settings saved");
    invalidate();
  };

  if (loading) return <Loader2 className="h-5 w-5 animate-spin text-primary" />;

  return (
    <div className="space-y-5">
      <SectionTitle title="Site Settings">
        <button className={btnPrimary} onClick={save} disabled={saving}>
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          Save
        </button>
      </SectionTitle>
      <Card>
        <div className="space-y-4">
          {KNOWN.map((k) => {
            const v = map[k.key]?.value ?? "";
            return (
              <Field key={k.key} label={k.label} hint={k.hint}>
                {k.type === "boolean" ? (
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={v === "true"} onChange={(e) => update(k.key, e.target.checked ? "true" : "false")} />
                    {v === "true" ? "Enabled" : "Disabled"}
                  </label>
                ) : (
                  <input className={inputCls} value={v} onChange={(e) => update(k.key, e.target.value)} />
                )}
              </Field>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
