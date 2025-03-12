"use client";

// import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Download,
  // Save,
  Share2,
  // FileText,
  // Settings,
  // HelpCircle,
  ChevronLeft,
} from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import Link from "next/link";
// import type { ResumeData } from "@/lib/resume-data";
import { Toaster, toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// interface HeaderToolbarProps {
//   selectedTemplate: string;
//   resumeData: ResumeData;
// }

export default function HeaderToolbar() {
  // const [isSaving, setIsSaving] = useState(false);

  // const handleSave = async () => {
  //   setIsSaving(true);
  //   // Simulate saving
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   setIsSaving(false);
  // };

  const handleDownload = () => {
    const element = document.getElementById("resume-preview");
    if (!element) {
      toast.error("Resume preview not found");
      return;
    }

    html2canvas(element).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");

      toast.success("Resume downloaded! If you like this tool, please consider giving us a star on GitHub!", {
        action: {
          label: "Star on GitHub",
          onClick: () => window.open("https://github.com/codebyBowen/AI-resume-editor", "_blank")
        },
        duration: 5000
      });
    });
  };

  const handleShare = () => {
    const shareText =
      "Create your professional resume in minutes with Resume Builder - The smart way to craft your perfect resume. \n Try it now in https://github.com/codebyBowen/AI-resume-editor.git";
    navigator.clipboard.writeText(shareText);
    toast.message("Copy to Clipboard!", {
      description:
        "Create your professional resume in minutes with Resume Builder - The smart way to craft your perfect resume. \n Try it now in https://github.com/codebyBowen/AI-resume-editor.git",
    });
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <Toaster />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold hidden md:block">
              Resume Builder
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            {/* <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
              {!isSaving && <Save className="ml-2 h-4 w-4" />}
            </Button> */}

            <Button variant="outline" size="sm" onClick={handleDownload}>
              Download
              <Download className="ml-2 h-4 w-4" />
            </Button>

            <Button variant="outline" size="sm" onClick={handleShare}>
              Share
              <Share2 className="ml-2 h-4 w-4" />
            </Button>

            {/* <DropdownMenu>
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
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
}
