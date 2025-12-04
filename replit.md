# Portfolio Website

## Overview

A modern portfolio website platform that allows users to showcase their creative projects through a beautiful, visually-rich gallery interface. The application features two distinct experiences: a public-facing portfolio showcase with project filtering and detailed views, and an authenticated admin panel for content management. Built with React, Express, and PostgreSQL, the platform includes user authentication via Replit Auth and file storage capabilities through Google Cloud Storage.

## Phase 2 Features (Completed)

### About Me Page
- Public `/about` page displaying portfolio owner's bio, title, and profile photo
- Admin editing capability for all About content fields
- Profile photo upload using Object Storage integration

### Contact Page
- Public `/contact` page with contact form (name, email, message)
- Messages stored in database for admin review
- Admin message management panel with ability to view and delete messages

### Drag-and-Drop Project Reordering
- Admin can reorder projects via drag-and-drop using Framer Motion Reorder
- Smooth spring animations with visual feedback (scale, shadow effects)
- Debounced API calls to prevent excessive server requests
- Automatic sort order persistence to database via PATCH /api/projects/reorder

### Multiple Images per Project
- Projects can have multiple gallery images in addition to the main cover image
- Image carousel in project modal with navigation controls
- Gallery image management in admin edit dialog

### PDF Export
- Export portfolio as professional PDF document
- Includes cover page, About Me section, and all projects
- Available from both admin panel and public gallery
- Uses @react-pdf/renderer for client-side PDF generation

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React 18 with TypeScript for type-safe component development
- Wouter for lightweight client-side routing
- Vite as the build tool and development server with HMR support

**UI System**
- Shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Framer Motion for animations and transitions
- Inter font family (Google Fonts) for typography

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- React Hook Form with Zod for form validation
- Local component state with React hooks

**Design Approach**
- Two contrasting interfaces: emotional/visual public gallery vs. clean/utilitarian admin panel
- Masonry grid layout for project gallery (Pinterest/Behance-inspired)
- Light/dark theme support with system preference detection
- Mobile-responsive design with breakpoint-aware components

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- HTTP server for request handling
- Custom logging middleware for request tracking
- JSON body parsing with raw buffer preservation for webhooks

**Database Layer**
- PostgreSQL for data persistence
- Drizzle ORM for type-safe database queries and schema management
- Connection pooling via node-postgres (pg)
- Schema-first approach with migrations in `/migrations` directory

**Data Models**
- Users: Authentication and admin role management
- Projects: Portfolio items with metadata (title, description, tags, categories, URLs, technologies, publishing status)
- ProjectImages: Additional gallery images for projects (Phase 2)
- AboutContent: About page content (title, bio, profile photo) (Phase 2)
- ContactMessages: Contact form submissions (Phase 2)
- Sessions: Server-side session storage for authentication

**Authentication & Authorization**
- Simple session-based authentication with hardcoded credentials
- Login credentials stored in environment variables (ADMIN_USERNAME, ADMIN_PASSWORD)
- Server-side session management with PostgreSQL session store
- Admin role automatically granted on successful login
- Protected API routes with session middleware
- Login page at `/login` for portfolio owner access

**File Storage**
- Google Cloud Storage integration for image uploads
- Custom object ACL (Access Control List) system for file permissions
- Public object search paths for serving static assets
- Uppy file uploader on frontend (Dashboard UI, AWS S3 protocol)
- Signed URL generation for secure file access

### API Structure

**Authentication Routes**
- `GET /api/auth/user` - Get current authenticated user
- `POST /api/login` - Login with username/password
- `POST /api/logout` - Logout and destroy session

**Project Management Routes**
- `GET /api/projects` - List published projects (public)
- `GET /api/admin/projects` - List all projects including unpublished (admin only)
- `POST /api/projects` - Create new project (admin only)
- `PATCH /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)
- `PATCH /api/projects/reorder` - Reorder projects by sort order (admin only)

**Project Images Routes (Phase 2)**
- `GET /api/projects/:id/images` - Get gallery images for a project
- `POST /api/projects/:id/images` - Add gallery image to a project (admin only)
- `DELETE /api/project-images/:id` - Delete a gallery image (admin only)

**About Content Routes (Phase 2)**
- `GET /api/about` - Get about page content (public)
- `PUT /api/about` - Update about page content (admin only)

**Contact Routes (Phase 2)**
- `POST /api/contact` - Submit contact form message (public)
- `GET /api/admin/messages` - List all contact messages (admin only)
- `DELETE /api/admin/messages/:id` - Delete a contact message (admin only)

**File Routes**
- `GET /public-objects/:filePath(*)` - Serve public files
- `GET /objects/:objectPath(*)` - Serve authenticated/private files

### Build & Deployment

**Development Mode**
- Vite dev server with middleware mode
- Hot module replacement (HMR)
- Source maps for debugging
- Replit-specific plugins (cartographer, dev banner, runtime error overlay)

**Production Build**
- Frontend: Vite builds to `dist/public`
- Backend: esbuild bundles server to `dist/index.cjs`
- Selective dependency bundling (allowlist) to optimize cold starts
- Static file serving from built frontend

## External Dependencies

**Cloud Services**
- Google Cloud Storage for file/image hosting
- Replit OIDC for authentication
- Replit Sidecar endpoint for GCS credential management

**Database**
- PostgreSQL (required via DATABASE_URL environment variable)

**Third-Party Libraries**
- Shadcn/ui component library (Radix UI primitives)
- TanStack Query for data fetching
- Framer Motion for animations
- Uppy for file uploads
- Drizzle ORM for database operations
- Zod for schema validation

**Development Tools**
- TypeScript for type safety
- Tailwind CSS for styling
- PostCSS with Autoprefixer
- ESBuild for server bundling
- Vite for frontend bundling

**Session & Storage**
- connect-pg-simple for PostgreSQL session storage
- Express session middleware