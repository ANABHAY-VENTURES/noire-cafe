import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  Coffee, 
  Tags, 
  Users, 
  Boxes, 
  BarChart3, 
  Settings, 
  LogOut, 
  ArrowLeft,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';

export type AdminTab = 
  | 'overview' 
  | 'orders' 
  | 'reservations' 
  | 'menu' 
  | 'categories' 
  | 'customers' 
  | 'inventory' 
  | 'sales' 
  | 'settings';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  user: any;
  onLogout: () => void;
  onBackToSite: () => void;
  unreadCount?: number;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  user,
  onLogout,
  onBackToSite,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'overview' as AdminTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'orders' as AdminTab, label: 'Live Orders', icon: ShoppingBag, badge: 'Realtime' },
    { id: 'reservations' as AdminTab, label: 'Reservations', icon: Calendar },
    { id: 'menu' as AdminTab, label: 'Menu Catalog', icon: Coffee },
    { id: 'categories' as AdminTab, label: 'Categories', icon: Tags },
    { id: 'customers' as AdminTab, label: 'Customers', icon: Users },
    { id: 'inventory' as AdminTab, label: 'Inventory & Stock', icon: Boxes },
    { id: 'sales' as AdminTab, label: 'Sales & Analytics', icon: BarChart3 },
    { id: 'settings' as AdminTab, label: 'Store Settings', icon: Settings },
  ];

  const handleTabClick = (tab: AdminTab) => {
    onSelectTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-ivory text-espresso flex flex-col lg:flex-row font-sans">
      {/* Background Subtle Grain Texture */}
      <div className="fixed inset-0 bg-grain opacity-40 pointer-events-none" />

      {/* Top Mobile Bar */}
      <div className="lg:hidden bg-ivory-light border-b border-espresso/15 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 -ml-2 text-espresso hover:text-caramel rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="font-serif text-xl font-medium tracking-tight text-espresso">NOIRÉ Admin</div>
        </div>

        <button
          onClick={onBackToSite}
          className="text-xs font-mono uppercase tracking-wider text-espresso/70 hover:text-caramel flex items-center gap-1"
        >
          <span>Sanctuary</span>
          <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-50 w-72 bg-ivory-light border-r border-espresso/15 flex flex-col justify-between p-6 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-8">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-6 border-b border-espresso/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-espresso/30 flex items-center justify-center bg-ivory shadow-sm">
                <span className="font-serif text-base font-semibold text-espresso">N</span>
              </div>
              <div>
                <span className="font-serif text-lg font-medium text-espresso block leading-tight">NOIRÉ</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-olive">Business 2.0</span>
              </div>
            </div>

            <button
              onClick={onBackToSite}
              className="text-espresso/50 hover:text-caramel transition-colors p-1"
              title="Return to Customer Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-espresso text-ivory shadow-sm font-semibold'
                      : 'text-espresso/75 hover:bg-ivory hover:text-espresso'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-caramel' : 'text-espresso/60'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-caramel text-ivory' : 'bg-olive/15 text-olive font-mono'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-6 border-t border-espresso/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-olive/20 text-olive flex items-center justify-center font-serif text-xs font-medium">
                {user?.name ? user.name.charAt(0) : 'A'}
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-medium text-espresso block truncate max-w-[120px]">
                  {user?.name || 'Administrator'}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-olive block flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-caramel" />
                  {user?.role || 'ADMIN'}
                </span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-2 rounded-lg hover:bg-red-500/10 text-espresso/60 hover:text-red-700 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-espresso/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 sm:p-10 lg:p-12 relative z-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
