"use client"

import { motion } from "framer-motion"
import {
  BookOpen,
  Calendar,
  LineChart,
  ListTodo,
  Target,
  Users,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"

const features = [
  {
    name: "Smart Task Management",
    description:
      "Organize your learning tasks with intelligent categorization and priority management.",
    icon: ListTodo,
  },
  {
    name: "Progress Tracking",
    description:
      "Monitor your learning progress with detailed analytics and insights.",
    icon: LineChart,
  },
  {
    name: "Study Schedule",
    description:
      "Create and maintain an effective study schedule that adapts to your learning style.",
    icon: Calendar,
  },
  {
    name: "Resource Organization",
    description:
      "Keep all your learning resources organized and easily accessible.",
    icon: BookOpen,
  },
  {
    name: "Goal Setting",
    description:
      "Set and track learning goals with measurable milestones and achievements.",
    icon: Target,
  },
  {
    name: "Study Groups",
    description:
      "Collaborate with peers, share resources, and learn together effectively.",
    icon: Users,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function LandingFeatures() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-base font-semibold leading-7 text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Everything you need
          </motion.h2>
          <motion.p
            className="mt-2 text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Supercharge Your Learning Journey
          </motion.p>
          <motion.p
            className="mt-6 text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            LearnFlow provides all the tools you need to manage your learning process effectively,
            track your progress, and achieve your educational goals.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                variants={item}
                className="group relative flex flex-col rounded-2xl bg-card p-8 ring-1 ring-border transition-all hover:shadow-md hover:ring-primary/20"
              >
                <div className="flex items-center gap-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold leading-7 text-card-foreground">
                    {feature.name}
                  </h3>
                </div>
                <div className="mt-4 flex-1">
                  <p className="text-base leading-7 text-muted-foreground">{feature.description}</p>
                </div>
                <div className="mt-6 flex items-center gap-x-3 text-sm text-muted-foreground/60">
                  <CheckCircle className="h-5 w-5 text-primary/60" />
                  <span>Available now</span>
                </div>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        {/* Feature highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-32 sm:mt-40 relative isolate overflow-hidden rounded-3xl bg-card px-6 py-24 shadow-2xl sm:px-24 xl:py-32"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-bold tracking-tight text-card-foreground sm:text-6xl">
                Start Learning Smarter
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Join thousands of learners who are already using LearnFlow to organize their
                learning journey and achieve their goals faster.
              </p>
            </div>
          </div>
          <div
            className="absolute -top-80 left-0 -z-10 transform-gpu blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-primary to-secondary opacity-20"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
