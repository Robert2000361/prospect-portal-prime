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
    "Hi, I'm Robert Kamal, a DevOps Engineer focused on building reliable, automated, and scalable infrastructure.\n\nMy journey into DevOps started with a strong foundation in computer networking and Linux systems, which naturally evolved into a passion for automation, containerization, and cloud technologies. Through my academic background in Computer Science and hands-on training in the Digilians Digital Pioneers initiative, I have developed practical experience working with Linux environments, Bash automation, Git workflows, Docker containers, and CI/CD concepts.\n\nI enjoy turning manual processes into automated workflows and building environments that are consistent, predictable, and easy to maintain. My work focuses on simplifying infrastructure and improving deployment reliability through practical DevOps solutions.\n\nWhat sets me apart is my strong networking background (CCNA) combined with Linux and automation skills, allowing me to understand systems from the infrastructure level up to deployment pipelines and troubleshoot issues from the root cause.\n\nSome of the technologies I work with include Linux, Docker, Git, Bash scripting, Jenkins, and AWS fundamentals, and I am currently expanding my knowledge in cloud architecture and DevOps automation.\n\nIf you'd like to see how I approach real-world DevOps problems, feel free to explore my projects or connect with me.",
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
