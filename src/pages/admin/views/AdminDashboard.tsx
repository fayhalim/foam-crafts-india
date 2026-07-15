import React from 'react';
import { Package, Users, ShoppingBag, IndianRupee } from 'lucide-react';

export default function AdminDashboard() {
  // In a real app, you'd fetch these from Firestore
  const stats = [
    { name: 'Total Sales', value: '₹2,45,000', icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { name: 'Total Orders', value: '145', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Total Customers', value: '89', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { name: 'Total Products', value: '24', icon: Package, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of your store's performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color} mr-4`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add more dashboard widgets like recent orders, low stock, etc. */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Orders</h2>
        <div className="text-sm text-slate-500 text-center py-8">
          No recent orders to display.
        </div>
      </div>
    </div>
  );
}
