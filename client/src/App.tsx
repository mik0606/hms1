import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/auth/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPatients from './pages/admin/Patients';
import AdminAppointments from './pages/admin/Appointments';
import AdminStaff from './pages/admin/Staff';
import AdminPharmacy from './pages/admin/Pharmacy';
import AdminPathology from './pages/admin/Pathology';
import AdminInvoice from './pages/admin/Invoice';
import AdminPayroll from './pages/admin/Payroll';
import AdminSettings from './pages/admin/Settings';
import DoctorDashboard from './pages/doctor/Dashboard';
import DoctorPatients from './pages/doctor/Patients';
import DoctorSchedule from './pages/doctor/Schedule';
import DoctorFollowUp from './pages/doctor/FollowUp';
import DoctorSettings from './pages/doctor/Settings';
import PharmacistDashboard from './pages/pharmacist/Dashboard';
import PharmacistMedicines from './pages/pharmacist/Medicines';
import PharmacistPrescriptions from './pages/pharmacist/Prescriptions';
import PharmacistSettings from './pages/pharmacist/Settings';
import PathologistDashboard from './pages/pathologist/Dashboard';
import PathologistLabReports from './pages/pathologist/LabReports';
import PathologistSettings from './pages/pathologist/Settings';
import { Layout } from './components/Layout/Layout';
import './index.css';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes with Layout */}
          <Route element={<Layout />}>
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/patients"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPatients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/appointments"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/staff"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminStaff />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pharmacy"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPharmacy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pathology"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPathology />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/invoice"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminInvoice />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/payroll"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPayroll />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />

            {/* Doctor Routes */}
            <Route
              path="/doctor/dashboard"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/patients"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorPatients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/schedule"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorSchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/follow-up"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorFollowUp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/settings"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorSettings />
                </ProtectedRoute>
              }
            />

            {/* Pharmacist Routes */}
            <Route
              path="/pharmacist/dashboard"
              element={
                <ProtectedRoute allowedRoles={['pharmacist']}>
                  <PharmacistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pharmacist/medicines"
              element={
                <ProtectedRoute allowedRoles={['pharmacist']}>
                  <PharmacistMedicines />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pharmacist/prescriptions"
              element={
                <ProtectedRoute allowedRoles={['pharmacist']}>
                  <PharmacistPrescriptions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pharmacist/settings"
              element={
                <ProtectedRoute allowedRoles={['pharmacist']}>
                  <PharmacistSettings />
                </ProtectedRoute>
              }
            />

            {/* Pathologist Routes */}
            <Route
              path="/pathologist/dashboard"
              element={
                <ProtectedRoute allowedRoles={['pathologist']}>
                  <PathologistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pathologist/lab-reports"
              element={
                <ProtectedRoute allowedRoles={['pathologist']}>
                  <PathologistLabReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pathologist/settings"
              element={
                <ProtectedRoute allowedRoles={['pathologist']}>
                  <PathologistSettings />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Fallback Routes */}
          <Route path="/unauthorized" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">403</h1>
                <p className="text-gray-600">Unauthorized Access</p>
              </div>
            </div>
          } />

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
