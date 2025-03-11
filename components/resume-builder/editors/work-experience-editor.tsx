"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlusCircle, Trash2 } from "lucide-react"
import type { WorkExperience } from "@/lib/resume-data"

interface WorkExperienceEditorProps {
  workExperience: WorkExperience[]
  addWorkExperience: () => void
  updateWorkExperience: (id: string, data: Partial<WorkExperience>) => void
  deleteWorkExperience: (id: string) => void
}

export default function WorkExperienceEditor({
  workExperience,
  addWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
}: WorkExperienceEditorProps) {
  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        onClick={addWorkExperience}
        className="w-full flex items-center justify-center"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Work Experience
      </Button>

      {workExperience.length === 0 ? (
        <div className="text-center py-4 text-slate-500">
          No work experience added yet. Click the button above to add your first position.
        </div>
      ) : (
        <Accordion type="multiple" className="w-full">
          {workExperience.map((job, index) => (
            <WorkExperienceItem
              key={job.id}
              job={job}
              index={index}
              updateWorkExperience={updateWorkExperience}
              deleteWorkExperience={deleteWorkExperience}
            />
          ))}
        </Accordion>
      )}
    </div>
  )
}

interface WorkExperienceItemProps {
  job: WorkExperience
  index: number
  updateWorkExperience: (id: string, data: Partial<WorkExperience>) => void
  deleteWorkExperience: (id: string) => void
}

function WorkExperienceItem({ job, index, updateWorkExperience, deleteWorkExperience }: WorkExperienceItemProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateWorkExperience(job.id, { [name]: value })
  }

  const handleCheckboxChange = (checked: boolean) => {
    updateWorkExperience(job.id, {
      isCurrentJob: checked,
      endDate: checked ? "Present" : "MM/YYYY",
    })
  }

  return (
    <AccordionItem value={job.id} className="border rounded-md px-2 py-1 mb-2">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex justify-between w-full pr-4">
          <span className="font-medium">
            {job.position || "New Position"} at {job.company || "Company"}
          </span>
          <span className="text-sm text-slate-500">
            {job.startDate} - {job.endDate}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`company-${job.id}`}>Company</Label>
              <Input
                id={`company-${job.id}`}
                name="company"
                value={job.company}
                onChange={handleChange}
                placeholder="Company Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`position-${job.id}`}>Position</Label>
              <Input
                id={`position-${job.id}`}
                name="position"
                value={job.position}
                onChange={handleChange}
                placeholder="Job Title"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`location-${job.id}`}>Location</Label>
            <Input
              id={`location-${job.id}`}
              name="location"
              value={job.location}
              onChange={handleChange}
              placeholder="City, State or Remote"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`startDate-${job.id}`}>Start Date</Label>
              <Input
                id={`startDate-${job.id}`}
                name="startDate"
                value={job.startDate}
                onChange={handleChange}
                placeholder="MM/YYYY"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`endDate-${job.id}`}>End Date</Label>
              <Input
                id={`endDate-${job.id}`}
                name="endDate"
                value={job.endDate}
                onChange={handleChange}
                placeholder="MM/YYYY"
                disabled={job.isCurrentJob}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id={`current-${job.id}`} checked={job.isCurrentJob} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor={`current-${job.id}`}>I currently work here</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${job.id}`}>Description</Label>
            <Textarea
              id={`description-${job.id}`}
              name="description"
              value={job.description}
              onChange={handleChange}
              placeholder="Describe your responsibilities and achievements"
              rows={4}
            />
          </div>

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => deleteWorkExperience(job.id)}
            className="w-full"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove this position
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

