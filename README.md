# Connected Vehicle Telemetry System — Frontend Cockpit

The web operations cockpit and telemetry visualization interface for the **Connected Vehicle Telemetry System**. Built with **React 19, Vite, Recharts, Lucide Icons, and custom automotive dark navy CSS**.

---

## 🌟 Key Features

- **Fleet Operations Dashboard (`/`)**: 5 primary KPI cards, dynamic fleet velocity bar chart, fleet status distribution, and live vehicle telemetry feed ticker.
- **Vehicle Fleet Directory (`/vehicles`)**: Full vehicle roster with search (by ID, Model, or Plate), status filters (`ONLINE`, `WARNING`, `MAINTENANCE`, `OFFLINE`), and Table / Card Grid views.
- **Vehicle Diagnostics & Telemetry (`/vehicles/:id`)**:
  - Time-series **Recharts** graphs: Speed Dynamics (km/h), Engine Thermal Monitoring (°C), and Energy / Fuel Depletion Curve (%).
  - Interactive **GPS Radar & Compass Bearing Visualizer** (`CoordinatesMap`).
  - CAN-bus hardware readouts: Estimated RPM, Tire Pressure (PSI), Odometer (KM), and Diagnostic Codes.
  - 1-click **Acknowledge** and **Resolve** action buttons for vehicle-specific alerts.
- **Alerts Management Center (`/alerts`)**: Threshold incident log with filtering by status and severity, plus live alert resolution.
- **Telemetry History Log (`/history`)**: Chronological audit trail with filtering and one-click **Export CSV** download.
- **Engine Health & Diagnostics (`/engine-health`)**: Powertrain temperature bar chart with individual vehicle heat bars and powertrain checklist.
- **System Settings & Viva Guide (`/settings`)**: Live simulation controls, threshold sliders, architecture flow diagrams, and college viva notes.
- **Zero-Setup Demo Fallback**: Built-in fallback simulation ensures the frontend never shows a blank screen even if the backend is not yet started.

---

## 🛠 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Language**: Pure JavaScript (ES6+)
- **Charts**: Recharts 3.x
- **Icons**: Lucide React
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios

---

## 📋 Prerequisites

- **Node.js**: v18.x or higher (Node v20+ recommended)
- **npm**: v9.x or higher

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone <YOUR_FRONTEND_REPO_URL>
cd connected-vehicle-telemetry-frontend
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

| Variable | Default | Description |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `/api` | Base URL for REST API. When using Vite dev proxy, keep `/api`. For separate domain deployments, point to your backend (e.g. `https://your-backend.onrender.com/api`). |

> [!NOTE]
> Never place private keys or secrets in `VITE_` variables as they are bundled into client-side code.

### 3. Run Development Server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in `dist/`.

To preview the production build locally:
```bash
npm run preview
```

---

## 🌐 API Proxy Configuration

During local development, `vite.config.js` proxies `/api` calls to the local Spring Boot backend running on port 8080:

```js
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

If the Spring Boot backend is not running, the frontend automatically falls back to an integrated client-side simulation store so all pages remain interactive.

---

## 🚀 Deployment (Vercel / Netlify)

1. **Vercel**: Import the repository and set the root directory to `./`. Build command is `npm run build` and output directory is `dist`.
2. **Environment Variable**: Set `VITE_API_BASE_URL` to your deployed Spring Boot backend URL (e.g. `https://your-backend.railway.app/api`).
