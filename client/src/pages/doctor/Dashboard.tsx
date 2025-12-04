import React, { useEffect, useState } from 'react';
import { Users, Calendar, Clock, Activity } from 'lucide-react';
import { StatsCard } from '../../components/admin/dashboard/StatsCard';
import { dashboardService } from '../../services/dashboardService';

const DoctorDashboard: React.FC = () => {
    const [stats, setStats] = useState({
        todayAppointments: 0,
        pendingAppointments: 0,
        totalPatients: 0,
        totalHours: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await dashboardService.getDoctorStats();
                setStats(data);
            } catch (error) {
                console.error('Error fetching doctor dashboard stats:', error);
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
                    title="My Patients"
                    value={stats.totalPatients.toString()}
                    subtitle="Assigned patients"
                    icon={Users}
                    iconColor="#3B82F6"
                    iconBgColor="#EFF6FF"
                />
                <StatsCard
                    title="Appointments"
                    value={stats.todayAppointments.toString()}
                    subtitle="Today's schedule"
                    icon={Calendar}
                    iconColor="#22C55E"
                    iconBgColor="#F0FDF4"
                />
                <StatsCard
                    title="Pending"
                    value={stats.pendingAppointments.toString()}
                    subtitle="Requires action"
                    icon={Activity}
                    iconColor="#EF4444"
                    iconBgColor="#FEF2F2"
                />
                <StatsCard
                    title="Consultations"
                    value={stats.todayAppointments.toString()} // Placeholder logic
                    subtitle="Completed today"
                    icon={Clock}
                    iconColor="#F59E0B"
                    iconBgColor="#FFFBEB"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Upcoming Appointments */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h2>
                    <div className="space-y-4">
                        {stats.todayAppointments === 0 ? (
                            <p className="text-gray-500 text-sm">No appointments scheduled for today.</p>
                        ) : (
                            <p className="text-gray-500 text-sm">You have {stats.todayAppointments} appointments today.</p>
                        )}
                        {/* TODO: Add appointment list component here */}
                    </div>
                </div>

                {/* Right Column - Quick Actions / Notifications */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                                <div>
                                    <p className="text-sm text-gray-900">System notification</p>
                                    <p className="text-xs text-gray-500">Just now</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
