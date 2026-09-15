import {
  BloodCompatibilityInfo,
  BloodGroup,
  Donor,
  Hospital,
  BloodInventoryItem,
  BloodRequest,
  DonationRecord,
  NotificationItem,
  ActivityLogItem,
  User
} from '../types';

export const BLOOD_COMPATIBILITY_DATA: Record<BloodGroup, BloodCompatibilityInfo> = {
  'O-': {
    group: 'O-',
    canGiveTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-'],
    universalDonor: true,
    prevalencePercentage: 7,
    antigens: 'None',
    antibodies: 'Anti-A and Anti-B',
    description: 'The Universal Red Cell Donor. Can safely donate red blood cells to patients of any blood group. Highly sought-after in trauma and emergency units.'
  },
  'O+': {
    group: 'O+',
    canGiveTo: ['O+', 'A+', 'B+', 'AB+'],
    canReceiveFrom: ['O-', 'O+'],
    prevalencePercentage: 38,
    antigens: 'Rh antigen',
    antibodies: 'Anti-A and Anti-B',
    description: 'The most common blood type. Vital for daily hospital transfusions and cancer treatments.'
  },
  'A-': {
    group: 'A-',
    canGiveTo: ['A-', 'A+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-', 'A-'],
    prevalencePercentage: 6,
    antigens: 'A antigen',
    antibodies: 'Anti-B',
    description: 'A valuable blood type capable of helping both A and AB recipients with positive or negative Rh.'
  },
  'A+': {
    group: 'A+',
    canGiveTo: ['A+', 'AB+'],
    canReceiveFrom: ['O-', 'O+', 'A-', 'A+'],
    prevalencePercentage: 34,
    antigens: 'A and Rh antigens',
    antibodies: 'Anti-B',
    description: 'Second most common blood group. A critical resource for surgical and general patient care.'
  },
  'B-': {
    group: 'B-',
    canGiveTo: ['B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-', 'B-'],
    prevalencePercentage: 2,
    antigens: 'B antigen',
    antibodies: 'Anti-A',
    description: 'One of the rarest blood groups. Donors of B- are always urgently needed.'
  },
  'B+': {
    group: 'B+',
    canGiveTo: ['B+', 'AB+'],
    canReceiveFrom: ['O-', 'O+', 'B-', 'B+'],
    prevalencePercentage: 9,
    antigens: 'B and Rh antigens',
    antibodies: 'Anti-A',
    description: 'Common in many global populations. High demand for sickle cell and oncology patients.'
  },
  'AB-': {
    group: 'AB-',
    canGiveTo: ['AB-', 'AB+'],
    canReceiveFrom: ['O-', 'A-', 'B-', 'AB-'],
    prevalencePercentage: 1,
    antigens: 'A and B antigens',
    antibodies: 'None',
    description: 'The rarest blood type, found in less than 1 in 100 people. Highly prized for plasma donations.'
  },
  'AB+': {
    group: 'AB+',
    canGiveTo: ['AB+'],
    canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    universalRecipient: true,
    prevalencePercentage: 3,
    antigens: 'A, B, and Rh antigens',
    antibodies: 'None',
    description: 'The Universal Red Cell Recipient. Can safely accept red blood cells from any blood type. Also the Universal Plasma Donor!'
  }
};

export const INITIAL_USERS: User[] = [
  {
    id: 'user_donor_1',
    email: 'elena.donor@example.com',
    displayName: 'Elena Rostova',
    role: 'donor',
    phone: '+1 (555) 234-5678',
    city: 'Seattle',
    district: 'King County',
    state: 'WA',
    bloodGroup: 'O-',
    isVerified: true,
    createdAt: '2025-11-10T08:00:00Z'
  },
  {
    id: 'user_seeker_1',
    email: 'david.chen@example.com',
    displayName: 'David Chen',
    role: 'seeker',
    phone: '+1 (555) 345-6789',
    city: 'Seattle',
    district: 'King County',
    state: 'WA',
    bloodGroup: 'B+',
    isVerified: true,
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'user_hospital_1',
    email: 'bloodcenter@metrohealth.org',
    displayName: 'Metro Health Blood Bank',
    role: 'hospital',
    phone: '+1 (555) 987-6543',
    city: 'Seattle',
    district: 'King County',
    state: 'WA',
    hospitalId: 'hosp_1',
    isVerified: true,
    createdAt: '2025-08-01T09:00:00Z'
  },
  {
    id: 'user_admin_1',
    email: 'admin@lifedrop.org',
    displayName: 'Dr. Arthur Vance (Chief Admin)',
    role: 'admin',
    phone: '+1 (555) 111-2233',
    city: 'Seattle',
    district: 'King County',
    state: 'WA',
    isVerified: true,
    createdAt: '2025-01-01T00:00:00Z'
  }
];

