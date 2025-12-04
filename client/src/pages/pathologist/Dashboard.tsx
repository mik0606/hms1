import React from 'react';
import { Activity, FileText, CheckCircle, Clock } from 'lucide-react';
import { StatsCard } from '../../components/admin/dashboard/StatsCard';

const PathologistDashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 font-lexend">Dashboard</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Pending Tests"
                    value="15"
                    subtitle="Awaiting processing"
                    icon={Clock}
                    iconColor="#3B82F6"
                    iconBgColor="#EFF6FF"
                />
                <StatsCard
                    title="Completed Today"
                    value="28"
                    subtitle="Tests finalized"
                    icon={CheckCircle}
                    iconColor="#22C55E"
                    iconBgColor="#F0FDF4"
                />
                <StatsCard
                    title="Critical Results"
                    value="3"
                    subtitle="Requires immediate attention"
                    icon={Activity}
                    iconColor="#EF4444"
                    iconBgColor="#FEF2F2"
                />
                <StatsCard
                    title="Total Reports"
                    value="1,245"
                    subtitle="All time records"
                    icon={FileText}
                    iconColor="#F59E0B"
                    iconBgColor="#FFFBEB"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Recent Test Requests */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Test Requests</h2>
                    <div className="space-y-4">
                        <p className="text-gray-500 text-sm">No new test requests at the moment.</p>
                        {/* TODO: Add test request list component here */}
                    </div>
                </div>

                {/* Right Column - Notifications / Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                                <div>
                                    <p className="text-sm text-gray-900">New sample received for Patient #1005</p>
                                    <p className="text-xs text-gray-500">5 mins ago</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-red-500" />
                                <div>
                                    <p className="text-sm text-gray-900">Urgent blood test request from ER</p>
                                    <p className="text-xs text-gray-500">15 mins ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PathologistDashboard;
