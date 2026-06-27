# Project Harmony

**AggroGeoStudio** — Farm telemetry IoT dashboard for the 184 Buncombe Road site.

![Version](https://img.shields.io/badge/version-2.4.1-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)

## Overview

Project Harmony is a next-generation farm telemetry platform featuring:

- **Geospatial Operations** — Leaflet-powered map with custom SVG markers, real-time node status, popup data anchors
- **Live Telemetry** — Soil moisture, temperature, pH, NPK readings from 142+ active field nodes
- **AI-Assisted Management** — HITL-enabled AI copilot architecture for irrigation scheduling, pest detection, yield optimization
- **A2A/HITL Comms Integration** — Agent-to-agent base connectivity with human-in-the-loop oversight

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript + Vite 7 |
| Styling | Tailwind CSS v3.4 + shadcn/ui |
| Animations | Framer Motion |
| Maps | Leaflet + react-leaflet |
| Routing | react-router v7 |
| Icons | Lucide React |

## Theming: Digital Crop & Loam

| Token | Hex | Usage |
|-------|-----|-------|
| `deep-loam` | `#0C0F0A` | Primary background |
| `silage-gray` | `#141A12` | Surface/card backgrounds |
| `neon-sprout` | `#4AF626` | Primary brand, online status |
| `barley-gold` | `#E6A15C` | Accent, alert status |
| `bleached-flax` | `#F4F6F0` | Primary text |
| `dormant-husk` | `#727E6E` | Muted text, borders |
| `blight-red` | `#EF4444` | Error, offline status |

## Live Deployment

**URL:** https://sofqikgfvnysk.kimi.page

## Repository

**GitHub:** https://github.com/amykris1975/project-harmony

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── AppShell.tsx      # Root layout shell
│   │   ├── Header.tsx        # Top navigation bar
│   │   ├── Sidebar.tsx       # Telemetry sidebar drawer
│   │   ├── StatusBar.tsx     # Bottom status bar
│   │   └── animations.tsx    # Shared animation primitives
│   └── Map/
│       └── LeafletMap.tsx    # Geospatial dashboard map
├── pages/
│   ├── HomePage.tsx          # Landing/hero page
│   ├── DashboardPage.tsx     # Map + telemetry dashboard
│   ├── ContactPage.tsx       # Support contact form
│   └── AdminPage.tsx         # Admin console
├── hooks/
│   └── useTelemetry.ts       # Telemetry state + mock data
├── types/
│   └── index.ts              # TypeScript interfaces
├── App.tsx                   # Router configuration
└── index.css                 # Global styles + CSS variables
```

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero section, feature cards, live metrics |
| `/dashboard` | Dashboard | Full-screen Leaflet map with node overlays |
| `/contact` | Contact | Support form with field/technical/partnership options |
| `/admin` | Admin | User management, node registry, system config |

## Features Implemented

### Layout System
- [x] Responsive shell with collapsible sidebar (spring animation)
- [x] View crossfade transitions between routes
- [x] Staggered telemetry grid animations
- [x] Admin badge with shield icon
- [x] A2A/HITL status indicators in status bar
- [x] Live UTC clock with sync animation

### Sidebar (Telemetry)
- [x] System stats grid (online/alert/offline/total)
- [x] Filter buttons by node type (All/Soil/Weather/Camera)
- [x] Node health checklist with status pills
- [x] Click-to-focus on map integration
- [x] Active alerts panel with ACK buttons
- [x] Real-time signal strength simulation

### Leaflet Map Dashboard
- [x] Dark CartoDB basemap tiles
- [x] Custom SVG markers with pulsing halos (green/yellow/red)
- [x] Popup data anchors with soil/temp/humidity/signal
- [x] Floating node detail panel on selection
- [x] Animated fly-to on node selection
- [x] Map legend (online/alert/offline)
- [x] Floating action bar (Reset/Layers/Expand)
- [x] Collapsible layer panel with sector view

### Pages
- [x] **Home**: Animated hero, feature cards, live metrics strip
- [x] **Dashboard**: Full geospatial operations center
- [x] **Contact**: Form with field support/technical/partnership subjects
- [x] **Admin**: Tabbed user management with role badges

## Getting Started

```bash
# Clone the repository
git clone https://github.com/amykris1975/project-harmony.git
cd project-harmony

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment

- Node.js 20+
- Tailwind CSS v3.4.19
- Vite v7.2.4

## License

Proprietary — AggroGeoStudio Operations
