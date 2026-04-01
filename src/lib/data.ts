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
  profilePhoto?: string
  photoPosition?: {
    scale: number
    x: number
    y: number
  }
  cvUrl?: string
}

export interface Education {
  id: number
  type: 'scolaire' | 'universitaire' | 'professionnel' | 'formation'
  title: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description?: string
  current?: boolean
  skills?: string[]
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
  email: "soualomichel91@gmail.com",
  phone: "+224620157184",
  location: "Conakry, Guinée",
  bio: "Passionné par le développement web depuis plusieurs années, je me spécialise dans la création d'applications modernes et performantes avec React, Next.js et Node.js. Toujours en veille technologique, j'aime relever de nouveaux défis techniques.",
  profilePhoto: ""
}

export const defaultEducation: Education[] = [
  {
    id: 1,
    type: 'scolaire',
    title: 'Baccalauréat Scientifique',
    institution: 'Lycée Louis Pasteur',
    location: 'Paris, France',
    startDate: '2015-09',
    endDate: '2018-06',
    description: 'Spécialité Mathématiques et Physique-Chimie'
  },
  {
    id: 2,
    type: 'universitaire',
    title: 'Licence Informatique',
    institution: 'Université Paris-Saclay',
    location: 'Orsay, France',
    startDate: '2018-09',
    endDate: '2021-06',
    description: 'Programmation, algorithmique, bases de données, développement web',
    skills: ['Java', 'Python', 'SQL', 'UML']
  },
  {
    id: 3,
    type: 'universitaire',
    title: 'Master Développement Web',
    institution: 'Ecole Supérieure du Numérique',
    location: 'Paris, France',
    startDate: '2021-09',
    endDate: '2023-06',
    description: 'Développement full-stack, architecture logicielle, gestion de projet',
    skills: ['React', 'Node.js', 'MongoDB', 'Agile']
  },
  {
    id: 4,
    type: 'professionnel',
    title: 'Développeur Frontend',
    institution: 'Tech Startup Paris',
    location: 'Paris, France',
    startDate: '2023-07',
    endDate: '2024-02',
    description: 'Développement d\'applications React/Next.js, collaboration avec l\'équipe backend',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Git']
  },
  {
    id: 5,
    type: 'professionnel',
    title: 'Développeur Full Stack',
    institution: 'Digital Agency Pro',
    location: 'Paris, France',
    startDate: '2024-03',
    endDate: '',
    current: true,
    description: 'Développement complet d\'applications web pour clients variés, maintenance et évolution des projets existants',
    skills: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    id: 6,
    type: 'formation',
    title: 'Certification AWS Cloud Practitioner',
    institution: 'Amazon Web Services',
    location: 'En ligne',
    startDate: '2024-01',
    endDate: '2024-03',
    description: 'Formation sur les services AWS, déploiement cloud, sécurité',
    skills: ['AWS', 'Cloud Computing', 'S3', 'EC2']
  }
]
