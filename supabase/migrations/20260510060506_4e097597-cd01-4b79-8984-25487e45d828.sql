
-- =========================================
-- ENUM + ROLES
-- =========================================
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================
-- updated_at helper
-- =========================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- =========================================
-- IDENTITY (single row)
-- =========================================
CREATE TABLE public.identity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  cv_url TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  typewriter_titles TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER identity_updated BEFORE UPDATE ON public.identity FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================================
-- STATS
-- =========================================
CREATE TABLE public.stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================
-- EXPERIENCE
-- =========================================
CREATE TABLE public.experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  logo_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER experience_updated BEFORE UPDATE ON public.experience FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================================
-- PROJECTS + IMAGES
-- =========================================
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  long_description TEXT,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_cover BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================
-- SKILLS
-- =========================================
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  proficiency_level INT NOT NULL DEFAULT 50 CHECK (proficiency_level BETWEEN 0 AND 100),
  icon_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================
-- EDUCATION
-- =========================================
CREATE TABLE public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field TEXT,
  start_year INT,
  end_year INT,
  is_current BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  logo_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================
-- CURRENT STUDY
-- =========================================
CREATE TABLE public.current_study (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  platform TEXT,
  progress_percent INT NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  url TEXT,
  icon_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================
-- CERTIFICATIONS
-- =========================================
CREATE TABLE public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  issuer TEXT,
  issue_date DATE,
  expiry_date DATE,
  credential_url TEXT,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================
-- SITE SETTINGS (key/value)
-- =========================================
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  type TEXT NOT NULL DEFAULT 'text',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER site_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================================
-- RLS — public read, admin write for all content tables
-- =========================================
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'identity','stats','experience','projects','project_images',
    'skills','education','current_study','certifications','site_settings'
  ]
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "Public can view %1$s" ON public.%1$I FOR SELECT USING (true)', t);
    EXECUTE format('CREATE POLICY "Admins can insert %1$s" ON public.%1$I FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), ''admin''))', t);
    EXECUTE format('CREATE POLICY "Admins can update %1$s" ON public.%1$I FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), ''admin'')) WITH CHECK (public.has_role(auth.uid(), ''admin''))', t);
    EXECUTE format('CREATE POLICY "Admins can delete %1$s" ON public.%1$I FOR DELETE TO authenticated USING (public.has_role(auth.uid(), ''admin''))', t);
  END LOOP;
END $$;

-- =========================================
-- STORAGE BUCKETS + POLICIES
-- =========================================
INSERT INTO storage.buckets (id, name, public) VALUES
  ('avatars', 'avatars', true),
  ('project-images', 'project-images', true),
  ('cv-files', 'cv-files', true),
  ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- Public read on these buckets
CREATE POLICY "Public read portfolio buckets"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('avatars','project-images','cv-files','certificates'));

CREATE POLICY "Admins upload portfolio buckets"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id IN ('avatars','project-images','cv-files','certificates')
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins update portfolio buckets"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id IN ('avatars','project-images','cv-files','certificates')
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins delete portfolio buckets"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id IN ('avatars','project-images','cv-files','certificates')
    AND public.has_role(auth.uid(), 'admin')
  );

-- =========================================
-- SEED current data
-- =========================================
INSERT INTO public.identity (name, title, bio, email, phone, location, github_url, linkedin_url, typewriter_titles, cv_url)
VALUES (
  'Robert Kamal',
  'Junior DevOps Engineer',
  E'Hi, I''m Robert Kamal, a DevOps Engineer focused on building reliable, automated, and scalable infrastructure.\n\nMy journey into DevOps started with a strong foundation in computer networking and Linux systems, which naturally evolved into a passion for automation, containerization, and cloud technologies. Through my academic background in Computer Science and hands-on training in the Digilians Digital Pioneers initiative, I have developed practical experience working with Linux environments, Bash automation, Git workflows, Docker containers, and CI/CD concepts.\n\nI enjoy turning manual processes into automated workflows and building environments that are consistent, predictable, and easy to maintain. My work focuses on simplifying infrastructure and improving deployment reliability through practical DevOps solutions.\n\nWhat sets me apart is my strong networking background (CCNA) combined with Linux and automation skills, allowing me to understand systems from the infrastructure level up to deployment pipelines and troubleshoot issues from the root cause.\n\nSome of the technologies I work with include Linux, Docker, Git, Bash scripting, Jenkins, and AWS fundamentals, and I am currently expanding my knowledge in cloud architecture and DevOps automation.\n\nIf you''d like to see how I approach real-world DevOps problems, feel free to explore my projects or connect with me.',
  'robertkamal00@gmail.com',
  NULL,
  'Cairo, Egypt',
  'https://github.com/Robert2000361',
  'https://linkedin.com/in/robertkamaladly',
  ARRAY['Junior DevOps Engineer','Linux Enthusiast','CI/CD Specialist','Cloud Infrastructure Builder'],
  '/Robert_Kamal_CV.pdf'
);

