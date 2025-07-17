# TeamTask Frontend

> Streamline Team Collaboration with Intuitive Task Management

![Build](https://img.shields.io/badge/Build-passing-brightgreen) ![Version](https://img.shields.io/badge/Version-1.0.0-blue)

## 📝 Description
A modern, responsive frontend for a collaborative task management application, built with Next.js and Redux Toolkit.

## ✨ Features
- User Authentication (Login, Registration, Logout)
- Role-Based Access Control (Manager and User roles)
- Comprehensive Task Management (Create, View, Edit, Delete tasks)
- Task Assignment and Status Tracking (To Do, In Progress, Completed)
- Responsive User Interface with Tailwind CSS
- Centralized State Management with Redux Toolkit

## 🛠️ Tech Stack
- Next.js
- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Axios

## ⚙️ Installation
### Requirements
- Node.js (v18+ recommended)
- npm or yarn

### Steps
Clone the repository: `git clone https://github.com/ademNr/teamtask-front.git`
Navigate to the project directory: `cd teamtask-front`
Install dependencies: `npm install` or `yarn install`
Start the development server: `npm run dev` or `yarn dev`

## 🚀 Usage
### Basic
Navigate to `http://localhost:3000` (or your deployed URL). You will be redirected to the login page. Register a new account or log in with existing credentials. Upon successful login, you will be directed to the dashboard to view your tasks.

### Advanced
If logged in as a 'manager' role, you can create new tasks via the 'Create New Task' button on the dashboard or by navigating to `/tasks/new`. Managers can assign tasks to any user and update task details. All users can view task details and update the status of tasks assigned to them.

## 🌐 API Reference

### `POST https://teamtask-backend.vercel.app/api/auth/login`
Authenticates a user and returns a JWT token and user details.

**Parameters:**
- `email` (string) [required]: 
- `password` (string) [required]: 

**Example:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "password123"}' https://teamtask-backend.vercel.app/api/auth/login
```


### `POST https://teamtask-backend.vercel.app/api/auth/register`
Registers a new user with specified role.

**Parameters:**
- `name` (string) [required]: 
- `email` (string) [required]: 
- `password` (string) [required]: 
- `role` (string) [required]: e.g., 'user' or 'manager'

**Example:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com", "password": "securepass", "role": "user"}' https://teamtask-backend.vercel.app/api/auth/register
```


### `GET https://teamtask-backend.vercel.app/api/tasks`
Retrieves all tasks visible to the authenticated user.

**Parameters:**


**Example:**
```bash
curl -H "Authorization: Bearer <your_jwt_token>" https://teamtask-backend.vercel.app/api/tasks
```


### `POST https://teamtask-backend.vercel.app/api/tasks`
Creates a new task (manager role required).

**Parameters:**
- `title` (string) [required]: 
- `description` (string): 
- `assignedTo` (string) [required]: User ID to assign the task to

**Example:**
```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d '{"title": "Implement User Profile", "description": "Add profile editing features.", "assignedTo": "65e7b0e1a1b2c3d4e5f6a7b8"}' https://teamtask-backend.vercel.app/api/tasks
```


### `PUT https://teamtask-backend.vercel.app/api/tasks/:id`
Updates an existing task by ID.

**Parameters:**
- `id` (string) [required]: The ID of the task to update
- `title` (string): 
- `description` (string): 
- `assignedTo` (string): 
- `status` (string): e.g., 'à faire', 'en cours', 'terminée'

**Example:**
```bash
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d '{"status": "terminée"}' https://teamtask-backend.vercel.app/api/tasks/65e7b0e1a1b2c3d4e5f6a7b9
```


## 📂 File Structure
- `app/`: Next.js App Router directory containing pages, layouts, and global error handling.
- `components/`: Reusable React components, including UI elements and domain-specific components like TaskForm and TaskList.
- `features/`: Redux Toolkit slices and services for managing application state and interacting with the API (e.g., authentication, tasks, users).
- `lib/`: Core utility files, including Redux store configuration, custom hooks, and Axios instance for API calls.
- `types/`: TypeScript type definitions for data models used throughout the application.

## 🤝 Contributing
### Setup
Fork the repository, clone it locally, and follow the installation steps. Ensure you have Node.js and npm/yarn installed.

### Guidelines
Follow existing code style. Use clear, descriptive commit messages. Ensure all new features have corresponding tests (if applicable).

### Process
Create a new branch for your feature or bug fix. Submit a pull request to the `main` branch with a clear description of your changes.

## 📜 License
This project is licensed under the MIT License.

## 👤 Author
ademNr
