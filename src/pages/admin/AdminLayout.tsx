import React, { useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { 
  Settings, Package, Image as ImageIcon, FileText, ShoppingBag, 
  Users, Tags, Ticket, Star, FileEdit, Archive, LayoutDashboard, 
  Shield, LogOut 
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function AdminLayout() {
  const { user, role, loading, logout } = useAuth();
  const location = useLocation();
  const { config } = useSiteConfig();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <div className="flex items-center gap-3 animate-pulse">
          {config.logoUrl && (
            <img src={config.logoUrl} alt={config.siteName} className="h-16 w-auto object-contain" />
          )}
          <h1 className="text-2xl font-bold text-slate-900">{config.siteName}</h1>
        </div>
        <div className="text-slate-500">Loading Admin...</div>
      </div>
    );
  }

  if (!user || (role !== 'Super Admin' && role !== 'Admin' && role !== 'Manager' && role !== 'Editor')) {
    // If not logged in, redirect to an admin login page
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Tags },
    { name: 'Inventory', path: '/admin/inventory', icon: Archive },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Banners & Media', path: '/admin/media', icon: ImageIcon },
    { name: 'Brochures', path: '/admin/brochures', icon: FileText },
    { name: 'Coupons', path: '/admin/coupons', icon: Ticket },
    { name: 'Reviews', path: '/admin/reviews', icon: Star },
    { name: 'Blog', path: '/admin/blog', icon: FileEdit },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
    { name: 'User Roles', path: '/admin/roles', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          {config.logoUrl && (
            <img src={config.logoUrl} alt={config.siteName} className="h-10 w-auto object-contain" />
          )}
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white tracking-tight">{config.siteName}</h2>
            <p className="text-xs text-emerald-400 mt-1 uppercase tracking-widest font-bold">Admin • {role}</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="text-sm truncate">
              <p className="text-slate-200 truncate">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-center border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800" onClick={logout}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
