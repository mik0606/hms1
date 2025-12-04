import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import Calendar from 'react-calendar';
import { ChevronRight } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'; // We'll create this for custom styling

type Value = Date | null | [Date | null, Date | null];

interface Event {
    title: string;
    time: string;
    color: string;
}

const events: Record<string, Event[]> = {
    [new Date().toDateString()]: [
        { title: "Morning Staff Meeting", time: "08:00 - 09:00", color: "#0D9488" }, // teal
        { title: "Patient Consultation", time: "10:00 - 12:00", color: "#3B82F6" }, // blue
        { title: "Surgery - Orthopedics", time: "13:00 - 15:00", color: "#EF4444" }, // red
        { title: "Training Session", time: "16:00 - 17:00", color: "#A855F7" }, // purple
    ]
};

export const CalendarCard: React.FC = () => {
    const [date, setDate] = useState<Value>(new Date());

    const selectedDateStr = (date as Date).toDateString();
    const dayEvents = events[selectedDateStr] || [];

    return (
        <Card className="h-full flex flex-col">
            <h3 className="text-[15px] font-bold text-gray-900 font-inter mb-4">Calendar</h3>

            <div className="mb-6 custom-calendar-wrapper">
                <Calendar
                    onChange={setDate}
                    value={date}
                    className="w-full border-none font-inter text-sm"
                    tileClassName={({ date: d }) => {
                        if (d.toDateString() === new Date().toDateString()) return 'bg-blue-50 text-blue-600 font-bold rounded-full';
                        return 'rounded-full hover:bg-gray-100';
                    }}
                />
            </div>

            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-[13px] font-bold text-gray-900 font-lexend">Activities</h3>
                <span className="text-[11px] text-gray-500 font-inter">
                    {new Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric', month: 'short' }).format(date as Date)}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-3">
                    {dayEvents.length > 0 ? (
                        dayEvents.map((event, idx) => (
                            <div
                                key={idx}
                                className="group relative p-3 rounded-xl border border-gray-100 bg-white/50 hover:bg-gray-50 transition-all cursor-pointer shadow-sm hover:shadow-md"
                                style={{ borderColor: `${event.color}20` }}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-1.5 h-10 rounded-full bg-gradient-to-b from-opacity-90 to-opacity-60"
                                        style={{ backgroundImage: `linear-gradient(to bottom, ${event.color}, ${event.color}99)` }}
                                    />

                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[13px] font-bold text-gray-900 font-inter truncate">
                                            {event.title}
                                        </h4>
                                        <p className="text-[12px] text-gray-500 font-inter">
                                            {event.time}
                                        </p>
                                    </div>

                                    <div
                                        className="p-1.5 rounded-lg"
                                        style={{ backgroundColor: `${event.color}15` }}
                                    >
                                        <ChevronRight size={16} style={{ color: event.color }} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 text-xs py-4">No activities scheduled</p>
                    )}
                </div>
            </div>
        </Card>
    );
};
