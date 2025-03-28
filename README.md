# Home Tasting App

A Next.js application for managing home tasting event registrations.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (for database)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd home-tasting
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Edit `.env.local` and add your MongoDB connection string from MongoDB Atlas.

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

### 1. Push your code to GitHub

Make sure your code is in a GitHub repository.

### 2. Connect to Vercel

1. Create a [Vercel account](https://vercel.com/signup) if you don't have one
2. Click "New Project" in the Vercel dashboard
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: (leave as default)
   - Output Directory: (leave as default)

### 3. Add Environment Variables

In the Vercel project settings, add the following environment variable:
- `MONGODB_URI`: Your MongoDB Atlas connection string

### 4. Deploy

Click "Deploy" and wait for the build to complete.

## Features

- Time slot selection for tasting events
- Guest registration with contact information
- Waiver agreement and payment confirmation
- Admin panel for managing reservations

## Technology Stack

- Next.js 15
- React 19
- MongoDB (via Mongoose)
- Tailwind CSS
- Vercel (hosting)
