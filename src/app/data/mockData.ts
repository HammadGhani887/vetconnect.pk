export interface Owner {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  idNumber: string;
  notes: string;
  createdAt: string;
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: string;
  breed: string;
  gender: string;
  dob: string;
  weight: number;
  color: string;
  microchipId: string;
  tagId: string;
  photo: string;
  notes: string;
  createdAt: string;
}

export interface Visit {
  id: string;
  petId: string;
  date: string;
  reason: string;
  diagnosis: string;
  weight: number;
  temperature: number;
  vet: string;
  status: 'in_progress' | 'completed';
  createdAt: string;
}

export interface Treatment {
  id: string;
  visitId: string;
  petId: string;
  type: 'medication' | 'surgery' | 'grooming' | 'other';
  description: string;
  medicationName: string;
  dosage: string;
  duration: string;
  cost: number;
  date: string;
}

export interface Vaccination {
  id: string;
  petId: string;
  vaccineName: string;
  dateGiven: string;
  nextDueDate: string;
  batchNumber: string;
  administeredBy: string;
}

export interface FollowUp {
  id: string;
  petId: string;
  visitId: string;
  date: string;
  reason: string;
  notes: string;
  status: 'pending' | 'completed' | 'missed';
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  visitId: string;
  petId: string;
  date: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentStatus: 'paid' | 'unpaid' | 'partial';
  paymentMethod: 'cash' | 'card' | 'transfer' | '';
}

export interface SyncLog {
  id: string;
  timestamp: string;
  recordType: string;
  recordId: string;
  status: 'synced' | 'pending' | 'failed';
  error?: string;
}

export interface ClinicProfile {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  licenseNumber: string;
  taxRate: number;
}

export const clinicProfile: ClinicProfile = {
  name: "PawCare Veterinary Clinic",
  address: "123 Animal Care Street, City, State 12345",
  phone: "+1 (555) 123-4567",
  email: "info@pawcare.clinic",
  logo: "",
  licenseNumber: "VET-2024-00123",
  taxRate: 8.5,
};

export const owners: Owner[] = [
  { id: "o1", name: "Ahmed Al-Rashid", phone: "+966 50 123 4567", email: "ahmed@email.com", address: "123 Main St, Riyadh", idNumber: "1234567890", notes: "Prefers morning appointments", createdAt: "2024-01-15" },
  { id: "o2", name: "Sara Mohammed", phone: "+966 55 987 6543", email: "sara.m@email.com", address: "45 Rose Ave, Jeddah", idNumber: "0987654321", notes: "", createdAt: "2024-02-03" },
  { id: "o3", name: "Khalid Ibrahim", phone: "+966 56 456 7890", email: "khalid.i@email.com", address: "78 Palm Blvd, Dammam", idNumber: "1122334455", notes: "Has 3 cats", createdAt: "2024-02-18" },
  { id: "o4", name: "Fatima Al-Zahra", phone: "+966 54 321 0987", email: "fatima.z@email.com", address: "90 Green St, Riyadh", idNumber: "5544332211", notes: "", createdAt: "2024-03-05" },
  { id: "o5", name: "Omar Hassan", phone: "+966 58 654 3210", email: "omar.h@email.com", address: "12 Blue Lane, Khobar", idNumber: "6677889900", notes: "Allergic to certain meds", createdAt: "2024-03-22" },
  { id: "o6", name: "Nour Al-Din", phone: "+966 59 111 2233", email: "nour.d@email.com", address: "56 Cedar Rd, Medina", idNumber: "1029384756", notes: "", createdAt: "2024-04-10" },
];

