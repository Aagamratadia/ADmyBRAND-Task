# ADmyBRAND AI Suite

A modern, responsive landing page with interactive components and a blog system built with Next.js, TypeScript, and Tailwind CSS.

![Screenshot of ADmyBRAND AI Suite](./public/screenshot.jpg)

## ✨ Features

- **Modern UI/UX** with glassmorphism and dark theme
- **Interactive Components** powered by Framer Motion
- **Blog System** with MDX support
- **Responsive Design** that works on all devices
- **Optimized Performance** with Next.js 13+ App Router
- **Type-Safe** with TypeScript

## 🚀 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Content**: MDX with gray-matter
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **State Management**: React Context API

## 📦 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/ADmyBRAND-Task.git
   cd ADmyBRAND-Task
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠 Project Structure

```
src/
├── app/                    # App Router pages
│   ├── blog/              # Blog routes
│   ├── components/        # Reusable components
│   │   ├── sections/     # Page sections
│   │   └── ui/           # UI components
│   └── lib/              # Utility functions
└── public/               # Static assets
```

## 📝 Blog System

The blog system uses MDX files stored in `content/blog/`. Each post includes:

- Title
- Publication date
- Author
- Cover image
- Excerpt
- Full content in MDX format

### Creating a New Blog Post

1. Create a new `.mdx` file in `content/blog/`
2. Add frontmatter:
   ```yaml
   ---
   title: "Your Post Title"
   date: "2025-01-01"
   author: "Your Name"
   coverImage: "/your-image.jpg"
   excerpt: "A short description of your post"
   ---
   ```
3. Write your content in Markdown/MDX below the frontmatter

## 🎨 Customization

### Theme Colors

Edit the Tailwind configuration in `tailwind.config.ts` to customize the color scheme:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "#6366F1", // Change primary color
        foreground: "#FFFFFF",
      },
      // ... other colors
    },
  },
}
```

### Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add other environment variables here
```

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOUR_USERNAME%2FADmyBRAND-Task)

1. Push your code to GitHub
2. Import the repository on Vercel
3. Deploy!

### Other Platforms

You can deploy this project to any platform that supports Next.js, including:

- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Railway](https://railway.app/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
