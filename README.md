# 🎮 Glass Shard Storefront

A modern, responsive game storefront built with React, TypeScript, and Tailwind CSS. Experience a sleek, glass-morphism design with smooth animations and a comprehensive gaming platform.

![Glass Shard Storefront](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.1-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Core Functionality
- **Game Store**: Browse and discover games with detailed information
- **Game Library**: Manage your purchased games collection
- **Shopping Cart**: Add games to cart with real-time updates
- **Game Details**: Comprehensive game pages with screenshots and reviews
- **User Settings**: Customize your profile and preferences
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### 🎨 Design & UX
- **Glass Morphism**: Modern glass-panel design with transparency effects
- **Smooth Animations**: Scroll-triggered animations and micro-interactions
- **Dark Theme**: Eye-friendly dark color scheme
- **Interactive Elements**: Hover effects, tooltips, and loading states
- **Accessibility**: WCAG compliant with proper ARIA labels

### 🛠 Technical Features
- **TypeScript**: Full type safety and better development experience
- **React Query**: Efficient data fetching and caching
- **React Router**: Client-side routing with nested routes
- **Form Validation**: Zod schema validation with React Hook Form
- **Toast Notifications**: User feedback with Sonner toast library
- **Component Library**: shadcn/ui components for consistent design

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd glass-shard-storefront
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📁 Project Structure

```
glass-shard-storefront/
├── public/                 # Static assets
│   ├── favicon.svg        # Custom game controller icon
│   └── robots.txt         # SEO configuration
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── GameCard.tsx  # Game card component
│   │   ├── Layout.tsx    # Main layout wrapper
│   │   └── Navbar.tsx    # Navigation component
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Route components
│   │   ├── Index.tsx     # Homepage with featured games
│   │   ├── Store.tsx     # Game store page
│   │   ├── Library.tsx   # User's game library
│   │   ├── Cart.tsx      # Shopping cart
│   │   ├── GamePage.tsx  # Individual game details
│   │   ├── Settings.tsx  # User settings
│   │   └── NotFound.tsx  # 404 error page
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Application entry point
├── index.html            # HTML template
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite build configuration
└── package.json          # Dependencies and scripts
```

## 🎮 Pages Overview

### Homepage (`/`)
- Featured games carousel with auto-rotation
- Trending games section
- Upcoming releases
- Hero section with call-to-action

### Store (`/store`)
- Game catalog with filtering and search
- Category-based navigation
- Price filtering and sorting options
- Game cards with ratings and tags

### Game Details (`/game/:id`)
- Detailed game information
- Screenshots and media gallery
- User reviews and ratings
- Purchase options and add to cart

### Library (`/library`)
- User's purchased games
- Game installation status
- Play time tracking
- Game categories and favorites

### Cart (`/cart`)
- Shopping cart with game items
- Price calculations and discounts
- Checkout process
- Payment integration ready

### Settings (`/settings`)
- User profile management
- Account preferences
- Notification settings
- Privacy controls

## 🛠 Tech Stack

### Frontend
- **React 18.3.1** - UI library with hooks
- **TypeScript 5.5.3** - Type safety and better DX
- **Vite 5.4.1** - Fast build tool and dev server
- **React Router 6.26.2** - Client-side routing
- **React Query 5.56.2** - Data fetching and caching

### Styling & UI
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Tailwind CSS Animate** - Animation utilities

### Forms & Validation
- **React Hook Form 7.53.0** - Performant forms
- **Zod 3.23.8** - TypeScript-first schema validation
- **@hookform/resolvers 3.9.0** - Form validation integration

### Development Tools
- **ESLint 9.9.0** - Code linting
- **TypeScript ESLint 8.0.1** - TypeScript linting rules
- **SWC** - Fast TypeScript/JSX compilation

## 🎨 Design System

The application uses a custom glass-morphism design system with:

- **Color Palette**: Dark theme with cyan accents
- **Typography**: Modern, readable fonts
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI components
- **Animations**: Smooth transitions and micro-interactions

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with hover effects
- **Tablet**: Touch-friendly interface with adapted layouts
- **Mobile**: Streamlined navigation and touch interactions

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

### Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect your repository
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **Firebase Hosting**: Deploy using Firebase CLI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Unsplash](https://unsplash.com/) for the placeholder images

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
