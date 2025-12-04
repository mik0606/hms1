import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import type { PatientDetails } from '../../types';

// Mock data - reusing PatientDetails but filtering for follow-up context
const MOCK_FOLLOW_UPS: PatientDetails[] = [
    {
        patientId: 'P-1002',
        name: 'Jane Smith',
        age: 32,
        gender: 'female',
        phone: '+1 234 567 8901',
        lastVisit: '2024-03-12',
        status: 'active',
        assignedDoctorName: 'Dr. Sarah Wilson',
    },
    {
        patientId: 'P-1005',
        name: 'Michael Brown',
        age: 28,
        gender: 'male',
        phone: '+1 234 567 8906',
        lastVisit: '2024-03-15',
        status: 'active',
        assignedDoctorName: 'Dr. Sarah Wilson',
    },
];

const DoctorFollowUp: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [patients] = useState<PatientDetails[]>(MOCK_FOLLOW_UPS);

    const columns = [
        {
            header: 'Patient',
            accessorKey: 'name' as keyof PatientDetails,
            cell: (patient: PatientDetails) => (
                <div>
                    <div className="font-medium text-gray-900">{patient.name}</div>
                    <div className="text-xs text-gray-500">{patient.patientId}</div>
                </div>
            ),
        },
        {
            header: 'Last Visit',
            accessorKey: 'lastVisit' as keyof PatientDetails,
        },
        {
            header: 'Contact',
            accessorKey: 'phone' as keyof PatientDetails,
        },
        {
            header: 'Status',
            accessorKey: 'status' as keyof PatientDetails,
            cell: () => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    Needs Follow-up
                </span>
            ),
        },
        {
            header: 'Actions',
            cell: () => (
                <Button variant="ghost" size="sm">Schedule</Button>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-lexend">Follow Up List</h1>
                    <p className="text-sm text-gray-500">Patients requiring follow-up appointments</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <Input
                            placeholder="Search patients..."
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
                    data={patients}
                    columns={columns}
                    keyExtractor={(item) => item.patientId}
                />
            </div>
        </div>
    );
};

export default DoctorFollowUp;
