"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    content:
      "LearnFlow has completely transformed how I manage my studies. The smart task organization and progress tracking features are game-changers.",
    author: "Sarah Chen",
    role: "Computer Science Student",
    image: "/testimonials/avatar-1.jpg",
  },
  {
    content:
      "As a self-taught developer, LearnFlow helps me stay organized and motivated. The study scheduling and resource management are exactly what I needed.",
    author: "Michael Rodriguez",
    role: "Self-taught Developer",
    image: "/testimonials/avatar-2.jpg",
  },
  {
    content:
      "The analytics and progress tracking features give me clear insights into my learning journey. It's like having a personal learning coach.",
    author: "Emily Thompson",
    role: "Data Science Enthusiast",
    image: "/testimonials/avatar-3.jpg",
  },
]

export function LandingTestimonials() {
  return (
    <div className="bg-muted/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 text-primary">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by learners worldwide
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-background p-8 shadow-lg ring-1 ring-muted"
              >
                <figure className="h-full">
                  <blockquote className="text-lg leading-8 text-foreground">
                    <p>"{testimonial.content}"</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={40}
                      height={40}
                    />
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
