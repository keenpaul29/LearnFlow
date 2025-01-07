'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const features = [
  {
    title: 'AI-Powered Study Assistant',
    description: 'Get personalized help with your studies using our advanced AI assistant.',
    highlights: ['24/7 Learning Support', 'Concept Explanations', 'Study Planning']
  },
  {
    title: 'Smart Task Management',
    description: 'Organize and track your learning tasks efficiently.',
    highlights: ['Priority Setting', 'Progress Tracking', 'Due Date Reminders']
  },
  {
    title: 'Study Analytics',
    description: 'Track your learning progress with detailed analytics.',
    highlights: ['Learning Patterns', 'Time Analytics', 'Progress Reports']
  },
  {
    title: 'Content Generation',
    description: 'Generate study materials and summaries automatically.',
    highlights: ['Study Notes', 'Practice Questions', 'Topic Summaries']
  },
  {
    title: 'Focus Timer',
    description: 'Stay focused with our customizable study timer.',
    highlights: ['Pomodoro Technique', 'Break Reminders', 'Session Statistics']
  },
  {
    title: 'Resource Library',
    description: 'Access a curated collection of learning resources.',
    highlights: ['Organized by Topic', 'Quality Content', 'Easy Access']
  }
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Features</h1>
        <p className="text-xl text-muted-foreground">
          Discover how LearnFlow can transform your learning experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