INSERT INTO public.experience (company, role, start_date, is_current, description, sort_order) VALUES
('Digital Pioneers Initiative / Digilians','DevOps Specialist Trainee','2025-01-01',true,
 E'• Administered and troubleshot 10+ Linux-based lab environments, ensuring 99% uptime for training sessions\n• Developed 5+ Bash automation scripts that reduced manual configuration steps by approximately 30%\n• Containerized 2+ applications using Docker with optimized multi-stage builds for smaller image footprints\n• Currently designing CI/CD pipeline labs with Jenkins & GitHub webhooks for automated integration workflows',
 0);

INSERT INTO public.education (institution, degree, field, start_year, end_year, description, sort_order) VALUES
('Egyptian E-Learning University','B.Sc. Computer Science & IT','Computer Science',2020,2024,
 'Graduation project: AI-Enhanced HR Management System (Excellent grade). GPA: 3.65/4.00.', 0);

INSERT INTO public.projects (title, description, tech_stack, github_url, is_featured, sort_order) VALUES
('Task Manager CLI',
 'Built a command-line task management tool in Bash to streamline daily workflow tracking. Supports add, delete, list, and search operations with persistent file-based storage.',
 ARRAY['Bash','CLI','Linux'],
 'https://github.com/robertkamal/task-manager-cli', true, 0),
('Docker Multi-App Containerization',
 'Containerized multiple small applications using Docker with optimized multi-stage builds, reducing image sizes by ~40% and ensuring consistent environments across dev and production.',
 ARRAY['Docker','Containers','DevOps','Multi-Stage Builds'],
 'https://github.com/robertkamal/docker-projects', true, 1),
('CI/CD Pipeline Automation Lab',
 'Designing an end-to-end CI/CD pipeline using Jenkins with GitHub webhooks for automated build, test, and deployment workflows. Includes Jenkinsfile-based pipeline as code.',
 ARRAY['Jenkins','GitHub','CI/CD','Automation','Webhooks'],
 NULL, false, 2);

INSERT INTO public.skills (name, category, proficiency_level, sort_order) VALUES
('Linux','OS & Scripting',85,0),('Bash','OS & Scripting',80,1),('Shell Scripting','OS & Scripting',80,2),
('Docker','Containers',80,0),('Docker Compose','Containers',75,1),
('Jenkins','CI/CD',70,0),('Git','CI/CD',85,1),('GitHub Actions','CI/CD',70,2),('CI/CD Pipelines','CI/CD',70,3),
('AWS','Cloud',60,0),('EC2','Cloud',60,1),('S3','Cloud',60,2),('Cloud Fundamentals','Cloud',65,3),
('TCP/IP','Networking',85,0),('Routing & Switching','Networking',80,1),('CCNA','Networking',85,2),('DNS','Networking',75,3),
('Ansible','Automation',60,0),('Infrastructure as Code','Automation',60,1);

INSERT INTO public.certifications (name, issuer, sort_order) VALUES
('CCNA','Cisco',0),
('AWS Cloud Fundamentals (In Progress)','AWS',1);

INSERT INTO public.site_settings (key, value, type) VALUES
('open_to_work','true','boolean'),
('footer_text','© Robert Kamal — built with Lovable','text'),
('primary_color','142 76% 36%','color'),
('site_title','Robert Kamal — DevOps Portfolio','text');
