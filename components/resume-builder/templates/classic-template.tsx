import type { ResumeData } from "@/lib/resume-data"
import { Phone, Mail, MapPin, Globe } from "lucide-react"

interface ClassicTemplateProps {
  resumeData: ResumeData
}

export default function ClassicTemplate({ resumeData }: ClassicTemplateProps) {
  const { personalInfo, workExperience, education, skills } = resumeData

  return (
    <div className="bg-white p-8 shadow-sm w-full h-full min-h-[1000px] max-w-[800px] mx-auto font-serif">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider text-slate-900">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.jobTitle && <h2 className="text-xl text-slate-600 mt-1">{personalInfo.jobTitle}</h2>}

        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-700">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}

          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}

          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{personalInfo.location}</span>
            </div>
          )}

          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Horizontal Line */}
      <div className="border-t-2 border-slate-300 my-6"></div>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-200 pb-1">
            Professional Summary
          </h3>
          <p className="text-slate-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-200 pb-1">
            Work Experience
          </h3>
          <div className="space-y-5">
            {workExperience.map((job) => (
              <div key={job.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <h4 className="font-bold text-slate-800">{job.position}</h4>
                  <p className="text-sm text-slate-600">
                    {job.startDate} - {job.endDate}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1">
                  <p className="font-semibold text-slate-700">{job.company}</p>
                  <p className="text-sm text-slate-600">{job.location}</p>
                </div>
                <p className="mt-2 text-slate-700">{job.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-200 pb-1">
            Education
          </h3>
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <h4 className="font-bold text-slate-800">
                    {edu.degree} in {edu.field}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1">
                  <p className="font-semibold text-slate-700">{edu.institution}</p>
                  <p className="text-sm text-slate-600">{edu.location}</p>
                </div>
                {edu.description && <p className="mt-2 text-slate-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-200 pb-1">
            Skills
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <span className="text-slate-800">{skill.name}</span>
                {skill.level > 0 && (
                  <div className="ml-2 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full mx-0.5 ${i < skill.level ? "bg-slate-700" : "bg-slate-200"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

