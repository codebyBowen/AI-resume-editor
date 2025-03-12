"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HeaderToolbar from "@/components/resume-builder/header-toolbar"
import TemplateSelector from "@/components/resume-builder/template-selector"
import ModernTemplate from "@/components/resume-builder/templates/modern-template"
import ClassicTemplate from "@/components/resume-builder/templates/classic-template"
import PersonalInfoEditor from "@/components/resume-builder/editors/personal-info-editor"
import WorkExperienceEditor from "@/components/resume-builder/editors/work-experience-editor"
import EducationEditor from "@/components/resume-builder/editors/education-editor"
import SkillsEditor from "@/components/resume-builder/editors/skills-editor"
import { type ResumeData, initialResumeData } from "@/lib/resume-data"

export default function ResumeBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState<"modern" | "classic">("modern")
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [activeSection, setActiveSection] = useState<string>("personal")
  // const [isEditing, setIsEditing] = useState(false)

  // Update resume data
  const updateResumeData = (newData: Partial<ResumeData>) => {
    setResumeData((prev) => ({
      ...prev,
      ...newData,
    }))
  }

  // Add a new work experience entry
  const addWorkExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          id: Date.now().toString(),
          company: "Company Name",
          position: "Position Title",
          location: "Location",
          startDate: "MM/YYYY",
          endDate: "Present",
          description: "Describe your responsibilities and achievements",
          isCurrentJob: true,
        },
      ],
    }))
  }

  // Update a work experience entry
  const updateWorkExperience = (id: string, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp) => (exp.id === id ? { ...exp, ...data } : exp)),
    }))
  }

  // Delete a work experience entry
  const deleteWorkExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((exp) => exp.id !== id),
    }))
  }

  // Add a new education entry
  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now().toString(),
          institution: "University/School Name",
          degree: "Degree/Certificate",
          field: "Field of Study",
          location: "Location",
          startDate: "MM/YYYY",
          endDate: "MM/YYYY",
          description: "Describe your studies and achievements",
        },
      ],
    }))
  }

  // Update an education entry
  const updateEducation = (id: string, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, ...data } : edu)),
    }))
  }

  // Delete an education entry
  const deleteEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  // Add a new skill
  const addSkill = () => {
    setResumeData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: Date.now().toString(),
          name: "New Skill",
          level: 3,
        },
      ],
    }))
  }

  // Update a skill
  const updateSkill = (id: string, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, ...data } : skill)),
    }))
  }

  // Delete a skill
  const deleteSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HeaderToolbar selectedTemplate={selectedTemplate} resumeData={resumeData} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left sidebar - Template selection and editing */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Choose a Template</h2>
              <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Tabs value={activeSection} onValueChange={setActiveSection}>
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                  <PersonalInfoEditor
                    data={resumeData.personalInfo}
                    updateData={(data) => updateResumeData({ personalInfo: data })}
                  />
                </TabsContent>

                <TabsContent value="experience">
                  <WorkExperienceEditor
                    workExperience={resumeData.workExperience}
                    addWorkExperience={addWorkExperience}
                    updateWorkExperience={updateWorkExperience}
                    deleteWorkExperience={deleteWorkExperience}
                  />
                </TabsContent>

                <TabsContent value="education">
                  <EducationEditor
                    education={resumeData.education}
                    addEducation={addEducation}
                    updateEducation={updateEducation}
                    deleteEducation={deleteEducation}
                  />
                </TabsContent>

                <TabsContent value="skills">
                  <SkillsEditor
                    skills={resumeData.skills}
                    addSkill={addSkill}
                    updateSkill={updateSkill}
                    deleteSkill={deleteSkill}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right side - Resume preview */}
          <div className="lg:col-span-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Resume Preview</h2>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                {selectedTemplate === "modern" ? (
                  <ModernTemplate resumeData={resumeData} />
                ) : (
                  <ClassicTemplate resumeData={resumeData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

