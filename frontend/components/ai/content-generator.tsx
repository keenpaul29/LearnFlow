'use client';

import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Sparkles, FileText, List, Book } from 'lucide-react';
import { motion } from 'framer-motion';

type ContentType = 'notes' | 'summary' | 'quiz' | 'flashcards';

interface GeneratorProps {
  onGenerated?: (content: string) => void;
}

export function AIContentGenerator({ onGenerated }: GeneratorProps) {
  const [input, setInput] = useState('');
  const [contentType, setContentType] = useState<ContentType>('notes');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const contentTypes = {
    notes: {
      icon: FileText,
      description: 'Generate structured study notes',
    },
    summary: {
      icon: Book,
      description: 'Create a concise summary',
    },
    quiz: {
      icon: List,
      description: 'Generate practice questions',
    },
    flashcards: {
      icon: Sparkles,
      description: 'Create study flashcards',
    },
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);

    try {
      // TODO: Replace with your actual AI API endpoint
      const response = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: input,
          type: contentType,
        }),
      });

      const data = await response.json();
      setGeneratedContent(data.content);
      onGenerated?.(data.content);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const Icon = contentTypes[contentType].icon;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Content Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Content Type</Label>
          <Select
            value={contentType}
            onValueChange={(value) => setContentType(value as ContentType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(contentTypes) as ContentType[]).map((type) => (
                <SelectItem key={type} value={type}>
                  <div className="flex items-center gap-2">
                    {contentTypes[type].icon && React.createElement(contentTypes[type].icon, { className: "h-4 w-4" })}
                    <span className="capitalize">{type}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            {contentTypes[contentType].description}
          </p>
        </div>

        <div className="space-y-2">
          <Label>Input Content</Label>
          <Textarea
            placeholder="Enter your study material or topic..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin">
                <Sparkles className="h-4 w-4" />
              </div>
              Generating...
            </div>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
            </>
          )}
        </Button>

        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <Label>Generated Content</Label>
            <div className="mt-2 rounded-lg border bg-muted p-4">
              <pre className="whitespace-pre-wrap text-sm">
                {generatedContent}
              </pre>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
