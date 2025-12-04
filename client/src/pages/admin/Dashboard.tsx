import React, { useEffect, useState } from 'react';
import {
    Receipt,
    Users,
    Calendar as CalendarIcon,
    Bed
} from 'lucide-react';
import { StatsCard } from '../../components/admin/dashboard/StatsCard';
import { PatientOverviewChart } from '../../components/admin/dashboard/PatientOverviewChart';
import { RevenueChart } from '../../components/admin/dashboard/RevenueChart';
import { PatientDeptCard } from '../../components/admin/dashboard/PatientDeptCard';
import { ReportCard } from '../../components/admin/dashboard/ReportCard';
import { CalendarCard } from '../../components/admin/dashboard/CalendarCard';
import { dashboardService, type DashboardStats } from '../../services/dashboardService';

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats>({
        totalPatients: 0,
        totalAppointments: 0,
        todayAppointments: 0,
        activeStaff: 0,
        totalRevenue: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await dashboardService.getAdminStats();
                setStats(data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 font-lexend">Dashboard</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Invoice"
                    value={`$${stats.totalRevenue.toLocaleString()}`}
                    subtitle="Revenue"
                    icon={Receipt}
                    iconColor="#3B82F6"
                    iconBgColor="#EFF6FF"
                />
                <StatsCard
                    title="Total Patients"
                    value={stats.totalPatients.toString()}
                    subtitle="Registered patients"
                    icon={Users}
                    iconColor="#22C55E"
                    iconBgColor="#F0FDF4"
                />
                <StatsCard
                    title="Appointments"
                    value={stats.todayAppointments.toString()}
                    subtitle="For today"
                    icon={CalendarIcon}
                    iconColor="#EF4444"
                    iconBgColor="#FEF2F2"
                />
                <StatsCard
                    title="Active Staff"
                    value={stats.activeStaff.toString()}
                    subtitle="Currently on duty"
                    icon={Bed} // Using Bed icon as placeholder for Staff/Bed availability if needed, or switch to Users
                    iconColor="#3B82F6"
                    iconBgColor="#EFF6FF"
                />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Column (Flex 3) */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Charts Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[320px]">
                        <PatientOverviewChart />
                        <RevenueChart />
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
                        <PatientDeptCard />
                        <ReportCard />
                    </div>
                </div>

                {/* Right Sidebar (Flex 1) */}
                <div className="lg:col-span-1 h-full">
                    <CalendarCard />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
