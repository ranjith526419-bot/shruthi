import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Donor,
  Hospital,
  BloodInventoryItem,
  BloodRequest,
  DonationRecord,
  NotificationItem,
  ActivityLogItem,
  BloodGroup,
  RequestStatus,
  InventoryStatus,
  ComponentType,
  UrgencyLevel
} from '../types';
import {
  INITIAL_DONORS,
  INITIAL_HOSPITALS,
  INITIAL_INVENTORY,
  INITIAL_REQUESTS,
  INITIAL_DONATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVITY_LOGS
} from '../data/mockData';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from '../services/storage';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface DataContextType {
  donors: Donor[];
  hospitals: Hospital[];
  inventory: BloodInventoryItem[];
  requests: BloodRequest[];
  donations: DonationRecord[];
  notifications: NotificationItem[];
  activityLogs: ActivityLogItem[];
  toasts: ToastMessage[];

  // Toast actions
  showToast: (title: string, message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  addToast: (title: string, message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Requests
  createBloodRequest: (data: {
    patientName: string;
    bloodGroup: BloodGroup;
    unitsRequired: number;
    hospitalName: string;
    city: string;
    district: string;
    state?: string;
    requiredDate: string;
    urgency: UrgencyLevel;
    contactName: string;
    contactPhone: string;
    contactEmail?: string;
    requestedByUserId?: string;
    notes?: string;
  }) => BloodRequest;
  addBloodRequest: (data: {
    patientName: string;
    bloodGroup: BloodGroup;
    unitsRequired: number;
    hospitalName: string;
    city: string;
    district: string;
    state?: string;
    requiredDate: string;
    urgency: UrgencyLevel;
    contactName: string;
    contactPhone: string;
    contactEmail?: string;
    requestedByUserId?: string;
    notes?: string;
  }) => BloodRequest;
  updateRequestStatus: (requestId: string, status: RequestStatus, unitsFulfilled?: number) => void;
  updateBloodRequestStatus: (requestId: string, status: RequestStatus, unitsFulfilled?: number) => void;
  cancelRequest: (requestId: string) => void;
  respondToRequest: (requestId: string, donorName: string) => void;

  // Donors
  registerDonor: (donorData: {
    fullName: string;
    bloodGroup: BloodGroup;
    dateOfBirth: string;
    phone: string;
    email: string;
    city: string;
    district: string;
    state: string;
    lastDonationDate?: string;
    isAvailable: boolean;
    consentGiven: boolean;
    userId?: string;
    donationCount?: number;
  }) => Donor;
  updateDonorAvailability: (donorId: string, isAvailable: boolean) => void;
  toggleDonorAvailability: (donorId: string) => void;
  contactDonorSecurely: (donorId: string, seekerName: string, reason: string) => void;

  // Inventory
  addInventoryItem: (item: {
    hospitalId: string;
    hospitalName: string;
    bloodGroup: BloodGroup;
    unitsAvailable: number;
    componentType: ComponentType;
    collectionDate: string;
    expiryDate: string;
    status?: InventoryStatus;
  }) => void;
  updateInventoryUnits: (id: string, unitsAvailable: number, status?: InventoryStatus) => void;
  deleteInventoryItem: (id: string) => void;

  // Hospitals
  verifyHospital: (hospitalId: string, isVerified: boolean) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [donors, setDonors] = useState<Donor[]>(() =>
    getStoredItem<Donor[]>(STORAGE_KEYS.DONORS, INITIAL_DONORS)
  );

  const [hospitals, setHospitals] = useState<Hospital[]>(() =>
    getStoredItem<Hospital[]>(STORAGE_KEYS.HOSPITALS, INITIAL_HOSPITALS)
  );

  const [inventory, setInventory] = useState<BloodInventoryItem[]>(() =>
    getStoredItem<BloodInventoryItem[]>(STORAGE_KEYS.INVENTORY, INITIAL_INVENTORY)
  );

  const [requests, setRequests] = useState<BloodRequest[]>(() =>
    getStoredItem<BloodRequest[]>(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS)
  );

  const [donations, setDonations] = useState<DonationRecord[]>(() =>
    getStoredItem<DonationRecord[]>(STORAGE_KEYS.DONATIONS, INITIAL_DONATIONS)
  );

  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    getStoredItem<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS)
  );

  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(() =>
    getStoredItem<ActivityLogItem[]>(STORAGE_KEYS.ACTIVITY_LOGS, INITIAL_ACTIVITY_LOGS)
  );

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync back to localStorage
  useEffect(() => { setStoredItem(STORAGE_KEYS.DONORS, donors); }, [donors]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.HOSPITALS, hospitals); }, [hospitals]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.INVENTORY, inventory); }, [inventory]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.REQUESTS, requests); }, [requests]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.DONATIONS, donations); }, [donations]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.NOTIFICATIONS, notifications); }, [notifications]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.ACTIVITY_LOGS, activityLogs); }, [activityLogs]);

  // Toast actions
  const showToast = (
    title: string,
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'success'
  ) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logActivity = (action: string, details: string, userName = 'Current User') => {
    const newLog: ActivityLogItem = {
      id: `act_${Date.now()}`,
      userId: 'user_active',
      userName,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // Create blood request
  const createBloodRequest = (data: {
    patientName: string;
    bloodGroup: BloodGroup;
    unitsRequired: number;
    hospitalName: string;
    city: string;
    district: string;
    state?: string;
    requiredDate: string;
    urgency: UrgencyLevel;
    contactName: string;
    contactPhone: string;
    contactEmail?: string;
    requestedByUserId?: string;
    notes?: string;
  }): BloodRequest => {
    const newReq: BloodRequest = {
      id: `req_${Date.now()}`,
      requesterId: data.requestedByUserId || 'user_active_req',
      requestedByUserId: data.requestedByUserId,
      requesterName: data.contactName,
      patientName: data.patientName,
      bloodGroup: data.bloodGroup,
      unitsRequired: data.unitsRequired,
      unitsFulfilled: 0,
      hospitalName: data.hospitalName,
      city: data.city,
      district: data.district,
      state: data.state || 'WA',
      requiredDate: data.requiredDate,
      urgency: data.urgency,
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      contactEmail: data.contactEmail,
      notes: data.notes || '',
      status: 'pending',
      respondedDonorsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setRequests((prev) => [newReq, ...prev]);
    logActivity('Created Blood Request', `Requested ${data.unitsRequired} units of ${data.bloodGroup} for ${data.patientName}`);

    // Add alert notification for emergency requests
    if (data.urgency === 'critical' || data.urgency === 'urgent') {
      const emergencyNotif: NotificationItem = {
        id: `notif_em_${Date.now()}`,
        userId: 'broadcast',
        title: `URGENT: ${data.bloodGroup} Blood Needed`,
        message: `${data.unitsRequired} units required for ${data.patientName} at ${data.hospitalName}, ${data.city}.`,
        type: 'emergency',
        isRead: false,
        actionUrl: '#requests',
        createdAt: new Date().toISOString()
      };
      setNotifications((prev) => [emergencyNotif, ...prev]);
    }

    showToast('Blood Request Submitted', 'Your request has been broadcast to compatible donors and local facilities.');
    return newReq;
  };

  const updateRequestStatus = (requestId: string, status: RequestStatus, unitsFulfilled?: number) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          const updated = {
            ...r,
            status,
            unitsFulfilled: unitsFulfilled !== undefined ? unitsFulfilled : r.unitsFulfilled,
            updatedAt: new Date().toISOString()
          };
          return updated;
        }
        return r;
      })
    );
    showToast('Status Updated', `Request status changed to ${status.replace('_', ' ')}.`);
    logActivity('Updated Request Status', `Request #${requestId} status set to ${status}`);
  };

  const cancelRequest = (requestId: string) => {
    updateRequestStatus(requestId, 'cancelled');
  };

  const respondToRequest = (requestId: string, donorName: string) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            respondedDonorsCount: (r.respondedDonorsCount || 0) + 1,
            status: r.status === 'pending' ? 'in_progress' : r.status
          };
        }
        return r;
      })
    );
    showToast('Response Sent', `Thank you ${donorName}! The hospital and family have been notified.`);
    logActivity('Donor Responded to Request', `${donorName} agreed to assist with Request #${requestId}`);
  };

  // Register donor
  const registerDonor = (donorData: {
    fullName: string;
    bloodGroup: BloodGroup;
    dateOfBirth: string;
    phone: string;
    email: string;
    city: string;
    district: string;
    state: string;
    lastDonationDate?: string;
    isAvailable: boolean;
    consentGiven: boolean;
  }): Donor => {
    const newDonor: Donor = {
      id: `donor_${Date.now()}`,
      userId: `user_donor_${Date.now()}`,
      fullName: donorData.fullName,
      bloodGroup: donorData.bloodGroup,
      dateOfBirth: donorData.dateOfBirth,
      phone: donorData.phone,
      email: donorData.email,
      city: donorData.city,
      district: donorData.district,
      state: donorData.state,
      lastDonationDate: donorData.lastDonationDate || '',
      isAvailable: donorData.isAvailable,
      totalDonations: 0,
      consentGiven: donorData.consentGiven,
      createdAt: new Date().toISOString()
    };

    setDonors((prev) => [newDonor, ...prev]);
    logActivity('New Donor Registered', `${donorData.fullName} registered with blood group ${donorData.bloodGroup}`);
    showToast('Registration Complete', 'Welcome to the LifeDrop donor community! Your profile is active.');
    return newDonor;
  };

  const updateDonorAvailability = (donorId: string, isAvailable: boolean) => {
    setDonors((prev) =>
      prev.map((d) => (d.id === donorId ? { ...d, isAvailable } : d))
    );
    showToast('Availability Updated', `Your status is now ${isAvailable ? 'Available to Donate' : 'Temporarily Unavailable'}.`);
  };

  const toggleDonorAvailability = (donorId: string) => {
    setDonors((prev) =>
      prev.map((d) => (d.id === donorId ? { ...d, isAvailable: !d.isAvailable } : d))
    );
    showToast('Availability Updated', 'Your donor availability status has been updated.');
  };

  const contactDonorSecurely = (donorId: string, seekerName: string, reason: string) => {
    const targetDonor = donors.find((d) => d.id === donorId);
    if (!targetDonor) return;

    const notif: NotificationItem = {
      id: `notif_contact_${Date.now()}`,
      userId: targetDonor.userId,
      title: `Blood Requirement Contact Request`,
      message: `${seekerName} submitted a contact request regarding compatible blood: "${reason}". Phone details remain protected until you respond.`,
      type: 'request',
      isRead: false,
      createdAt: new Date().toISOString()
    };

    setNotifications((prev) => [notif, ...prev]);
    showToast('Contact Request Sent', 'A secure alert has been sent to the donor. Privacy is protected until they consent.');
  };

  // Inventory actions
  const addInventoryItem = (item: {
    hospitalId: string;
    hospitalName: string;
    bloodGroup: BloodGroup;
    unitsAvailable: number;
    componentType: ComponentType;
    collectionDate: string;
    expiryDate: string;
    status?: InventoryStatus;
  }) => {
    let status: InventoryStatus = item.status || 'available';
    if (item.unitsAvailable < 3) status = 'critical';
    else if (item.unitsAvailable < 8) status = 'low';

    const newItem: BloodInventoryItem = {
      id: `inv_${Date.now()}`,
      hospitalId: item.hospitalId,
      hospitalName: item.hospitalName,
      bloodGroup: item.bloodGroup,
      unitsAvailable: item.unitsAvailable,
      componentType: item.componentType,
      collectionDate: item.collectionDate,
      expiryDate: item.expiryDate,
      status,
      lastUpdated: new Date().toISOString()
    };

    setInventory((prev) => [newItem, ...prev]);
    showToast('Inventory Added', `Added ${item.unitsAvailable} units of ${item.bloodGroup} (${item.componentType.replace('_', ' ')})`);
    logActivity('Added Blood Units', `${item.unitsAvailable} units of ${item.bloodGroup} added to ${item.hospitalName}`);
  };

  const updateInventoryUnits = (id: string, unitsAvailable: number, status?: InventoryStatus) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          let derivedStatus = status || item.status;
          if (!status) {
            if (unitsAvailable <= 0) derivedStatus = 'expired';
            else if (unitsAvailable < 3) derivedStatus = 'critical';
            else if (unitsAvailable < 8) derivedStatus = 'low';
            else derivedStatus = 'available';
          }
          return {
            ...item,
            unitsAvailable,
            status: derivedStatus,
            lastUpdated: new Date().toISOString()
          };
        }
        return item;
      })
    );
    showToast('Inventory Updated', `Unit count updated to ${unitsAvailable}.`);
  };

  const deleteInventoryItem = (id: string) => {
    setInventory((prev) => prev.filter((i) => i.id !== id));
    showToast('Inventory Removed', 'Batch removed from active inventory database.');
  };

  // Hospital actions
  const verifyHospital = (hospitalId: string, isVerified: boolean) => {
    setHospitals((prev) =>
      prev.map((h) => (h.id === hospitalId ? { ...h, isVerified } : h))
    );
    showToast('Facility Status Updated', `Hospital is now ${isVerified ? 'Verified & Trusted' : 'Pending Verification'}.`);
    logActivity('Hospital Verification Status Changed', `Hospital ID #${hospitalId} verification status set to ${isVerified}`);
  };

  // Notification actions
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('Notifications Cleared', 'All alerts marked as read.');
  };

  return (
    <DataContext.Provider
      value={{
        donors,
        hospitals,
        inventory,
        requests,
        donations,
        notifications,
        activityLogs,
        toasts,
        showToast,
        addToast: showToast,
        removeToast,
        createBloodRequest,
        addBloodRequest: createBloodRequest,
        updateRequestStatus,
        updateBloodRequestStatus: updateRequestStatus,
        cancelRequest,
        respondToRequest,
        registerDonor,
        updateDonorAvailability,
        toggleDonorAvailability,
        contactDonorSecurely,
        addInventoryItem,
        updateInventoryUnits,
        deleteInventoryItem,
        verifyHospital,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
