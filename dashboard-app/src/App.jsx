import React, { useState, useMemo, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  LayoutDashboard,
  BarChart3,
  ShoppingBag,
  Package,
  Users,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  DollarSign,
  UserCheck,
  ShoppingCart,
  Activity,
  Calendar,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  SlidersHorizontal,
  XCircle,
  Layers,
  Sparkles,
  PieChart as PieIcon,
  Shield,
  CreditCard,
  User,
  ExternalLink,
} from "lucide-react";

const MONTHLY_REVENUE_DATA = [
  { month: "Jan", revenue: 42000, orders: 1200, users: 18500 },
  { month: "Feb", revenue: 48500, orders: 1350, users: 19200 },
  { month: "Mar", revenue: 53000, orders: 1500, users: 20100 },
  { month: "Apr", revenue: 51200, orders: 1420, users: 20800 },
  { month: "May", revenue: 64000, orders: 1780, users: 21900 },
  { month: "Jun", revenue: 69500, orders: 1910, users: 22600 },
  { month: "Jul", revenue: 73000, orders: 2040, users: 23200 },
  { month: "Aug", revenue: 71800, orders: 1980, users: 23800 },
  { month: "Sep", revenue: 78200, orders: 2150, users: 24100 },
  { month: "Oct", revenue: 81500, orders: 2280, users: 24500 },
  { month: "Nov", revenue: 84320, orders: 2390, users: 24892 },
  { month: "Dec", revenue: 91000, orders: 2550, users: 25600 },
];

const TOP_PRODUCTS_DATA = [
  {
    name: "Wireless Headphones",
    sales: 34200,
    category: "Electronics",
    count: 412,
  },
  { name: "Smart Watch", sales: 28900, category: "Electronics", count: 289 },
  { name: "Laptop Stand", sales: 19400, category: "Accessories", count: 640 },
  {
    name: "Mechanical Keyboard",
    sales: 16800,
    category: "Electronics",
    count: 210,
  },
  { name: "USB-C Hub", sales: 12500, category: "Accessories", count: 350 },
];

const TRAFFIC_SOURCES_DATA = [
  { name: "Organic", value: 42, color: "#4F46E5" },
  { name: "Direct", value: 28, color: "#06B6D4" },
  { name: "Social", value: 18, color: "#10B981" },
  { name: "Referral", value: 12, color: "#F59E0B" },
];

const DAILY_USERS_DATA = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const baseValue = 18000 + Math.sin(i * 0.5) * 3000 + Math.random() * 1500;
  return {
    date: dateStr,
    activeUsers: Math.round(baseValue),
    newUsers: Math.round(baseValue * 0.22),
  };
});

const CATEGORIES = ["Electronics", "Clothing", "Home", "Accessories"];
const CUSTOMER_NAMES = [
  "Emma Watson",
  "Liam Smith",
  "Sophia Miller",
  "Jackson Davis",
  "Olivia Taylor",
  "Aiden Wilson",
  "Ava Anderson",
  "Lucas Thomas",
  "Mia Jackson",
  "Ethan White",
  "Isabella Harris",
  "Mason Martin",
  "Charlotte Thompson",
  "Oliver Garcia",
  "Amelia Martinez",
  "Elijah Robinson",
  "Harper Clark",
  "James Rodriguez",
  "Evelyn Lewis",
  "Benjamin Lee",
  "Abigail Walker",
  "Sebastian Hall",
  "Emily Allen",
  "Logan Young",
  "Elizabeth Hernandez",
  "Alexander King",
  "Avery Wright",
  "Henry Lopez",
  "Ella Hill",
  "Jacob Scott",
  "Scarlett Green",
  "Michael Adams",
  "Grace Baker",
  "Daniel Gonzalez",
  "Chloe Nelson",
  "Matthew Carter",
  "Victoria Mitchell",
  "Samuel Perez",
  "Riley Roberts",
  "David Turner",
];

