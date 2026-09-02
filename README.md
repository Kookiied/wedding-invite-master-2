# 💍 Royal E-Invite Master - Wedding Invitation Website

A luxury, interactive digital wedding invitation web application built with **React**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Firebase**. Designed to offer a premium experience for wedding guests and easy showcase/customization for clients.

---

## ✨ Key Features

- ✉️ **Interactive Velvet Envelope Opening** - Elegant unboxing animation for guests.
- 🎵 **Floating Music Player** - Background ambient music toggle with smooth audio control.
- ⏳ **Live Countdown Timer** - Real-time countdown to the wedding day.
- 📅 **Event Timeline & Schedules** - Visual timeline for Sangeet, Haldi, Wedding, & Reception.
- 📍 **Venue Map & Travel Details** - Direct Google Maps navigation buttons.
- 💌 **Digital RSVP System** - Guest RSVP form with dietary preferences, guest count, and ID proof upload.
- 💾 **Dual Storage System (Zero Breakage)**:
  - **Firebase Cloud Firestore** (when credentials are provided).
  - **Automatic LocalStorage Fallback** (works instantly out-of-the-box without keys).
- 📊 **Admin RSVP Dashboard & CSV Export** - View guest submissions in real time and download as an Excel-compatible CSV.
- 📱 **100% Mobile Responsive & Animated** - Optimized for mobile browsers (WhatsApp share friendly).

---

## 🚀 Quick Start (Local Setup)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Local Development Server**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Build for Production**
   ```bash
   npm run build
   ```

---

## 🔒 Environment Variables & Database Setup (Optional)

The application works completely out-of-the-box using local storage. To save guest RSVPs to Cloud Firestore across multiple devices:

1. Create a `.env` file in the root directory (refer to `.env.example`).
2. Add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

---

## 🌐 Deploying to Vercel (Shareable Link)

1. Push this project to GitHub.
2. Sign in to [Vercel](https://vercel.com).
3. Click **Add New Project** and import your GitHub repository.
4. (Optional) Add your Firebase variables under **Environment Variables**.
5. Click **Deploy**. Vercel will build the app and give you a live shareable URL (e.g., `https://your-wedding-invite.vercel.app`).

---

## 📄 License
Customizable commercial digital invite template.
