import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface Appointment {
    id: number;
    name: string;
    doctor: string;
    time: string;
    status: 'Confirmed' | 'Pending' | 'Cancelled';
    gender: 'male' | 'female';
}

const appointments: Appointment[] = [
    { id: 1, name: "Arthur Morgan", doctor: "Dr. John", time: "10:00 AM - 10:30 AM", status: "Confirmed", gender: "male" },
    { id: 2, name: "Regina Mills", doctor: "Dr. Joel", time: "10:30 AM - 11:00 AM", status: "Confirmed", gender: "female" },
    { id: 3, name: "David Warner", doctor: "Dr. John", time: "11:00 AM - 11:30 AM", status: "Pending", gender: "male" },
    { id: 4, name: "Joseph King", doctor: "Dr. John", time: "11:30 AM - 12:00 PM", status: "Confirmed", gender: "male" },
    { id: 5, name: "Lokesh", doctor: "Dr. John", time: "12:00 PM - 12:30 PM", status: "Cancelled", gender: "male" },
    { id: 6, name: "Kanagaraj", doctor: "Dr. John", time: "12:30 PM - 01:00 PM", status: "Confirmed", gender: "male" },
    { id: 7, name: "Priya", doctor: "Dr. Olivia", time: "01:00 PM - 01:30 PM", status: "Confirmed", gender: "female" },
];

export const PatientDeptCard: React.FC = () => {
    const [filter] = useState('All');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-50 text-green-700';
            case 'Pending': return 'bg-yellow-50 text-yellow-700';
            case 'Cancelled': return 'bg-red-50 text-red-700';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-[15px] font-bold text-gray-900 font-inter">Upcoming Appointments</h3>
                    <p className="text-[11px] text-gray-500 font-inter mt-1">Next scheduled visits</p>
                </div>
                <div className="relative">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                        {filter}
                        <ChevronDown size={14} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-4">
                    {appointments.map((apt) => (
                        <div key={apt.id} className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                <span className="text-xs font-bold text-gray-500">
                                    {apt.name.charAt(0)}
                                </span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className="text-[13px] font-semibold text-gray-900 font-inter truncate">
                                    {apt.name}
                                </h4>
                                <p className="text-[11px] text-gray-500 font-inter truncate">
                                    {apt.doctor} • {apt.time}
                                </p>
                            </div>

                            <span className={clsx(
                                "px-2.5 py-1.5 rounded-full text-[11px] font-semibold font-inter",
                                getStatusColor(apt.status)
                            )}>
                                {apt.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};
