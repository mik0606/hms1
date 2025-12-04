import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import type { Payroll } from '../../types';

// Mock data
const MOCK_PAYROLL: Payroll[] = [
    {
        id: 'PAY-001',
        staffId: 'D-101',
        staffName: 'Dr. Sarah Wilson',
        month: 'February 2024',
        basicSalary: 5000,
        netSalary: 5000,
        status: 'paid',
        paidAt: '2024-02-28',
    },
    {
        id: 'PAY-002',
        staffId: 'P-101',
        staffName: 'Mike Jones',
        month: 'February 2024',
        basicSalary: 3000,
        netSalary: 3000,
        status: 'paid',
        paidAt: '2024-02-28',
    },
    {
        id: 'PAY-003',
        staffId: 'S-101',
        staffName: 'Emma Davis',
        month: 'February 2024',
        basicSalary: 2500,
        netSalary: 2500,
        status: 'pending',
    },
];

const AdminPayroll: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [payrolls] = useState<Payroll[]>(MOCK_PAYROLL);

    const columns = [
        {
            header: 'Staff Name',
            accessorKey: 'staffName' as keyof Payroll,
            cell: (item: Payroll) => (
                <div>
                    <div className="font-medium text-gray-900">{item.staffName}</div>
                    <div className="text-xs text-gray-500">{item.staffId}</div>
                </div>
            ),
        },
        {
            header: 'Month',
            accessorKey: 'month' as keyof Payroll,
        },
        {
            header: 'Salary',
            accessorKey: 'netSalary' as keyof Payroll,
            cell: (item: Payroll) => (
                <span>${item.netSalary.toLocaleString()}</span>
            ),
        },
        {
            header: 'Status',
            accessorKey: 'status' as keyof Payroll,
            cell: (item: Payroll) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${item.status === 'paid' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                    {item.status}
                </span>
            ),
        },
        {
            header: 'Payment Date',
            accessorKey: 'paidAt' as keyof Payroll,
            cell: (item: Payroll) => (
                <span>{item.paidAt || '-'}</span>
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
                    <h1 className="text-2xl font-bold text-gray-900 font-lexend">Payroll</h1>
                    <p className="text-sm text-gray-500">Manage staff salaries and payments</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Payroll
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <Input
                            placeholder="Search payroll..."
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
                    data={payrolls}
                    columns={columns}
                    keyExtractor={(item) => item.id}
                />
            </div>
        </div>
    );
};

export default AdminPayroll;
