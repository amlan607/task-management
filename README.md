

````markdown
# Task Management API – CSE 362 Lab 02

**Amlan Dutta Rahul**  
**Roll: 360**  
**Jahangirnagar University**  
**Department of Computer Science and Engineering**  
**3rd Year, 2nd Semester 2025**  
**CSE 362 – Web Programming II LAB**

---

## Overview

A simple REST API built with Node.js and Express for managing tasks.  
This project demonstrates **Assignment 5** requirements, focusing on **error handling** for task retrieval and API endpoint responses.

---

## Requirements

* Node.js (v18+ recommended)  
* npm (comes with Node)  
* Git (optional, for cloning)

---

## Setup Instructions

Clone the repository (or download ZIP):

```bash
git clone https://github.com/amlan607/task-management.git
cd task-management
````

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

## Available API Endpoints

| Method | Endpoint        | Description                          |
| ------ | --------------- | ------------------------------------ |
| GET    | `/`             | Returns welcome message              |
| GET    | `/health`       | Returns API health status and uptime |
| GET    | `/tasks`        | Returns list of all tasks            |
| GET    | `/tasks/:id`    | Returns a single task by ID          |
| GET    | `/tasks/abc`    | Returns `400` (invalid ID format)    |
| GET    | `/tasks/-1`     | Returns `400` (invalid ID format)    |
| GET    | `/tasks/1a`     | Returns `400` (invalid ID format)    |
| GET    | `/tasks/2.5`    | Returns `400` (invalid ID format)    |
| GET    | `/tasks/999`    | Returns `404` (task not found)       |
| GET    | `/tasks/999999` | Returns `404` (task not found)       |

---

## Example Test Commands

```bash
curl http://localhost:3000/
curl http://localhost:3000/health
curl http://localhost:3000/tasks
curl http://localhost:3000/tasks/1
curl http://localhost:3000/tasks/abc    # should return 400
curl http://localhost:3000/tasks/-1     # should return 400
curl http://localhost:3000/tasks/1a     # should return 400
curl http://localhost:3000/tasks/2.5    # should return 400
curl http://localhost:3000/tasks/999    # should return 404
curl http://localhost:3000/tasks/999999 # should return 404
```

---

## Project Structure

```
task-management/
├─ src/
│  ├─ index.js
│  └─ routes/
│     └─ tasks.js
├─ package.json
├─ .gitignore
├─ api-responses.txt
└─ README.md
```

---

## Notes

* All `createdAt` fields are stored as JavaScript `Date` objects.
* When returned as JSON, they appear as ISO date strings.
* API uses CommonJS modules (`require`) instead of ES modules (`import`).
* Error handling covers all edge cases as per Assignment 5 requirements.
* API follows RESTful design principles.

```

```
