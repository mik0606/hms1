import React from 'react';
import { Card } from '../../ui/Card';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: LucideIcon;
    iconColor: string;
    iconBgColor: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    subtitle,
    icon: Icon,
    iconColor,
    iconBgColor,
}) => {
    return (
        <Card className="flex items-center gap-3 p-4">
            <div
                className="p-2.5 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: iconBgColor }}
            >
                <Icon size={20} style={{ color: iconColor }} />
            </div>

            <div className="flex flex-col">
                <span className="text-[13px] text-gray-500 font-inter">{title}</span>
                <span className="text-[22px] font-semibold text-gray-900 font-lexend leading-tight">
                    {value}
                </span>
                <span className="text-[11px] text-gray-400 font-inter">{subtitle}</span>
            </div>
        </Card>
    );
};
