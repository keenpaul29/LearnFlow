import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    accessToken: string;
  }

  interface Session {
    user: User & {
      id: string;
      accessToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    accessToken: string;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || (
  process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'
);

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        try {
          const response = await api.post('/auth/login', {
            email: credentials.email,
            password: credentials.password,
          });

          const data = response.data;

          if (data.user && data.access_token) {
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              accessToken: data.access_token,
            };
          }

          throw new Error("Invalid credentials");
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
              throw new Error("Connection timeout. Please try again.");
            }
            const status = error.response?.status;
            if (status === 401) {
              throw new Error("Invalid email or password");
            }
            if (status === 404) {
              throw new Error("User not found");
            }
            if (status && status >= 500) {
              throw new Error("Server error. Please try again later.");
            }
            throw new Error(error.response?.data?.message || "Authentication failed");
          }
          throw new Error("An unexpected error occurred");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
};
