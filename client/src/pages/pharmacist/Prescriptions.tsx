import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import type { Prescription } from '../../types';

// Mock data
const MOCK_PRESCRIPTIONS: Prescription[] = [
    {
        id: 'PRE-001',
        patientId: 'P-1001',
        patientName: 'John Doe',
        doctorId: 'D-101',
        doctorName: 'Dr. Sarah Wilson',
        status: 'pending',
        createdAt: '2024-03-20',
        medicines: [
            {
                medicineId: 'MED-001',
                medicineName: 'Paracetamol',
                dosage: '500mg',
                frequency: 'Twice daily',
                duration: '5 days',
                quantity: 10,
            }
        ]
    },
    {
        id: 'PRE-002',
        patientId: 'P-1002',
        patientName: 'Jane Smith',
        doctorId: 'D-102',
        doctorName: 'Dr. Michael Brown',
        status: 'dispensed',
        createdAt: '2024-03-19',
        medicines: []
    },
];

const PharmacistPrescriptions: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [prescriptions] = useState<Prescription[]>(MOCK_PRESCRIPTIONS);

    const columns = [
        {
            header: 'Prescription ID',
            accessorKey: 'id' as keyof Prescription,
            className: 'font-medium text-gray-900',
        },
        {
            header: 'Patient',
            accessorKey: 'patientName' as keyof Prescription,
        },
        {
            header: 'Doctor',
            accessorKey: 'doctorName' as keyof Prescription,
        },
        {
            header: 'Date',
            accessorKey: 'createdAt' as keyof Prescription,
        },
        {
            header: 'Status',
            accessorKey: 'status' as keyof Prescription,
            cell: (item: Prescription) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${item.status === 'dispensed' ? 'bg-green-100 text-green-800' :
                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}`}>
                    {item.status}
                </span>
            ),
        },
        {
            header: 'Actions',
            cell: () => (
                <Button variant="ghost" size="sm">Process</Button>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-lexend">Prescriptions</h1>
                    <p className="text-sm text-gray-500">Process patient prescriptions</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <Input
                            placeholder="Search prescriptions..."
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
                    data={prescriptions}
                    columns={columns}
                    keyExtractor={(item) => item.id}
                />
            </div>
        </div>
    );
};

export default PharmacistPrescriptions;
