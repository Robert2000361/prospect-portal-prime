export const personalInfo = {
  name: "Robert Kamal",
  title: "Junior DevOps Engineer",
  location: "Cairo, Egypt",
  email: "robertkamal00@gmail.com",
  github: "https://github.com/Robert2000361",
  linkedin: "https://linkedin.com/in/robertkamaladly",
  summary:
    "Building reliable infrastructure and automating everything — from Linux environments and Docker containers to CI/CD pipelines. Passionate about bridging the gap between development and operations with clean, repeatable, and scalable solutions.",
  about:
    "I'm a Junior DevOps Engineer with a solid foundation in Linux administration, networking (CCNA), cloud fundamentals (AWS), and container technologies. With hands-on experience automating workflows using Bash and Docker, I focus on building infrastructure that's reliable, reproducible, and easy to maintain. I'm committed to continuous learning and contributing to teams that value automation and operational excellence.",
};

export const skills = [
  { category: "OS & Scripting", items: ["Linux", "Bash", "Shell Scripting"] },
  { category: "Containers", items: ["Docker", "Docker Compose"] },
  { category: "CI/CD", items: ["Jenkins", "Git", "GitHub Actions", "CI/CD Pipelines"] },
  { category: "Cloud", items: ["AWS", "EC2", "S3", "Cloud Fundamentals"] },
  { category: "Networking", items: ["TCP/IP", "Routing & Switching", "CCNA", "DNS"] },
  { category: "Automation", items: ["Ansible", "Infrastructure as Code"] },
];

export const techStackBadges = [
  "Linux", "Bash", "Docker", "Jenkins", "Git", "AWS",
  "Ansible", "Networking", "CI/CD", "Shell Scripting",
  "Docker Compose", "GitHub Actions",
];

export const projects = [
  {
    title: "Task Manager CLI",
    description:
      "Built a command-line task management tool in Bash to streamline daily workflow tracking. Supports add, delete, list, and search operations with persistent file-based storage.",
    tags: ["Bash", "CLI", "Linux"],
    github: "https://github.com/robertkamal/task-manager-cli",
    demo: null,
    status: "completed" as const,
  },
  {
    title: "Docker Multi-App Containerization",
    description:
      "Containerized multiple small applications using Docker with optimized multi-stage builds, reducing image sizes by ~40% and ensuring consistent environments across dev and production.",
    tags: ["Docker", "Containers", "DevOps", "Multi-Stage Builds"],
    github: "https://github.com/robertkamal/docker-projects",
    demo: null,
    status: "completed" as const,
  },
  {
    title: "CI/CD Pipeline Automation Lab",
    description:
      "Designing an end-to-end CI/CD pipeline using Jenkins with GitHub webhooks for automated build, test, and deployment workflows. Includes Jenkinsfile-based pipeline as code.",
    tags: ["Jenkins", "GitHub", "CI/CD", "Automation", "Webhooks"],
    github: null,
    demo: null,
    status: "in-progress" as const,
  },
];

export const experience = [
  {
    role: "DevOps Specialist Trainee",
    company: "Digital Pioneers Initiative / Digilians",
    date: "Jan 2025 — Present",
    bullets: [
      "Administered and troubleshot 10+ Linux-based lab environments, ensuring 99% uptime for training sessions",
      "Developed 5+ Bash automation scripts that reduced manual configuration steps by approximately 30%",
      "Containerized 2+ applications using Docker with optimized multi-stage builds for smaller image footprints",
      "Currently designing CI/CD pipeline labs with Jenkins & GitHub webhooks for automated integration workflows",
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
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
