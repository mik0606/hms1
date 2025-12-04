import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';

// Mock data (Need to define Invoice type in types/index.ts later if not present)
interface Invoice {
    id: string;
    patientName: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
    date: string;
    items: string[];
}

const MOCK_INVOICES: Invoice[] = [
    {
        id: 'INV-001',
        patientName: 'John Doe',
        amount: 150.00,
        status: 'paid',
        date: '2024-03-20',
        items: ['Consultation', 'Blood Test'],
    },
    {
        id: 'INV-002',
        patientName: 'Jane Smith',
        amount: 45.00,
        status: 'pending',
        date: '2024-03-21',
        items: ['Medicine'],
    },
    {
        id: 'INV-003',
        patientName: 'Robert Johnson',
        amount: 300.00,
        status: 'overdue',
        date: '2024-03-15',
        items: ['X-Ray', 'Consultation'],
    },
];

const AdminInvoice: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [invoices] = useState<Invoice[]>(MOCK_INVOICES);

    const columns = [
        {
            header: 'Invoice ID',
            accessorKey: 'id' as keyof Invoice,
            className: 'font-medium text-gray-900',
        },
        {
            header: 'Patient',
            accessorKey: 'patientName' as keyof Invoice,
        },
        {
            header: 'Amount',
            accessorKey: 'amount' as keyof Invoice,
            cell: (item: Invoice) => (
                <span>${item.amount.toFixed(2)}</span>
            ),
        },
        {
            header: 'Status',
            accessorKey: 'status' as keyof Invoice,
            cell: (item: Invoice) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${item.status === 'paid' ? 'bg-green-100 text-green-800' :
                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}`}>
                    {item.status}
                </span>
            ),
        },
        {
            header: 'Date',
            accessorKey: 'date' as keyof Invoice,
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
                    <h1 className="text-2xl font-bold text-gray-900 font-lexend">Invoices</h1>
                    <p className="text-sm text-gray-500">Manage billing and payments</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Invoice
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <Input
                            placeholder="Search invoices..."
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
                    data={invoices}
                    columns={columns}
                    keyExtractor={(item) => item.id}
                />
            </div>
        </div>
    );
};

export default AdminInvoice;
