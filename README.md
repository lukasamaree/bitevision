# BiteVision

BiteVision is a recipe recommendation system that helps you discover recipes by simply uploading a photo of your food. It combines computer vision and vector search to retrieve visually and semantically similar recipes from a database of 69,000+.

<details>
  <summary><strong>📚 Table of Contents</strong></summary>

- [BiteVision Frontend](#bitevision-frontend)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Image Search](#image-search)
  - [Text Search](#text-search)
- [Deployment](#deployment)
- [License](#license)

</details>

## Features

Upload an image of a dish and get the top 10 most visually similar recipes

Powered by CLIP embeddings and MongoDB’s Approximate Nearest Neighbors (ANN) search

Fast and scalable — recommendations in under one second

Streamlit-based interface with support for:

Tag-based filtering (e.g., vegetarian, quick meals)

Hybrid image + text search for more accurate results

# Link To Deployed App: https://bitevision.vercel.app/


If you want to explore making this on your own with your own frontend? [Click Here](#Getting-Started)

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
