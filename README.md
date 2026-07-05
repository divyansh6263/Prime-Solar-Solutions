# Prime Solar Solutions

A premium, fully responsive single-page web application (SPA) designed for a solar panel installation and renewable energy systems business. Featuring high-performance scroll animations, an interactive solar energy calculator, and a secure content management admin dashboard.

## 🌟 Key Features

*   **Premium Interactive UI**: Curated theme styling featuring sleek typography, glassmorphism headers, smooth micro-animations, and full support for dynamic **Light/Dark modes** (loads in Light mode by default).
*   **Solar Energy Calculator**: Real-time savings and solar requirements computer supporting multiple currencies (INR/USD), estimating needed system size (kW), approximate panel count, financial returns, carbon footprint offset (CO2 offset in metric tons), and tree equivalent absorption.
*   **SVG Energy Flow Diagram**: An animated, responsive SVG telemetry flow illustrating power generation from the Sun ➔ Panels ➔ Inverter ➔ Battery ➔ Home, triggering active path glow animations when scrolled into view.
*   **Scroll-Spy Navigation**: Header navigation links dynamically update highlights as you scroll down through landing sections.
*   **Secure Staff Admin Portal**: 
    *   Auth gate restricting access exclusively to authorized emails (`divyansh62soni@gmail.com`, `jalajgupta550@gmail.com`).
    *   Supported Auth flows: Google OAuth (mock accounts chooser overlay) and Password validation (`Divyansh@primesolarsolutions`).
    *   Dynamic Admin Navigation hiding header controls from normal visitors, and auto-hiding the footer inside dashboard routes.
    *   **Content Management Dashboard (CRUD)**: Update business coordinates (phone, email, addresses), manage the inventory catalog (with base64 file upload conversion for equipment images), edit project showcase portfolios, and view submitted callback lead intakes.

## 🛠️ Tech Stack

*   **Core**: HTML5, Vanilla CSS3 (custom CSS design variables, flex/grid layouts), Modern JavaScript (ES6+ SPA router).
*   **Icons**: FontAwesome v6.4.
*   **Typography**: Google Fonts (Inter & Space Grotesk).
*   **Build Tool**: Vite (under the hood for light, blazing-fast hot-reloading development).

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/prime-solar-solution.git
   cd prime-solar-solution
   ```

2. Install development dependencies:
   ```bash
   npm install
   ```

3. Run the project locally:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the address shown in your terminal (typically `http://localhost:5173`).

## 🔐 Staff Login 
*   **Access Point**: Click the lock icon next to **Staff Portal** in the bottom footer, or append `#/admin` to the URL.
