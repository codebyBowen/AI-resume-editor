"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { PlusCircle, Trash2 } from "lucide-react"
import type { Skill } from "@/lib/resume-data"

interface SkillsEditorProps {
  skills: Skill[]
  addSkill: () => void
  updateSkill: (id: string, data: Partial<Skill>) => void
  deleteSkill: (id: string) => void
}

export default function SkillsEditor({ skills, addSkill, updateSkill, deleteSkill }: SkillsEditorProps) {
  return (
    <div className="space-y-4">
      <Button type="button" variant="outline" onClick={addSkill} className="w-full flex items-center justify-center">
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Skill
      </Button>

      {skills.length === 0 ? (
        <div className="text-center py-4 text-slate-500">
          No skills added yet. Click the button above to add your skills.
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="flex flex-col space-y-2 p-3 border rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Input
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                    placeholder="Skill name"
                    className="border-0 p-0 h-auto text-base font-medium focus-visible:ring-0"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteSkill(skill.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor={`skill-level-${skill.id}`}>Proficiency Level</Label>
                  <span className="text-sm text-slate-500">{getSkillLevelText(skill.level)}</span>
                </div>
                <Slider
                  id={`skill-level-${skill.id}`}
                  min={1}
                  max={5}
                  step={1}
                  value={[skill.level]}
                  onValueChange={(value) => updateSkill(skill.id, { level: value[0] })}
                  className="py-2"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function getSkillLevelText(level: number): string {
  switch (level) {
    case 1:
      return "Beginner"
    case 2:
      return "Basic"
    case 3:
      return "Intermediate"
    case 4:
      return "Advanced"
    case 5:
      return "Expert"
    default:
      return "Not specified"
  }
}