export const INITIAL_DONORS: Donor[] = [
  {
    id: 'donor_1',
    userId: 'user_donor_1',
    fullName: 'Elena Rostova',
    bloodGroup: 'O-',
    dateOfBirth: '1993-04-12',
    phone: '+1 (555) 234-5678',
    email: 'elena.donor@example.com',
    city: 'Seattle',
    district: 'King County',
    state: 'WA',
    lastDonationDate: '2026-05-14',
    isAvailable: true,
    totalDonations: 8,
    consentGiven: true,
    createdAt: '2025-11-10T08:00:00Z'
  },
  {
    id: 'donor_2',
    userId: 'user_donor_2',
    fullName: 'Marcus Hayes',
    bloodGroup: 'A+',
    dateOfBirth: '1988-11-03',
    phone: '+1 (555) 876-5432',
    email: 'marcus.h@example.com',
    city: 'Bellevue',
    district: 'King County',
    state: 'WA',
    lastDonationDate: '2026-06-20',
    isAvailable: true,
    totalDonations: 14,
    consentGiven: true,
    createdAt: '2025-09-12T11:00:00Z'
  },
  {
    id: 'donor_3',
    userId: 'user_donor_3',
    fullName: 'Priya Sharma',
    bloodGroup: 'B+',
    dateOfBirth: '1995-02-18',
    phone: '+1 (555) 432-1098',
    email: 'priya.s@example.com',
    city: 'Tacoma',
    district: 'Pierce County',
    state: 'WA',
    lastDonationDate: '2026-07-02',
    isAvailable: true,
    totalDonations: 5,
    consentGiven: true,
    createdAt: '2025-12-01T14:30:00Z'
  },
  {
    id: 'donor_4',
    userId: 'user_donor_4',
    fullName: 'Liam O\'Connor',
    bloodGroup: 'AB+',
    dateOfBirth: '1991-09-24',
    phone: '+1 (555) 654-7890',
    email: 'liam.oc@example.com',
    city: 'Seattle',
    district: 'King County',
    state: 'WA',
    lastDonationDate: '2026-04-10',
    isAvailable: true,
    totalDonations: 11,
    consentGiven: true,
    createdAt: '2025-07-22T16:00:00Z'
  },
  {
    id: 'donor_5',
    userId: 'user_donor_5',
    fullName: 'Sophia Martinez',
    bloodGroup: 'O+',
    dateOfBirth: '1998-06-30',
    phone: '+1 (555) 321-6549',
    email: 'sophia.m@example.com',
    city: 'Renton',
    district: 'King County',
    state: 'WA',
    lastDonationDate: '2026-08-01',
    isAvailable: false,
    totalDonations: 3,
    consentGiven: true,
    createdAt: '2026-01-20T09:15:00Z'
  },
  {
    id: 'donor_6',
    userId: 'user_donor_6',
    fullName: 'Kofi Mensah',
    bloodGroup: 'A-',
    dateOfBirth: '1985-08-15',
    phone: '+1 (555) 789-0123',
    email: 'kofi.m@example.com',
    city: 'Everett',
    district: 'Snohomish County',
    state: 'WA',
    lastDonationDate: '2026-03-12',
    isAvailable: true,
    totalDonations: 19,
    consentGiven: true,
    createdAt: '2025-05-18T10:00:00Z'
  },
  {
    id: 'donor_7',
    userId: 'user_donor_7',
    fullName: 'Hannah Zimmerman',
    bloodGroup: 'B-',
    dateOfBirth: '1996-12-05',
    phone: '+1 (555) 890-1234',
    email: 'hannah.z@example.com',
    city: 'Kirkland',
    district: 'King County',
    state: 'WA',
    lastDonationDate: '2026-06-11',
    isAvailable: true,
    totalDonations: 6,
    consentGiven: true,
    createdAt: '2025-10-05T12:00:00Z'
  },
  {
    id: 'donor_8',
    userId: 'user_donor_8',
    fullName: 'Gabriel Santos',
    bloodGroup: 'AB-',
    dateOfBirth: '1990-01-28',
    phone: '+1 (555) 901-2345',
    email: 'gabriel.s@example.com',
    city: 'Redmond',
    district: 'King County',
    state: 'WA',
    lastDonationDate: '2026-05-29',
    isAvailable: true,
    totalDonations: 9,
    consentGiven: true,
    createdAt: '2025-08-19T13:40:00Z'
  }
];

