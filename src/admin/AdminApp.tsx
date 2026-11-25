import React, { useState, useEffect } from 'react';
import { AdminLayout, AdminTab } from './AdminLayout';
import { AdminLogin } from './AdminLogin';
import { OverviewSection } from './sections/OverviewSection';
import { OrdersSection } from './sections/OrdersSection';
import { ReservationsSection } from './sections/ReservationsSection';
import { MenuManagementSection } from './sections/MenuManagementSection';
import { CategoriesSection } from './sections/CategoriesSection';
import { CustomersSection } from './sections/CustomersSection';
import { InventorySection } from './sections/InventorySection';
import { SalesReportSection } from './sections/SalesReportSection';
import { SettingsSection } from './sections/SettingsSection';

interface AdminAppProps {
  onBackToSite: () => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onBackToSite }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');

  useEffect(() => {
    // Check saved session
    const savedToken = localStorage.getItem('noire_token');
    const savedUser = localStorage.getItem('noire_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser({ name: 'Admin', role: 'admin' });
      }
    }
  }, []);

  const handleLoginSuccess = (loggedInUser: any, userToken: string) => {
    setUser(loggedInUser);
    setToken(userToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('noire_token');
    localStorage.removeItem('noire_user');
    setUser(null);
    setToken(null);
  };

  if (!token || !user) {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onBackToSite={onBackToSite}
      />
    );
  }

  return (
    <AdminLayout
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      user={user}
      onLogout={handleLogout}
      onBackToSite={onBackToSite}
    >
      {currentTab === 'overview' && <OverviewSection onNavigateTab={setCurrentTab} />}
      {currentTab === 'orders' && <OrdersSection />}
      {currentTab === 'reservations' && <ReservationsSection />}
      {currentTab === 'menu' && <MenuManagementSection />}
      {currentTab === 'categories' && <CategoriesSection />}
      {currentTab === 'customers' && <CustomersSection />}
      {currentTab === 'inventory' && <InventorySection />}
      {currentTab === 'sales' && <SalesReportSection />}
      {currentTab === 'settings' && <SettingsSection />}
    </AdminLayout>
  );
};
