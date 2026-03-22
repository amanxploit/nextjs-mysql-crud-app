# 🚀 Next.js MySQL CRUD App

A full-stack CRUD application built with Next.js and MySQL.

## 📌 Features

* Create, Read, Update, Delete (CRUD)
* MySQL Database Integration
* API Routes (Next.js App Router)
* Simple UI

## 🛠️ Tech Stack

* Next.js
* MySQL
* Node.js

## ⚙️ Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/your-username/nextjs-mysql-crud-app.git
cd nextjs-mysql-crud-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create `.env.local`

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=testdb
```

### 4. Create Database

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);
```

### 5. Run Project

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

## 📷 Screenshots

(Add your screenshots here)

## 🤝 Contributing

Pull requests are welcome!

## 📜 License

MIT License
