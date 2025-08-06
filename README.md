# MuseBeat - Music Streaming Application

![MuseBeat](https://img.shields.io/badge/MuseBeat-Music%20Streaming-ff69b4)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A full-featured music player web application built using the MERN stack (MongoDB, Express, React, Node.js) with Tailwind CSS for responsive UI. This project provides users with the ability to browse, play, and manage a playlist of songs in an interactive and visually appealing environment.

## 🎵 Live Demo

[MuseBeat Live Demo](https://music-frontend-7j8o.onrender.com)

## ✨ Features

- **User Authentication**: Secure login and registration system
- **Music Streaming**: Play music with a beautiful audio player interface
- **Playlist Management**: Create, view, and manage personal playlists
- **Song Library**: Browse through a collection of songs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Admin Panel**: Upload and manage songs (admin only)
- **Modern UI**: Built with Tailwind CSS and Shadcn UI components

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Shadcn UI** components
- **Framer Motion** for animations
- **Axios** for API requests
- **Zod** for form validation

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Express File Upload** for handling file uploads
- **Bcrypt** for password hashing
- **Winston** for logging

## 📋 Project Structure

```
├── back-end/                # Backend Node.js application
│   ├── api/                 # API routes
│   ├── controllers/         # Request handlers
│   ├── models/              # Mongoose models
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   └── server.js            # Entry point
│
└── front-end/               # Frontend React application
    ├── public/              # Static assets
    └── src/
        ├── assets/          # Images, fonts, etc.
        ├── components/      # Reusable UI components
        ├── lib/             # Utility functions
        ├── modules/         # Feature modules
        │   ├── components/  # Module-specific components
        │   ├── music/       # Music module
        │   │   ├── api/     # API calls
        │   │   ├── pages/   # Page components
        │   │   └── store/   # State management
        │   └── user/        # User module
        ├── shared/          # Shared components
        └── App.tsx          # Main application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/musebeat.git
   cd musebeat
   ```

2. Install backend dependencies
   ```bash
   cd back-end
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../front-end
   npm install
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/musebeat
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend server
   ```bash
   cd ../back-end
   npm run dev
   ```

6. Start the frontend development server
   ```bash
   cd ../front-end
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:5173`

## 📱 Application Screenshots

*Add screenshots of your application here*

## 🧪 Testing

```bash
# Run backend tests
cd back-end
npm test

# Run frontend tests
cd front-end
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

- **Vivek Suyal** - [GitHub](https://github.com/SuyalVivek/)

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Framer Motion](https://www.framer.com/motion/)
