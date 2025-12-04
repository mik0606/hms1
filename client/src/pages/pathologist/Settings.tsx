import React from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const PathologistSettings: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-lexend">Settings</h1>
                    <p className="text-sm text-gray-500">Manage your preferences</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="First Name"
                        defaultValue="David"
                    />
                    <Input
                        label="Last Name"
                        defaultValue="Miller"
                    />
                    <Input
                        label="License Number"
                        defaultValue="PATH-2024-001"
                    />
                    <Input
                        label="Email"
                        defaultValue="pathologist@hospital.com"
                        disabled
                    />
                    <Input
                        label="Specialization"
                        defaultValue="Clinical Pathology"
                    />
                </div>
                <div className="mt-6 flex justify-end">
                    <Button>Save Profile</Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">New Test Requests</h3>
                            <p className="text-xs text-gray-500">Get notified when a new test is ordered</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="toggle" id="toggle1" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                            <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">Urgent Requests</h3>
                            <p className="text-xs text-gray-500">High priority notifications for urgent tests</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="toggle" id="toggle2" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                            <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PathologistSettings;
