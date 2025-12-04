import React from 'react';
import { Card } from '../../ui/Card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { name: '4 Jul', child: 95, adult: 80, elderly: 50 },
    { name: '5 Jul', child: 101, adult: 85, elderly: 54 },
    { name: '6 Jul', child: 107, adult: 90, elderly: 58 },
    { name: '7 Jul', child: 113, adult: 95, elderly: 62 },
    { name: '8 Jul', child: 119, adult: 100, elderly: 66 },
    { name: '9 Jul', child: 125, adult: 105, elderly: 70 },
    { name: '10 Jul', child: 131, adult: 110, elderly: 74 },
    { name: '11 Jul', child: 137, adult: 115, elderly: 78 },
];

export const PatientOverviewChart: React.FC = () => {
    return (
        <Card className="h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-[15px] font-bold text-gray-900 font-inter">Patient Overview</h3>
                    <p className="text-[11px] text-gray-500 font-inter mt-1">by Age Stages</p>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                    <span className="text-[10px] text-gray-900 font-inter">Last 8 Days</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-gray-900">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>
            </div>

            <div className="flex-1 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barGap={6}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'Inter' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'Inter' }}
                            domain={[0, 180]}
                            ticks={[0, 40, 80, 120, 160]}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ fontSize: '12px', fontFamily: 'Inter', fontWeight: 600 }}
                        />
                        <Bar dataKey="child" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={8} />
                        <Bar dataKey="adult" fill="#22C55E" radius={[4, 4, 0, 0]} barSize={8} />
                        <Bar dataKey="elderly" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={8} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex items-center gap-4 mt-4 px-2">
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-[11px] text-gray-500 font-inter">Child</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="text-[11px] text-gray-500 font-inter">Adult</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="text-[11px] text-gray-500 font-inter">Elderly</span>
                </div>
            </div>
        </Card>
    );
};
