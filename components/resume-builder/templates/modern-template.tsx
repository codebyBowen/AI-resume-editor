import type { ResumeData } from "@/lib/resume-data"
import { Phone, Mail, MapPin, Globe, Calendar } from "lucide-react"

interface ModernTemplateProps {
  resumeData: ResumeData
}

export default function ModernTemplate({ resumeData }: ModernTemplateProps) {
  const { personalInfo, workExperience, education, skills } = resumeData

  return (
    <div className="bg-white p-8 shadow-sm w-full h-full min-h-[1000px] max-w-[800px] mx-auto font-sans">
      {/* Header */}
      <header className="border-b-2 border-indigo-600 pb-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <h2 className="text-xl text-indigo-600 mt-1">{personalInfo.jobTitle}</h2>
          </div>

          {personalInfo.photo && (
            <div className="mt-4 md:mt-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-600">
                <img
                  src={personalInfo.photo || "/placeholder.svg"}
                  alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          {personalInfo.email && (
            <div className="flex items-center text-sm text-slate-600">
              <Mail className="h-4 w-4 mr-2 text-indigo-600" />
              <span>{personalInfo.email}</span>
            </div>
          )}

          {personalInfo.phone && (
            <div className="flex items-center text-sm text-slate-600">
              <Phone className="h-4 w-4 mr-2 text-indigo-600" />
              <span>{personalInfo.phone}</span>
            </div>
          )}

          {personalInfo.location && (
            <div className="flex items-center text-sm text-slate-600">
              <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
              <span>{personalInfo.location}</span>
            </div>
          )}

          {personalInfo.website && (
            <div className="flex items-center text-sm text-slate-600">
              <Globe className="h-4 w-4 mr-2 text-indigo-600" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">Professional Summary</h3>
          <p className="text-slate-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">Work Experience</h3>
          <div className="space-y-4">
            {workExperience.map((job) => (
              <div key={job.id} className="border-l-2 border-indigo-200 pl-4 py-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <h4 className="font-semibold text-slate-800">{job.position}</h4>
                  <div className="flex items-center text-sm text-slate-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-1">
                  <p className="text-indigo-600">{job.company}</p>
                  <p className="text-sm text-slate-600">{job.location}</p>
                </div>
                <p className="mt-2 text-slate-700 text-sm">{job.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">Education</h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-indigo-200 pl-4 py-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <h4 className="font-semibold text-slate-800">
                    {edu.degree} in {edu.field}
                  </h4>
                  <div className="flex items-center text-sm text-slate-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-1">
                  <p className="text-indigo-600">{edu.institution}</p>
                  <p className="text-sm text-slate-600">{edu.location}</p>
                </div>
                {edu.description && <p className="mt-2 text-slate-700 text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">
                {skill.name}
                {skill.level > 0 && (
                  <span className="ml-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`inline-block w-1 h-1 rounded-full ml-0.5 ${
                          i < skill.level ? "bg-indigo-600" : "bg-indigo-200"
                        }`}
                      />
                    ))}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

