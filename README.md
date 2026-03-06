# 🍱 FoodSync

> **Bridging the gap between food surplus and food insecurity — one donation at a time.**

FoodSync is a full-stack MERN application that connects restaurants with food banks to combat food waste. Restaurants post surplus food listings in real time, and food banks place orders to receive them — reducing waste and feeding communities.

---

## 📸 Overview

| Role | Capabilities |
|------|-------------|
| 🍽️ **Restaurant** | Post food listings, manage donations, view dashboard metrics, compete on leaderboard |
| 🏦 **Food Bank** | Browse listings, place orders, leave reviews, receive email confirmations |

---

## ✨ Features

- **🔐 Authentication & Role-Based Access** — Google Sign-In via Firebase with role-specific dashboards and protected routes for restaurants and food banks
- **⚡ Real-Time Listings** — WebSocket integration for live food post creation and order placement without page refresh
- **📊 Analytics Dashboard** — Visual metrics tracking total donations, food categories, order history, and impact over time
- **🏆 Leaderboard** — Competitive ranking system motivating restaurants to maximize their donation contributions
- **⭐ Review System** — Food banks can rate and review food quality and service from restaurants
- **📧 Email Notifications** — Automated transactional emails via Nodemailer for order confirmations and status updates
- **🤖 AI Navigation Chatbot** — Gemini API-powered chatbot to assist users in navigating the platform
- **📱 Responsive UI** — Clean, modular React component architecture optimized for all screen sizes

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

### Services & Deployment
![Google Gemini](https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-0F9DCE?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB Atlas account (or local MongoDB instance)
- Firebase project with Google Sign-In enabled
- Google Gemini API key
- Gmail account for Nodemailer (or SMTP credentials)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/foodsync.git
cd foodsync
```

**2. Install dependencies**

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

**3. Configure environment variables**

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Nodemailer
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**4. Run the application**

```bash
# Start the backend server
cd backend
npm run dev

# In a separate terminal, start the frontend
cd frontend
npm run dev
```

The app will be running at **http://localhost:5173**

---

## 📁 Project Structure

```
foodsync/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Role-based page views
│   │   ├── context/          # Auth & global state
│   │   ├── hooks/            # Custom React hooks
│   │   └── utils/            # Helper functions
│   └── .env
├── backend/
│   ├── controllers/          # Route handler logic
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Express API routes
│   ├── middleware/           # Auth & role guards
│   ├── socket/               # WebSocket event handlers
│   └── .env
└── README.md
```

---

## 🌐 Deployment

The application is deployed on **Vercel** (frontend) with the backend hosted separately on Render.

Live Demo: [foodsync.vercel.app](https://food-sync.vercel.app) 

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👤 Author

**Talha Rehan**  
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/your-username)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)

---

> *"The best way to find yourself is to lose yourself in the service of others."* — Built with purpose. 🌱
