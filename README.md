Forest Bungalow Booking — Frontend

A modern React + Vite single-page application (SPA) for managing bungalow/hotel bookings. It includes both the public website for guests and the admin dashboard for managers and staff.

🚀 Features

Public site

Browse available bungalows

View details and images

Create bookings with date/guest selection

Confirmation screen

Admin dashboard

Authentication with role-based access (receptionist, manager, admin, superAdmin)

Booking management: list, filter, update, checkout

Calendar view of reservations (React Big Calendar)

Cabin and guest CRUD

Settings for nightly prices, breakfast, min/max nights

UI/UX

Responsive design with styled-components

Mobile-first layout with safe-area support

Custom hooks for media queries, outside click, iOS tap fixes

Toast notifications (react-hot-toast)

🖼️ Screenshots & Demo
Public Website
Home Page ![HOME](./screenshots/web-home.png)
Bungalow Detail ![BUNGALOW](./screenshots/web-detail.png)
Booking Flow ![BOOKING](./screenshots/web-booking.png)

Admin Panel
Dashboard ![DASHBOARD](./screenshots/admin-dashboard.png)
Bookings ![ADMINBOOKING](./screenshots/admin-bookings.png)
Calendar ![CALENDAR](./screenshots/admin-calendar.png)

🛠️ Tech Stack

React 18 + Vite

React Router

Styled-Components

@tanstack/react-query for data fetching/caching

React Hook Form for forms + validation

React Datepicker & React Select for inputs

React Big Calendar for availability view

react-hot-toast for notifications

⚙️ Environment Variables

Create a .env file in the project root.
Variables must be prefixed with VITE\_:

VITE_APP_NAME=Forest Bungalow
VITE_API_URL=http://localhost:4001/api/v1
VITE_AUTH_URL=http://localhost:4001/api/v1/auth
VITE_DEFAULT_TZ=Europe/Istanbul

▶️ Getting Started

# 1. Install dependencies

npm install

# 2. Start development server

npm run dev

# → http://localhost:5173

# 3. Build for production

npm run build

# 4. Preview production build

npm run preview

📂 Project Structure
/src
/app # Providers, router, global styles
/pages # Route components (public + admin)
/components # Shared UI components
/features # Domain features: bookings, cabins, guests, settings
/hooks # Custom hooks (useMediaQuery, useOutsideClick, useTap, etc.)
/services # API clients, query keys
/styles # GlobalStyles, theme, breakpoints
/utils # Helpers (currency, dates, overlap checks)
/assets # Images, icons, fonts
main.jsx

📦 Build & Deploy

Production build is output to /dist

Serve behind Caddy/Nginx or on static hosts like Netlify or Vercel

Ensure VITE_API_URL points to your backend API (e.g. https://api.bungalow.yourdomain.com)

📜 License

MIT (or your chosen license)

📌 Credits / Acknowledgements

This project was initially inspired by coursework from Jonas Schmedtmann
.
Some starter JSX structures were adapted from his training materials.
The majority of the design, functionality, and further development were implemented by Onur Yılmaz.
