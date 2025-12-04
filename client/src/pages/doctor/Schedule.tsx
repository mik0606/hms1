import React, { useState } from 'react';
import { Search, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import type { Appointment } from '../../types';

// Mock data
const MOCK_SCHEDULE: Appointment[] = [
    {
        id: 'APT-001',
        patientId: 'P-1001',
        patientName: 'John Doe',
        doctorId: 'D-101',
        doctorName: 'Dr. Sarah Wilson',
        date: '2024-03-20',
        time: '09:00',
        status: 'scheduled',
        type: 'consultation',
        reason: 'Regular checkup',
    },
    {
        id: 'APT-003',
        patientId: 'P-1003',
        patientName: 'Robert Johnson',
        doctorId: 'D-101',
        doctorName: 'Dr. Sarah Wilson',
        date: '2024-03-20',
        time: '11:00',
        status: 'confirmed',
        type: 'follow-up',
        reason: 'Post-surgery review',
    },
];

const DoctorSchedule: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [appointments] = useState<Appointment[]>(MOCK_SCHEDULE);

    const columns = [
        {
            header: 'Time',
            accessorKey: 'time' as keyof Appointment,
            className: 'font-medium text-gray-900',
        },
        {
            header: 'Patient',
            accessorKey: 'patientName' as keyof Appointment,
        },
        {
            header: 'Type',
            accessorKey: 'type' as keyof Appointment,
            cell: (apt: Appointment) => (
                <span className="capitalize">{apt.type}</span>
            ),
        },
        {
            header: 'Reason',
            accessorKey: 'reason' as keyof Appointment,
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
                <Button variant="ghost" size="sm">Details</Button>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-lexend">Schedule</h1>
                    <p className="text-sm text-gray-500">Manage your appointments</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Today
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <Input
                            placeholder="Search schedule..."
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

                <Table
                    data={appointments}
                    columns={columns}
                    keyExtractor={(item) => item.id}
                />
            </div>
        </div>
    );
};

export default DoctorSchedule;
