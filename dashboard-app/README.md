# 📊 PulseSaaS – Analytics Dashboard

A modern and responsive **SaaS Analytics Dashboard** built with **React.js**, **Tailwind CSS**, **Recharts**, and **Lucide React**.

The dashboard provides an interactive interface for monitoring business performance, revenue, orders, customers, products, and analytics through charts, filters, tables, and KPI cards.

---

## 🚀 Live Demo

🔗 **Live Demo:** `Add your deployed link here`

## 📂 GitHub Repository

🔗 **GitHub:** `Add your GitHub repository link here`

---

## ✨ Features

### 📈 Dashboard Overview

- Total Users KPI
- Total Revenue KPI
- Total Orders KPI
- Conversion Rate KPI
- Percentage growth indicators
- Interactive sparkline charts
- Loading skeleton animations

### 📊 Interactive Charts

Built using **Recharts**:

- Monthly Revenue Line Chart
- Top Products Bar Chart
- Traffic Sources Donut Chart
- Daily Active Users Area Chart
- Interactive chart selections
- Hover tooltips
- Dynamic chart highlighting

### 🔍 Filtering System

Users can filter dashboard data using:

- Last 7 Days
- Last 30 Days
- Last 90 Days
- Custom Date Range
- Product Category
- Selected Month
- Selected Product
- Traffic Source
- Search Query

Active filters are displayed as removable badges.

### 📋 Transaction Management

The dashboard includes a complete transaction table with:

- Customer name
- Product
- Transaction date
- Amount
- Status
- Category
- Search functionality
- Sorting
- Pagination
- Mobile card layout

### 📤 CSV Export

Users can export filtered transaction data as a `.csv` file directly from the dashboard.

### 🛍️ Product Management

The Products section displays:

- Product name
- Product category
- Total sales
- Stock count

### 👥 Customer Directory

The Customers section provides:

- Customer names
- Email addresses
- Customer lifetime values
- Customer list interface

### 📦 Orders Management

The Orders page displays:

- Total orders
- Completed orders
- Pending orders
- Failed orders

### ⚙️ Settings

The Settings section contains:

- Admin profile information
- Name and email fields
- Dashboard preferences
- Automatic chart refresh preference
- Weekly email summary preference

---

## 🛠️ Technologies Used

| Technology            | Purpose                       |
| --------------------- | ----------------------------- |
| **React.js**          | Frontend UI development       |
| **Tailwind CSS**      | Styling and responsive layout |
| **Recharts**          | Data visualization            |
| **Lucide React**      | Icons                         |
| **JavaScript (ES6+)** | Application logic             |
| **Vite**              | Development and build tool    |

---

## ⚛️ React Concepts Used

This project helped implement several important React concepts:

- Functional Components
- `useState`
- `useEffect`
- `useMemo`
- Event Handling
- Conditional Rendering
- Array `.map()`
- Filtering and Sorting
- Pagination
- Dynamic UI updates
- Component-based architecture

### Example

```jsx
const [activeTab, setActiveTab] = useState("Dashboard");
```

The `useState` hook is used to control the currently active dashboard section.

---

## 📊 Dashboard Sections

The application contains the following main sections:

```text
Dashboard
├── KPI Cards
├── Monthly Revenue
├── Top Products
├── Traffic Sources
├── Daily Active Users
└── Recent Transactions

Analytics
├── Average Order Value
├── Customer LTV
├── Retention Rate
└── Funnel Visualization

Orders
├── Completed
├── Pending
└── Failed

Products
├── Product Categories
├── Sales
└── Stock

Customers
├── Customer Directory
└── Lifetime Value

Settings
├── Admin Profile
└── Dashboard Preferences
```

---

## 📱 Responsive Design

The dashboard is designed to work across different screen sizes.

### Desktop

- Sidebar navigation
- Full transaction table
- Multi-column dashboard layout
- Interactive charts

### Tablet

- Adaptive grid layouts
- Responsive cards
- Flexible content sections

### Mobile

- Collapsible sidebar
- Mobile navigation menu
- Transaction cards instead of table
- Responsive charts
- Mobile-friendly filters

---

## 🎨 UI Features

The dashboard uses a clean SaaS-style interface with:

- Modern card-based layout
- Indigo-based accent design
- Rounded components
- Subtle shadows
- Hover effects
- Loading skeletons
- Status badges
- Responsive navigation
- Interactive filters
- Smooth transitions
- Lucide icons

---

## 📁 Project Structure

A typical project structure:

```text
dashboard-app/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project

```bash
cd dashboard-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will run locally using the Vite development server.

---

## 📦 Required Packages

If these packages are not already installed:

```bash
npm install recharts lucide-react
```

Tailwind CSS should also be configured in the project.

---

## 🧪 Sample Data

This project currently uses **mock/static data** for demonstration purposes.

The dashboard includes sample data for:

- Users
- Revenue
- Orders
- Products
- Customers
- Traffic sources
- Transactions

No external database or backend API is currently connected.

---

## 🔮 Future Improvements

Possible future enhancements include:

- 🔐 Authentication and authorization
- 🗄️ Backend API integration
- 💾 Database integration
- 📡 Real-time analytics
- 👤 User profile management
- 🔔 Functional notification system
- 🌙 Dark mode
- 📊 More advanced analytics
- 📥 PDF report generation
- 🔄 Real-time chart updates
- 🛒 Complete order management
- 📦 Inventory management
- ☁️ Cloud deployment

---

## 🎯 Project Purpose

This project was created to practice building a **real-world React dashboard interface** with interactive data visualization, filtering, sorting, pagination, responsive layouts, and reusable UI patterns.

It demonstrates how React can be used to create modern admin panels and SaaS-style applications.

---

## 💡 Key Learning Outcomes

Through this project, I practiced:

- Building dashboards using React
- Managing state with React Hooks
- Creating interactive charts
- Working with arrays and objects
- Implementing search and filtering
- Implementing sorting and pagination
- Creating responsive layouts
- Exporting data to CSV
- Designing reusable UI components
- Building a professional SaaS-style interface

---

## 👩‍💻 Author

**Nisha Kumari**

🎓 BCA Student
💻 Aspiring Full Stack Developer

### Connect With Me

- GitHub: `Add your GitHub profile link`
- LinkedIn: `Add your LinkedIn profile link`

---

## ⭐ Show Your Support

If you found this project useful or interesting, consider giving the repository a ⭐ on GitHub!

---

## 📄 License

This project is created for **learning, practice, and portfolio purposes**.
