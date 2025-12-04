import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { clsx } from 'clsx';
import {
    LayoutDashboard,
    Calendar,
    Users,
    Pill,
    TestTube,
    FileText,
    CreditCard,
    Settings,
    UserCog,
    ClipboardList,
    Clock,
    Activity
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { user } = useAuth();

    const getNavItems = () => {
        switch (user?.role) {
            case 'admin':
                return [
                    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
                    { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
                    { name: 'Patients', path: '/admin/patients', icon: Users },
                    { name: 'Staff', path: '/admin/staff', icon: UserCog },
                    { name: 'Pharmacy', path: '/admin/pharmacy', icon: Pill },
                    { name: 'Pathology', path: '/admin/pathology', icon: TestTube },
                    { name: 'Invoice', path: '/admin/invoice', icon: FileText },
                    { name: 'Payroll', path: '/admin/payroll', icon: CreditCard },
                    { name: 'Settings', path: '/admin/settings', icon: Settings },
                ];
            case 'doctor':
                return [
                    { name: 'Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
                    { name: 'My Patients', path: '/doctor/patients', icon: Users },
                    { name: 'Schedule', path: '/doctor/schedule', icon: Clock },
                    { name: 'Follow Up', path: '/doctor/follow-up', icon: ClipboardList },
                    { name: 'Settings', path: '/doctor/settings', icon: Settings },
                ];
            case 'pharmacist':
                return [
                    { name: 'Dashboard', path: '/pharmacist/dashboard', icon: LayoutDashboard },
                    { name: 'Medicines', path: '/pharmacist/medicines', icon: Pill },
                    { name: 'Prescriptions', path: '/pharmacist/prescriptions', icon: FileText },
                    { name: 'Settings', path: '/pharmacist/settings', icon: Settings },
                ];
            case 'pathologist':
                return [
                    { name: 'Dashboard', path: '/pathologist/dashboard', icon: LayoutDashboard },
                    { name: 'Test Reports', path: '/pathologist/reports', icon: Activity },
                    { name: 'Settings', path: '/pathologist/settings', icon: Settings },
                ];
            default:
                return [];
        }
    };

    const navItems = getNavItems();

    return (
        <>
            {/* Mobile overlay */}
            <div
                className={clsx(
                    'fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden',
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}
                onClick={onClose}
            />

            {/* Sidebar component */}
            <div
                className={clsx(
                    'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:flex lg:flex-col',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                {/* Logo */}
                <div className="flex items-center justify-center h-16 bg-blue-600">
                    <h1 className="text-white text-xl font-bold">HMS System</h1>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => {
                                if (window.innerWidth < 1024) onClose();
                            }}
                            className={({ isActive }) =>
                                clsx(
                                    'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                                    isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                )
                            }
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* User Profile Summary (Optional footer) */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="h-8 w-8 rounded-full bg-gray-300"
                                src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`}
                                alt="User avatar"
                            />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
