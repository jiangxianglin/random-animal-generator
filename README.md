# Random Animal Generator

Free random animal generator for games, classrooms, drawing prompts, and writing—no signup.

**Live site:** [https://www.randomanimalgenerator.online](https://www.randomanimalgenerator.online)

## Try the tools

| Tool | URL |
|------|-----|
| Random Animal Generator (home) | https://www.randomanimalgenerator.online/ |
| Cute Animal Generator | https://www.randomanimalgenerator.online/cute-animal-generator |
| Random Animal Picker | https://www.randomanimalgenerator.online/random-animal-picker |
| Give Me a Random Animal | https://www.randomanimalgenerator.online/give-me-a-random-animal |
| Animal Randomizer | https://www.randomanimalgenerator.online/animal-randomizer |
| Drawing Prompt Generator | https://www.randomanimalgenerator.online/drawing-prompt-generator |
| Random Animal Generator for Drawing | https://www.randomanimalgenerator.online/random-animal-generator-for-drawing |
| Random Animal Wheel | https://www.randomanimalgenerator.online/random-animal-generator-wheel |
| Random Animal Name Generator | https://www.randomanimalgenerator.online/random-animal-name-generator |

## Features

- Generate 1–10 random animals from a 121-animal curated pool
- Filter by category (Mammals, Birds, Reptiles, Marine, Insects)
- Educational facts and reference images per animal
- Wheel, picker, name list, cute, and drawing-prompt modes
- SSR-first Next.js pages for SEO / GEO visibility
- Fully responsive UI

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/jiangxianglin/random-animal-generator.git
cd random-animal-generator
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
random-animal-generator/
├── app/                    # Next.js App Router pages + sitemap/robots
├── components/             # Tool islands (client) + shared UI
├── lib/                    # Animals data, generator, SEO helpers, site constants
└── public/                 # OG images, heroes, llms.txt
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment

Deployed on Vercel at **https://www.randomanimalgenerator.online**.

1. Push to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Set `NEXT_PUBLIC_SITE_URL=https://www.randomanimalgenerator.online` if needed

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Images**: Next.js Image Optimization
- **Deployment**: Vercel

## License

MIT License — feel free to use this project for educational purposes.

## Contributing

Contributions are welcome. Open a Pull Request against this repository.
