"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Save, Share2, FileText, Settings, HelpCircle, ChevronLeft } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import type { ResumeData } from "@/lib/resume-data"

interface HeaderToolbarProps {
  selectedTemplate: string
  resumeData: ResumeData
}

export default function HeaderToolbar({ selectedTemplate, resumeData }: HeaderToolbarProps) {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert("Downloading resume as PDF...")
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-indigo-600 hover:text-indigo-800">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold hidden md:block">Resume Builder</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
              {!isSaving && <Save className="ml-2 h-4 w-4" />}
            </Button>

            <Button variant="outline" size="sm" onClick={handleDownload}>
              Download
              <Download className="ml-2 h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Email Resume
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

