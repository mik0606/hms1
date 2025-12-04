import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import { useAppointments } from '../../hooks/useApi';
import type { Appointment } from '../../types';

const AdminAppointments: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const { data: appointmentsData, loading, error } = useAppointments();

    const appointments = appointmentsData?.appointments || [];

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id' as keyof Appointment,
            className: 'font-medium text-gray-900',
        },
        {
            header: 'Patient',
            accessorKey: 'patientName' as keyof Appointment,
        },
        {
            header: 'Doctor',
            accessorKey: 'doctorName' as keyof Appointment,
        },
        {
            header: 'Date & Time',
            cell: (apt: Appointment) => (
                <div>
                    <div className="font-medium text-gray-900">{apt.date}</div>
                    <div className="text-xs text-gray-500">{apt.time}</div>
                </div>
            ),
        },
        {
            header: 'Type',
            accessorKey: 'type' as keyof Appointment,
            cell: (apt: Appointment) => (
                <span className="capitalize">{apt.type}</span>
            ),
        },
        {
            header: 'Status',
            accessorKey: 'status' as keyof Appointment,
            cell: (apt: Appointment) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        apt.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            apt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'}`}>
                    {apt.status}
                </span>
            ),
        },
        {
            header: 'Actions',
            cell: () => (
                <Button variant="ghost" size="sm">View</Button>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-lexend">Appointments</h1>
                    <p className="text-sm text-gray-500">Manage all appointments</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Appointment
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <Input
                            placeholder="Search appointments..."
                            icon={<Search className="h-4 w-4" />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="sm:w-auto">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        Error loading appointments: {error}
                    </div>
                )}

                {!loading && !error && (
                    <Table
                        data={appointments}
                        columns={columns}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminAppointments;
