import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import { useStaff } from '../../hooks/useApi';

const AdminStaff: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: staffData, loading, error } = useStaff(searchTerm);

    const staff = staffData?.staff || [];

    const columns = [
        {
            header: 'Name',
            cell: (item: any) => (
                <div>
                    <div className="font-medium text-gray-900">{item.firstName} {item.lastName}</div>
                    <div className="text-xs text-gray-500">{item.email}</div>
                </div>
            ),
        },
        {
            header: 'Role',
            accessorKey: 'role' as any,
            cell: (item: any) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${item.role === 'doctor' ? 'bg-blue-100 text-blue-800' :
                        item.role === 'pharmacist' ? 'bg-green-100 text-green-800' :
                            item.role === 'pathologist' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'}`}>
                    {item.role}
                </span>
            ),
        },
        {
            header: 'Details',
            cell: (item: any) => (
                <div className="text-sm text-gray-500">
                    {item.role === 'doctor' && item.specialization}
                    {item.role === 'pharmacist' && `Lic: ${item.licenseNumber}`}
                    {item.role === 'staff' && `${item.position} (${item.department})`}
                </div>
            ),
        },
        {
            header: 'Phone',
            accessorKey: 'phone' as any,
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
                    <h1 className="text-2xl font-bold text-gray-900 font-lexend">Staff Management</h1>
                    <p className="text-sm text-gray-500">Manage doctors, pharmacists, and other staff</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Staff
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <Input
                            placeholder="Search staff..."
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
                        Error loading staff: {error}
                    </div>
                )}

                {!loading && !error && (
                    <Table
                        data={staff}
                        columns={columns}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminStaff;
