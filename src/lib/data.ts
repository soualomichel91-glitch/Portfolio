export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  github: string
  demo: string
}

export interface Skill {
  id: number
  name: string
  category: string
  level: number
}

export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  bio: string
}

export const defaultProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Plateforme de commerce électronique complète avec panier, paiement et gestion des stocks",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com",
    demo: "https://example.com"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Application de gestion de tâches collaborative avec temps réel et notifications",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com"
  },
  {
    id: 3,
    title: "Portfolio Dynamique",
    description: "Portfolio personnel avec système d'administration et gestion de contenu",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com"
  }
]

export const defaultSkills: Skill[] = [
  { id: 1, name: "React", category: "Frontend", level: 90 },
  { id: 2, name: "Next.js", category: "Frontend", level: 85 },
  { id: 3, name: "TypeScript", category: "Frontend", level: 80 },
  { id: 4, name: "Tailwind CSS", category: "Frontend", level: 85 },
  { id: 5, name: "HTML/CSS", category: "Frontend", level: 95 },
  { id: 6, name: "Node.js", category: "Backend", level: 80 },
  { id: 7, name: "Express.js", category: "Backend", level: 75 },
  { id: 8, name: "MongoDB", category: "Backend", level: 70 },
  { id: 9, name: "PostgreSQL", category: "Backend", level: 65 },
  { id: 10, name: "GraphQL", category: "Backend", level: 60 },
  { id: 11, name: "Git", category: "Tools", level: 85 },
  { id: 12, name: "Docker", category: "Tools", level: 70 },
  { id: 13, name: "AWS", category: "Tools", level: 65 },
  { id: 14, name: "Figma", category: "Tools", level: 75 },
  { id: 15, name: "VS Code", category: "Tools", level: 90 }
]

export const defaultPersonalInfo: PersonalInfo = {
  name: "Soualo Michel",
  title: "Développeur Web Full Stack",
  email: "contact@soualomichel.com",
  phone: "+33 6 12 34 56 78",
  location: "Paris, France",
  bio: "Passionné par le développement web depuis plusieurs ans, je me spécialise dans la création d'applications modernes et performantes. Mon expertise couvre l'ensemble de la stack technologique, de la conception d'interfaces utilisateur élégantes à la mise en place d'architectures backend robustes."
}
