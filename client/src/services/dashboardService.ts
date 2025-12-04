import apiClient from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';

export interface DashboardStats {
    totalPatients: number;
    totalAppointments: number;
    todayAppointments: number;
    activeStaff: number;
    totalRevenue: number; // Placeholder as backend doesn't support revenue yet
}

export const dashboardService = {
    getAdminStats: async (): Promise<DashboardStats> => {
        try {
            // Fetch total patients (using meta=1 for efficiency if supported, or just list)
            const patientsResponse = await apiClient.get(API_ENDPOINTS.patients.getAll() + '?limit=1&meta=1');
            const totalPatients = patientsResponse.total || 0;

            // Fetch all appointments to calculate today's count
            // Note: In a real app with many appointments, backend should support filtering by date
            const appointmentsResponse = await apiClient.get(API_ENDPOINTS.appointments.getAll());
            const appointments = appointmentsResponse.appointments || [];
            const totalAppointments = appointments.length;

            const today = new Date().toISOString().split('T')[0];
            const todayAppointments = appointments.filter((app: any) =>
                app.startAt && app.startAt.startsWith(today)
            ).length;

            // Fetch staff count
            const staffResponse = await apiClient.get(API_ENDPOINTS.staff.getAll() + '?limit=1');
            const activeStaff = staffResponse.total || 0;

            return {
                totalPatients,
                totalAppointments,
                todayAppointments,
                activeStaff,
                totalRevenue: 0, // Placeholder
            };
        } catch (error) {
            console.error('Failed to fetch admin dashboard stats:', error);
            // Return zeros on error to prevent UI crash
            return {
                totalPatients: 0,
                totalAppointments: 0,
                todayAppointments: 0,
                activeStaff: 0,
                totalRevenue: 0,
            };
        }
    },

    getDoctorStats: async (): Promise<any> => {
        try {
            // Fetch doctor's appointments
            const appointmentsResponse = await apiClient.get(API_ENDPOINTS.appointments.getAll());
            const appointments = appointmentsResponse.appointments || [];

            const today = new Date().toISOString().split('T')[0];
            const todayAppointments = appointments.filter((app: any) =>
                app.startAt && app.startAt.startsWith(today)
            ).length;

            const pendingAppointments = appointments.filter((app: any) =>
                app.status === 'Scheduled' || app.status === 'Pending'
            ).length;

            // Fetch doctor's patients
            const patientsResponse = await apiClient.get(API_ENDPOINTS.doctors.getMyPatients());
            const totalPatients = patientsResponse.length || 0; // Assuming it returns a list

            return {
                todayAppointments,
                pendingAppointments,
                totalPatients,
                totalHours: 0 // Placeholder
            };

        } catch (error) {
            console.error('Failed to fetch doctor dashboard stats:', error);
            return {
                todayAppointments: 0,
                pendingAppointments: 0,
                totalPatients: 0,
                totalHours: 0
            };
        }
    }
};
