import React from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const AdminSettings: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-lexend">Settings</h1>
                    <p className="text-sm text-gray-500">Manage system configurations</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Hospital Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Hospital Name"
                        defaultValue="General Hospital"
                    />
                    <Input
                        label="Address"
                        defaultValue="123 Healthcare Ave, Medical City"
                    />
                    <Input
                        label="Contact Number"
                        defaultValue="+1 234 567 8900"
                    />
                    <Input
                        label="Email"
                        defaultValue="admin@hospital.com"
                    />
                </div>
                <div className="mt-6 flex justify-end">
                    <Button>Save Changes</Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">System Preferences</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                            <p className="text-xs text-gray-500">Receive emails for new appointments</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                    {/* Add more settings as needed */}
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
