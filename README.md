# My Fragments of Life — Personal Blogging Website

A personal blog exploring science, philosophy, and poetry. Built with Next.js and styled with a dark cosmic aesthetic.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Key Files Explained](#key-files-explained)
- [Adding New Content](#adding-new-content)
- [Deployment](#deployment)

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 15.5.5 | Framework (App Router) |
| [React](https://react.dev) | 19.1.0 | UI library |
| [TypeScript](https://www.typescriptlang.org) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | ^3.4 | Utility-first styling |
| [next-themes](https://github.com/pacocoursey/next-themes) | ^0.4.6 | Dark / light mode |
| [gh-pages](https://github.com/tschaub/gh-pages) | ^6.3 | GitHub Pages deployment |

---

## Running the Application

### Prerequisites

Make sure you have **Node.js 18+** and **npm** installed.

```bash
node -v   # should be 18 or higher
npm -v
```

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads whenever you save a file.

### 3. Build for production

```bash
npm run build
```

This generates a fully static site in the `out/` folder (configured via `output: 'export'` in `next.config.ts`). Open `out/index.html` to preview locally.

### 4. Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `build` and then pushes the `out/` folder to the `gh-pages` branch of your repository, which GitHub Pages serves automatically.

> The CI/CD workflow in `.github/workflows/nextjs.yml` also handles automatic deploys on every push to `main`.

---

## Project Structure

```
blogs/
├── app/                              # Next.js App Router pages
│   ├── layout.tsx                    # Root layout (Navbar, StarField, ThemeProvider)
│   ├── globals.css                   # Global styles, animations, custom scrollbar
│   ├── page.tsx                      # Home page (/)
│   ├── home/
│   │   └── page.tsx                  # /home route (mirrors the home page)
│   ├── about-me/
│   │   └── page.tsx                  # /about-me
│   ├── about/
│   │   └── page.tsx                  # /about (placeholder)
│   ├── philosophical-blogs/
│   │   ├── page.tsx                  # Blog index — /philosophical-blogs
│   │   ├── free-will/
│   │   │   └── page.jsx              # Individual post — /philosophical-blogs/free-will
│   │   └── the-duality-of-existence/
│   │       └── page.jsx              # Individual post
│   ├── scientific-blogs/
│   │   ├── page.tsx                  # Blog index — /scientific-blogs
│   │   └── quantum-nature-of-reality/
│   │       └── page.tsx              # Individual post
│   └── books-ghazals-and-stories/
│       ├── page.tsx                  # Category hub — /books-ghazals-and-stories
│       └── pages/
│           ├── short-stories/
│           │   ├── page.jsx          # Story list
│           │   ├── a-subway-at-aiims/
│           │   │   └── page.jsx      # Full story reader
│           │   └── in-the-street-of-dreams/
│           │       └── page.jsx      # Full story reader
│           ├── ghazle/
│           │   └── page.jsx          # Ghazal collection
│           ├── nazme/
│           │   └── page.jsx          # Nazm collection
│           └── quotes/
│               └── page.jsx          # Quotes collection
│
├── components/
│   ├── Navbar.tsx                    # Top navigation bar
│   └── StarField.tsx                 # Animated canvas starfield + galaxy background
│
├── public/
│   ├── images/
│   │   ├── cosmic-bg.jpg             # Body background image
│   │   ├── galaxy-bg.png             # Slowly rotating galaxy overlay
│   │   ├── ud.jpg                    # Profile photo
│   │   ├── cover1.png                # Book cover: In the Street of Dreams
│   │   ├── coverAiims.png            # Book cover: A Subway At AIIMS
│   │   └── coming_soon.png           # Placeholder for future content
│   ├── books.json                    # Chapter data for the story readers
│   ├── A_Subway_At_AIIMS.pdf         # Downloadable PDF
│   └── InTheStreetOfDreams.pdf       # Downloadable PDF
│
├── book-generator-py/                # Python utilities used to generate book JSON
│   └── ...
│
├── next.config.ts                    # Next.js config (static export, unoptimized images)
├── tailwind.config.js                # Tailwind config (dark mode: class)
├── postcss.config.js                 # PostCSS config
└── package.json                      # Scripts and dependencies
```

---

## Key Files Explained

### `app/layout.tsx`

The root layout wraps every page. It:
- Imports `globals.css` for base styles
- Wraps the tree in `ThemeProvider` (next-themes) for dark/light mode
- Renders `StarField` as a fixed full-screen background layer
- Renders `Navbar` fixed at the top
- Applies a semi-transparent gradient overlay via `<main>`

### `app/globals.css`

Defines the entire visual language beyond Tailwind:

| Class | Effect |
|---|---|
| `.animate-fade-in` | Fade up on mount |
| `.animate-slide-up` | Slide up on mount |
| `.animate-float` | Gentle infinite floating |
| `.animate-glow` | Pulsing cyan text glow |
| `.animate-border-glow` | Pulsing border glow |
| `.animate-spin-slow` | Very slow continuous rotation |
| `.animate-scale-in` | Scale-in on mount |
| `.shimmer-text` | Cyan → white → violet gradient that shifts continuously |
| `.glow-card` | Card lifts and glows on hover |
| `.cosmic-divider` | Horizontal gradient rule |
| `.delay-100` … `.delay-800` | Animation stagger helpers |

### `components/StarField.tsx`

A `<canvas>`-based 3-D starfield rendered on every page. Uses `requestAnimationFrame` for smooth 60 fps animation.

- **300 depth-field stars** in white/cyan/blue tones that fly toward the viewer
- **Shooting stars** spawn every ~3–6 seconds with gradient trails
- A **galaxy PNG** rotates very slowly in the background behind the canvas
- Cleans up all event listeners and animation frames on unmount

### `components/Navbar.tsx`

- Fixed at top with scroll-aware blur: deepens as the user scrolls
- Brand name has a persistent `glowPulse` animation
- Desktop links show an animated gradient underline on hover; the active route's underline stays visible
- Mobile menu slides in/out via `max-height` transition (no layout jump)
- Theme toggle button switches between ☀️ and 🌙

### `next.config.ts`

```ts
output: 'export'              // Generates a static site in /out
images: { unoptimized: true } // Required for GitHub Pages (no Node server)
```

Because the site is fully static, all images use **relative paths** (`images/foo.jpg`, not `/images/foo.jpg`) in `src` props.

---

## Adding New Content

### Add a new blog post

1. Create a folder under the relevant category:
   ```
   app/philosophical-blogs/your-post-slug/page.jsx
   ```
2. Write the post as a React component (copy an existing post as a template).
3. Add an entry to the `blogs` array in `app/philosophical-blogs/page.tsx`:
   ```ts
   {
     id: 2,
     title: "Your Post Title",
     excerpt: "A short description...",
     image: "images/your-image.jpg",
     path: "/philosophical-blogs/your-post-slug",
   }
   ```
4. Add your image to `public/images/`.

### Add a new short story

1. Add the story's chapters to `public/books.json` following the existing schema.
2. Create a folder: `app/books-ghazals-and-stories/pages/short-stories/your-story/page.jsx`
3. Copy an existing story reader (`a-subway-at-aiims/page.jsx`) and update the title, JSON key, and PDF path.
4. Add a card for the story in `app/books-ghazals-and-stories/pages/short-stories/page.jsx`.

### Add a ghazal or nazm

Open the respective file and add a new entry to the collection array at the top:

- Ghazals: `app/books-ghazals-and-stories/pages/ghazle/page.jsx`
- Nazms: `app/books-ghazals-and-stories/pages/nazme/page.jsx`

---

## Deployment

### Automatic (GitHub Actions)

Every push to `main` triggers `.github/workflows/nextjs.yml`, which builds and deploys to GitHub Pages automatically.

### Manual

```bash
npm run deploy
# equivalent to: npm run build && gh-pages -d out
```

The live site is served from the `gh-pages` branch of the repository.

---

> Built by **Udhav** — where science, philosophy, and poetry meet the cosmos.
