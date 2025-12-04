import React from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const DoctorSettings: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-lexend">Settings</h1>
                    <p className="text-sm text-gray-500">Manage your profile and preferences</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="First Name"
                        defaultValue="Sarah"
                    />
                    <Input
                        label="Last Name"
                        defaultValue="Wilson"
                    />
                    <Input
                        label="Specialization"
                        defaultValue="Cardiology"
                    />
                    <Input
                        label="License Number"
                        defaultValue="MD-2024-101"
                    />
                    <Input
                        label="Email"
                        defaultValue="sarah.wilson@hms.com"
                        disabled
                    />
                    <Input
                        label="Phone"
                        defaultValue="+1 234 567 8903"
                    />
                </div>
                <div className="mt-6 flex justify-end">
                    <Button>Save Profile</Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Consultation Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Consultation Fee ($)"
                        defaultValue="150"
                        type="number"
                    />
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Available Days</label>
                        <div className="flex flex-wrap gap-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                                <span key={day} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    {day}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorSettings;
