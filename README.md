# LearnFlow - AI-Powered Learning Assistant

LearnFlow is an intelligent learning platform that combines task management with AI-powered study assistance. Built with Next.js and Express.js, it helps students organize their studies, generate study materials, and get instant help with their questions.

## Features

- AI Study Assistant with natural conversation
- AI-powered content generation for notes, summaries, and quizzes
- Smart task management for learning
- Progress tracking and analytics
- Personalized study recommendations
- Dark/Light mode support
- Fully responsive design

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion
- Google Gemini AI

### Backend
- Express.js
- MongoDB
- JWT Authentication
- Google AI/ML APIs
- Rate Limiting & Security

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- Google Gemini API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/learnflow.git
cd learnflow
```

2. Set up the frontend:
```bash
cd frontend
npm install
cp .env.example .env.local  # Configure your environment variables
npm run dev
```

3. Set up the backend:
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

## Environment Variables

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
GEMINI_API_KEY=your-gemini-api-key
```

### Backend (.env)
```
PORT=8000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
SECRET_KEY=your-secret-key
```

## Project Structure

```
learnflow/
├── frontend/
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   │   ├── ai/          # AI-related components
│   │   └── ui/          # UI components
│   ├── lib/             # Utility functions
│   └── public/          # Static assets
└── backend/
    ├── src/
    │   ├── config/      # Configuration files
    │   ├── routes/      # API routes
    │   ├── models/      # Database models
    │   └── middleware/  # Custom middleware
    └── tests/           # Test files
```

## Key Features

### AI Study Assistant
- Natural language conversations about any study topic
- Instant answers to academic questions
- Personalized learning recommendations

### Content Generation
- Generate study notes
- Create summaries
- Produce practice quizzes
- Make flashcards

### Task Management
- Organize study tasks
- Track learning progress
- Set study reminders
- Priority management

## Deployment

### Frontend
- Deploy on Vercel
- Configure environment variables
- Set up production optimizations

### Backend
- Deploy on Render
- Configure MongoDB Atlas
- Set up security measures

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful components
- [Google Gemini](https://deepmind.google/technologies/gemini/) for AI capabilities
- All contributors and supporters of this project
