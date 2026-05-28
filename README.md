# Fabrik Mentorship Platform 🚀

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)](https://www.mongodb.com/)

A comprehensive full-stack mentorship portal developed as the final project (**File Rouge**) for the **Fabrikademy** program. This platform bridges the gap between experienced mentors and aspiring learners (aprenants), facilitating knowledge sharing and professional growth.

## 🌟 Key Features

-   **Multi-Role Authentication**: Distinct dashboards and permissions for **Admins**, **Mentors**, and **Learners (Aprenants)**.
-   **Mentor Discovery**: Browse and filter mentors by expertise and skills.
-   **Request Management**: Seamless flow for sending, accepting, and tracking mentorship requests.
-   **Session Tracking**: Schedule and manage mentorship sessions with integrated feedback systems.
-   **Real-time Communication**: Messaging system for direct interaction between mentors and mentees.
-   **Cloud Integration**: Secure image and profile picture management via **Cloudinary**.
-   **Responsive Design**: Modern, mobile-first UI built with **Tailwind CSS** and **Headless UI**.

---

## 🛠️ Tech Stack

### Frontend
-   **Framework**: React (Vite)
-   **Styling**: Tailwind CSS, Animate.css
-   **Icons**: Heroicons, React Icons, FontAwesome
-   **UI Components**: Headless UI, RSuite, Swiper, TW Elements
-   **State Management/Data Fetching**: Axios, js-cookie

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB (via Mongoose)
-   **Authentication**: JWT (JSON Web Tokens), Bcrypt
-   **Media Storage**: Cloudinary, Multer
-   **Communication**: Socket.io / WebSocket

---

## 🚀 Getting Started

### Prerequisites
-   [Node.js](https://nodejs.org/) (v16+ recommended)
-   [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)
-   [Cloudinary Account](https://cloudinary.com/) for image uploads

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/file-rouge.git
    cd file-rouge
    ```

2.  **Server Setup**:
    ```bash
    cd server
    npm install
    ```
    Create a `.env` file in the `server` directory:
    ```env
    PORT=5000
    DBURI=your_mongodb_connection_string
    CLOUDINARY_CLOUD_NAME=your_name
    CLOUDINARY_API_KEY=your_key
    CLOUDINARY_API_SECRET=your_secret
    JWT_SECRET=your_jwt_secret
    ```

3.  **Client Setup**:
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1.  **Start the Backend**:
    ```bash
    cd server
    npm run dev
    ```

2.  **Start the Frontend**:
    ```bash
    cd client
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```text
file-rouge/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # View components
│   │   └── assets/         # Images and styles
├── server/                 # Node.js/Express Backend
│   ├── controllers/        # Business logic
│   ├── models/             # Mongoose schemas
│   ├── routers/            # API endpoints
│   └── middlewares/        # Auth and file handling
```

---

## 🔌 API Overview

### User Routes (`/users`)
- `POST /registration` - Register a new user
- `POST /login` - User login
- `GET /logout` - Clear session cookies

### Mentor Routes (`/mentors`)
- `GET /getMentors` - Fetch all mentors
- `GET /getAMentor/:id` - Get specific mentor details

### Request Routes (`/requests`)
- `POST /createRequest` - Initiate a mentorship request
- `GET /getRequests` - List all requests (Admin/User specific)