export const INITIAL_HOSPITALS: Hospital[] = [
  {
    id: 'hosp_1',
    userId: 'user_hospital_1',
    name: 'Metro Health Blood Bank & Trauma Center',
    type: 'blood_bank',
    licenseNumber: 'WA-BB-2024-8891',
    contactPhone: '+1 (555) 987-6543',
    emergencyPhone: '+1 (555) 987-9999',
    email: 'bloodcenter@metrohealth.org',
    address: '1200 12th Ave S',
    city: 'Seattle',
    district: 'King County',
    state: 'WA',
    isVerified: true,
    latitude: 47.5952,
    longitude: -122.3168,
    operatingHours: '24/7 Emergency Transfusion Services',
    totalUnitsAvailable: 142,
    createdAt: '2025-08-01T09:00:00Z'
  },
  {
    id: 'hosp_2',
    userId: 'user_hospital_2',
    name: 'St. Jude Community Memorial Hospital',
    type: 'hospital',
    licenseNumber: 'WA-HOSP-2023-4412',
    contactPhone: '+1 (555) 843-2211',
    emergencyPhone: '+1 (555) 843-2911',
    email: 'transfusions@stjude-memorial.org',
    address: '740 E Denny Way',
    city: 'Seattle',
    district: 'King County',
    state: 'WA',
    isVerified: true,
    latitude: 47.6189,
    longitude: -122.3223,
    operatingHours: 'Mon-Sun: 7:00 AM - 10:00 PM',
    totalUnitsAvailable: 88,
    createdAt: '2025-09-15T10:00:00Z'
  },
  {
    id: 'hosp_3',
    userId: 'user_hospital_3',
    name: 'Cascade Regional Blood Services',
    type: 'blood_bank',
    licenseNumber: 'WA-BB-2024-1104',
    contactPhone: '+1 (555) 674-8800',
    emergencyPhone: '+1 (555) 674-8899',
    email: 'contact@cascaderegionalblood.org',
    address: '10400 NE 4th St',
    city: 'Bellevue',
    district: 'King County',
    state: 'WA',
    isVerified: true,
    latitude: 47.6144,
    longitude: -122.1995,
    operatingHours: 'Mon-Sat: 8:00 AM - 8:00 PM',
    totalUnitsAvailable: 195,
    createdAt: '2025-07-10T11:00:00Z'
  },
  {
    id: 'hosp_4',
    userId: 'user_hospital_4',
    name: 'Evergreen Valley Medical Center',
    type: 'hospital',
    licenseNumber: 'WA-HOSP-2025-3390',
    contactPhone: '+1 (555) 512-3400',
    emergencyPhone: '+1 (555) 512-3499',
    email: 'bloodlab@evergreenvalley.org',
    address: '12040 NE 128th St',
    city: 'Kirkland',
    district: 'King County',
    state: 'WA',
    isVerified: true,
    latitude: 47.7142,
    longitude: -122.1793,
    operatingHours: '24/7 Transfusion Unit',
    totalUnitsAvailable: 64,
    createdAt: '2025-10-02T13:00:00Z'
  },
  {
    id: 'hosp_5',
    userId: 'user_hospital_5',
    name: 'Sound General Hospital & Blood Depot',
    type: 'hospital',
    licenseNumber: 'WA-HOSP-2022-9011',
    contactPhone: '+1 (555) 456-7800',
    emergencyPhone: '+1 (555) 456-7899',
    email: 'info@soundgeneral.org',
    address: '315 S K St',
    city: 'Tacoma',
    district: 'Pierce County',
    state: 'WA',
    isVerified: false,
    latitude: 47.2572,
    longitude: -122.4501,
    operatingHours: 'Mon-Fri: 8:00 AM - 6:00 PM',
    totalUnitsAvailable: 35,
    createdAt: '2026-02-14T15:00:00Z'
  }
];

