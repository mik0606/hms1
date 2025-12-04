import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import { usePatients } from '../../hooks/useApi';
import type { PatientDetails } from '../../types';

const AdminPatients: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: patientsData, loading, error } = usePatients(searchTerm);

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
                <Button variant="ghost" size="sm">View</Button>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-lexend">Patients</h1>
                    <p className="text-sm text-gray-500">Manage all patient records</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Patient
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <Input
                            placeholder="Search patients by name, ID, or phone..."
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
                        Error loading patients: {error}
                    </div>
                )}

                {!loading && !error && (
                    <Table
                        data={patientsData || []}
                        columns={columns}
                        keyExtractor={(item) => item.patientId}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPatients;
