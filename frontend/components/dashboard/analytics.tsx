'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Brain, Clock, Target, TrendingUp } from 'lucide-react';

interface AnalyticsProps {
  stats: {
    completedTasks: number;
    totalStudyTime: number;
    streak: number;
    progress: number;
  };
  studyData: Array<{
    date: string;
    minutes: number;
  }>;
}

export function DashboardAnalytics({ stats, studyData }: AnalyticsProps) {
  const statCards = [
    {
      title: "Completed Tasks",
      value: stats.completedTasks,
      icon: Target,
      description: "Tasks completed this week",
    },
    {
      title: "Study Time",
      value: `${Math.round(stats.totalStudyTime / 60)}h`,
      icon: Clock,
      description: "Total study time this week",
    },
    {
      title: "Learning Streak",
      value: stats.streak,
      icon: Brain,
      description: "Days in a row",
    },
    {
      title: "Progress",
      value: `${stats.progress}%`,
      icon: TrendingUp,
      description: "Towards your goal",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      <motion.div
        className="col-span-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Study Time Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studyData}>
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}m`}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="minutes"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