export const INITIAL_INVENTORY: BloodInventoryItem[] = [
  {
    id: 'inv_1',
    hospitalId: 'hosp_1',
    hospitalName: 'Metro Health Blood Bank & Trauma Center',
    bloodGroup: 'O-',
    unitsAvailable: 4,
    componentType: 'packed_red_cells',
    collectionDate: '2026-08-25',
    expiryDate: '2026-09-29',
    status: 'low',
    lastUpdated: '2026-09-03T14:20:00Z'
  },
  {
    id: 'inv_2',
    hospitalId: 'hosp_1',
    hospitalName: 'Metro Health Blood Bank & Trauma Center',
    bloodGroup: 'O+',
    unitsAvailable: 28,
    componentType: 'whole_blood',
    collectionDate: '2026-08-28',
    expiryDate: '2026-10-02',
    status: 'available',
    lastUpdated: '2026-09-04T01:10:00Z'
  },
  {
    id: 'inv_3',
    hospitalId: 'hosp_1',
    hospitalName: 'Metro Health Blood Bank & Trauma Center',
    bloodGroup: 'A+',
    unitsAvailable: 35,
    componentType: 'whole_blood',
    collectionDate: '2026-08-27',
    expiryDate: '2026-10-01',
    status: 'available',
    lastUpdated: '2026-09-03T18:00:00Z'
  },
  {
    id: 'inv_4',
    hospitalId: 'hosp_1',
    hospitalName: 'Metro Health Blood Bank & Trauma Center',
    bloodGroup: 'A-',
    unitsAvailable: 7,
    componentType: 'packed_red_cells',
    collectionDate: '2026-08-24',
    expiryDate: '2026-09-28',
    status: 'available',
    lastUpdated: '2026-09-02T12:00:00Z'
  },
  {
    id: 'inv_5',
    hospitalId: 'hosp_1',
    hospitalName: 'Metro Health Blood Bank & Trauma Center',
    bloodGroup: 'B+',
    unitsAvailable: 19,
    componentType: 'whole_blood',
    collectionDate: '2026-08-29',
    expiryDate: '2026-10-03',
    status: 'available',
    lastUpdated: '2026-09-04T02:00:00Z'
  },
  {
    id: 'inv_6',
    hospitalId: 'hosp_1',
    hospitalName: 'Metro Health Blood Bank & Trauma Center',
    bloodGroup: 'B-',
    unitsAvailable: 2,
    componentType: 'packed_red_cells',
    collectionDate: '2026-08-20',
    expiryDate: '2026-09-24',
    status: 'critical',
    lastUpdated: '2026-09-03T09:30:00Z'
  },
  {
    id: 'inv_7',
    hospitalId: 'hosp_1',
    hospitalName: 'Metro Health Blood Bank & Trauma Center',
    bloodGroup: 'AB+',
    unitsAvailable: 14,
    componentType: 'plasma',
    collectionDate: '2026-08-15',
    expiryDate: '2027-08-15',
    status: 'available',
    lastUpdated: '2026-09-01T15:00:00Z'
  },
  {
    id: 'inv_8',
    hospitalId: 'hosp_1',
    hospitalName: 'Metro Health Blood Bank & Trauma Center',
    bloodGroup: 'AB-',
    unitsAvailable: 1,
    componentType: 'packed_red_cells',
    collectionDate: '2026-08-22',
    expiryDate: '2026-09-26',
    status: 'critical',
    lastUpdated: '2026-09-03T11:45:00Z'
  },
  {
    id: 'inv_9',
    hospitalId: 'hosp_3',
    hospitalName: 'Cascade Regional Blood Services',
    bloodGroup: 'O-',
    unitsAvailable: 12,
    componentType: 'packed_red_cells',
    collectionDate: '2026-08-30',
    expiryDate: '2026-10-04',
    status: 'available',
    lastUpdated: '2026-09-04T00:30:00Z'
  },
  {
    id: 'inv_10',
    hospitalId: 'hosp_3',
    hospitalName: 'Cascade Regional Blood Services',
    bloodGroup: 'O+',
    unitsAvailable: 42,
    componentType: 'whole_blood',
    collectionDate: '2026-08-31',
    expiryDate: '2026-10-05',
    status: 'available',
    lastUpdated: '2026-09-04T02:30:00Z'
  },
  {
    id: 'inv_11',
    hospitalId: 'hosp_3',
    hospitalName: 'Cascade Regional Blood Services',
    bloodGroup: 'A+',
    unitsAvailable: 38,
    componentType: 'whole_blood',
    collectionDate: '2026-08-28',
    expiryDate: '2026-10-02',
    status: 'available',
    lastUpdated: '2026-09-03T16:00:00Z'
  },
  {
    id: 'inv_12',
    hospitalId: 'hosp_3',
    hospitalName: 'Cascade Regional Blood Services',
    bloodGroup: 'B+',
    unitsAvailable: 24,
    componentType: 'platelets',
    collectionDate: '2026-09-01',
    expiryDate: '2026-09-06',
    status: 'available',
    lastUpdated: '2026-09-04T03:00:00Z'
  },
  {
    id: 'inv_13',
    hospitalId: 'hosp_2',
    hospitalName: 'St. Jude Community Memorial Hospital',
    bloodGroup: 'O+',
    unitsAvailable: 16,
    componentType: 'whole_blood',
    collectionDate: '2026-08-29',
    expiryDate: '2026-10-03',
    status: 'available',
    lastUpdated: '2026-09-03T19:00:00Z'
  },
  {
    id: 'inv_14',
    hospitalId: 'hosp_2',
    hospitalName: 'St. Jude Community Memorial Hospital',
    bloodGroup: 'B-',
    unitsAvailable: 3,
    componentType: 'packed_red_cells',
    collectionDate: '2026-08-26',
    expiryDate: '2026-09-30',
    status: 'low',
    lastUpdated: '2026-09-03T10:00:00Z'
  },
  {
    id: 'inv_15',
    hospitalId: 'hosp_4',
    hospitalName: 'Evergreen Valley Medical Center',
    bloodGroup: 'A-',
    unitsAvailable: 5,
    componentType: 'packed_red_cells',
    collectionDate: '2026-08-27',
    expiryDate: '2026-10-01',
    status: 'available',
    lastUpdated: '2026-09-02T17:00:00Z'
  }
];

