# Random Animal Generator

A modern, educational web application built with Next.js that generates random animals with fascinating facts and high-quality images.

## Features

- 🎲 Generate 1-10 random animals
- 🦁 Filter by category (Mammals, Birds, Reptiles, Marine, Insects)
- 📚 Educational facts for each animal
- 🖼️ High-quality images from Unsplash
- 📱 Fully responsive design
- ⚡ Fast performance with Next.js
- 🎨 Beautiful UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd random-animal-generator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
random-animal-generator/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── animal-card.tsx     # Animal card component
│   └── generator-controls.tsx  # Control panel component
├── lib/
│   ├── animals.ts          # Animal database and types
│   └── generator.ts        # Animal generator logic
└── public/                 # Static assets
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This project can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- Any platform supporting Next.js

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

## Future Enhancements

- [ ] Add more animals (expand to 200+)
- [ ] Implement favorites system
- [ ] Add social sharing
- [ ] Conservation status badges
- [ ] Wheel mode visualization
- [ ] Animal detail pages
- [ ] Search functionality
- [ ] Multi-language support

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Images**: Next.js Image Optimization
- **Deployment**: Vercel

## License

MIT License - feel free to use this project for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
