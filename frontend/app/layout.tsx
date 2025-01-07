import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { Outfit as FontHeading } from 'next/font/google'
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "@/components/providers/toaster";
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontHeading = FontHeading({
  subsets: ['latin'],
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: 'LearnFlow - Adaptive Learning Platform',
  description: 'Personalized learning paths powered by AI',
  keywords: ['education', 'learning', 'AI', 'personalized learning', 'LearnFlow'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable} ${fontHeading.variable}`}
      >
        <SessionProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
