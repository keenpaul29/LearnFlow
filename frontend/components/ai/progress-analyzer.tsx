'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, Award, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProgressData {
  date: string;
  score: number;
  topics: string[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export function AIProgressAnalyzer() {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProgressData = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with your actual AI API endpoint
      const response = await fetch('/api/ai/analyze-progress');
      const data = await response.json();
      setProgressData(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Brain className="h-8 w-8 animate-pulse text-primary" />
            <p className="text-sm text-muted-foreground">Analyzing your progress...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!progressData) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Learning Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Overall Progress</h3>
            <Badge variant="outline" className="font-normal">
              {progressData.score}% Mastery
            </Badge>
          </div>
          <Progress value={progressData.score} className="h-2" />
        </div>

        {/* Progress Chart */}
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { date: 'Mon', score: 65 },
              { date: 'Tue', score: 70 },
              { date: 'Wed', score: 68 },
              { date: 'Thu', score: 75 },
              { date: 'Fri', score: 80 },
              { date: 'Sat', score: 85 },
              { date: 'Sun', score: 82 },
            ]}>
              <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Strengths and Weaknesses */}
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <h3 className="font-medium flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              Strengths
            </h3>
            <ul className="space-y-1">
              {progressData.strengths.map((strength, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  • {strength}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <h3 className="font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Areas for Improvement
            </h3>
            <ul className="space-y-1">
              {progressData.weaknesses.map((weakness, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  • {weakness}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h3 className="font-medium flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            AI Recommendations
          </h3>
          <ul className="space-y-2">
            {progressData.recommendations.map((recommendation, index) => (
              <li
                key={index}
                className="text-sm text-muted-foreground bg-muted rounded-lg p-3"
              >
                {recommendation}
              </li>
            ))}
          </ul>
        </motion.div>

        <Button onClick={fetchProgressData} variant="outline" className="w-full">
          <TrendingUp className="mr-2 h-4 w-4" />
          Refresh Analysis
        </Button>
      </CardContent>
    </Card>
  );
}
