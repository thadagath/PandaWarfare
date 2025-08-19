# Overview

This is a modern 2D canvas-based arcade war game called "General Panda's War" built with React, TypeScript, and Express.js. The game features General Panda (a military-themed panda soldier) battling against Jeet enemies (pig-headed characters) with smooth wave-based combat, special burn attacks, and enhanced visual effects. The application follows a full-stack architecture with a sleek modern UI, mobile-responsive controls, and rich particle effects system.

# User Preferences

Preferred communication style: Simple, everyday language.

## Recent User Requirements (January 2025)
- Reduced player movement speed for better control
- Enhanced fire animation effects when enemies are hit
- Modern glassmorphism UI/UX design with gradients and blur effects
- Clear, detailed character sprites (panda head and pig heads clearly visible)
- Fixed button functionality for "Fight Again" and "Main Menu"
- Mobile-friendly controls with improved visual feedback

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI design
- **State Management**: Zustand stores for game state, audio controls, and application state
- **Game Engine**: Custom 2D canvas-based game engine with modular components (Player, Enemy, Bullet, ParticleSystem, SpriteRenderer)
- **3D Graphics**: Three.js integration with @react-three/fiber and @react-three/drei for potential 3D elements
- **Responsive Design**: Mobile-first approach with custom mobile controls and responsive breakpoints

## Backend Architecture
- **Framework**: Express.js with TypeScript running in ES module mode
- **Development**: Hot reload using Vite middleware integration for seamless development experience
- **Storage Layer**: Abstracted storage interface (IStorage) with in-memory implementation and database-ready structure
- **API Structure**: RESTful API design with /api prefix and centralized error handling
- **Logging**: Request/response logging middleware with performance timing

## Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Database**: PostgreSQL via Neon Database serverless connection
- **Schema**: User management system with username/password authentication structure
- **Migrations**: Automated database migrations with Drizzle Kit
- **Development Storage**: In-memory storage implementation for development and testing

## Game Architecture
- **Canvas Rendering**: 2D HTML5 canvas with custom sprite rendering system
- **Game Loop**: RAF-based game loop with delta time calculations for smooth animations
- **Input Handling**: Keyboard controls for desktop and touch controls for mobile devices
- **Audio System**: Web Audio API integration with background music and sound effects
- **Particle System**: Custom particle effects for visual feedback and explosions
- **Collision Detection**: AABB collision detection between game entities

## UI/UX Design
- **Component System**: shadcn/ui components with Radix UI primitives for accessibility
- **Theme System**: CSS custom properties with dark mode support
- **Game States**: Menu, playing, and game over states with smooth transitions
- **HUD System**: Real-time game statistics display (score, health, wave, cooldowns)
- **Mobile Experience**: Touch-optimized controls with visual feedback

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, @tanstack/react-query for data fetching
- **Build Tools**: Vite with TypeScript, PostCSS, and Autoprefixer
- **Development**: tsx for TypeScript execution, esbuild for production builds

## UI and Styling
- **Radix UI**: Complete set of accessible UI primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Styling Utilities**: clsx and tailwind-merge for conditional styling, class-variance-authority for component variants

## Database and Backend
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: Drizzle ORM with drizzle-kit for migrations and schema management
- **Validation**: Zod for runtime type validation and schema definition
- **Session Management**: connect-pg-simple for PostgreSQL session storage

## Game and Media
- **3D Graphics**: @react-three/fiber, @react-three/drei, @react-three/postprocessing for Three.js integration
- **Shader Support**: vite-plugin-glsl for GLSL shader compilation
- **Audio**: Web Audio API (no external audio libraries)
- **Fonts**: @fontsource/inter for consistent typography

## Development and Utilities
- **Date Handling**: date-fns for date/time manipulation
- **Command Interface**: cmdk for command palette functionality
- **Unique IDs**: nanoid for generating unique identifiers
- **Development Tools**: @replit/vite-plugin-runtime-error-modal for error handling