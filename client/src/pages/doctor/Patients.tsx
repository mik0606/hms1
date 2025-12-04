import React, { useState } from 'react';
import { Search, Filter, FileText } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import type { PatientDetails } from '../../types';

// Mock data
const MOCK_MY_PATIENTS: PatientDetails[] = [
    {
        patientId: 'P-1001',
        name: 'John Doe',
        age: 45,
        gender: 'male',
        phone: '+1 234 567 8900',
        bloodGroup: 'O+',
        status: 'active',
        lastVisit: '2024-03-10',
        assignedDoctorName: 'Dr. Sarah Wilson',
    },
    {
        patientId: 'P-1003',
        name: 'Robert Johnson',
        age: 58,
        gender: 'male',
        phone: '+1 234 567 8902',
        bloodGroup: 'B+',
        status: 'discharged',
        lastVisit: '2024-02-28',
        assignedDoctorName: 'Dr. Sarah Wilson',
    },
];

const DoctorPatients: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [patients] = useState<PatientDetails[]>(MOCK_MY_PATIENTS);

    const columns = [
        {
            header: 'Patient ID',
            accessorKey: 'patientId' as keyof PatientDetails,
            className: 'font-medium text-gray-900',
        },
        {
            header: 'Name',
            accessorKey: 'name' as keyof PatientDetails,
            cell: (patient: PatientDetails) => (
                <div>
                    <div className="font-medium text-gray-900">{patient.name}</div>
                    <div className="text-xs text-gray-500">{patient.age} yrs, {patient.gender}</div>
                </div>
            ),
        },
        {
            header: 'Contact',
            accessorKey: 'phone' as keyof PatientDetails,
        },
        {
            header: 'Blood Group',
            accessorKey: 'bloodGroup' as keyof PatientDetails,
            cell: (patient: PatientDetails) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {patient.bloodGroup}
                </span>
            ),
        },
        {
            header: 'Status',
            accessorKey: 'status' as keyof PatientDetails,
            cell: (patient: PatientDetails) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${patient.status === 'active' ? 'bg-green-100 text-green-800' :
                        patient.status === 'discharged' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'}`}>
                    {patient.status}
                </span>
            ),
        },
        {
            header: 'Last Visit',
            accessorKey: 'lastVisit' as keyof PatientDetails,
        },
        {
            header: 'Actions',
            cell: () => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm">View</Button>
                    <Button variant="ghost" size="sm" title="Prescription">
                        <FileText className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-lexend">My Patients</h1>
                    <p className="text-sm text-gray-500">Manage your assigned patients</p>
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

export default DoctorPatients;
