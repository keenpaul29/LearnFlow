"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BookOpen, Brain, Target, ArrowUpRight } from "lucide-react"
import Image from "next/image"

export function LandingHero() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-[50%] h-[800px] w-[800px] -translate-x-[50%] -translate-y-[50%] rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl" />
        <div className="absolute right-[25%] top-[25%] h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-secondary/30 to-primary/30 blur-2xl" />
        <div className="absolute left-[25%] bottom-[25%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/25 to-secondary/25 blur-2xl" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          {/* Left content */}
          <motion.div 
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm"
              >
                <span className="font-semibold text-primary">New Features</span>
                <ArrowRight className="ml-1 h-4 w-4" />
                <span className="ml-2 text-muted-foreground">AI-powered learning paths</span>
              </motion.div>
              <motion.h1 
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Master Your Learning Journey with LearnFlow
              </motion.h1>
              <motion.p 
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Experience the future of learning with our AI-powered platform. Track progress,
                set goals, and achieve more with personalized learning paths.
              </motion.p>
            </div>
            <motion.div 
              className="flex flex-col gap-3 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/signup">
                <Button size="lg" className="rounded-full w-full min-[400px]:w-auto">
                  Get Started Free
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="outline" size="lg" className="rounded-full w-full min-[400px]:w-auto">
                  Explore Features
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-card">
                      <Image
                        src={`/testimonials/avatar-${i}.jpg`}
                        alt={`User ${i}`}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="ml-4 text-muted-foreground">
                  <span className="font-medium">10K+</span> students already enrolled
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 fill-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="ml-2 text-muted-foreground">
                  <span className="font-medium">4.9</span>/5 rating
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Feature highlights */}
          <motion.div 
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-3xl" />
            <div className="relative space-y-4 p-8">
              {[
                { 
                  icon: Brain, 
                  title: "AI-Powered Learning",
                  description: "Personalized learning paths tailored to your goals"
                },
                { 
                  icon: Target, 
                  title: "Goal Tracking",
                  description: "Set and achieve milestones with smart progress tracking"
                },
                { 
                  icon: BookOpen, 
                  title: "Resource Library",
                  description: "Access curated learning materials and resources"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  className="flex items-start space-x-4 rounded-2xl bg-card/50 backdrop-blur-sm p-4 hover:bg-card/80 transition-colors"
                >
                  <div className="rounded-lg bg-primary/10 p-2">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
