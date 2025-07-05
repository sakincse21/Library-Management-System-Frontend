# 📚 Minimal Library Management System – Frontend

A clean, functional, and fully responsive frontend application for managing a library system. Built with **React**, **TypeScript**, **Redux Toolkit**, and **RTK Query**, this project allows users to manage books, borrow them, and view borrow summaries.

## 🚀 Live Demo

🌐 Frontend: [Library Management Live](https://library-management-system-frontend-beta.vercel.app/)
🔗 Backend: [Live Link](https://l2-b5-assignment3.vercel.app/)
📁 Backend Repo: [Github](https://github.com/sakincse21/L2B5-Assignment3)

---

## 📌 Assignment Overview

This project was developed as part of an assignment to demonstrate:

- REST API integration using **RTK Query**
- State management with **Redux Toolkit**
- **Book and Borrow** management features
- Pagination, forms, validation, and summary

---

## 🎯 Features Implemented

### 📖 Book Management

- View all books in grid with sorting & pagination.
- Add new books using a type-safe form.
- Edit book details with form pre-filled.
- Delete books with confirmation dialog.
- Implemented business logic that If book `copies === 0`, it becomes **Unavailable**.

### 🤝 Borrow Books

- Borrow a book with `quantity` and `due date`.
- Form validation:
  - Quantity cannot exceed available copies.
  - Future dates only.
- After borrowing:
  - Copies decrease.
  - Book may become unavailable if all copies borrowed.
  - Redirect to borrow summary with success message.

### 📊 Borrow Summary

- Aggregated summary showing:
  - Book title, ISBN, and total quantity borrowed.
- Fetched using a backend aggregation endpoint.

---

## 🧭 Routing Pages

| Route               | Description            |
| ------------------- | ---------------------- |
| `/books`          | Book list with actions |
| `/create-book`    | Add a new book         |
| `/books/:id`      | Book detail view       |
| `/edit-book/:id`  | Edit a book            |
| `/borrow/:bookId` | Borrow a book          |
| `/borrow-summary` | View borrow summary    |

---

## 🧰 Tech Stack

| Layer            | Technology                                      |
| ---------------- | ----------------------------------------------- |
| Frontend         | React + TypeScript                              |
| State Management | Redux Toolkit + RTK Query                       |
| Forms            | React Hook Form + Zod                           |
| API              | RESTful API (Node + Express + MongoDB/Mongoose) |
| Styling          | Tailwind CSS                                    |
| Notifications    | sonner (toast notifications)                    |

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- Backend API running and accessible

### Install Dependencies

```bash
npm install --force
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
