"use client";
import type { ResumeData } from "@/lib/resume-data";
import { Phone, Mail, MapPin, Linkedin, GripVertical } from "lucide-react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import { CSS } from "@dnd-kit/utilities";

interface ModernResumeTemplateProps {
  resumeData: ResumeData;
}

// Define section type
type Section = {
  id: string;
  type: "summary" | "experience" | "education";
  title: string;
};

// SortableSection component
function SortableSection({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: "relative" as const,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group mb-6">
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-4 top-1 opacity-0 group-hover:opacity-100 p-2 cursor-move text-slate-400 hover:text-slate-600"
      >
        <GripVertical size={16} />
      </div>
      {children}
    </div>
  );
}

export default function ClassicTemplate({
  resumeData,
}: ModernResumeTemplateProps) {
  const { personalInfo, workExperience, education, skills } = resumeData;

  // Define initial sections order
  const defaultSections: Section[] = [
    { id: "summary", type: "summary", title: "Professional Summary" },
    { id: "experience", type: "experience", title: "Work Experience" },
    { id: "education", type: "education", title: "Education" },
  ];

  const [sections, setSections] = useState<Section[]>(defaultSections);

  // Load sections order from localStorage
  useEffect(() => {
    const savedSections = localStorage.getItem("classicResumeSectionsOrder");
    if (savedSections) {
      setSections(JSON.parse(savedSections));
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);

        // Save to localStorage
        localStorage.setItem(
          "classicResumeSectionsOrder",
          JSON.stringify(newOrder)
        );

        return newOrder;
      });
    }
  };

  const renderSectionContent = (section: Section) => {
    switch (section.type) {
      case "summary":
        return (
          personalInfo.summary && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-3 border-b border-slate-300 pb-1">
                {section.title}
              </h3>
              <p className="text-slate-700">{personalInfo.summary}</p>
            </section>
          )
        );

      case "experience":
        return (
          workExperience.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-3 border-b border-slate-300 pb-1">
                {section.title}
              </h3>
              <div className="space-y-6">
                {workExperience.map((job) => (
                  <div key={job.id}>
                    <div className="font-bold text-slate-800">
                      {job.position}
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="font-semibold text-slate-700">
                        {job.company}
                      </p>
                      <p className="text-sm text-slate-600 italic">
                        {job.startDate} - {job.endDate}
                      </p>
                    </div>
                    {job.location && (
                      <p className="text-sm text-slate-600 mt-1">
                        {job.location}
                      </p>
                    )}
                    {job.description && (
                      <p className="mt-2 text-slate-700">{job.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        );

      case "education":
        return (
          education.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-3 border-b border-slate-300 pb-1">
                {section.title}
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <div className="font-bold text-slate-800">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="font-semibold text-slate-700">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-slate-600 italic">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                    {edu.location && (
                      <p className="text-sm text-slate-600 mt-1">
                        {edu.location}
                      </p>
                    )}
                    {edu.description && (
                      <p className="mt-2 text-slate-700">{edu.description}</p>
                    )}
                    {/* {edu.gpa && (
                    <p className="mt-1 text-sm text-slate-600">
                      GPA: {edu.gpa}
                    </p>
                  )} */}
                  </div>
                ))}
              </div>
            </section>
          )
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full min-h-[1000px] max-w-[800px] mx-auto font-sans">
      {/* Header */}
      <header className="flex justify-between items-start bg-slate-800 text-white p-6">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wider">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.jobTitle && (
            <h2 className="text-xl mt-1">{personalInfo.jobTitle}</h2>
          )}
        </div>
        <div className="text-right">
          {personalInfo.email && (
            <div className="flex items-center justify-end mb-1">
              <span className="mr-1">{personalInfo.email}</span>
              <Mail className="h-4 w-4" />
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center justify-end mb-1">
              <span className="mr-1">{personalInfo.phone}</span>
              <Phone className="h-4 w-4" />
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center justify-end mb-1">
              <span className="mr-1">{personalInfo.location}</span>
              <MapPin className="h-4 w-4" />
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center justify-end">
              <span className="mr-1">{personalInfo.website}</span>
              <Linkedin className="h-4 w-4" />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-row">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gray-100 p-4">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="mb-6">
              <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-3 border-b border-slate-300 pb-1">
                Skills
              </h3>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex flex-col">
                    <span className="text-slate-800 font-semibold">
                      {skill.name}
                    </span>
                    {skill.level > 0 && (
                      <div className="mt-1 flex w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-slate-700 h-full rounded-full"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {/* {languages && languages.length > 0 && (
            <section className="mb-6">
              <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-3 border-b border-slate-300 pb-1">
                Languages
              </h3>
              <div className="space-y-2">
                {languages.map((language) => (
                  <div key={language.id} className="flex justify-between">
                    <span className="text-slate-800">{language.name}</span>
                    <span className="text-slate-600">{language.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )} */}

          {/* Certifications */}
          {/* {certifications && certifications.length > 0 && (
            <section className="mb-6">
              <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-3 border-b border-slate-300 pb-1">
                Certifications
              </h3>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="mb-2">
                    <div className="font-semibold text-slate-800">{cert.name}</div>
                    <div className="text-sm text-slate-600">{cert.issuer}, {cert.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )} */}

          {/* Interests */}
          {/* {interests && interests.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-3 border-b border-slate-300 pb-1">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span 
                    key={interest.id}
                    className="bg-slate-200 text-slate-800 px-3 py-1 rounded-full text-sm"
                  >
                    {interest.name}
                  </span>
                ))}
              </div>
            </section>
          )} */}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              {sections.map((section) => (
                <SortableSection key={section.id} id={section.id}>
                  {renderSectionContent(section)}
                </SortableSection>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
