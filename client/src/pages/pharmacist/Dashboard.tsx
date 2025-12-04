import React from 'react';
import { Pill, FileText, AlertCircle, TrendingUp } from 'lucide-react';
import { StatsCard } from '../../components/admin/dashboard/StatsCard';

const PharmacistDashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 font-lexend">Dashboard</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Medicines"
                    value="2,450"
                    subtitle="In stock"
                    icon={Pill}
                    iconColor="#3B82F6"
                    iconBgColor="#EFF6FF"
                />
                <StatsCard
                    title="Prescriptions"
                    value="45"
                    subtitle="Pending processing"
                    icon={FileText}
                    iconColor="#22C55E"
                    iconBgColor="#F0FDF4"
                />
                <StatsCard
                    title="Low Stock"
                    value="12"
                    subtitle="Items below threshold"
                    icon={AlertCircle}
                    iconColor="#EF4444"
                    iconBgColor="#FEF2F2"
                />
                <StatsCard
                    title="Daily Sales"
                    value="$1,250"
                    subtitle="Total revenue today"
                    icon={TrendingUp}
                    iconColor="#F59E0B"
                    iconBgColor="#FFFBEB"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Recent Prescriptions */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Prescriptions</h2>
                    <div className="space-y-4">
                        <p className="text-gray-500 text-sm">No recent prescriptions to display.</p>
                        {/* TODO: Add prescription list component here */}
                    </div>
                </div>

                {/* Right Column - Low Stock Alerts */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alerts</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-red-800">Paracetamol 500mg</p>
                                    <p className="text-xs text-red-600">Stock: 45 (Min: 100)</p>
                                </div>
                                <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">Critical</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-yellow-800">Amoxicillin 250mg</p>
                                    <p className="text-xs text-yellow-600">Stock: 120 (Min: 150)</p>
                                </div>
                                <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Low</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PharmacistDashboard;