export const pets: Pet[] = [
  { id: "p1", ownerId: "o1", name: "Max", species: "Dog", breed: "Golden Retriever", gender: "Male", dob: "2020-03-15", weight: 28.5, color: "Golden", microchipId: "MC001234", tagId: "T0012", photo: "", notes: "Friendly, loves water", createdAt: "2024-01-15" },
  { id: "p2", ownerId: "o1", name: "Luna", species: "Cat", breed: "Persian", gender: "Female", dob: "2021-07-20", weight: 3.8, color: "White", microchipId: "MC001235", tagId: "T0013", photo: "", notes: "", createdAt: "2024-01-15" },
  { id: "p3", ownerId: "o2", name: "Buddy", species: "Dog", breed: "Labrador", gender: "Male", dob: "2019-11-10", weight: 32.0, color: "Black", microchipId: "MC002345", tagId: "T0024", photo: "", notes: "Hip issues, gentle handling", createdAt: "2024-02-03" },
  { id: "p4", ownerId: "o3", name: "Whiskers", species: "Cat", breed: "Siamese", gender: "Female", dob: "2022-01-05", weight: 3.2, color: "Cream/Brown", microchipId: "MC003456", tagId: "T0035", photo: "", notes: "", createdAt: "2024-02-18" },
  { id: "p5", ownerId: "o3", name: "Shadow", species: "Cat", breed: "British Shorthair", gender: "Male", dob: "2021-09-12", weight: 5.1, color: "Gray", microchipId: "MC003457", tagId: "T0036", photo: "", notes: "Shy around strangers", createdAt: "2024-02-18" },
  { id: "p6", ownerId: "o4", name: "Daisy", species: "Dog", breed: "Poodle", gender: "Female", dob: "2022-05-30", weight: 7.2, color: "White", microchipId: "MC004567", tagId: "T0047", photo: "", notes: "", createdAt: "2024-03-05" },
  { id: "p7", ownerId: "o5", name: "Rocky", species: "Dog", breed: "German Shepherd", gender: "Male", dob: "2018-08-22", weight: 35.0, color: "Black/Tan", microchipId: "MC005678", tagId: "T0058", photo: "", notes: "On long-term medication", createdAt: "2024-03-22" },
  { id: "p8", ownerId: "o6", name: "Mimi", species: "Cat", breed: "Ragdoll", gender: "Female", dob: "2023-02-14", weight: 2.8, color: "Blue/White", microchipId: "MC006789", tagId: "T0069", photo: "", notes: "", createdAt: "2024-04-10" },
];

export const visits: Visit[] = [
  { id: "v1", petId: "p1", date: "2024-04-25", reason: "Annual checkup", diagnosis: "Healthy, minor ear infection", weight: 28.5, temperature: 38.5, vet: "Dr. Salem", status: "completed", createdAt: "2024-04-25" },
  { id: "v2", petId: "p1", date: "2024-03-10", reason: "Limping on right leg", diagnosis: "Sprained ligament", weight: 28.2, temperature: 38.8, vet: "Dr. Salem", status: "completed", createdAt: "2024-03-10" },
  { id: "v3", petId: "p2", date: "2024-04-20", reason: "Sneezing and runny nose", diagnosis: "Upper respiratory infection", weight: 3.7, temperature: 39.1, vet: "Dr. Aisha", status: "completed", createdAt: "2024-04-20" },
  { id: "v4", petId: "p3", date: "2024-04-27", reason: "Routine checkup", diagnosis: "In progress", weight: 32.1, temperature: 38.6, vet: "Dr. Salem", status: "in_progress", createdAt: "2024-04-27" },
  { id: "v5", petId: "p7", date: "2024-04-26", reason: "Medication refill", diagnosis: "Arthritis management", weight: 34.8, temperature: 38.4, vet: "Dr. Aisha", status: "completed", createdAt: "2024-04-26" },
  { id: "v6", petId: "p6", date: "2024-04-24", reason: "Vaccination", diagnosis: "Healthy", weight: 7.3, temperature: 38.7, vet: "Dr. Salem", status: "completed", createdAt: "2024-04-24" },
  { id: "v7", petId: "p4", date: "2024-04-22", reason: "Vomiting and lethargy", diagnosis: "Gastritis", weight: 3.1, temperature: 39.5, vet: "Dr. Aisha", status: "completed", createdAt: "2024-04-22" },
];

