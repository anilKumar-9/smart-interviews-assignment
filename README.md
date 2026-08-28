# TaskPulse — Full Stack Task Management & Analytics System

A production-ready, full-stack Task Management & Tracking Web Application built with **React**, **Node.js**, **Express.js**, and **MongoDB**. Designed with high visual polish, smooth interactions, live analytics, flexible task filtering, sorting, pagination, and database query optimizations.

---

## 🌐 Live Application Links

- **Frontend (Vercel)**: `https://your-taskpulse.vercel.app` *(Replace with your deployed URL)*
- **Backend API (Render)**: `https://your-task-tracker-backend.onrender.com` *(Replace with your deployed URL)*
- **Deployment Guide**: See [DEPLOYMENT.md](file:///c:/Users/anil3/OneDrive/Documents/smart-interviews-assignment/DEPLOYMENT.md) for step-by-step setup instructions.

---

## 🌟 Key Features

### 1. 🔐 Authentication & Security
- **JWT-Based Authentication**: Secure stateless authentication using JSON Web Tokens.
- **Password Encryption**: Sensitive passwords hashed with `bcryptjs` (salt rounds: 10).
- **Validation**: Strict email regex checks, minimum password lengths, and required field validations.
- **1-Click Demo Login**: Instantly test the platform with seeded sample tasks without manual registration.

### 2. 📋 Comprehensive Task Management
- **Full CRUD Operations**: Create, View, Update, Delete tasks with instant UI feedback.
- **Standardized Task Fields**:
  - `Title`: Task title (with character constraints)
  - `Description`: Markdown/Text details
  - `Status`: `Todo` | `In Progress` | `Done`
  - `Priority`: `Low` | `Medium` | `High`
  - `Due Date`: Deadline picker with quick shortcuts (*Today*, *Tomorrow*, *+3 Days*, *+1 Week*)
- **Quick Status Toggle**: Checkbox and dropdown for instant state progression.

### 3. 🔍 Filtering, Search & Sorting
- **Real-Time Search**: Search through task titles and descriptions with debounced input.
- **Status Filter Chips**: Filter by `All`, `Todo`, `In Progress`, or `Done`.
- **Priority Filter**: Filter by `All`, `High`, `Medium`, or `Low`.
- **Flexible Sorting**: Sort tasks by:
  - Due Date (*Earliest* or *Latest*)
  - Priority (*High to Low*)
  - Created Date (*Newest* or *Oldest*)
  - Title (*A–Z*)

### 4. 📊 Analytics & Insights Dashboard
- **Core Metric Cards**:
  - **Total Tasks**
  - **Completed Tasks**
  - **Pending Tasks** (Todo + In Progress)
  - **Completion Rate (%)**
- **Visual Breakdown Charts**:
  - Multi-segment **Status Distribution** bar
  - **Priority Breakdown** bar chart (High / Medium / Low urgency)
  - **Timeline Indicators**: *Overdue Tasks*, *Due Today*, and *Upcoming in 7 Days*

### 5. 🎨 UI/UX & Product Enhancements
- **Dual View Modes**:
  - 📋 **List View**: Dense table-like layout with status checkboxes and pagination.
  - 📌 **Kanban Board**: Interactive 3-column drag/move board (`To Do`, `In Progress`, `Completed`).
- **🌓 Dark & Light Theme**: Built-in sleek dark mode and clean light mode persisted in `localStorage`.
- **Pagination**: Fully responsive pagination controls with custom items-per-page selector (5, 10, 20).
- **Toast Feedback & Modals**: Micro-animations for confirmations, errors, and task saves.
- **Mobile Responsive**: Adaptive layout with drawer navigation for smartphones and tablets.

### 6. ⚡ Backend Architecture & MongoDB Optimization
- **MongoDB Indexing**: Compound indexes to ensure $O(1)$ to $O(\log N)$ query speed:
  - `{ user: 1, status: 1 }`
  - `{ user: 1, priority: 1 }`
  - `{ user: 1, dueDate: 1 }`
  - `{ user: 1, createdAt: -1 }`
  - Text search index on `{ title: 'text', description: 'text' }`
- **Global Error Handling**: Centralized middleware handling Mongoose validation errors, duplicate keys (11000), cast errors, and JWT expiration.
- **In-Memory MongoDB Fallback**: Allows immediate local evaluation even if local MongoDB server is not running.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Vanilla CSS (Design Tokens & Glassmorphism), Lucide Icons |
| **Backend** | Node.js, Express.js, JSON Web Tokens (JWT), bcryptjs, Morgan |
| **Database** | MongoDB, Mongoose ODM |

---

## 📁 Application Structure

```
smart-interviews-assignment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # MongoDB connection & fallback setup
│   │   ├── controllers/
│   │   │   ├── authController.js      # Auth & user handlers
│   │   │   ├── taskController.js      # Task CRUD, filters, pagination
│   │   │   └── analyticsController.js # Aggregated metrics & breakdowns
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js      # JWT verification middleware
│   │   │   ├── errorMiddleware.js     # 404 & global error handler
│   │   │   └── validateMiddleware.js  # Payload validation
│   │   ├── models/
│   │   │   ├── User.js                # User schema & bcrypt hooks
│   │   │   └── Task.js                # Task schema & compound indexes
│   │   ├── routes/
│   │   │   ├── authRoutes.js          # /api/auth
│   │   │   ├── taskRoutes.js          # /api/tasks
│   │   │   └── analyticsRoutes.js     # /api/analytics
│   │   ├── utils/
│   │   │   └── generateToken.js       # JWT helper
│   │   └── server.js                  # Server entry point
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                # Navbar, Modal, Badge, Toast, Skeleton
│   │   │   ├── analytics/             # StatCard, AnalyticsDashboard
│   │   │   └── tasks/                 # FilterBar, TaskCard, TaskList, KanbanBoard, Pagination, TaskFormModal
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # Auth state provider
│   │   │   └── ThemeContext.jsx       # Theme toggle provider
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   └── TasksPage.jsx
│   │   ├── services/
│   │   │   ├── api.js                 # API client with token interceptor
│   │   │   ├── authService.js
│   │   │   ├── taskService.js
│   │   │   └── analyticsService.js
│   │   ├── styles/
│   │   │   └── index.css              # Design tokens, variables & dark mode
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── README.md
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- *Optional*: Local MongoDB or MongoDB Atlas URI (if not provided, an in-memory database will launch automatically for dev testing).

### 1. Clone & Install Dependencies

Clone repository and install dependencies in both folders:

```bash
# Clone the repository
git clone <repository-url>
cd smart-interviews-assignment

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables Setup

Create a `.env` file in the `backend/` directory (or use default `.env.example`):

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/task_tracker
JWT_SECRET=super_secret_jwt_key_task_tracker_2026_smart_interviews
JWT_EXPIRE=30d
```

### 3. Running the Application

**Terminal 1 — Start Backend Server**:
```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```

**Terminal 2 — Start Frontend Dev Server**:
```bash
cd frontend
npm run dev
# Frontend will run on http://localhost:5173
```

Open **http://localhost:5173** in your web browser!

---

## 📡 REST API Reference

All protected endpoints require the header:  
`Authorization: Bearer <your_jwt_token>`

### 1. Authentication Endpoints

| Method | Endpoint | Description | Body Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user | `{ name, email, password }` |
| `POST` | `/api/auth/login` | Authenticate user & receive token | `{ email, password }` |
| `POST` | `/api/auth/demo` | 1-Click Demo Login with seeded sample tasks | *None* |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | *Headers only* |

### 2. Task Management Endpoints

| Method | Endpoint | Description | Query / Body Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Get filtered, sorted, paginated tasks | `status`, `priority`, `search`, `sort`, `page`, `limit` |
| `POST` | `/api/tasks` | Create a new task | `{ title, description, status, priority, dueDate }` |
| `GET` | `/api/tasks/:id` | Get single task details | Route parameter `:id` |
| `PUT` | `/api/tasks/:id` | Update task details | `{ title, description, status, priority, dueDate }` |
| `PATCH` | `/api/tasks/:id/status` | Quick patch task status | `{ status: "Todo" \| "In Progress" \| "Done" }` |
| `DELETE` | `/api/tasks/:id` | Delete task | Route parameter `:id` |

#### Example Task List Request:
```http
GET /api/tasks?status=In%20Progress&priority=High&search=architecture&sort=dueDate_asc&page=1&limit=10
```

#### Example Task List Response:
```json
{
  "success": true,
  "count": 1,
  "pagination": {
    "totalTasks": 1,
    "totalPages": 1,
    "currentPage": 1,
    "limit": 10,
    "hasNextPage": false,
    "hasPrevPage": false
  },
  "data": [
    {
      "_id": "6720f8c8a1b2c3d4e5f67890",
      "title": "Optimize MongoDB Queries & Indexing",
      "description": "Verify compound indexes on user + status, user + priority, and user + dueDate.",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2026-08-30T10:00:00.000Z",
      "user": "6720f8c8a1b2c3d4e5f67888",
      "createdAt": "2026-08-28T08:00:00.000Z",
      "updatedAt": "2026-08-28T08:00:00.000Z"
    }
  ]
}
```

### 3. Analytics Endpoint

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/analytics` | Returns aggregated metrics, completion %, and status/priority breakdown |

#### Example Analytics Response:
```json
{
  "success": true,
  "data": {
    "totalTasks": 25,
    "completedTasks": 15,
    "pendingTasks": 10,
    "completionPercentage": 60,
    "statusBreakdown": {
      "todo": 4,
      "inProgress": 6,
      "done": 15
    },
    "priorityBreakdown": {
      "high": 8,
      "medium": 12,
      "low": 5
    },
    "timeline": {
      "overdue": 1,
      "dueToday": 2,
      "upcoming": 7
    }
  }
}
```

---

## 🏛️ Design Decisions & Architectural Highlights

1. **Layered Separation of Concerns**:
   - Routes define endpoints and middleware bindings.
   - Controllers isolate business logic and query formation.
   - Models encapsulate schema validation, indexing, and password hashing hooks.
2. **Compound Index Optimization**:
   - Tasks are indexed with compound indexes starting with `user: 1` (`user + status`, `user + priority`, `user + dueDate`) so MongoDB executes index-only seeks rather than scanning collections.
3. **Stateless JWT Authorization**:
   - Authorization headers allow decoupled frontend rendering and smooth scaling across instances without server session storage.
4. **State Management & UX Architecture**:
   - React Context (`AuthContext`, `ThemeContext`, `ToastProvider`) eliminates prop drilling while keeping the footprint lightweight.
   - Debounced search prevents redundant network traffic during fast typing.
   - Dual List and Kanban views cater to different user workflow styles.

---

## 📄 License
This project is open source and available under the [ISC License](LICENSE).
