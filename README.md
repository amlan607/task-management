

# Task Management API

A RESTful API for managing tasks built with Node.js and Express. This project demonstrates REST principles, error handling, and API development best practices.

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-management
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the server**

   ```bash
   node src/index.js
   ```

4. **Verify server is running**

   ```
   ✅ Server running at http://localhost:3000
   ```

## 🛠️ API Endpoints

### Root Endpoint

* **GET /**

  * Returns: API status message
  * Example: `Task Management API is running!`

### Health Check

* **GET /health**

  * Returns: Server health status and uptime
  * Response:

    ```json
    {
      "status": "healthy",
      "uptime": 45.128
    }
    ```

### Tasks Management

#### Get All Tasks

* **GET /tasks**

  * Returns: Array of all tasks
  * Response:

    ```json
    {
      "success": true,
      "data": [
        {
          "id": 1,
          "title": "Learn Node.js",
          "completed": false,
          "priority": "high",
          "createdAt": "2025-01-20T10:30:00.000Z"
        }
      ]
    }
    ```

#### Get Task by ID

* **GET /tasks/:id**

  * Parameters: `id` (integer)
  * Success Response (200):

    ```json
    {
      "success": true,
      "data": {
        "id": 1,
        "title": "Learn Node.js",
        "completed": false,
        "priority": "high",
        "createdAt": "2025-01-20T10:30:00.000Z"
      }
    }
    ```
  * Error Responses:

    * 400: Invalid ID format
    * 404: Task not found

## 📁 Project Structure

```
task-management/
├── src/
│   ├── index.js          # Main server file
│   └── routes/
│       └── tasks.js      # Task routes
├── package.json          # Dependencies and scripts
├── README.md             # Project documentation
└── api-responses.txt     # API test responses
```

## 🧪 Testing with Postman

1. **Start the server**: `node src/index.js`
2. **Open Postman** and test the endpoints:

   * GET `http://localhost:3000/tasks` - Get all tasks
   * GET `http://localhost:3000/tasks/1` - Get task by ID
   * GET `http://localhost:3000/health` - Health check

### Test Cases for Error Handling:

* Valid ID: `/tasks/1` → 200 OK
* Non-existent ID: `/tasks/999` → 404 Not Found
* Invalid ID: `/tasks/abc` → 400 Bad Request
* Negative ID: `/tasks/-1` → 400 Bad Request

## 📝 Features

* ✅ RESTful API design
* ✅ JSON request/response handling
* ✅ Comprehensive error handling
* ✅ In-memory data storage
* ✅ Health check endpoint
* ✅ Task CRUD operations (Create & Retrieve)
* ✅ Input validation
* ✅ Proper HTTP status codes

## 🔧 Dependencies

* express: ^4.18.0
* Node.js built-in modules

## 👨‍💻 Development

This project was developed as part of CSE 362 Web Programming II Lab at Jahangirnagar University.

