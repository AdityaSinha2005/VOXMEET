# 🎥 VoxMeet

A full-stack real-time video conferencing application built using React.js, Node.js, Express.js, MongoDB, Socket.IO, and WebRTC. VoxMeet enables users to securely join meetings, communicate through video and chat, share their screen, and manage meeting history with a responsive user interface.

---

## 🚀 Live Demo

https://voxmeet-frontend.onrender.com/

---


## ✨ Features

- 🎥 Real-time video conferencing
- 💬 Real-time chat
- 🖥️ Screen sharing
- 🔐 Token-based Authentication
- 📜 Meeting history
- 📱 Responsive UI
- 🎤 Camera & microphone controls
- 📞 Join meetings using a meeting code

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Material UI
- CSS Modules
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Real-Time Communication
- WebRTC
- Socket.IO

### Authentication
- Token-based Authentication

---

## 📂 Project Structure

```text
VOXMEET
│
├── frontend
├── backend
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/AdityaSinha2005/VOXMEET.git
cd VOXMEET
```

### Install Backend

```bash
cd backend
npm install
```

### Install Frontend

```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8000
```

---

## ▶️ Run Backend

```bash
cd backend
npm start
```

---

## ▶️ Run Frontend

```bash
cd frontend
npm start
```

---

## 📸 Application Flow

```text
User
   │
   ▼
Landing Page
   │
   ▼
Authentication
   │
   ▼
Home Dashboard
   │
   ▼
Join Meeting
   │
   ▼
Socket.IO Signaling
   │
   ▼
WebRTC Peer Connection
   │
   ▼
Video Conference
   ├── Video
   ├── Audio
   ├── Chat
   ├── Screen Share
   └── Meeting History
```

---

⭐ **If you found this project useful, consider giving it a Star!**