export const INITIAL_REQUESTS: BloodRequest[] = [
  {
    id: 'req_1',
    requesterId: 'user_seeker_1',
    requesterName: 'David Chen',
    patientName: 'Lucas Chen',
    bloodGroup: 'O-',
    unitsRequired: 3,
    unitsFulfilled: 1,
    hospitalName: 'Metro Health Blood Bank & Trauma Center',
    hospitalId: 'hosp_1',
    city: 'Seattle',
    district: 'King County',
    requiredDate: '2026-09-04',
    urgency: 'critical',
    contactName: 'David Chen (Father)',
    contactPhone: '+1 (555) 345-6789',
    notes: 'Emergency pediatric surgery following accident. O- negative blood urgently required before 2:00 PM.',
    status: 'in_progress',
    respondedDonorsCount: 2,
    createdAt: '2026-09-04T01:30:00Z',
    updatedAt: '2026-09-04T03:00:00Z'
  },
  {
    id: 'req_2',
    requesterId: 'user_seeker_2',
    requesterName: 'Maria Rodriguez',
    patientName: 'Grace Miller',
    bloodGroup: 'B-',
    unitsRequired: 2,
    unitsFulfilled: 0,
    hospitalName: 'St. Jude Community Memorial Hospital',
    hospitalId: 'hosp_2',
    city: 'Seattle',
    district: 'King County',
    requiredDate: '2026-09-05',
    urgency: 'urgent',
    contactName: 'Maria Rodriguez (Sister)',
    contactPhone: '+1 (555) 765-4321',
    notes: 'Scheduled cardiac bypass surgery on Friday morning. Blood bank reserve is critically low.',
    status: 'pending',
    respondedDonorsCount: 1,
    createdAt: '2026-09-03T19:00:00Z',
    updatedAt: '2026-09-03T19:00:00Z'
  },
  {
    id: 'req_3',
    requesterId: 'user_seeker_3',
    requesterName: 'Kenneth Brooks',
    patientName: 'Robert Vance',
    bloodGroup: 'AB-',
    unitsRequired: 2,
    unitsFulfilled: 0,
    hospitalName: 'Evergreen Valley Medical Center',
    hospitalId: 'hosp_4',
    city: 'Kirkland',
    district: 'King County',
    requiredDate: '2026-09-06',
    urgency: 'critical',
    contactName: 'Kenneth Brooks (Guardian)',
    contactPhone: '+1 (555) 890-7654',
    notes: 'Severe aplastic anemia crisis. Platelet or packed red blood cells needed.',
    status: 'pending',
    respondedDonorsCount: 0,
    createdAt: '2026-09-04T00:15:00Z',
    updatedAt: '2026-09-04T00:15:00Z'
  },
  {
    id: 'req_4',
    requesterId: 'user_seeker_4',
    requesterName: 'Sarah Kim',
    patientName: 'Chloe Kim',
    bloodGroup: 'A+',
    unitsRequired: 1,
    unitsFulfilled: 1,
    hospitalName: 'Cascade Regional Blood Services',
    hospitalId: 'hosp_3',
    city: 'Bellevue',
    district: 'King County',
    requiredDate: '2026-09-08',
    urgency: 'routine',
    contactName: 'Sarah Kim (Mother)',
    contactPhone: '+1 (555) 654-3210',
    notes: 'Routine monthly transfusion for thalassemia management.',
    status: 'fulfilled',
    respondedDonorsCount: 3,
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-02T15:30:00Z'
  }
];

