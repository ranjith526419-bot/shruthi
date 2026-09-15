export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type UserRole = 'donor' | 'seeker' | 'hospital' | 'admin';

export type UrgencyLevel = 'routine' | 'urgent' | 'critical';

export type RequestStatus = 'pending' | 'in_progress' | 'fulfilled' | 'cancelled';

export type InventoryStatus = 'available' | 'low' | 'critical' | 'quarantine' | 'expired';

export type ComponentType = 'whole_blood' | 'packed_red_cells' | 'platelets' | 'plasma';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  city?: string;
  district?: string;
  state?: string;
  bloodGroup?: BloodGroup;
  hospitalId?: string;
  isVerified?: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface Donor {
  id: string;
  userId: string;
  fullName: string;
  bloodGroup: BloodGroup;
  dateOfBirth?: string;
  phone: string; // masked in public views for privacy
  email: string;
  city: string;
  district: string;
  state: string;
  lastDonationDate: string;
  isAvailable: boolean;
  totalDonations?: number;
  donationCount?: number;
  consentGiven?: boolean;
  avatarUrl?: string;
  createdAt?: string;
  registeredAt?: string;
}

export interface Hospital {
  id: string;
  userId?: string;
  name: string;
  type: 'hospital' | 'blood_bank';
  licenseNumber?: string;
  contactPhone?: string;
  emergencyPhone?: string;
  phone?: string;
  email: string;
  address: string;
  city: string;
  district: string;
  state: string;
  isVerified: boolean;
  latitude?: number;
  longitude?: number;
  coordinates?: { lat: number; lng: number };
  operatingHours: string;
  totalUnitsAvailable?: number;
  totalUnitsInStock?: number;
  createdAt?: string;
}

export interface BloodInventoryItem {
  id: string;
  hospitalId: string;
  hospitalName: string;
  bloodGroup: BloodGroup;
  unitsAvailable: number;
  componentType: ComponentType;
  collectionDate: string;
  expiryDate: string;
  status: InventoryStatus;
  lastUpdated: string;
}

export interface BloodRequest {
  id: string;
  requesterId?: string;
  requestedByUserId?: string;
  requesterName?: string;
  patientName: string;
  bloodGroup: BloodGroup;
  unitsRequired: number;
  unitsFulfilled?: number;
  hospitalName: string;
  hospitalId?: string;
  city: string;
  district: string;
  state?: string;
  requiredDate: string;
  urgency: UrgencyLevel;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  notes?: string;
  status: RequestStatus;
  respondedDonorsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface DonationRecord {
  id: string;
  donorId: string;
  donorName: string;
  bloodGroup: BloodGroup;
  hospitalId: string;
  hospitalName: string;
  donationDate: string;
  unitsDonated: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  screeningNotes?: string;
  certificateId?: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'emergency' | 'request' | 'inventory' | 'donation' | 'system';
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface ActivityLogItem {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface BloodCompatibilityInfo {
  group: BloodGroup;
  canGiveTo: BloodGroup[];
  canReceiveFrom: BloodGroup[];
  universalDonor?: boolean;
  universalRecipient?: boolean;
  prevalencePercentage: number;
  antigens: string;
  antibodies: string;
  description: string;
}

export interface CenterLocation {
  id: string;
  name: string;
  type: 'hospital' | 'blood_bank' | 'donation_camp';
  address: string;
  city: string;
  phone: string;
  hours: string;
  distanceKm: number;
  availableGroups: BloodGroup[];
  hasEmergencyService: boolean;
}
