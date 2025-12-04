import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { ChevronDown, ChevronRight, Wrench, Pill, Thermometer, Truck, Paintbrush } from 'lucide-react';

interface Report {
    id: number;
    title: string;
    time: string;
    tag: string;
    icon: any;
}

const reports: Report[] = [
    { id: 1, title: "Room Cleaning Needed", time: "1 min ago", tag: "Cleaning", icon: Paintbrush },
    { id: 2, title: "Equipment Maintenance", time: "3 min ago", tag: "Equipment", icon: Wrench },
    { id: 3, title: "Medication Restock", time: "5 min ago", tag: "Medication", icon: Pill },
    { id: 4, title: "HVAC System Issue", time: "1 hour ago", tag: "HVAC", icon: Thermometer },
    { id: 5, title: "Patient Transport Required", time: "Yesterday", tag: "Transport", icon: Truck },
];

export const ReportCard: React.FC = () => {
    const [filter] = useState('All');

    return (
        <Card className="h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-[15px] font-bold text-gray-900 font-inter">Report</h3>
                    <p className="text-[11px] text-gray-500 font-inter mt-1">Recent system & facility reports</p>
                </div>
                <div className="relative">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                        {filter}
                        <ChevronDown size={14} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-2">
                    {reports.map((report) => {
                        const Icon = report.icon;
                        return (
                            <div
                                key={report.id}
                                className="group flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <Icon size={18} className="text-blue-500" />

                                <div className="flex-1 min-w-0">
                                    <h4 className="text-[12px] font-semibold text-gray-900 font-inter truncate">
                                        {report.title}
                                    </h4>
                                    <p className="text-[11px] text-gray-500 font-inter truncate">
                                        {report.time}
                                    </p>
                                </div>

                                <ChevronRight size={14} className="text-gray-400 group-hover:text-gray-600" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
};
