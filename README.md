<div align="center">
  <img src="https://raw.githubusercontent.com/Dhwani107/Portfolio_Website/main/src/app/icon.svg" alt="Dhwani Chauhan Logo" width="100" height="100" />

  # Portfolio

  Next.js · Tailwind · Three.js


 
  [![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js&logoColor=white)](#)
  [![Three.js](https://img.shields.io/badge/Three.js-0.163-black?style=for-the-badge&logo=three.js&logoColor=white)](#)
  [![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)

  [Live Demo](https://portfolio-website-alpha-ten-78.vercel.app/) • [Report Bug](https://github.com/Dhwani107/Portfolio_Website/issues) • [Request Feature](https://github.com/Dhwani107/Portfolio_Website/issues)
</div>

---

## 🎨 What's Inside

This portfolio uses some cool tech to make things look and feel nice:

| Technology | Purpose |
| :--- | :--- |
| 🪐 **Next.js** | App Router, static optimizations, and fast page loads |
| 🤖 **React Three Fiber** | 3D interactive hero orb models |
| ✨ **Framer Motion** | Staggered animations, spring physics, and scroll triggers |
| 🔮 **Zustand** | Dynamic state management with local storage persistence |
| 🌠 **Tailwind CSS** | Premium glassmorphism and modern responsive design system |

---

## 🚀 Local Setup Instructions

Follow these steps to run the portfolio website locally on your machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18.x or later is recommended).

### Steps to Run
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dhwani107/Portfolio_Website.git
   cd Portfolio_Website
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view your local portfolio.

### Production Build & Test
To build and test the production-optimized files locally:
```bash
npm run build
npm start
```

---

## 🔒 Admin & Editing Mode

To prevent public visitors from modifying the portfolio content while allowing the site owner to add, edit, or delete items, the website includes an **Admin Lock and Edit Mode**. By default, all modifications are disabled and hidden.

### How to enter Edit Mode:
You can trigger the passcode prompt in three ways:
1. **Logo 5-Clicks:** Click or tap the **"DHWANI CHAUHAN"** logo in the navigation header **5 times** in quick succession.
2. **URL Parameter:** Access the website with a query parameter like `?edit=true` or `?admin=true` (e.g., `http://localhost:3000/?edit=true`).
3. **Footer Lock Icon:** Scroll down to the footer and click the **Admin** lock icon next to the copyright text.

Once the prompt appears, enter your passcode (default is **`admin123`**) to activate editing mode.

### Configuring a Custom Passcode:
To customize this password in your deployment (Vercel, Netlify, etc.) or local setup, configure the following environment variable:
```env
NEXT_PUBLIC_ADMIN_PASSWORD=your_custom_secure_passcode
```

### Logging Out:
To hide all edit/delete/add buttons and secure your portfolio again, click the **LOGOUT ADMIN** button in the navigation header (or mobile drawer menu).

