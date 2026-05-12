
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['identity','stats','experience','projects','project_images','skills','education','current_study','certifications','site_settings']
  LOOP
    BEGIN
      EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I', t);
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
  END LOOP;
END $$;
