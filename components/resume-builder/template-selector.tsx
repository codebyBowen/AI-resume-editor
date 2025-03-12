"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (template: "modern" | "classic") => void
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <RadioGroup
      value={selectedTemplate}
      onValueChange={(value) => onSelectTemplate(value as "modern" | "classic")}
      className="grid grid-cols-2 gap-4"
    >
      <div className="space-y-2">
        <Card
          className={`cursor-pointer transition-all ${selectedTemplate === "modern" ? "ring-2 ring-indigo-600" : "hover:border-indigo-300"}`}
        >
          <CardContent className="p-2">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
              <Image
                src="/template/modern-template.png?height=350&width=275"
                alt="Modern Template"
                width={225}
                height={300}
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <RadioGroupItem value="modern" id="modern" className="sr-only" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Label htmlFor="modern" className="text-center block font-medium">
          Modern
        </Label>
      </div>
{/* 
      <div className="space-y-2">
        <Card
          className={`cursor-pointer transition-all ${selectedTemplate === "classic" ? "ring-2 ring-indigo-600" : "hover:border-indigo-300"}`}
        >
          <CardContent className="p-2">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
              <Image
                src="/placeholder.svg?height=300&width=225"
                alt="Classic Template"
                width={225}
                height={300}
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <RadioGroupItem value="classic" id="classic" className="sr-only" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Label htmlFor="classic" className="text-center block font-medium">
          Classic
        </Label>
      </div> */}
    </RadioGroup>
  )
}

