export const personalInfo = {
  name: "Robert Kamal",
  title: "Junior DevOps Engineer",
  location: "Cairo, Egypt",
  email: "robert.kamal@example.com",
  github: "https://github.com/robertkamal",
  linkedin: "https://linkedin.com/in/robertkamal",
  summary:
    "Aspiring DevOps engineer with a solid foundation in Linux administration, networking (CCNA), cloud fundamentals (AWS), Bash automation, Docker containerization, and CI/CD pipeline concepts. Passionate about building reliable infrastructure and automating everything.",
};

export const skills = [
  {
    category: "DevOps & CI/CD",
    items: ["Jenkins", "Git", "GitHub Workflows", "CI/CD Pipelines"],
  },
  {
    category: "Containers",
    items: ["Docker", "Docker Compose"],
  },
  {
    category: "OS & Scripting",
    items: ["Linux", "Bash", "Shell Scripting"],
  },
  {
    category: "Cloud",
    items: ["AWS Fundamentals", "EC2", "S3"],
  },
  {
    category: "Networking",
    items: ["TCP/IP", "Routing & Switching", "CCNA Foundation", "DNS"],
  },
  {
    category: "Automation",
    items: ["Ansible", "Infrastructure as Code"],
  },
];

export const projects = [
  {
    title: "Task Manager CLI",
    description:
      "A command-line task manager built in Bash for tracking daily tasks with add, delete, list, and search operations.",
    tags: ["Bash", "CLI", "Linux"],
    github: "https://github.com/robertkamal/task-manager-cli",
    status: "completed" as const,
  },
  {
    title: "Docker Containerization",
    description:
      "Containerized 2+ small applications using Docker, creating optimized Dockerfiles and multi-stage builds.",
    tags: ["Docker", "Containers", "DevOps"],
    github: "https://github.com/robertkamal/docker-projects",
    status: "completed" as const,
  },
  {
    title: "CI/CD Pipeline Lab",
    description:
      "Building an automated CI/CD pipeline using Jenkins and GitHub webhooks for continuous integration and delivery.",
    tags: ["Jenkins", "GitHub", "CI/CD", "Automation"],
    github: null,
    status: "in-progress" as const,
  },
];

export const experience = [
  {
    role: "DevOps Specialist Trainee",
    company: "Digital Pioneers Initiative / Digilians",
    date: "Jan 2025 — Present",
    bullets: [
      "Administered and troubleshot 10+ Linux-based lab environments",
      "Built 5+ Bash automation scripts, reducing manual steps by ~30%",
      "Containerized 2+ applications using Docker with optimized images",
      "Designing CI/CD pipeline labs with Jenkins & GitHub (in progress)",
    ],
  },
];

export const education = [
  {
    degree: "B.Sc. Computer Science & IT",
    institution: "Egyptian E-Learning University",
    date: "2020 — 2024",
    note: "Graduation project: AI-Enhanced HR Management System (Excellent grade)",
  },
];

export const training = [
  "Linux Administration & Bash Scripting (RHCSA Level 1)",
  "Git & GitHub Version Control",
  "Docker for Beginners",
  "AWS Cloud Fundamentals",
  "CCNA Networking Foundation",
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
