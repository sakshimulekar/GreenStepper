# GreenSteps – Eco-Habit Logger & Impact Tracker

A full-stack MERN application that helps users track their eco-friendly habits and visualize their environmental impact.

## Features

- 🔐 Secure authentication system
- 📱 Daily eco-habit logging
- 📊 Environmental impact tracking
- 🏆 Gamification with badges and streaks
- 🌍 Global community statistics
- 📈 Data visualization with charts

## Tech Stack

- **Frontend**: React.js, Material-UI, Chart.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **State Management**: Redux Toolkit

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/greensteps.git
cd greensteps
```

2. Install dependencies:
```bash
npm run install-all
```

3. Create a `.env` file in the server directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
greensteps/
├── client/                 # React frontend
├── server/                 # Node.js backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── middleware/        # Custom middleware
└── package.json           # Root package.json
```

## Features in Detail

### Authentication
- Secure user registration and login
- JWT-based authentication
- Protected routes

### Eco-Habit Logging
- Predefined list of eco-friendly habits
- Daily habit tracking
- Optional notes for each entry
- One submission per day limit

### Impact Tracking
- Eco-points system
- Streak tracking
- Badge achievements
- Environmental impact visualization

### Community Features
- Global statistics
- Community impact metrics
- Anonymous leaderboard

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 