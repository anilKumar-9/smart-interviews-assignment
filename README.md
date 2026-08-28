# TaskPulse — Full Stack Task Management & Analytics System

A production-ready, full-stack Task Management & Tracking Web Application built with **React**, **Node.js (ES6)**, **Express.js**, and **MongoDB**. Designed with an electric **Cyber Yellow & Black** theme, glassmorphism aesthetics, live analytics, flexible task filtering, sorting, pagination, and database query optimizations.

---

## 🌐 Live Application Links

- **Frontend (Vercel)**: [https://frontend-b2uo.vercel.app/](https://frontend-b2uo.vercel.app/)
- **Backend API (Render)**: [https://smart-interviews-assignment.onrender.com/](https://smart-interviews-assignment.onrender.com/)
- **API Health Check**: [https://smart-interviews-assignment.onrender.com/api/health](https://smart-interviews-assignment.onrender.com/api/health)
- **Deployment Guide**: See [DEPLOYMENT.md](file:///c:/Users/anil3/OneDrive/Documents/smart-interviews-assignment/DEPLOYMENT.md) for full setup instructions.

---

## 🌟 Key Features

### 1. 🔐 Authentication & Security
- **JWT-Based Authentication**: Secure stateless authentication using JSON Web Tokens.
- **Password Encryption**: Sensitive passwords hashed with `bcryptjs` (salt rounds: 10).
- **Validation**: Strict email regex checks, minimum password lengths, and required field validations.
- **1-Click Demo Login**: Instantly explore the application with seeded sample tasks without manual registration.

### 2. 📋 Comprehensive Task Management
- **Full CRUD Operations**: Create, View, Update, Delete tasks with instant UI feedback.
- **Standardized Task Fields**:
  - `Title`: Task title (with character constraints)
  - `Description`: Details / Markdown notes
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
- **Cyber Yellow & Black Theme**: High-contrast, futuristic dark mode aesthetic with vibrant amber/yellow accents.
- **Dual View Modes**:
  - 📋 **List View**: Dense table-like layout with status checkboxes and pagination.
  - 📌 **Kanban Board**: Interactive 3-column drag/move board (`To Do`, `In Progress`, `Completed`).
- **🌓 Dark & Light Theme**: Built-in sleek dark mode and clean light mode persisted in `localStorage`.
- **Pagination**: Fully responsive pagination controls with custom items-per-page selector (5, 10, 20).
- **Toast Feedback & Modals**: Micro-animations for confirmations, errors, and task saves.
- **Mobile Responsive**: Adaptive layout with drawer navigation for smartphones and tablets.

### 6. ⚡ Backend Architecture & MongoDB Optimization
- **ES6 Modules**: Full codebase written in modern ES6 (`import` / `export`).
- **MongoDB Compound Indexing**: Compound indexes to ensure $O(1)$ to $O(\log N)$ query speed:
  - `{ user: 1, status: 1 }`
  - `{ user: 1, priority: 1 }`
  - `{ user: 1, dueDate: 1 }`
  - `{ user: 1, createdAt: -1 }`
  - Text search index on `{ title: 'text', description: 'text' }`
- **Global Error Handling**: Centralized middleware handling Mongoose validation errors, duplicate keys (11000), cast errors, and JWT expiration.
- **Dual Path Routing**: API routes mapped to both `/api/*` and `/*` for seamless client compatibility.
- **In-Memory MongoDB Fallback**: Allows immediate local evaluation even if local MongoDB server is not running.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Vanilla CSS (Design Tokens & Glassmorphism), Lucide Icons |
| **Backend** | Node.js (ES6 Modules), Express.js, JSON Web Tokens (JWT), bcryptjs, Morgan, CORS |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Hosting** | Vercel (Frontend), Render (Backend Web Service) |

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
│   │   │   ├── authRoutes.js          # /api/auth and /auth
│   │   │   ├── taskRoutes.js          # /api/tasks and /tasks
│   │   │   └── analyticsRoutes.js     # /api/analytics and /analytics
│   │   ├── utils/
│   │   │   └── generateToken.js       # JWT helper
│   │   └── server.js                  # Express main server entry point
│   ├── .env.example
│   ├── test_api.js                    # Automated API test suite
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
│   │   │   └── index.css              # Yellow & Black theme tokens & variables
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json                    # Vercel SPA routing rewrite
│   └── package.json
│
├── DEPLOYMENT.md                      # Complete Render & Vercel deployment guide
├── README.md                          # Main project documentation
└── package.json                       # Root script orchestrator
```

---

## 🚀 Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- *Optional*: Local MongoDB or MongoDB Atlas URI (if omitted, an in-memory database will launch automatically for dev testing).

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/anilKumar-9/smart-interviews-assignment.git
cd smart-interviews-assignment

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables Setup

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/task_tracker?retryWrites=true&w=majority
JWT_SECRET=super_secret_jwt_key_task_tracker_2026_smart_interviews
JWT_EXPIRE=30d
CLIENT_URL=https://frontend-b2uo.vercel.app
```

### 3. Running the Application Locally

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
| `POST` | `/api/auth/signup` *(or `/auth/signup`)* | Register a new user | `{ name, email, password }` |
| `POST` | `/api/auth/login` *(or `/auth/login`)* | Authenticate user & receive token | `{ email, password }` |
| `POST` | `/api/auth/demo` *(or `/auth/demo`)* | 1-Click Demo Login with seeded sample tasks | *None* |
| `GET` | `/api/auth/me` *(or `/auth/me`)* | Fetch authenticated user profile | *Headers only* |

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
| `GET` | `/api/analytics` *(or `/analytics`)* | Returns aggregated metrics, completion %, and status/priority breakdown |

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