const RAW_TRANSACTIONS = Array.from({ length: 45 }, (_, idx) => {
  const customer = CUSTOMER_NAMES[idx % CUSTOMER_NAMES.length];
  const category = CATEGORIES[idx % CATEGORIES.length];
  const dateObj = new Date(2026, 9, 1); // Oct 2026 baseline
  dateObj.setDate(dateObj.getDate() - ((idx * 2) % 85));

  const statusRoll = idx % 10;
  const status =
    statusRoll < 7 ? "Completed" : statusRoll < 9 ? "Pending" : "Failed";

  const productRoll = idx % TOP_PRODUCTS_DATA.length;
  const productName = TOP_PRODUCTS_DATA[productRoll].name;

  const amount = parseFloat((45 + ((idx * 17.5) % 450)).toFixed(2));

  return {
    id: `TXN-${1000 + idx}`,
    name: customer,
    product: productName,
    date: dateObj.toISOString().split("T")[0],
    amount: amount,
    status: status,
    category: category,
  };
});

const SPARKLINE_USERS = [
  { v: 10 },
  { v: 14 },
  { v: 12 },
  { v: 18 },
  { v: 22 },
  { v: 24 },
];
const SPARKLINE_REVENUE = [
  { v: 40 },
  { v: 52 },
  { v: 48 },
  { v: 65 },
  { v: 72 },
  { v: 84 },
];
const SPARKLINE_ORDERS = [
  { v: 30 },
  { v: 35 },
  { v: 32 },
  { v: 28 },
  { v: 31 },
  { v: 29 },
];
const SPARKLINE_CONVERSION = [
  { v: 3.2 },
  { v: 3.8 },
  { v: 4.1 },
  { v: 4.0 },
  { v: 4.5 },
  { v: 4.68 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [dateRange, setDateRange] = useState("last30"); // 'last7', 'last30', 'last90', 'custom'
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Interactive Chart Selection Filters
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTraffic, setSelectedTraffic] = useState(null);

  // Table Search, Sort, Pagination States
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    dateRange,
    customStartDate,
    customEndDate,
    selectedCategory,
    selectedMonth,
    selectedProduct,
    selectedTraffic,
    searchQuery,
  ]);

  const filteredTransactions = useMemo(() => {
    return RAW_TRANSACTIONS.filter((txn) => {
      // Category filter
      if (
        selectedCategory !== "All Categories" &&
        txn.category !== selectedCategory
      ) {
        return false;
      }

      // Selected Product filter
      if (selectedProduct && txn.product !== selectedProduct) {
        return false;
      }

      // Selected Month filter
      if (selectedMonth) {
        const txnMonth = new Date(txn.date).toLocaleString("en-US", {
          month: "short",
        });
        if (txnMonth !== selectedMonth) return false;
      }

      // Global & Table Search
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesName = txn.name.toLowerCase().includes(q);
        const matchesCategory = txn.category.toLowerCase().includes(q);
        const matchesStatus = txn.status.toLowerCase().includes(q);
        const matchesProduct = txn.product.toLowerCase().includes(q);
        if (
          !matchesName &&
          !matchesCategory &&
          !matchesStatus &&
          !matchesProduct
        ) {
          return false;
        }
      }

      // Date Range Filter
      const txnDate = new Date(txn.date);
      const today = new Date("2026-10-01");

      if (dateRange === "last7") {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        if (txnDate < sevenDaysAgo) return false;
      } else if (dateRange === "last30") {
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        if (txnDate < thirtyDaysAgo) return false;
      } else if (dateRange === "last90") {
        const ninetyDaysAgo = new Date(today);
        ninetyDaysAgo.setDate(today.getDate() - 90);
        if (txnDate < ninetyDaysAgo) return false;
      } else if (dateRange === "custom") {
        if (customStartDate && new Date(customStartDate) > txnDate)
          return false;
        if (customEndDate && new Date(customEndDate) < txnDate) return false;
      }

      return true;
    });
  }, [
    selectedCategory,
    selectedProduct,
    selectedMonth,
    searchQuery,
    dateRange,
    customStartDate,
    customEndDate,
  ]);

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === "amount") {
        valA = Number(valA);
        valB = Number(valB);
      } else if (sortField === "date") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      } else {
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();
      }

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredTransactions, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedTransactions.slice(start, start + itemsPerPage);
  }, [sortedTransactions, currentPage]);

  // Handle Sort Toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const dynamicKPIs = useMemo(() => {
    const filteredTotalRev = filteredTransactions.reduce(
      (acc, curr) => acc + (curr.status === "Completed" ? curr.amount : 0),
      0,
    );
    const count = filteredTransactions.length;

    // Scale multiplier based on date range selection
    let multiplier = 1;
    if (dateRange === "last7") multiplier = 0.25;
    if (dateRange === "last90") multiplier = 2.8;

    const baseRevenue = Math.round(
      84320 * multiplier + (filteredTotalRev > 0 ? filteredTotalRev * 2 : 0),
    );
    const baseUsers = Math.round(
      24892 * (multiplier > 1 ? 1.2 : multiplier < 1 ? 0.3 : 1),
    );
    const baseOrders = Math.round(
      3842 * (multiplier > 1 ? 1.4 : multiplier < 1 ? 0.28 : 1) + count,
    );

    return {
      revenue: `$${baseRevenue.toLocaleString()}`,
      users: baseUsers.toLocaleString(),
      orders: baseOrders.toLocaleString(),
      conversion: `${(4.68 * (selectedCategory === "Electronics" ? 1.1 : 1)).toFixed(2)}%`,
    };
  }, [filteredTransactions, dateRange, selectedCategory]);

  const exportCSV = () => {
    if (filteredTransactions.length === 0) return;

    const headers = [
      "Transaction ID",
      "Customer Name",
      "Product",
      "Date",
      "Amount ($)",
      "Status",
      "Category",
    ];
    const rows = filteredTransactions.map((t) => [
      t.id,
      `"${t.name}"`,
      `"${t.product}"`,
      t.date,
      t.amount.toFixed(2),
      t.status,
      t.category,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `analytics_export_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAllFilters = () => {
    setSelectedCategory("All Categories");
    setDateRange("last30");
    setCustomStartDate("");
    setCustomEndDate("");
    setSelectedMonth(null);
    setSelectedProduct(null);
    setSelectedTraffic(null);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategory !== "All Categories" ||
    dateRange !== "last30" ||
    selectedMonth ||
    selectedProduct ||
    selectedTraffic ||
    searchQuery !== "";

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Analytics", icon: BarChart3 },
    { name: "Orders", icon: ShoppingBag },
    { name: "Products", icon: Package },
    { name: "Customers", icon: Users },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased">
      {/* Top Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-50
            w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between
            transform transition-transform duration-200 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <div>
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                  <Activity className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-lg tracking-tight">
                    PulseSaaS
                  </span>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                    Analytics Pro
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Menu */}
            <nav className="p-4 space-y-1">
              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Main Menu
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.name);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm
                      transition-colors duration-150
                      ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600 font-semibold shadow-xs"
                          : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
                      }
                    `}
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? "text-indigo-600" : "text-slate-400"}`}
                    />
                    {item.name}
                    {item.name === "Orders" && (
                      <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full">
                        {RAW_TRANSACTIONS.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Sidebar Footer Card */}
          <div className="p-4 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                PRO
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 truncate">
                  Pro SaaS License
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  Renews Nov 2026
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* TOP NAVBAR */}
          {}
          <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Global Search */}
              <div className="relative w-48 sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search metrics, orders, customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-100/80 border border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Topbar User & Alerts */}
            <div className="flex items-center gap-3">
              <button
                className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
              </button>

              <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />

              <div className="flex items-center gap-3 cursor-pointer group p-1 rounded-xl hover:bg-slate-50 transition-colors">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
                  alt="Alex Morgan"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/30 group-hover:ring-indigo-500 transition-all"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight">
                    Alex Morgan
                  </p>
                  <p className="text-[11px] text-slate-500">Product Admin</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
              </div>
            </div>
          </header>

          {/* PAGE ROUTING CONTENT */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
            {activeTab === "Dashboard" && (
              <>
                {/* PAGE HEADER & FILTER BAR */}
                {}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                      Analytics Overview
                    </h1>
                    <p className="text-sm text-slate-500">
                      Monitor your business performance, revenue, and customer
                      metrics.
                    </p>
                  </div>

                  {/* Export CSV Button */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={exportCSV}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium shadow-xs shadow-indigo-200 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                  </div>
                </div>

                {/* FILTER BAR CONTAINER */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mr-2">
                      <Filter className="w-4 h-4" />
                      Filters:
                    </div>

                    {/* Date Range Dropdown */}
                    <div className="relative">
                      <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none"
                      >
                        <option value="last7">Last 7 Days</option>
                        <option value="last30">Last 30 Days</option>
                        <option value="last90">Last 90 Days</option>
                        <option value="custom">Custom Range</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Category Dropdown */}
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none"
                      >
                        <option value="All Categories">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Home">Home</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Custom Date Inputs */}
                    {dateRange === "custom" && (
                      <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
                        <input
                          type="date"
                          value={customStartDate}
                          onChange={(e) => setCustomStartDate(e.target.value)}
                          className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <span className="text-slate-400 text-xs">to</span>
                        <input
                          type="date"
                          value={customEndDate}
                          onChange={(e) => setCustomEndDate(e.target.value)}
                          className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    )}

                    {/* Reset All Filters Button */}
                    {hasActiveFilters && (
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors ml-auto flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Reset All
                      </button>
                    )}
                  </div>

                  {/* ACTIVE FILTER BADGES */}
                  {hasActiveFilters && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                      <span className="text-xs font-semibold text-slate-400">
                        Active Tags:
                      </span>

                      {selectedCategory !== "All Categories" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">
                          Category: {selectedCategory}
                          <X
                            className="w-3 h-3 cursor-pointer hover:text-indigo-900"
                            onClick={() =>
                              setSelectedCategory("All Categories")
                            }
                          />
                        </span>
                      )}

                      {selectedMonth && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium">
                          Month: {selectedMonth}
                          <X
                            className="w-3 h-3 cursor-pointer hover:text-emerald-900"
                            onClick={() => setSelectedMonth(null)}
                          />
                        </span>
                      )}

                      {selectedProduct && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-50 text-cyan-700 rounded-lg text-xs font-medium">
                          Product: {selectedProduct}
                          <X
                            className="w-3 h-3 cursor-pointer hover:text-cyan-900"
                            onClick={() => setSelectedProduct(null)}
                          />
                        </span>
                      )}

                      {selectedTraffic && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium">
                          Traffic: {selectedTraffic}
                          <X
                            className="w-3 h-3 cursor-pointer hover:text-amber-900"
                            onClick={() => setSelectedTraffic(null)}
                          />
                        </span>
                      )}

                      {searchQuery && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium">
                          Search: "{searchQuery}"
                          <X
                            className="w-3 h-3 cursor-pointer hover:text-purple-900"
                            onClick={() => setSearchQuery("")}
                          />
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* KPI STAT CARDS */}
                {}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Total Users Card */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Total Users
                      </span>
                      <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                        <Users className="w-5 h-5" />
                      </div>
                    </div>
                    {isLoading ? (
                      <div className="h-8 bg-slate-200 animate-pulse rounded-md w-28 my-1" />
                    ) : (
                      <div className="text-2xl font-bold text-slate-900 tracking-tight">
                        {dynamicKPIs.users}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                        <TrendingUp className="w-3 h-3" /> +12.5%
                      </span>
                      {/* Sparkline Chart */}
                      <div className="w-20 h-8">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={SPARKLINE_USERS}>
                            <Line
                              type="monotone"
                              dataKey="v"
                              stroke="#4F46E5"
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Total Revenue Card */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Total Revenue
                      </span>
                      <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                        <DollarSign className="w-5 h-5" />
                      </div>
                    </div>
                    {isLoading ? (
                      <div className="h-8 bg-slate-200 animate-pulse rounded-md w-32 my-1" />
                    ) : (
                      <div className="text-2xl font-bold text-slate-900 tracking-tight">
                        {dynamicKPIs.revenue}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                        <TrendingUp className="w-3 h-3" /> +8.2%
                      </span>
                      <div className="w-20 h-8">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={SPARKLINE_REVENUE}>
                            <Line
                              type="monotone"
                              dataKey="v"
                              stroke="#10B981"
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Total Orders Card */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Total Orders
                      </span>
                      <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600">
                        <ShoppingCart className="w-5 h-5" />
                      </div>
                    </div>
                    {isLoading ? (
                      <div className="h-8 bg-slate-200 animate-pulse rounded-md w-24 my-1" />
                    ) : (
                      <div className="text-2xl font-bold text-slate-900 tracking-tight">
                        {dynamicKPIs.orders}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600">
                        <TrendingDown className="w-3 h-3" /> -3.4%
                      </span>
                      <div className="w-20 h-8">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={SPARKLINE_ORDERS}>
                            <Line
                              type="monotone"
                              dataKey="v"
                              stroke="#F43F5E"
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Conversion Rate Card */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Conversion Rate
                      </span>
                      <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                        <Activity className="w-5 h-5" />
                      </div>
                    </div>
                    {isLoading ? (
                      <div className="h-8 bg-slate-200 animate-pulse rounded-md w-24 my-1" />
                    ) : (
                      <div className="text-2xl font-bold text-slate-900 tracking-tight">
                        {dynamicKPIs.conversion}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                        <TrendingUp className="w-3 h-3" /> +1.8%
                      </span>
                      <div className="w-20 h-8">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={SPARKLINE_CONVERSION}>
                            <Line
                              type="monotone"
                              dataKey="v"
                              stroke="#F59E0B"
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CHARTS GRID 1: REVENUE LINE CHART & TOP PRODUCTS BAR CHART */}
                {}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Revenue Line Chart */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-base font-bold text-slate-900">
                          Monthly Revenue
                        </h2>
                        <p className="text-xs text-slate-500">
                          Click a data point to filter by month
                        </p>
                      </div>
                      {selectedMonth && (
                        <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                          Filter: {selectedMonth}
                          <X
                            className="w-3.5 h-3.5 cursor-pointer"
                            onClick={() => setSelectedMonth(null)}
                          />
                        </span>
                      )}
                    </div>

                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={MONTHLY_REVENUE_DATA}
                          onClick={(e) => {
                            if (e && e.activeLabel) {
                              setSelectedMonth(
                                e.activeLabel === selectedMonth
                                  ? null
                                  : e.activeLabel,
                              );
                            }
                          }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#F1F5F9"
                          />
                          <XAxis
                            dataKey="month"
                            stroke="#94A3B8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#94A3B8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `$${val / 1000}k`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#0F172A",
                              borderRadius: "12px",
                              border: "none",
                              color: "#fff",
                              fontSize: "12px",
                            }}
                            formatter={(value) => [
                              `$${value.toLocaleString()}`,
                              "Revenue",
                            ]}
                          />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#4F46E5"
                            strokeWidth={3}
                            activeDot={{
                              r: 7,
                              fill: "#4F46E5",
                              stroke: "#EEF2FF",
                              strokeWidth: 3,
                            }}
                            dot={{ fill: "#4F46E5", r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Top Products Bar Chart */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-base font-bold text-slate-900">
                          Top Products by Sales
                        </h2>
                        <p className="text-xs text-slate-500">
                          Click a bar to filter transactions by product
                        </p>
                      </div>
                      {selectedProduct && (
                        <span className="text-xs bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                          Filter: {selectedProduct}
                          <X
                            className="w-3.5 h-3.5 cursor-pointer"
                            onClick={() => setSelectedProduct(null)}
                          />
                        </span>
                      )}
                    </div>

                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={TOP_PRODUCTS_DATA}
                          layout="vertical"
                          onClick={(data) => {
                            if (
                              data &&
                              data.activePayload &&
                              data.activePayload.length > 0
                            ) {
                              const pName = data.activePayload[0].payload.name;
                              setSelectedProduct(
                                pName === selectedProduct ? null : pName,
                              );
                            }
                          }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            horizontal={false}
                            stroke="#F1F5F9"
                          />
                          <XAxis
                            type="number"
                            stroke="#94A3B8"
                            fontSize={11}
                            tickFormatter={(v) => `$${v / 1000}k`}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            dataKey="name"
                            type="category"
                            stroke="#64748B"
                            fontSize={11}
                            width={120}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#0F172A",
                              borderRadius: "12px",
                              border: "none",
                              color: "#fff",
                              fontSize: "12px",
                            }}
                            formatter={(value) => [
                              `$${value.toLocaleString()}`,
                              "Sales",
                            ]}
                          />
                          <Bar
                            dataKey="sales"
                            fill="#06B6D4"
                            radius={[0, 8, 8, 0]}
                            cursor="pointer"
                          >
                            {TOP_PRODUCTS_DATA.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  entry.name === selectedProduct
                                    ? "#4F46E5"
                                    : "#06B6D4"
                                }
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* CHARTS GRID 2: TRAFFIC DONUT & DAILY ACTIVE USERS AREA CHART */}
                {}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Traffic Sources Donut Chart */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-base font-bold text-slate-900">
                          Traffic Sources
                        </h2>
                        {selectedTraffic && (
                          <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-lg font-semibold flex items-center gap-1">
                            {selectedTraffic}
                            <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => setSelectedTraffic(null)}
                            />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mb-4">
                        Click a slice to filter channel
                      </p>
                    </div>

                    <div className="h-52 w-full flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={TRAFFIC_SOURCES_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={80}
                            paddingAngle={4}
                            dataKey="value"
                            cursor="pointer"
                            onClick={(entry) =>
                              setSelectedTraffic(
                                entry.name === selectedTraffic
                                  ? null
                                  : entry.name,
                              )
                            }
                          >
                            {TRAFFIC_SOURCES_DATA.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  entry.name === selectedTraffic
                                    ? "#312E81"
                                    : entry.color
                                }
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#0F172A",
                              borderRadius: "12px",
                              border: "none",
                              color: "#fff",
                              fontSize: "12px",
                            }}
                            formatter={(val) => [`${val}%`, "Share"]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      {TRAFFIC_SOURCES_DATA.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center gap-2 text-xs"
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-slate-600 font-medium">
                            {item.name}
                          </span>
                          <span className="ml-auto font-bold text-slate-800">
                            {item.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Daily Active Users Area Chart */}
                  <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-base font-bold text-slate-900">
                          Daily Active Users (Last 30 Days)
                        </h2>
                        <p className="text-xs text-slate-500">
                          Track user engagement trends over time
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-medium">
                        <div className="flex items-center gap-1 text-slate-600">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />{" "}
                          Active Users
                        </div>
                        <div className="flex items-center gap-1 text-slate-600">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />{" "}
                          New Users
                        </div>
                      </div>
                    </div>

                    <div className="h-60 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={DAILY_USERS_DATA}>
                          <defs>
                            <linearGradient
                              id="colorActive"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#4F46E5"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="#4F46E5"
                                stopOpacity={0}
                              />
                            </linearGradient>
                            <linearGradient
                              id="colorNew"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#10B981"
                                stopOpacity={0.2}
                              />
                              <stop
                                offset="95%"
                                stopColor="#10B981"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#F1F5F9"
                          />
                          <XAxis
                            dataKey="date"
                            stroke="#94A3B8"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#94A3B8"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#0F172A",
                              borderRadius: "12px",
                              border: "none",
                              color: "#fff",
                              fontSize: "12px",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="activeUsers"
                            stroke="#4F46E5"
                            strokeWidth={2.5}
                            fillOpacity={1}
                            fill="url(#colorActive)"
                          />
                          <Area
                            type="monotone"
                            dataKey="newUsers"
                            stroke="#10B981"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorNew)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* DATA TABLE SECTION */}
                {}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  {/* Table Header Controls */}
                  <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Recent Transactions
                      </h2>
                      <p className="text-xs text-slate-500">
                        Showing {filteredTransactions.length} items based on
                        active filters
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Search in Table */}
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search transactions..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* DESKTOP TABLE VIEW */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                        <tr>
                          <th
                            className="py-3.5 px-5 cursor-pointer hover:text-slate-800"
                            onClick={() => handleSort("name")}
                          >
                            <div className="flex items-center gap-1">
                              Customer / Product
                              {sortField === "name" &&
                                (sortDirection === "asc" ? (
                                  <ChevronUp className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                ))}
                            </div>
                          </th>
                          <th
                            className="py-3.5 px-5 cursor-pointer hover:text-slate-800"
                            onClick={() => handleSort("date")}
                          >
                            <div className="flex items-center gap-1">
                              Date
                              {sortField === "date" &&
                                (sortDirection === "asc" ? (
                                  <ChevronUp className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                ))}
                            </div>
                          </th>
                          <th
                            className="py-3.5 px-5 cursor-pointer hover:text-slate-800"
                            onClick={() => handleSort("amount")}
                          >
                            <div className="flex items-center gap-1">
                              Amount
                              {sortField === "amount" &&
                                (sortDirection === "asc" ? (
                                  <ChevronUp className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                ))}
                            </div>
                          </th>
                          <th
                            className="py-3.5 px-5 cursor-pointer hover:text-slate-800"
                            onClick={() => handleSort("status")}
                          >
                            <div className="flex items-center gap-1">
                              Status
                              {sortField === "status" &&
                                (sortDirection === "asc" ? (
                                  <ChevronUp className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                ))}
                            </div>
                          </th>
                          <th className="py-3.5 px-5">Category</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {paginatedTransactions.length > 0 ? (
                          paginatedTransactions.map((row) => (
                            <tr
                              key={row.id}
                              className="hover:bg-slate-50/60 transition-colors"
                            >
                              <td className="py-3.5 px-5">
                                <p className="font-semibold text-slate-900">
                                  {row.name}
                                </p>
                                <p className="text-xs text-slate-400 font-normal">
                                  {row.product}
                                </p>
                              </td>
                              <td className="py-3.5 px-5 text-slate-600 whitespace-nowrap">
                                {row.date}
                              </td>
                              <td className="py-3.5 px-5 font-bold text-slate-900">
                                ${row.amount.toFixed(2)}
                              </td>
                              <td className="py-3.5 px-5 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold
                                  ${row.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60" : ""}
                                  ${row.status === "Pending" ? "bg-amber-50 text-amber-700 border border-amber-200/60" : ""}
                                  ${row.status === "Failed" ? "bg-rose-50 text-rose-700 border border-rose-200/60" : ""}
                                `}
                                >
                                  {row.status === "Completed" && (
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  )}
                                  {row.status === "Pending" && (
                                    <Clock className="w-3 h-3 text-amber-600" />
                                  )}
                                  {row.status === "Failed" && (
                                    <AlertCircle className="w-3 h-3 text-rose-600" />
                                  )}
                                  {row.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-5 text-slate-600">
                                <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600">
                                  {row.category}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={5}
                              className="py-12 text-center text-slate-400"
                            >
                              <div className="flex flex-col items-center justify-center space-y-2">
                                <XCircle className="w-8 h-8 text-slate-300" />
                                <p className="font-semibold text-slate-600">
                                  No transactions found.
                                </p>
                                <p className="text-xs text-slate-400">
                                  Try adjusting your filters or search query.
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* MOBILE CARDS VIEW */}
                  {}
                  <div className="md:hidden divide-y divide-slate-100">
                    {paginatedTransactions.length > 0 ? (
                      paginatedTransactions.map((row) => (
                        <div key={row.id} className="p-4 space-y-2.5 bg-white">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-slate-900 text-sm">
                                {row.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {row.product}
                              </p>
                            </div>
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold
                              ${row.status === "Completed" ? "bg-emerald-50 text-emerald-700" : ""}
                              ${row.status === "Pending" ? "bg-amber-50 text-amber-700" : ""}
                              ${row.status === "Failed" ? "bg-rose-50 text-rose-700" : ""}
                            `}
                            >
                              {row.status}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-50">
                            <span>
                              Amount:{" "}
                              <strong className="text-slate-900">
                                ${row.amount.toFixed(2)}
                              </strong>
                            </span>
                            <span>Date: {row.date}</span>
                          </div>

                          <div className="text-xs">
                            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                              {row.category}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-10 text-center text-slate-400 space-y-2">
                        <XCircle className="w-8 h-8 mx-auto text-slate-300" />
                        <p className="font-semibold text-slate-600 text-sm">
                          No transactions found.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* PAGINATION CONTROLS */}
                  {}
                  <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                    <div>
                      Showing{" "}
                      {sortedTransactions.length > 0
                        ? (currentPage - 1) * itemsPerPage + 1
                        : 0}{" "}
                      to{" "}
                      {Math.min(
                        currentPage * itemsPerPage,
                        sortedTransactions.length,
                      )}{" "}
                      of {sortedTransactions.length} results
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-lg border border-slate-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
                        aria-label="Previous Page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-7 h-7 rounded-lg font-semibold text-xs transition-colors
                            ${
                              currentPage === page
                                ? "bg-indigo-600 text-white shadow-xs"
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                            }
                          `}
                          >
                            {page}
                          </button>
                        ),
                      )}

                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={
                          currentPage === totalPages || totalPages === 0
                        }
                        className="p-1.5 rounded-lg border border-slate-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
                        aria-label="Next Page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* OTHER PAGES PLACEHOLDERS */}
            {}
            {activeTab === "Analytics" && (
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Advanced Analytics
                  </h1>
                  <p className="text-sm text-slate-500">
                    In-depth cohort analysis and conversion funnels.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 bg-indigo-50/60 rounded-xl border border-indigo-100">
                    <span className="text-xs font-semibold text-indigo-600 uppercase">
                      Avg Order Value
                    </span>
                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      $142.80
                    </p>
                    <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
                      <ArrowUpRight className="w-3.5 h-3.5" /> +4.2% vs last
                      month
                    </p>
                  </div>

                  <div className="p-5 bg-cyan-50/60 rounded-xl border border-cyan-100">
                    <span className="text-xs font-semibold text-cyan-700 uppercase">
                      Customer LTV
                    </span>
                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      $890.00
                    </p>
                    <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
                      <ArrowUpRight className="w-3.5 h-3.5" /> +6.1% vs last
                      month
                    </p>
                  </div>

                  <div className="p-5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                    <span className="text-xs font-semibold text-emerald-700 uppercase">
                      Retention Rate
                    </span>
                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      78.4%
                    </p>
                    <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
                      <ArrowUpRight className="w-3.5 h-3.5" /> +1.5% vs last
                      month
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-3">
                  <BarChart3 className="w-10 h-10 text-indigo-600 mx-auto" />
                  <h3 className="text-base font-bold text-slate-800">
                    Deep Funnel Visualization
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Full behavioral analytics and custom telemetry pipeline
                    integrated directly with mock data sources.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "Orders" && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                      Orders Management
                    </h1>
                    <p className="text-sm text-slate-500">
                      Track and manage customer fulfillment pipelines.
                    </p>
                  </div>
                  <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                    {RAW_TRANSACTIONS.length} Total Orders
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900">
                    <p className="text-xs font-semibold uppercase">Completed</p>
                    <p className="text-2xl font-bold">
                      {
                        RAW_TRANSACTIONS.filter((t) => t.status === "Completed")
                          .length
                      }
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-900">
                    <p className="text-xs font-semibold uppercase">Pending</p>
                    <p className="text-2xl font-bold">
                      {
                        RAW_TRANSACTIONS.filter((t) => t.status === "Pending")
                          .length
                      }
                    </p>
                  </div>
                  <div className="p-4 bg-rose-50 rounded-xl border border-rose-100 text-rose-900">
                    <p className="text-xs font-semibold uppercase">Failed</p>
                    <p className="text-2xl font-bold">
                      {
                        RAW_TRANSACTIONS.filter((t) => t.status === "Failed")
                          .length
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Products" && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Product Inventory
                  </h1>
                  <p className="text-sm text-slate-500">
                    Overview of top selling products and inventory levels.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {TOP_PRODUCTS_DATA.map((p) => (
                    <div
                      key={p.name}
                      className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-md">
                          {p.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          Stock: {p.count}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900">{p.name}</h3>
                      <p className="text-lg font-bold text-indigo-600">
                        ${p.sales.toLocaleString()}{" "}
                        <span className="text-xs font-normal text-slate-400">
                          total sales
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Customers" && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Customer Directory
                  </h1>
                  <p className="text-sm text-slate-500">
                    Registered SaaS users and active lifetime values.
                  </p>
                </div>

                <div className="divide-y divide-slate-100">
                  {CUSTOMER_NAMES.slice(0, 8).map((name, i) => (
                    <div
                      key={name}
                      className="py-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                          {name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {name.toLowerCase().replace(" ", ".")}@example.com
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-slate-700">
                        ${(340 + i * 85).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Settings" && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6 max-w-3xl">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Account Settings
                  </h1>
                  <p className="text-sm text-slate-500">
                    Manage dashboard preferences and API integrations.
                  </p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="p-4 border border-slate-200 rounded-xl space-y-3">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <User className="w-4 h-4 text-indigo-600" /> Admin Profile
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-500">
                          Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Alex Morgan"
                          className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-500">
                          Email
                        </label>
                        <input
                          type="text"
                          defaultValue="alex.morgan@saas.io"
                          className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-slate-200 rounded-xl space-y-2">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-indigo-600" /> Dashboard
                      Preferences
                    </h3>
                    <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      Enable automatic 30-second live chart refreshing
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      Send weekly email summaries for revenue targets
                    </label>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
