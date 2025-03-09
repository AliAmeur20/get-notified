# GetNotified 🚀

GetNotified is a robust web application built on the **MERN stack** (MongoDB, Express, React, Node.js) designed to provide efficient alerts, notifications, and messaging using **RabbitMQ**. Developed as part of my master’s graduation project, this application showcases a seamless integration of real-time communication and a clean, responsive user interface.

---

## Features ✨

- **Real-Time Notifications**: Powered by RabbitMQ for reliable and scalable messaging.
- **User Authentication**: Secure login and signup system.
- **Responsive UI**: Built with **React-Bootstrap** and **SCSS** for a modern and clean design.
- **Data Management**: Uses **Mongoose** for efficient database operations.
- **Scalable Architecture**: Designed to handle high volumes of notifications and messages.

---

## Screenshots 📸

Here are some screenshots of the application:

### Landing Page
![Landing Page](./screenshots/landing-page.png)  

### Login Page
![Login Page](./screenshots/login-page.png)  

### Signup Page
![Signup Page](./screenshots/signup-page.png)  

### Dashboard
![Dashboard](./screenshots/dashboard.png)  

---

## Technologies Used 🛠️

- **Frontend**: React, React-Bootstrap, SCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Messaging**: RabbitMQ
- **DevOps**: NPM, Git

---

## Installation 🚀

To run this project locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/AliAmeur20/get-notified.git
cd get-notified
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the React Application
```bash
npm start
```

### 4. Ensure RabbitMQ is Running

Make sure RabbitMQ is installed and running on your machine. You can download it from here.

### 5. Run the API Server

Navigate to the get-notified-api directory and start the server:
```bash
cd get-notified-api
npm install
npm start
```

---

## Configuration ⚙️

Before running the application, ensure the following environment variables are set:

### Required Environment Variables

- `MONGO_URI`: Your MongoDB connection string.
- `RABBITMQ_URL`: Your RabbitMQ server URL.
- `JWT_SECRET`: A secret key for JSON Web Token (JWT) authentication.

### Steps to Configure

1. Create a `.env` file in the root directory of your project.
2. Add the following variables to the `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/getnotified
RABBITMQ_URL=amqp://localhost
JWT_SECRET=your_jwt_secret_key
```

___

## How It Works 🧠

- **User Authentication**: Users can sign up and log in securely using JWT-based authentication.
- **Real-Time Messaging**: RabbitMQ handles message queues for notifications and alerts.
- **Database Management**: Mongoose interacts with MongoDB to store and retrieve user and notification data.
- **Frontend**: React-Bootstrap and SCSS ensure a responsive and visually appealing interface.

___

## Future Enhancements 🔮

- **Push Notifications**: Integrate with Firebase or similar services for push notifications.
- **Email Notifications**: Add email alerts for important updates.
- **Analytics Dashboard**: Add a dashboard for tracking notification metrics.

___

## Contributing 🤝

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (``` bash git checkout -b feature/YourFeatureName ```).
3. Commit your changes (``` bash git commit -m 'Add some feature' ```).
4. Push to the branch (``` bash git push origin feature/YourFeatureName ```).
5. Open a pull request.

___

## Acknowledgments 🙏

- **RabbitMQ**: For providing a reliable messaging system.
- **React-Bootstrap**: For making UI development faster and easier.
- **Mongoose**: For simplifying MongoDB interactions.
  
___

## Contact 📧

For any questions or feedback, feel free to reach out:

Email: aa8414952@gmail.com

GitHub: AliAmeur20

LinkedIn: Ali Ameur

___

Made with ❤️ by Ali Ameur

🎓 Master’s Graduation Project
