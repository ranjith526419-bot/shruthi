/**
 * Local storage abstraction layer with automatic fallback and state hydration.
 * Ensures the application remains fully interactive and responsive in demo mode.
 */

const STORAGE_KEYS = {
  USERS: 'lifedrop_users',
  DONORS: 'lifedrop_donors',
  HOSPITALS: 'lifedrop_hospitals',
  INVENTORY: 'lifedrop_inventory',
  REQUESTS: 'lifedrop_requests',
  DONATIONS: 'lifedrop_donations',
  NOTIFICATIONS: 'lifedrop_notifications',
  ACTIVITY_LOGS: 'lifedrop_activity_logs',
  CURRENT_USER: 'lifedrop_current_user',
};

export const getStoredItem = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (err) {
    console.warn(`Error reading localStorage key "${key}":`, err);
    return fallback;
  }
};

export const setStoredItem = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing localStorage key "${key}":`, err);
  }
};

export const clearStoredItem = (key: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`Error removing localStorage key "${key}":`, err);
  }
};

export { STORAGE_KEYS };
