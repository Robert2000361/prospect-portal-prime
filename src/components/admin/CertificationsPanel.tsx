import { CrudPanel } from "./CrudPanel";
import { Field, inputCls, FileUploadButton, btnDanger } from "./shared";
import { Trash2 } from "lucide-react";

type Cert = {
  id?: string; name: string; issuer: string | null;
  issue_date: string | null; expiry_date: string | null;
  credential_url: string | null; image_url: string | null; sort_order: number;
};

export default function CertificationsPanel() {
  return (
    <CrudPanel<Cert>
      cfg={{
        table: "certifications",
        title: "Certifications",
        empty: { name: "", issuer: "", issue_date: null, expiry_date: null, credential_url: "", image_url: null, sort_order: 0 },
        rowLabel: (r) => r.name,
        rowSubtitle: (r) => r.issuer,
        renderForm: (r, set) => (
          <>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Name"><input className={inputCls} value={r.name} onChange={(e) => set({ ...r, name: e.target.value })} /></Field>
              <Field label="Issuer"><input className={inputCls} value={r.issuer ?? ""} onChange={(e) => set({ ...r, issuer: e.target.value })} /></Field>
              <Field label="Issue Date"><input type="date" className={inputCls} value={r.issue_date ?? ""} onChange={(e) => set({ ...r, issue_date: e.target.value || null })} /></Field>
              <Field label="Expiry Date"><input type="date" className={inputCls} value={r.expiry_date ?? ""} onChange={(e) => set({ ...r, expiry_date: e.target.value || null })} /></Field>
            </div>
            <Field label="Credential URL"><input className={inputCls} value={r.credential_url ?? ""} onChange={(e) => set({ ...r, credential_url: e.target.value })} /></Field>
            <Field label="Certificate Image">
              <div className="flex items-center gap-3">
                {r.image_url && <img src={r.image_url} alt="cert" className="h-12 w-20 rounded object-cover" />}
                <FileUploadButton bucket="certificates" onUploaded={(url) => set({ ...r, image_url: url })} />
                {r.image_url && (
                  <button className={btnDanger} onClick={() => set({ ...r, image_url: null })}>
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