export const INITIAL_DONATIONS: DonationRecord[] = [
  {
    id: 'don_1',
    donorId: 'donor_1',
    donorName: 'Elena Rostova',
    bloodGroup: 'O-',
    hospitalId: 'hosp_1',
    hospitalName: 'Metro Health Blood Bank & Trauma Center',
    donationDate: '2026-05-14',
    unitsDonated: 1,
    status: 'completed',
    screeningNotes: 'Hemoglobin 14.2 g/dL, BP 118/76, pulse 68 bpm. Whole blood donation successful.',
    certificateId: 'CERT-LD-2026-0514-99',
    createdAt: '2026-05-14T11:00:00Z'
  },
  {
    id: 'don_2',
    donorId: 'donor_1',
    donorName: 'Elena Rostova',
    bloodGroup: 'O-',
    hospitalId: 'hosp_3',
    hospitalName: 'Cascade Regional Blood Services',
    donationDate: '2026-02-10',
    unitsDonated: 1,
    status: 'completed',
    screeningNotes: 'Hemoglobin 13.8 g/dL, BP 120/78. Excellent recovery post donation.',
    certificateId: 'CERT-LD-2026-0210-44',
    createdAt: '2026-02-10T14:30:00Z'
  },
  {
    id: 'don_3',
    donorId: 'donor_2',
    donorName: 'Marcus Hayes',
    bloodGroup: 'A+',
    hospitalId: 'hosp_1',
    hospitalName: 'Metro Health Blood Bank & Trauma Center',
    donationDate: '2026-06-20',
    unitsDonated: 1,
    status: 'completed',
    screeningNotes: 'Screening cleared. Platelet pheresis donation.',
    certificateId: 'CERT-LD-2026-0620-12',
    createdAt: '2026-06-20T10:15:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    userId: 'user_donor_1',
    title: 'CRITICAL: O- Blood Needed Near You',
    message: 'Lucas Chen urgently requires O- blood at Metro Health Trauma Center (Seattle). Can you donate today?',
    type: 'emergency',
    isRead: false,
    actionUrl: '#requests',
    createdAt: '2026-09-04T01:45:00Z'
  },
  {
    id: 'notif_2',
    userId: 'user_donor_1',
    title: 'Donation Eligibility Reached',
    message: 'You have completed the 56-day rest period since your last donation on May 14. Your status is set to Available.',
    type: 'donation',
    isRead: true,
    actionUrl: '#dashboard',
    createdAt: '2026-07-10T09:00:00Z'
  },
  {
    id: 'notif_3',
    userId: 'user_hospital_1',
    title: 'Low Inventory Alert: B- & AB-',
    message: 'Your inventory for B- and AB- has fallen below minimum safety threshold (less than 3 units).',
    type: 'inventory',
    isRead: false,
    actionUrl: '#inventory',
    createdAt: '2026-09-04T00:30:00Z'
  },
  {
    id: 'notif_4',
    userId: 'user_seeker_1',
    title: 'Donor Responded to Your Request',
    message: 'A registered O- donor has acknowledged your emergency request for Lucas Chen.',
    type: 'request',
    isRead: false,
    actionUrl: '#dashboard',
    createdAt: '2026-09-04T02:15:00Z'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLogItem[] = [
  {
    id: 'act_1',
    userId: 'user_seeker_1',
    userName: 'David Chen',
    action: 'Created Emergency Blood Request',
    details: 'Requested 3 units of O- blood for Lucas Chen at Metro Health Trauma Center',
    timestamp: '2026-09-04T01:30:00Z'
  },
  {
    id: 'act_2',
    userId: 'user_hospital_1',
    userName: 'Metro Health Blood Bank',
    action: 'Updated Inventory Lot #inv_6',
    details: 'Status changed to critical: 2 units B- remaining',
    timestamp: '2026-09-03T09:30:00Z'
  },
  {
    id: 'act_3',
    userId: 'user_admin_1',
    userName: 'Dr. Arthur Vance',
    action: 'Verified Facility License',
    details: 'St. Jude Community Memorial Hospital compliance verification completed',
    timestamp: '2026-09-02T14:15:00Z'
  },
  {
    id: 'act_4',
    userId: 'user_donor_1',
    userName: 'Elena Rostova',
    action: 'Updated Donor Availability',
    details: 'Toggled active availability state to Online/Ready to Donate',
    timestamp: '2026-09-01T08:00:00Z'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'How does LifeDrop protect donor privacy?',
    answer: 'LifeDrop never publicly displays donor phone numbers, home addresses, or private contact details. Blood seekers or hospitals submit requests through verified platform channels, and donors receive secure notifications with the option to accept or decline before contact is shared.'
  },
  {
    question: 'Does registering on LifeDrop automatically make me medically eligible?',
    answer: 'No. LifeDrop does not declare anyone medically fit or provide medical eligibility certifications. All prospective donors must undergo standardized pre-donation clinical screening, hemoglobin testing, and vital health checks administered on-site by qualified healthcare and blood bank staff.'
  },
  {
    question: 'How often can an individual donate whole blood?',
    answer: 'Standard clinical guidance permits whole blood donation every 56 days (8 weeks) for healthy adults, allowing the body adequate time to replenish iron stores and red blood cell counts. Platelet donations may occur more frequently as approved by your local blood bank.'
  },
  {
    question: 'Why is O- negative blood called the Universal Donor?',
    answer: 'Type O- negative red blood cells lack A, B, and Rh surface antigens. This means recipient immune systems will not immediately reject transfused O- red blood cells, making it crucial in trauma rooms when blood grouping cannot be pre-tested.'
  },
  {
    question: 'What should I do to prepare for my blood donation day?',
    answer: 'Hydrate generously with water, eat a nourishing iron-rich meal within 2-3 hours of donating, avoid alcohol and caffeine, get a good night’s rest, and bring a valid government-issued photo ID.'
  },
  {
    question: 'How do hospitals update their blood inventory on LifeDrop?',
    answer: 'Verified hospitals and blood banks log into their specialized Hospital Dashboard to log collection batches, track expiry dates, monitor reserve levels, and dispatch alerts to matching donors when emergency shortages arise.'
  }
];
