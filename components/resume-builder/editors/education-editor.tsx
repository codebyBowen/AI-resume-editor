"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlusCircle, Trash2 } from "lucide-react"
import type { Education } from "@/lib/resume-data"

interface EducationEditorProps {
  education: Education[]
  addEducation: () => void
  updateEducation: (id: string, data: Partial<Education>) => void
  deleteEducation: (id: string) => void
}

export default function EducationEditor({
  education,
  addEducation,
  updateEducation,
  deleteEducation,
}: EducationEditorProps) {
  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        onClick={addEducation}
        className="w-full flex items-center justify-center"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Education
      </Button>

      {education.length === 0 ? (
        <div className="text-center py-4 text-slate-500">
          No education added yet. Click the button above to add your education.
        </div>
      ) : (
        <Accordion type="multiple" className="w-full">
          {education.map((edu, index) => (
            <EducationItem
              key={edu.id}
              education={edu}
              index={index}
              updateEducation={updateEducation}
              deleteEducation={deleteEducation}
            />
          ))}
        </Accordion>
      )}
    </div>
  )
}

interface EducationItemProps {
  education: Education
  index: number
  updateEducation: (id: string, data: Partial<Education>) => void
  deleteEducation: (id: string) => void
}

function EducationItem({ education, index, updateEducation, deleteEducation }: EducationItemProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateEducation(education.id, { [name]: value })
  }

  return (
    <AccordionItem key={index} value={education.id} className="border rounded-md px-2 py-1 mb-2">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex justify-between w-full pr-4">
          <span className="font-medium">
            {education.degree || "Degree"} at {education.institution || "Institution"}
          </span>
          <span className="text-sm text-slate-500">
            {education.startDate} - {education.endDate}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`institution-${education.id}`}>Institution</Label>
              <Input
                id={`institution-${education.id}`}
                name="institution"
                value={education.institution}
                onChange={handleChange}
                placeholder="University/School Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`location-${education.id}`}>Location</Label>
              <Input
                id={`location-${education.id}`}
                name="location"
                value={education.location}
                onChange={handleChange}
                placeholder="City, State"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`degree-${education.id}`}>Degree</Label>
              <Input
                id={`degree-${education.id}`}
                name="degree"
                value={education.degree}
                onChange={handleChange}
                placeholder="Bachelor's, Master's, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`field-${education.id}`}>Field of Study</Label>
              <Input
                id={`field-${education.id}`}
                name="field"
                value={education.field}
                onChange={handleChange}
                placeholder="Computer Science, Business, etc."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
              <Input
                id={`startDate-${education.id}`}
                name="startDate"
                value={education.startDate}
                onChange={handleChange}
                placeholder="MM/YYYY"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
              <Input
                id={`endDate-${education.id}`}
                name="endDate"
                value={education.endDate}
                onChange={handleChange}
                placeholder="MM/YYYY or Present"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${education.id}`}>Description (Optional)</Label>
            <Textarea
              id={`description-${education.id}`}
              name="description"
              value={education.description}
              onChange={handleChange}
              placeholder="Describe your studies, achievements, GPA, etc."
              rows={3}
            />
          </div>

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => deleteEducation(education.id)}
            className="w-full"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove this education
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

