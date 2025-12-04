const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Auth API
export const authAPI = {
  signup: async (userData) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Signup failed');
    if (data.data.token) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
    }
    return data;
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    if (data.data.token) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to get user');
    return data;
  },

  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Hotels API
export const hotelsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${API_URL}/hotels?${queryString}` : `${API_URL}/hotels`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch hotels');
    return data;
  },

  getMine: async () => {
    const response = await fetch(`${API_URL}/hotels/owner/my-hotels`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch your hotels');
    return data;
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/hotels/${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch hotel');
    return data;
  },

  create: async (hotelData) => {
    const response = await fetch(`${API_URL}/hotels`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(hotelData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create hotel');
    return data;
  },

  update: async (id, hotelData) => {
    const response = await fetch(`${API_URL}/hotels/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(hotelData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update hotel');
    return data;
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/hotels/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete hotel');
    return data;
  }
};

// Rooms API
export const roomsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${API_URL}/rooms?${queryString}` : `${API_URL}/rooms`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch rooms');
    return data;
  },

  getByHotel: async (hotelId) => {
    const response = await fetch(`${API_URL}/rooms/hotel/${hotelId}`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch rooms for hotel');
    return data;
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/rooms/${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch room');
    return data;
  },

  create: async (roomData) => {
    const response = await fetch(`${API_URL}/rooms`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(roomData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create room');
    return data;
  },

  update: async (id, roomData) => {
    const response = await fetch(`${API_URL}/rooms/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(roomData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update room');
    return data;
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/rooms/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete room');
    return data;
  }
};

// Bookings API
export const bookingsAPI = {
  getUserBookings: async () => {
    const response = await fetch(`${API_URL}/bookings`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch bookings');
    return data;
  },

  getByHotel: async (hotelId) => {
    const response = await fetch(`${API_URL}/bookings/hotel/${hotelId}`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch hotel bookings');
    return data;
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/bookings/${id}`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch booking');
    return data;
  },

  create: async (bookingData) => {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create booking');
    return data;
  },

  update: async (id, bookingData) => {
    const response = await fetch(`${API_URL}/bookings/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update booking');
    return data;
  },

  cancelBooking: async (id) => {
    const response = await fetch(`${API_URL}/bookings/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to cancel booking');
    return data;
  }
};

// Users API
export const usersAPI = {
  getProfile: async () => {
    const response = await fetch(`${API_URL}/users/profile`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
    return data;
  },

  updateProfile: async (userData) => {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update profile');
    return data;
  }
};