export const treatments: Treatment[] = [
  { id: "t1", visitId: "v1", petId: "p1", type: "medication", description: "Ear drops for infection", medicationName: "Otibiotic", dosage: "5 drops twice daily", duration: "7 days", cost: 35.00, date: "2024-04-25" },
  { id: "t2", visitId: "v1", petId: "p1", type: "other", description: "Ear cleaning", medicationName: "", dosage: "", duration: "", cost: 20.00, date: "2024-04-25" },
  { id: "t3", visitId: "v2", petId: "p1", type: "medication", description: "Anti-inflammatory", medicationName: "Meloxicam", dosage: "1mg/kg daily", duration: "5 days", cost: 45.00, date: "2024-03-10" },
  { id: "t4", visitId: "v3", petId: "p2", type: "medication", description: "Antibiotic for respiratory infection", medicationName: "Doxycycline", dosage: "10mg/kg daily", duration: "10 days", cost: 55.00, date: "2024-04-20" },
  { id: "t5", visitId: "v5", petId: "p7", type: "medication", description: "Arthritis pain management", medicationName: "Carprofen", dosage: "2.2mg/kg twice daily", duration: "30 days", cost: 80.00, date: "2024-04-26" },
  { id: "t6", visitId: "v6", petId: "p6", type: "other", description: "Annual vaccination package", medicationName: "", dosage: "", duration: "", cost: 120.00, date: "2024-04-24" },
  { id: "t7", visitId: "v7", petId: "p4", type: "medication", description: "Anti-nausea and stomach protector", medicationName: "Metoclopramide", dosage: "0.2mg/kg 3x daily", duration: "5 days", cost: 40.00, date: "2024-04-22" },
];

export const vaccinations: Vaccination[] = [
  { id: "vac1", petId: "p1", vaccineName: "Rabies", dateGiven: "2024-04-25", nextDueDate: "2025-04-25", batchNumber: "RAB-2024-001", administeredBy: "Dr. Salem" },
  { id: "vac2", petId: "p1", vaccineName: "DHPP", dateGiven: "2024-01-15", nextDueDate: "2025-01-15", batchNumber: "DHPP-2024-012", administeredBy: "Dr. Salem" },
  { id: "vac3", petId: "p2", vaccineName: "FVRCP", dateGiven: "2024-03-10", nextDueDate: "2025-03-10", batchNumber: "FVRCP-2024-008", administeredBy: "Dr. Aisha" },
  { id: "vac4", petId: "p2", vaccineName: "Rabies", dateGiven: "2023-04-20", nextDueDate: "2024-04-20", batchNumber: "RAB-2023-045", administeredBy: "Dr. Aisha" },
  { id: "vac5", petId: "p6", vaccineName: "Rabies", dateGiven: "2024-04-24", nextDueDate: "2025-04-24", batchNumber: "RAB-2024-056", administeredBy: "Dr. Salem" },
  { id: "vac6", petId: "p6", vaccineName: "DHPP", dateGiven: "2024-04-24", nextDueDate: "2025-04-24", batchNumber: "DHPP-2024-034", administeredBy: "Dr. Salem" },
  { id: "vac7", petId: "p3", vaccineName: "Bordetella", dateGiven: "2024-02-15", nextDueDate: "2024-08-15", batchNumber: "BOR-2024-011", administeredBy: "Dr. Salem" },
];

export const followUps: FollowUp[] = [
  { id: "f1", petId: "p1", visitId: "v1", date: "2024-05-05", reason: "Ear infection recheck", notes: "Check if infection cleared", status: "pending" },
  { id: "f2", petId: "p2", visitId: "v3", date: "2024-04-30", reason: "Respiratory infection followup", notes: "Recheck breathing", status: "pending" },
  { id: "f3", petId: "p3", visitId: "v4", date: "2024-05-10", reason: "Post checkup followup", notes: "", status: "pending" },
  { id: "f4", petId: "p7", visitId: "v5", date: "2024-04-20", reason: "Arthritis medication review", notes: "Check pain levels", status: "completed" },
  { id: "f5", petId: "p4", visitId: "v7", date: "2024-04-25", reason: "Gastritis recheck", notes: "Ensure recovery", status: "missed" },
  { id: "f6", petId: "p1", visitId: "v2", date: "2024-03-20", reason: "Ligament sprain recheck", notes: "", status: "completed" },
];

