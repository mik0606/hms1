/**
 * API Configuration
 * Mirrors api_constants.dart from Flutter app
 */

export const API_CONFIG = {
    // Base URL - matches Flutter's ApiConfig.baseUrl
    BASE_URL: 'http://localhost:3000',

    // Alternative URLs for different environments
    DEV_URL: 'http://localhost:3000',
    STAGING_URL: 'http://10.230.173.132:3000',

    // Request timeout
    TIMEOUT: 30000,

    // Token storage key
    TOKEN_KEY: 'x-auth-token',
} as const;

/**
 * API Endpoints - matches Flutter's endpoint classes
 */
export const API_ENDPOINTS = {
    // Auth endpoints
    auth: {
        login: '/api/auth/login',
        logout: '/api/auth/logout',
        validateToken: '/api/auth/validate-token',
        changePassword: '/api/auth/change-password',
    },

    // Patient endpoints
    patients: {
        getAll: (doctorId?: string) =>
            doctorId ? `/api/patients?doctorId=${doctorId}` : '/api/patients',
        getById: (id: string) => `/api/patients/${id}`,
        create: () => '/api/patients',
        update: (id: string) => `/api/patients/${id}`,
        delete: (id: string) => `/api/patients/${id}`,
        search: (query: string) => `/api/patients/search?q=${query}`,

        // Vitals
        getVitals: (patientId: string) => `/api/patients/${patientId}/vitals`,
        addVitals: (patientId: string) => `/api/patients/${patientId}/vitals`,
        getLatestVitals: (patientId: string) => `/api/patients/${patientId}/vitals/latest`,

        // Documents
        getDocuments: (patientId: string) => `/api/patients/${patientId}/documents`,
        uploadDocument: (patientId: string) => `/api/patients/${patientId}/documents`,
    },

    // Doctor endpoints
    doctors: {
        getMyPatients: () => '/api/doctors/patients/my',
        getAll: () => '/api/doctors',
        getDashboard: () => '/api/doctors/dashboard',
        getSchedule: (date?: string) =>
            date ? `/api/doctors/schedule?date=${date}` : '/api/doctors/schedule',
    },

    // Appointment endpoints
    appointments: {
        getAll: (params?: { status?: string; doctorId?: string; date?: string }) => {
            const queryParams = new URLSearchParams();
            if (params?.status) queryParams.append('status', params.status);
            if (params?.doctorId) queryParams.append('doctorId', params.doctorId);
            if (params?.date) queryParams.append('date', params.date);

            const query = queryParams.toString();
            return query ? `/api/appointments?${query}` : '/api/appointments';
        },
        getById: (id: string) => `/api/appointments/${id}`,
        create: () => '/api/appointments',
        update: (id: string) => `/api/appointments/${id}`,
        delete: (id: string) => `/api/appointments/${id}`,
        updateStatus: (id: string) => `/api/appointments/${id}/status`,
    },

    // Lab/Pathology endpoints
    pathology: {
        getReports: (patientId?: string) =>
            patientId ? `/api/pathology/reports?patientId=${patientId}` : '/api/pathology/reports',
        getReportById: (id: string) => `/api/pathology/reports/${id}`,
        downloadReport: (id: string) => `/api/pathology/reports/${id}/download`,
        createReport: () => '/api/pathology/reports',
        updateReport: (id: string) => `/api/pathology/reports/${id}`,
        deleteReport: (id: string) => `/api/pathology/reports/${id}`,
        getPendingTests: () => '/api/pathology/pending-tests',
    },

    // Intake form endpoints
    intake: {
        create: (patientId: string) => `/api/intake/${patientId}/intake`,
        get: (patientId: string) => `/api/intake/${patientId}/intake`,
    },

    // Scanner/Medical Documents endpoints
    scanner: {
        upload: () => '/api/scanner-enterprise/upload',
        getReports: (patientId: string) => `/api/scanner-enterprise/reports/${patientId}`,
        getPrescriptions: (patientId: string) => `/api/scanner-enterprise/prescriptions/${patientId}`,
        getLabReports: (patientId: string) => `/api/scanner-enterprise/lab-reports/${patientId}`,
        getMedicalHistory: (patientId: string) => `/api/scanner-enterprise/medical-history/${patientId}`,
        getPdf: (pdfId: string) => `/api/scanner-enterprise/pdf/${pdfId}`,
        deletePdf: (pdfId: string) => `/api/scanner-enterprise/pdf/${pdfId}`,
    },

    // Pharmacy endpoints
    pharmacy: {
        getMedicines: (search?: string) =>
            search ? `/api/pharmacy/medicines?search=${search}` : '/api/pharmacy/medicines',
        getMedicineById: (id: string) => `/api/pharmacy/medicines/${id}`,
        createMedicine: () => '/api/pharmacy/medicines',
        updateMedicine: (id: string) => `/api/pharmacy/medicines/${id}`,
        deleteMedicine: (id: string) => `/api/pharmacy/medicines/${id}`,
        getPendingPrescriptions: () => '/api/pharmacy/pending-prescriptions',
        dispensePrescription: (intakeId: string) => `/api/pharmacy/prescriptions/${intakeId}/dispense`,
        getPrescriptions: (patientId?: string) =>
            patientId ? `/api/pharmacy/prescriptions?patientId=${patientId}` : '/api/pharmacy/prescriptions',
    },

    // Staff endpoints
    staff: {
        getAll: () => '/api/staff',
        getById: (id: string) => `/api/staff/${id}`,
        create: () => '/api/staff',
        update: (id: string) => `/api/staff/${id}`,
        delete: (id: string) => `/api/staff/${id}`,
    },

    // Payroll endpoints
    payroll: {
        getAll: () => '/api/payroll',
        getById: (id: string) => `/api/payroll/${id}`,
        create: () => '/api/payroll',
        update: (id: string) => `/api/payroll/${id}`,
        delete: (id: string) => `/api/payroll/${id}`,
        approve: (id: string) => `/api/payroll/${id}/approve`,
        reject: (id: string) => `/api/payroll/${id}/reject`,
        processPayment: (id: string) => `/api/payroll/${id}/process-payment`,
        markPaid: (id: string) => `/api/payroll/${id}/mark-paid`,
        calculate: (id: string) => `/api/payroll/${id}/calculate`,
        bulkGenerate: () => '/api/payroll/bulk/generate',
        getSummary: () => '/api/payroll/summary/stats',
    },

    // Chatbot endpoints
    chatbot: {
        chat: () => '/api/bot/chat',
        listChats: () => '/api/bot/chats',
        getHistory: (userId: string) => `/api/bot/chats/${userId}`,
        clearHistory: (userId: string) => `/api/bot/chats/${userId}`,
        feedback: () => '/api/bot/chat/feedback',
    },

    // Admin dashboard endpoints
    admin: {
        getDashboard: () => '/api/admin/dashboard',
        getStats: (period?: string) =>
            period ? `/api/admin/stats?period=${period}` : '/api/admin/stats',
        getAuditLogs: (params?: { page?: number; limit?: number }) => {
            const queryParams = new URLSearchParams();
            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.limit) queryParams.append('limit', params.limit.toString());

            const query = queryParams.toString();
            return query ? `/api/admin/audit-logs?${query}` : '/api/admin/audit-logs';
        },
    },

    // Card/Quick data endpoints
    card: {
        getCard: (patientId: string) => `/api/card/${patientId}`,
        getPatientCard: (patientId: string) => `/api/card/patient/${patientId}`,
        getDoctorCard: (doctorId: string) => `/api/card/doctor/${doctorId}`,
    },
} as const;
