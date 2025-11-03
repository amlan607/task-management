# Task Management API – CSE 362 Lab 01

**Amlan Dutta Rahul**

**Roll: 360**

**Jahangirnagar University**

**Department of Computer Science and Engineering**

**3rd Year, 2nd Semester 2024**

**CSE 362 – Web Programming II LAB**

**Overview**

A simple REST API built with Node.js and Express for managing tasks.
This project is part of **Assignment 7**, which requires creating a README containing project setup instructions and listing all available API endpoints.

---

##  Requirements

* Node.js (v18+ recommended)
* npm (comes with Node)
* Git (optional, for cloning)

---

##  Setup Instructions

Clone the repository (or download ZIP):

```bash
git clone https://github.com/amlan607/task-management.git
cd task-management
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

If successful, you should see:

```
Server running at http://localhost:3000
```

---

##  Available API Endpoints

| Method | Endpoint    | Description                          |
| ------ | ----------- | ------------------------------------ |
| GET    | `/`         | Returns welcome message              |
| GET    | `/health`   | Returns API health status and uptime |
| GET    | `/tasks`    | Returns list of all tasks            |
| GET    | `/task/:id` | Returns a single task by ID          |
| GET    | `/task/abc` | Returns `400` (invalid ID format)    |
| GET    | `/task/999` | Returns `404` (task not found)       |

---

##  Example Test Commands

```bash
curl http://localhost:3000/
curl http://localhost:3000/health
curl http://localhost:3000/tasks
curl http://localhost:3000/task/1
curl http://localhost:3000/task/abc     # should return 400
curl http://localhost:3000/task/999     # should return 404
```

---

##  Project Structure

```
task-management/
├─ src/
│  ├─ index.js
│  └─ routes/
│     └─ tasks.js
├─ package.json
├─ .gitignore
├─ tasks-response.json
├─ api-responses.txt
└─ README.md
```

---

##  Notes

* `createdAt` fields are stored in the code as `Date` objects.
* When returned as JSON, they appear as ISO date strings.
* This project uses CommonJS modules (`require` instead of `import`).

---


