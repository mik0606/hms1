import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { clsx } from 'clsx';

const data = [
    { name: 'Sun', current: 800, previous: 600 },
    { name: 'Mon', current: 1200, previous: 700 },
    { name: 'Tue', current: 1000, previous: 900 },
    { name: 'Wed', current: 1495, previous: 1000 },
    { name: 'Thu', current: 1100, previous: 950 },
    { name: 'Fri', current: 1200, previous: 970 },
    { name: 'Sat', current: 1150, previous: 930 },
];

const tabs = ['Week', 'Month', 'Year'];

export const RevenueChart: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Week');

    return (
        <Card className="h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-[15px] font-bold text-gray-900 font-inter">Revenue</h3>
                </div>
                <div className="flex bg-gray-50 rounded-full p-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={clsx(
                                "px-3 py-1 text-[12px] font-inter rounded-full transition-colors",
                                activeTab === tab
                                    ? "bg-blue-50 text-blue-600 font-medium"
                                    : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
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
                            domain={[0, 1600]}
                            ticks={[0, 400, 800, 1200, 1600]}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ fontSize: '12px', fontFamily: 'Inter', fontWeight: 600 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="current"
                            stroke="#1E293B"
                            strokeWidth={2}
                            dot={{ r: 4, fill: '#1E293B', strokeWidth: 0 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="previous"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={{ r: 4, fill: '#3B82F6', strokeWidth: 0 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};
