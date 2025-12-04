import { useState, useEffect } from 'react';
import { apiClient } from '../utils/apiClient';

/**
 * Generic hook for fetching data with loading and error states
 */
export function useFetch<T>(url: string, dependencies: any[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await apiClient.get<T>(url);
                setData(response);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch data');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, dependencies);

    return { data, loading, error };
}

/**
 * Hook for fetching patients
 */
export function usePatients(search?: string) {
    const url = search ? `/api/patients?q=${search}` : '/api/patients';
    return useFetch<any[]>(url, [search]);
}

/**
 * Hook for fetching appointments
 */
export function useAppointments(filters?: { status?: string; doctorId?: string; date?: string }) {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.doctorId) params.append('doctorId', filters.doctorId);
    if (filters?.date) params.append('date', filters.date);

    const url = `/api/appointments${params.toString() ? `?${params.toString()}` : ''}`;
    return useFetch<{ success: boolean; appointments: any[] }>(url, [filters]);
}

/**
 * Hook for fetching staff members
 */
export function useStaff(search?: string) {
    const url = search ? `/api/staff?q=${search}` : '/api/staff';
    return useFetch<{ success: boolean; staff: any[]; total: number }>(url, [search]);
}

/**
 * Hook for fetching medicines
 */
export function useMedicines(search?: string) {
    const url = search ? `/api/pharmacy/medicines?search=${search}` : '/api/pharmacy/medicines';
    return useFetch<any[]>(url, [search]);
}

/**
 * Hook for fetching prescriptions
 */
export function usePrescriptions(patientId?: string) {
    const url = patientId
        ? `/api/pharmacy/prescriptions?patientId=${patientId}`
        : '/api/pharmacy/prescriptions';
    return useFetch<any[]>(url, [patientId]);
}

/**
 * Hook for fetching pathology reports
 */
export function usePathologyReports(patientId?: string) {
    const url = patientId
        ? `/api/pathology/reports?patientId=${patientId}`
        : '/api/pathology/reports';
    return useFetch<any[]>(url, [patientId]);
}

/**
 * Hook for fetching doctor's patients
 */
export function useDoctorPatients() {
    return useFetch<any[]>('/api/doctors/patients/my', []);
}

/**
 * Hook for fetching payroll data
 */
export function usePayroll() {
    return useFetch<any[]>('/api/payroll', []);
}
