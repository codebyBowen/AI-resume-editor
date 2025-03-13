"use client"
import * as React from "react";
import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import "./styles.css";
import type { ResumeData } from "@/lib/resume-data";
import resumeSchema from "@/lib/prompts/resumeSchema.json";
import { useState } from "react";

interface ModernResumeTemplateProps {
  resumeData: ResumeData;
}

const DialogDemo = ({ resumeData }: ModernResumeTemplateProps) => {
  const [jobRequirement, setJobRequirement] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsStreaming(true);
    setResult("");
    
    try {
      const prompt = `Based on this resume data: ${JSON.stringify(resumeData)}
                    and this job requirement: ${jobRequirement}
                    generate an optimized resume data following the schema: ${JSON.stringify(resumeSchema)}`;
      
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "qwq:latest",
          prompt: prompt,
          stream: true
        })
      });
      
      const reader = response.body?.getReader();
      
      while(true) {
        const {done, value} = await reader!.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        // 处理每个JSON对象，提取文本内容
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          try {
            const jsonResponse = JSON.parse(line);
            // 只有当有新的响应文本时才更新
            if (jsonResponse.response) {
              setResult(prev => prev + jsonResponse.response);
            }
          } catch (error) {
            console.warn("Failed to parse JSON:", line, error);
          }
        }
      }
      
    } catch (error) {
      console.error('Error:', error);
      setResult("Error occurred while generating response.");
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">AI Resume</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Job Requirement</Dialog.Title>
          <div className="mt-4">
            <textarea
              className="w-full h-40 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Paste job requirement here..."
              value={jobRequirement}
              onChange={(e) => setJobRequirement(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          {isStreaming && (
            <div className="flex items-center mt-4">
              <Loader2 className="h-5 w-5 animate-spin text-violet-500" />
              <span className="ml-2 text-violet-500">Generating...</span>
            </div>
          )}
          
          {result && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Generated Result:</h3>
              <div className="bg-gray-50 p-4 rounded-md max-h-60 overflow-y-auto">
                <pre className="text-sm whitespace-pre-wrap">{result}</pre>
              </div>
            </div>
          )}
          
          <div className="flex justify-end mt-4 gap-2">
            <Dialog.Close asChild>
              <button className="Button violet" disabled={isLoading}>Cancel</button>
            </Dialog.Close>
            <button 
              className="Button green"
              onClick={handleSubmit}
              disabled={isLoading || !jobRequirement.trim()}
            >
              {isLoading ? 'Generating...' : 'Submit'}
            </button>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close" disabled={isLoading}>
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogDemo;