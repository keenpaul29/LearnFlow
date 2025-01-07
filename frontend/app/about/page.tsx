'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Target, Users, Award } from 'lucide-react';

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: '/team/sarah.jpg',
    bio: 'Former educator with 10+ years of experience in EdTech'
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    image: '/team/michael.jpg',
    bio: 'AI researcher and full-stack developer'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Product',
    image: '/team/emily.jpg',
    bio: 'UX specialist with focus on educational software'
  },
  {
    name: 'David Kim',
    role: 'Lead Engineer',
    image: '/team/david.jpg',
    bio: 'Full-stack developer with ML expertise'
  }
];

const values = [
  {
    icon: Brain,
    title: 'Innovation',
    description: 'Pushing the boundaries of learning technology'
  },
  {
    icon: Target,
    title: 'Focus',
    description: 'Helping students achieve their learning goals'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a supportive learning environment'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Striving for the highest quality in education'
  }
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">About LearnFlow</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're on a mission to revolutionize learning through AI-powered technology,
          making education more accessible, personalized, and effective for everyone.
        </p>
      </motion.div>

      {/* Values Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-20"
      >
        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              LearnFlow was founded in 2024 with a vision to transform the way people learn.
              We recognized that traditional learning methods weren't keeping pace with modern
              needs and technology. By combining artificial intelligence with proven learning
              methodologies, we created a platform that adapts to each student's unique
              learning style and pace.
            </p>
            <p>
              Today, LearnFlow serves thousands of students worldwide, helping them achieve
              their learning goals through personalized study plans, AI-powered assistance,
              and comprehensive progress tracking. Our team of educators, developers, and AI
              specialists continues to innovate and improve the platform, ensuring that
              LearnFlow remains at the forefront of educational technology.
            </p>
          </CardContent>
        </Card>
      </motion.section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <div className="w-full h-full bg-primary/10" />
                  </div>
                  <CardTitle className="text-center">{member.name}</CardTitle>
                  <CardDescription className="text-center">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
