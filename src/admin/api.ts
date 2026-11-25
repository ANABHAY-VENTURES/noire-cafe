/**
 * NOIRÉ Café 2.0 API Client
 */

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://127.0.0.1:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('noire_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Auth
  login: async (credentials: { email: string; password: string }) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },
  getMe: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Orders
  getOrders: async (params?: { status?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE_URL}/orders${query ? `?${query}` : ''}`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },
  createOrder: async (orderData: any) => {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    return res.json();
  },
  updateOrderStatus: async (orderId: string, status: string, paymentStatus?: string) => {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, paymentStatus }),
    });
    return res.json();
  },

  // Payments
  getPaymentConfig: async () => {
    const res = await fetch(`${API_BASE_URL}/payments/config`);
    return res.json();
  },
  createRazorpayOrder: async (orderId: string) => {
    const res = await fetch(`${API_BASE_URL}/payments/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    });
    return res.json();
  },
  verifyPayment: async (paymentData: any) => {
    const res = await fetch(`${API_BASE_URL}/payments/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    });
    return res.json();
  },

  // Reservations
  getReservations: async (params?: { date?: string; status?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE_URL}/reservations${query ? `?${query}` : ''}`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },
  createReservation: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateReservationStatus: async (id: string, status: string, tableNumber?: string) => {
    const res = await fetch(`${API_BASE_URL}/reservations/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, tableNumber }),
    });
    return res.json();
  },
  getAvailability: async (date: string) => {
    const res = await fetch(`${API_BASE_URL}/reservations/availability?date=${date}`);
    return res.json();
  },

  // Inventory
  getInventory: async () => {
    const res = await fetch(`${API_BASE_URL}/inventory`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },
  recordPurchase: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/inventory/purchase`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },
  getInventoryTransactions: async () => {
    const res = await fetch(`${API_BASE_URL}/inventory/transactions`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Analytics
  getAnalyticsOverview: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics/overview`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },
  getSalesTimeline: async (days: number = 7) => {
    const res = await fetch(`${API_BASE_URL}/analytics/sales?days=${days}`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },
  getTopProducts: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics/top-products`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Menu
  getMenuItems: async (category?: string) => {
    const res = await fetch(`${API_BASE_URL}/menu${category ? `?category=${category}` : ''}`);
    return res.json();
  },
  createMenuItem: async (itemData: any) => {
    const res = await fetch(`${API_BASE_URL}/menu`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(itemData),
    });
    return res.json();
  },
  updateMenuItem: async (id: string, updates: any) => {
    const res = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    return res.json();
  },
  toggleItemAvailability: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/menu/${id}/toggle-availability`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    return res.json();
  },
  deleteMenuItem: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Notifications
  getNotifications: async () => {
    const res = await fetch(`${API_BASE_URL}/notifications`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },
  markNotificationRead: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    return res.json();
  },
  markAllNotificationsRead: async () => {
    const res = await fetch(`${API_BASE_URL}/notifications/read-all`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Settings
  getSettings: async () => {
    const res = await fetch(`${API_BASE_URL}/settings`);
    return res.json();
  },
  updateSettings: async (settings: any) => {
    const res = await fetch(`${API_BASE_URL}/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings),
    });
    return res.json();
  },
};
