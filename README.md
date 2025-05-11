# BiteVision Frontend

This is the frontend for the BiteVision project, built with Next.js, React, Tailwind CSS, and shadcn/ui. It allows users to upload a food image and/or enter a food description to find similar recipes using a deep learning backend.

## Features
- Upload a food image or enter a food description (or both)
- Adjustable number of recipe recommendations
- Modern, responsive UI with animated microinteractions
- Results displayed as recipe cards

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm (v9 or newer recommended)

### Installation
```bash
cd frontend
npm install
```

### Development
Start the development server:
```bash
npm run dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

### Environment Variables
- `.env.local` for local development
- `.env.prod` for production

Example `.env.local`:
```
BACKEND_URL=http://localhost:8000
```

### API Integration
- The frontend communicates with the backend via `/api/match`.
- The backend URL is set via the `BACKEND_URL` environment variable.

### Deployment
- Build the app for production:
```bash
npm run build
```
- Start the production server:
```bash
npm start
```

## Project Structure
- `app/` - Main Next.js app directory
- `components/` - Reusable UI components
- `lib/` - Utility functions
- `public/` - Static assets

## Customization
- Tailwind CSS is configured in `tailwind.config.js`.
- UI components use shadcn/ui for modern design.

## License
MIT
