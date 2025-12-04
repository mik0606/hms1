import React, { useState } from 'react';
import { Search, Filter, FileText } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import type { PathologyReport } from '../../types';

// Mock data
const MOCK_REPORTS: PathologyReport[] = [
    {
        id: 'RPT-001',
        patientId: 'P-1001',
        patientName: 'John Doe',
        testName: 'Complete Blood Count (CBC)',
        status: 'completed',
        reportDate: '2024-03-20',
        orderedByName: 'Dr. Sarah Wilson',
    },
    {
        id: 'RPT-002',
        patientId: 'P-1002',
        patientName: 'Jane Smith',
        testName: 'Lipid Profile',
        status: 'in-progress',
        orderedByName: 'Dr. Michael Brown',
    },
    {
        id: 'RPT-003',
        patientId: 'P-1003',
        patientName: 'Robert Johnson',
        testName: 'Blood Sugar Fasting',
        status: 'pending',
        orderedByName: 'Dr. Sarah Wilson',
    },
];

const PathologistLabReports: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [reports] = useState<PathologyReport[]>(MOCK_REPORTS);

    const columns = [
        {
            header: 'Report ID',
            accessorKey: 'id' as keyof PathologyReport,
            className: 'font-medium text-gray-900',
        },
        {
            header: 'Patient',
            accessorKey: 'patientName' as keyof PathologyReport,
        },
        {
            header: 'Test Name',
            accessorKey: 'testName' as keyof PathologyReport,
        },
        {
            header: 'Ordered By',
            accessorKey: 'orderedByName' as keyof PathologyReport,
        },
        {
            header: 'Status',
            accessorKey: 'status' as keyof PathologyReport,
            cell: (item: PathologyReport) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${item.status === 'completed' ? 'bg-green-100 text-green-800' :
                        item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'}`}>
                    {item.status}
                </span>
            ),
        },
        {
            header: 'Report Date',
            accessorKey: 'reportDate' as keyof PathologyReport,
            cell: (item: PathologyReport) => (
                <span>{item.reportDate || '-'}</span>
            ),
        },
        {
            header: 'Actions',
            cell: () => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Update</Button>
                    <Button variant="ghost" size="sm" title="View Report">
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
                    <h1 className="text-2xl font-bold text-gray-900 font-lexend">Lab Reports</h1>
                    <p className="text-sm text-gray-500">Manage pathology test reports</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <Input
                            placeholder="Search reports..."
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
                    data={reports}
                    columns={columns}
                    keyExtractor={(item) => item.id}
                />
            </div>
        </div>
    );
};

export default PathologistLabReports;
