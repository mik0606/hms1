import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import type { Medicine } from '../../types';

// Mock data
const MOCK_MEDICINES: Medicine[] = [
    {
        id: 'MED-001',
        name: 'Paracetamol',
        genericName: 'Acetaminophen',
        category: 'Analgesic',
        stockQuantity: 500,
        unitPrice: 5.00,
        expiryDate: '2025-12-31',
        strength: '500mg',
    },
    {
        id: 'MED-002',
        name: 'Amoxicillin',
        genericName: 'Amoxicillin',
        category: 'Antibiotic',
        stockQuantity: 200,
        unitPrice: 12.50,
        expiryDate: '2024-10-15',
        strength: '250mg',
    },
    {
        id: 'MED-003',
        name: 'Ibuprofen',
        genericName: 'Ibuprofen',
        category: 'NSAID',
        stockQuantity: 50,
        unitPrice: 8.00,
        expiryDate: '2025-06-20',
        strength: '400mg',
    },
];

const PharmacistMedicines: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [medicines] = useState<Medicine[]>(MOCK_MEDICINES);

    const columns = [
        {
            header: 'Name',
            accessorKey: 'name' as keyof Medicine,
            cell: (item: Medicine) => (
                <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.genericName} ({item.strength})</div>
                </div>
            ),
        },
        {
            header: 'Category',
            accessorKey: 'category' as keyof Medicine,
        },
        {
            header: 'Stock',
            accessorKey: 'stockQuantity' as keyof Medicine,
            cell: (item: Medicine) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${(item.stockQuantity || 0) < 100 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {item.stockQuantity}
                </span>
            ),
        },
        {
            header: 'Price',
            accessorKey: 'unitPrice' as keyof Medicine,
            cell: (item: Medicine) => (
                <span>${item.unitPrice?.toFixed(2)}</span>
            ),
        },
        {
            header: 'Expiry',
            accessorKey: 'expiryDate' as keyof Medicine,
        },
        {
            header: 'Actions',
            cell: () => (
                <Button variant="ghost" size="sm">Edit</Button>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-lexend">Medicines Inventory</h1>
                    <p className="text-sm text-gray-500">Manage medicine stock and details</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Medicine
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <Input
                            placeholder="Search medicines..."
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
                    data={medicines}
                    columns={columns}
                    keyExtractor={(item) => item.id}
                />
            </div>
        </div>
    );
};

export default PharmacistMedicines;
