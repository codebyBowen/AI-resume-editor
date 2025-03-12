import type { ResumeData } from "@/lib/resume-data"
// import { Phone, Mail, MapPin, Globe, Calendar } from "lucide-react"
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';
import { GripVertical } from 'lucide-react';

interface ModernTemplateProps {
  resumeData: ResumeData & {
    accentColor?: string
  }
}

// Define section type
type Section = {
  id: string;
  type: 'summary' | 'experience' | 'education' | 'skills';
  title: string;
}

// SortableSection component
function SortableSection({ 
  id, 
  children,
  accentColor 
}: { 
  id: string; 
  children: React.ReactNode;
  accentColor: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    // Maintain consistent height during and after drag
    // height: '100%',
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : undefined,
    position: 'relative' as const,
    touchAction: 'none' as const,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className="relative group mb-6"
    >
      <div 
        {...attributes} 
        {...listeners}
        className={`absolute -left-8 top-1 opacity-0 group-hover:opacity-100 p-2 cursor-move text-${accentColor}-400 hover:text-${accentColor}-600`}
      >
        <GripVertical size={16} />
      </div>
      {children}
    </div>
  );
}

export default function ModernTemplate({ resumeData }: ModernTemplateProps) {
  const { personalInfo, workExperience, education, skills, accentColor = "black" } = resumeData

  // Define initial sections order
  const defaultSections: Section[] = [
    { id: 'summary', type: 'summary', title: 'Professional Summary' },
    { id: 'experience', type: 'experience', title: 'Work Experience' },
    { id: 'education', type: 'education', title: 'Education' },
    { id: 'skills', type: 'skills', title: 'Skills' }
  ];

  const [sections, setSections] = useState<Section[]>(defaultSections);

  // Load sections order from localStorage
  useEffect(() => {
    const savedSections = localStorage.getItem('resumeSectionsOrder');
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
        localStorage.setItem('resumeSectionsOrder', JSON.stringify(newOrder));
        
        return newOrder;
      });
    }
  };

  const renderSectionContent = (section: Section) => {
    switch (section.type) {
      case 'summary':
        return personalInfo.summary && (
          <div>
            <h3 className={`text-lg font-semibold text-${accentColor}-600 mb-2`}>
              {section.title}
            </h3>
            <p className="text-slate-700">{personalInfo.summary}</p>
          </div>
        );

      case 'experience':
        return workExperience.length > 0 && (
          <div>
            <h3 className={`text-lg font-semibold text-${accentColor}-600 mb-4`}>
              {section.title}
            </h3>
            <div className="space-y-4">
              {workExperience.map((job) => (
                <div key={job.id} className={`border-l-2 border-${accentColor}-200 pl-4 py-1`}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <h4 className="font-semibold text-slate-800">{job.position}</h4>
                    <div className="flex items-center text-sm text-slate-500">
                      {/* <Calendar className="h-3 w-3 mr-1" /> */}
                      <span>
                        {job.startDate} - {job.endDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-1">
                    <p className={`text-${accentColor}-600`}>{job.company}</p>
                    <p className="text-sm text-slate-600">{job.location}</p>
                  </div>
                  <p className="mt-2 text-slate-700 text-sm">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        return education.length > 0 && (
          <div>
            <h3 className={`text-lg font-semibold text-${accentColor}-600 mb-4`}>
              {section.title}
            </h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className={`border-l-2 border-${accentColor}-200 pl-4 py-1`}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <h4 className="font-semibold text-slate-800">
                      {edu.degree} in {edu.field}
                    </h4>
                    <div className="flex items-center text-sm text-slate-500">
                      {/* <Calendar className="h-3 w-3 mr-1" /> */}
                      <span>
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-1">
                    <p className={`text-${accentColor}-600`}>{edu.institution}</p>
                    <p className="text-sm text-slate-600">{edu.location}</p>
                  </div>
                  {edu.description && <p className="mt-2 text-slate-700 text-sm">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return skills.length > 0 && (
          <div>
            <h3 className={`text-lg font-semibold text-${accentColor}-600 mb-4`}>
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className={`bg-${accentColor}-50 text-${accentColor}-700 px-3 py-1 rounded-full text-sm`}>
                  {skill.name}
                  {skill.level > 0 && (
                    <span className="ml-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`inline-block w-1 h-1 rounded-full ml-0.5 ${
                            i < skill.level ? `bg-${accentColor}-600` : `bg-${accentColor}-200`
                          }`}
                        />
                      ))}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-8 shadow-sm w-full h-full min-h-[1000px] max-w-[800px] mx-auto font-sans">
      {/* Header */}
      <header className={`border-b-2 border-${accentColor}-600 pb-6 mb-6`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <h2 className={`text-xl text-${accentColor}-600 mt-1`}>{personalInfo.jobTitle}</h2>
          </div>

          {/* {personalInfo.photo && (
            <div className="mt-4 md:mt-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-600">
                <img
                  src={personalInfo.photo || "/placeholder.svg"}
                  alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )} */}
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          {personalInfo.email && (
            <div className="flex items-center text-sm text-slate-600">
              {/* <Mail className={`h-4 w-4 mr-2 text-${accentColor}-600`} /> */}
              <span>{personalInfo.email}</span>
            </div>
          )}

          {personalInfo.phone && (
            <div className="flex items-center text-sm text-slate-600">
              {/* <Phone className={`h-4 w-4 mr-2 text-${accentColor}-600`} /> */}
              <span>{personalInfo.phone}</span>
            </div>
          )}

          {personalInfo.location && (
            <div className="flex items-center text-sm text-slate-600">
              {/* <MapPin className={`h-4 w-4 mr-2 text-${accentColor}-600`} /> */}
              <span>{personalInfo.location}</span>
            </div>
          )}

          {personalInfo.website && (
            <div className="flex items-center text-sm text-slate-600">
              {/* <Globe className={`h-4 w-4 mr-2 text-${accentColor}-600`} /> */}
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Draggable Sections */}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={sections.map(s => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section) => (
            <SortableSection 
              key={section.id} 
              id={section.id}
              accentColor={accentColor}
            >
              {renderSectionContent(section)}
            </SortableSection>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}

