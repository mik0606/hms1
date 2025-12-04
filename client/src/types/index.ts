/**
 * TypeScript type definitions
 * Mirrors Flutter Models from lib/Models/
 */

// ============================================================================
// User & Auth Types
// ============================================================================

export type UserRole = 'admin' | 'doctor' | 'pharmacist' | 'pathologist' | 'staff';

export interface User {
    id: string;
    email: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
    phone?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Admin extends User {
    role: 'admin';
    permissions?: string[];
}

export interface Doctor extends User {
    role: 'doctor';
    specialization?: string;
    qualification?: string;
    experience?: number;
    consultationFee?: number;
    availableDays?: string[];
    availableTimeSlots?: string[];
}

export interface Pharmacist extends User {
    role: 'pharmacist';
    licenseNumber?: string;
}

export interface Pathologist extends User {
    role: 'pathologist';
    specialization?: string;
    licenseNumber?: string;
}

export interface Staff extends User {
    role: 'staff';
    department?: string;
    position?: string;
    salary?: number;
    joiningDate?: string;
    status?: 'active' | 'inactive';
}

// ============================================================================
// Patient Types
// ============================================================================

export interface PatientDetails {
    patientId: string;
    name: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    gender?: 'male' | 'female' | 'other';
    dateOfBirth?: string;
    age?: number;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    bloodGroup?: string;
    emergencyContact?: string;
    emergencyContactName?: string;
    medicalHistory?: string[];
    allergies?: string[];
    currentMedications?: string[];
    insuranceProvider?: string;
    insuranceNumber?: string;
    assignedDoctor?: string;
    assignedDoctorName?: string;
    status?: 'active' | 'inactive' | 'discharged';
    createdAt?: string;
    updatedAt?: string;
    lastVisit?: string;
}

export interface PatientVitals {
    id?: string;
    patientId: string;
    recordedAt: string;
    recordedBy?: string;
    temperature?: number; // in Celsius
    bloodPressureSystolic?: number;
    bloodPressureDiastolic?: number;
    heartRate?: number; // bpm
    respiratoryRate?: number; // breaths per minute
    oxygenSaturation?: number; // percentage
    weight?: number; // in kg
    height?: number; // in cm
    bmi?: number;
    notes?: string;
}

// ============================================================================
// Appointment Types
// ============================================================================

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';

export interface Appointment {
    id: string;
    patientId: string;
    patientName?: string;
    doctorId: string;
    doctorName?: string;
    date: string; // ISO date string
    time: string; // HH:mm format
    duration?: number; // in minutes
    status: AppointmentStatus;
    type?: 'consultation' | 'follow-up' | 'emergency' | 'routine';
    reason?: string;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AppointmentDraft {
    id?: string;
    clientName: string;
    date: string;
    time: string;
    doctorId?: string;
    patientId?: string;
    reason?: string;
    type?: string;
    status?: AppointmentStatus;
}

// ============================================================================
// Dashboard Types
// ============================================================================

export interface DashboardStats {
    totalPatients?: number;
    todayAppointments?: number;
    pendingAppointments?: number;
    completedAppointments?: number;
    totalRevenue?: number;
    pendingPayments?: number;
    activeStaff?: number;
    pendingLabTests?: number;
    pendingPrescriptions?: number;
}

export interface DashboardAppointment {
    id: string;
    patientName: string;
    doctorName?: string;
    time: string;
    status: AppointmentStatus;
    type?: string;
}

// ============================================================================
// Pharmacy Types
// ============================================================================

export interface Medicine {
    id: string;
    name: string;
    genericName?: string;
    manufacturer?: string;
    category?: string;
    dosageForm?: string; // tablet, capsule, syrup, etc.
    strength?: string; // e.g., "500mg"
    unitPrice?: number;
    stockQuantity?: number;
    reorderLevel?: number;
    expiryDate?: string;
    batchNumber?: string;
    description?: string;
    sideEffects?: string[];
    contraindications?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface Prescription {
    id: string;
    patientId: string;
    patientName?: string;
    doctorId: string;
    doctorName?: string;
    intakeId?: string;
    medicines: PrescriptionMedicine[];
    instructions?: string;
    status?: 'pending' | 'dispensed' | 'cancelled';
    dispensedBy?: string;
    dispensedAt?: string;
    createdAt?: string;
}

export interface PrescriptionMedicine {
    medicineId: string;
    medicineName: string;
    dosage: string;
    frequency: string;
    duration: string;
    quantity: number;
    instructions?: string;
}

// ============================================================================
// Pathology Types
// ============================================================================

export interface PathologyReport {
    id: string;
    patientId: string;
    patientName?: string;
    testName: string;
    testType?: string;
    orderedBy?: string; // doctor ID
    orderedByName?: string;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    sampleCollectedAt?: string;
    reportDate?: string;
    results?: PathologyTestResult[];
    interpretation?: string;
    technician?: string;
    pathologist?: string;
    pdfUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PathologyTestResult {
    parameter: string;
    value: string;
    unit?: string;
    normalRange?: string;
    flag?: 'normal' | 'high' | 'low' | 'critical';
}

// ============================================================================
// Intake Form Types
// ============================================================================

export interface IntakeForm {
    id: string;
    patientId: string;
    doctorId?: string;
    chiefComplaint: string;
    presentIllness?: string;
    symptoms?: string[];
    vitalSigns?: PatientVitals;
    diagnosis?: string;
    treatmentPlan?: string;
    prescriptions?: PrescriptionMedicine[];
    labTests?: string[];
    followUpDate?: string;
    followUpNotes?: string;
    notes?: string;
    status?: 'draft' | 'completed';
    createdAt?: string;
    updatedAt?: string;
}

// ============================================================================
// Payroll Types
// ============================================================================

export interface Payroll {
    id: string;
    staffId: string;
    staffName?: string;
    month: string; // YYYY-MM format
    basicSalary: number;
    allowances?: number;
    deductions?: number;
    netSalary: number;
    status: 'pending' | 'approved' | 'rejected' | 'paid';
    approvedBy?: string;
    approvedAt?: string;
    paidAt?: string;
    paymentMethod?: string;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
}

// ============================================================================
// Medical Document Types
// ============================================================================

export interface MedicalDocument {
    id: string;
    patientId: string;
    type: 'prescription' | 'lab-report' | 'medical-history' | 'other';
    title: string;
    description?: string;
    uploadedBy?: string;
    uploadedAt: string;
    fileUrl?: string;
    pdfId?: string;
    extractedData?: any;
}

// ============================================================================
// Chatbot Types
// ============================================================================

export interface ChatMessage {
    id: string;
    conversationId: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    feedback?: 'positive' | 'negative';
}

export interface Conversation {
    id: string;
    userId: string;
    title?: string;
    messages: ChatMessage[];
    createdAt: string;
    updatedAt: string;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T = any> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// ============================================================================
// Auth Response Types
// ============================================================================

export interface LoginResponse {
    accessToken: string;
    refreshToken?: string;
    sessionId?: string;
    user: User | Admin | Doctor | Pharmacist | Pathologist;
}

export interface AuthResult {
    user: User | Admin | Doctor | Pharmacist | Pathologist;
    token: string;
}
