import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentManagementSystem from './scenario/studentmanagementsystem';
import ProductInventoryApp from './scenario/ProductInventoryApp';
import ToDoApp from './scenario/ToDoApp';
import TeacherRecordsSystem from './scenario/teacherrecordssystem';
import CartManager from './scenario/CartManager';
import BookLibrarySystem from './scenario/BookLibrarySystem';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
    <h1 className="text-5xl font-black text-slate-800 mb-4">Project Dashboard</h1>
    <p className="text-xl text-slate-500 max-w-2xl">
      Welcome to the multi-app suite. Select a scenario from the sidebar to explore the individual management systems.
    </p>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
      {['Students', 'Inventory', 'Tasks', 'Teachers', 'Cart', 'Library'].map((item) => (
        <div key={item} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 font-bold text-slate-700">
          {item} System
        </div>
      ))}
    </div>
  </div>
);

const App = () => {
  const navLinks = [
    { name: 'Dashboard', path: '/', icon: '🏠' },
    { name: 'Student Management', path: '/students', icon: '🎓' },
    { name: 'Product Inventory', path: '/inventory', icon: '📦' },
    { name: 'To-Do App', path: '/todo', icon: '✅' },
    { name: 'Teacher Records', path: '/teachers', icon: '👨‍🏫' },
    { name: 'Cart Manager', path: '/cart', icon: '🛒' },
    { name: 'Book Library', path: '/library', icon: '📚' },
  ];

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen">
          <div className="p-8 border-b border-slate-100">
            <span className="text-2xl font-black text-blue-600 tracking-tighter italic">ADMIN.hub</span>
          </div>
          
          <nav className="flex-grow p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-3 px-4 py-3 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 hover:text-blue-600 transition-all group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-900 rounded-2xl p-4 text-white">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">All Systems Operational</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow overflow-y-auto">
          {/* Mobile Nav Placeholder */}
          <div className="md:hidden bg-white p-4 border-b border-slate-200 flex justify-between items-center">
            <span className="font-black text-blue-600">ADMIN.hub</span>
            <div className="flex gap-4">
              {navLinks.slice(1).map(l => (
                <Link key={l.path} to={l.path} title={l.name}>{l.icon}</Link>
              ))}
            </div>
          </div>

          <div className="animate-in fade-in duration-500">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/students" element={<StudentManagementSystem />} />
              <Route path="/inventory" element={<ProductInventoryApp />} />
              <Route path="/todo" element={<ToDoApp />} />
              <Route path="/teachers" element={<TeacherRecordsSystem />} />
              <Route path="/cart" element={<CartManager />} />
              <Route path="/library" element={<BookLibrarySystem />} />
              <Route path="*" element={
                <div className="p-20 text-center">
                  <h2 className="text-2xl font-bold">404 - Not Found</h2>
                  <Link to="/" className="text-blue-600 underline mt-4 block">Return Home</Link>
                </div>
              } />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;