"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Free",
    id: "free",
    priceMonthly: "$0",
    description: "Perfect for getting started with learning management.",
    features: [
      "Basic task management",
      "Simple progress tracking",
      "Study schedule creation",
      "Resource organization",
      "Community support",
    ],
  },
  {
    name: "Pro",
    id: "pro",
    priceMonthly: "$12",
    description: "Ideal for serious learners who want advanced features.",
    features: [
      "Everything in Free",
      "Advanced analytics",
      "Study group collaboration",
      "Custom learning paths",
      "Priority support",
      "AI-powered insights",
      "Unlimited resources",
    ],
  },
  {
    name: "Team",
    id: "team",
    priceMonthly: "$49",
    description: "Best for study groups and learning communities.",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Admin dashboard",
      "Resource sharing",
      "Team analytics",
      "Custom integrations",
      "Dedicated support",
    ],
  },
]

export function LandingPricing() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Choose your learning plan
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          Choose a plan that best fits your learning needs. All plans include our
          core features to help you succeed in your learning journey.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col justify-between rounded-3xl bg-background p-8 ring-1 ring-muted xl:p-10"
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold leading-8">
                    {tier.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight">
                    {tier.priceMonthly}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-muted-foreground">
                    /month
                  </span>
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check
                        className="h-6 w-5 flex-none text-primary"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant={tier.id === "pro" ? "default" : "outline"}
                className="mt-8"
                size="lg"
              >
                Get {tier.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
