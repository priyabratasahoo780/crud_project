# 🚀 Express MongoDB CRUD API

A scalable REST API built with Node.js, Express, MongoDB Atlas, and Mongoose that demonstrates complete CRUD operations.

---

## 📊 Project Status

Backend API for user management with cloud database integration.

---

## 🧰 Tech Stack

| Technology | Purpose |
|------------|---------|
Node.js | Runtime environment |
Express.js | Backend framework |
MongoDB Atlas | Cloud database |
Mongoose | MongoDB object modeling |

---

## ✨ Key Features

- RESTful API architecture
- MongoDB Atlas cloud database
- Full CRUD operations
- Multiple update operations
- Clean and simple backend structure

---

## 📁 Project Structure

express-mongodb-crud
│
├── index.js
├── package.json
└── README.md

---

## ⚙️ Setup Instructions

### Clone Repository

git clone https://github.com/priyabratasahoo780/crud_project.git

### Navigate to Project

cd express-mongodb-crud

### Install Dependencies

npm install

---

## ▶️ Start Server

node index.js

Server runs on

http://localhost:4000

---

## 🔗 MongoDB Atlas Connection

Inside index.js add your MongoDB connection string:

mongoose.connect(
"mongodb+srv://username:password@cluster.mongodb.net/test"
)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|------|------|-------------|
GET | /users | Retrieve all users |
GET | /users/:id | Retrieve user by ID |
POST | /users | Create new user |
PUT | /users/:id | Replace user |
PUT | /users | Replace multiple users |
PATCH | /users/:id | Update user |
PATCH | /users | Update multiple users |
DELETE | /users/:id | Remove user |

---

## 🧪 Example Request

POST /users

{
"name": "Priyabrata",
"age": 22,
"city": "Ahmedabad"
}

---

## 📬 API Testing Tools

Postman  
Thunder Client

---

## 👨‍💻 Author

Priyabrata Sahoo

---

## ⭐ Support

If you found this project helpful:

⭐ Star the repository  
🍴 Fork the project  
📢 Share with others