export const invoices: Invoice[] = [
  {
    id: "inv1", invoiceNumber: "INV-2024-001", visitId: "v1", petId: "p1",
    date: "2024-04-25",
    items: [
      { id: "ii1", description: "Consultation fee", quantity: 1, unitPrice: 50.00 },
      { id: "ii2", description: "Ear cleaning", quantity: 1, unitPrice: 20.00 },
      { id: "ii3", description: "Otibiotic ear drops", quantity: 1, unitPrice: 35.00 },
    ],
    subtotal: 105.00, tax: 8.93, discount: 0, total: 113.93,
    paymentStatus: "paid", paymentMethod: "card"
  },
  {
    id: "inv2", invoiceNumber: "INV-2024-002", visitId: "v3", petId: "p2",
    date: "2024-04-20",
    items: [
      { id: "ii4", description: "Consultation fee", quantity: 1, unitPrice: 50.00 },
      { id: "ii5", description: "Doxycycline 100mg", quantity: 1, unitPrice: 55.00 },
    ],
    subtotal: 105.00, tax: 8.93, discount: 10.00, total: 103.93,
    paymentStatus: "paid", paymentMethod: "cash"
  },
  {
    id: "inv3", invoiceNumber: "INV-2024-003", visitId: "v5", petId: "p7",
    date: "2024-04-26",
    items: [
      { id: "ii6", description: "Consultation fee", quantity: 1, unitPrice: 50.00 },
      { id: "ii7", description: "Carprofen 100mg x30", quantity: 1, unitPrice: 80.00 },
    ],
    subtotal: 130.00, tax: 11.05, discount: 0, total: 141.05,
    paymentStatus: "unpaid", paymentMethod: ""
  },
  {
    id: "inv4", invoiceNumber: "INV-2024-004", visitId: "v6", petId: "p6",
    date: "2024-04-24",
    items: [
      { id: "ii8", description: "Vaccination package", quantity: 1, unitPrice: 120.00 },
      { id: "ii9", description: "Consultation fee", quantity: 1, unitPrice: 50.00 },
    ],
    subtotal: 170.00, tax: 14.45, discount: 0, total: 184.45,
    paymentStatus: "paid", paymentMethod: "transfer"
  },
  {
    id: "inv5", invoiceNumber: "INV-2024-005", visitId: "v7", petId: "p4",
    date: "2024-04-22",
    items: [
      { id: "ii10", description: "Consultation fee", quantity: 1, unitPrice: 50.00 },
      { id: "ii11", description: "Metoclopramide", quantity: 1, unitPrice: 40.00 },
    ],
    subtotal: 90.00, tax: 7.65, discount: 0, total: 97.65,
    paymentStatus: "partial", paymentMethod: "cash"
  },
];

export const syncLogs: SyncLog[] = [
  { id: "sl1", timestamp: "2024-04-27T09:30:00", recordType: "Visit", recordId: "v4", status: "pending" },
  { id: "sl2", timestamp: "2024-04-26T15:45:00", recordType: "Invoice", recordId: "inv3", status: "pending" },
  { id: "sl3", timestamp: "2024-04-26T15:44:00", recordType: "Treatment", recordId: "t5", status: "synced" },
  { id: "sl4", timestamp: "2024-04-25T10:20:00", recordType: "Vaccination", recordId: "vac1", status: "synced" },
  { id: "sl5", timestamp: "2024-04-24T14:10:00", recordType: "Invoice", recordId: "inv4", status: "synced" },
  { id: "sl6", timestamp: "2024-04-24T14:05:00", recordType: "Visit", recordId: "v6", status: "failed", error: "Network timeout" },
];
