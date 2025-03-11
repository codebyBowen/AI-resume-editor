export interface PersonalInfo {
  firstName: string
  lastName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
  photo?: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  description: string
  isCurrentJob: boolean
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface Skill {
  id: string
  name: string
  level: number // 1-5
}

export interface ResumeData {
  personalInfo: PersonalInfo
  workExperience: WorkExperience[]
  education: Education[]
  skills: Skill[]
}

export const initialResumeData: ResumeData = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    jobTitle: "Software Engineer",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    location: "San Francisco, CA",
    website: "johndoe.com",
    summary:
      "Experienced software engineer with a passion for building scalable web applications and solving complex problems. Skilled in JavaScript, React, and Node.js with a strong background in full-stack development.",
  },
  workExperience: [
    {
      id: "exp1",
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "01/2020",
      endDate: "Present",
      description:
        "Led the development of a high-traffic e-commerce platform using React and Node.js. Improved site performance by 40% through code optimization and implementing efficient caching strategies. Mentored junior developers and conducted code reviews.",
      isCurrentJob: true,
    },
    {
      id: "exp2",
      company: "Digital Innovations",
      position: "Frontend Developer",
      location: "San Jose, CA",
      startDate: "03/2017",
      endDate: "12/2019",
      description:
        "Developed responsive web applications using React, Redux, and TypeScript. Collaborated with UX designers to implement user-friendly interfaces. Participated in agile development processes and sprint planning.",
      isCurrentJob: false,
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "Berkeley, CA",
      startDate: "08/2013",
      endDate: "05/2017",
      description:
        "Graduated with honors. Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems.",
    },
  ],
  skills: [
    { id: "skill1", name: "JavaScript", level: 5 },
    { id: "skill2", name: "React", level: 5 },
    { id: "skill3", name: "Node.js", level: 4 },
    { id: "skill4", name: "TypeScript", level: 4 },
    { id: "skill5", name: "HTML/CSS", level: 5 },
    { id: "skill6", name: "SQL", level: 3 },
    { id: "skill7", name: "Git", level: 4 },
    { id: "skill8", name: "AWS", level: 3 },
  ],
}

