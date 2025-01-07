# LearnFlow - Smart Learning Task Manager

LearnFlow is a modern learning-focused todo app that helps you organize your learning journey effectively. Built with Next.js and FastAPI, it provides a seamless experience for managing your learning tasks, tracking progress, and staying motivated.

## Features

- 📚 Learning-focused task management
- 📊 Progress tracking and analytics
- 🎯 Smart task suggestions
- 📅 Study schedule planning
- 🔍 Resource organization
- 🤝 Study group collaboration
- 📱 Responsive design
- 🌙 Dark/Light mode

## Tech Stack

### Frontend
- Next.js 14 (React)
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Query
- Framer Motion
- Zustand (State Management)

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic
- JWT Authentication
- Alembic (Migrations)

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- PostgreSQL

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
npm run dev
```

3. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

4. Set up the database:
```bash
cd backend
alembic upgrade head
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/learnflow
SECRET_KEY=your-secret-key
```

## Project Structure

```
learnflow/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   └── styles/
└── backend/
    ├── app/
    │   ├── api/
    │   ├── core/
    │   ├── models/
    │   └── schemas/
    ├── alembic/
    └── tests/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
