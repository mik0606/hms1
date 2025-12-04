import React, { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
    Hospital,
    Lock,
    Mail,
    RefreshCw,
    Shield,
    Eye,
    EyeOff,
} from "lucide-react";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { signIn, isAuthenticated, user } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaText, setCaptchaText] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        generateCaptcha();
        loadRememberMe();
    }, []);

    useEffect(() => {
        if (isAuthenticated && user) {
            redirectBasedOnRole();
        }
    }, [isAuthenticated, user]);

    const generateCaptcha = () => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let result = "";
        for (let i = 0; i < 5; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaText(result);
        setCaptchaInput("");
    };

    const loadRememberMe = () => {
        const remembered = localStorage.getItem("remember_me") === "true";
        if (remembered) {
            const savedEmail = localStorage.getItem("saved_email") || "";
            setEmail(savedEmail);
            setRememberMe(true);
        }
    };

    const redirectBasedOnRole = () => {
        if (!user) return;

        switch (user.role) {
            case "admin":
                navigate("/admin/dashboard");
                break;
            case "doctor":
                navigate("/doctor/dashboard");
                break;
            case "pharmacist":
                navigate("/pharmacist/dashboard");
                break;
            case "pathologist":
                navigate("/pathologist/dashboard");
                break;
            default:
                navigate("/dashboard");
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (captchaInput.toUpperCase() !== captchaText.toUpperCase()) {
            setError("Invalid captcha. Please try again.");
            generateCaptcha();
            return;
        }

        setIsLoading(true);
        try {
            await signIn(email.trim(), password);
            localStorage.setItem("remember_me", rememberMe.toString());
            if (rememberMe) {
                localStorage.setItem("saved_email", email.trim());
            } else {
                localStorage.removeItem("saved_email");
            }
        } catch (err: any) {
            setError(err.message || "Login failed. Please try again.");
            generateCaptcha();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

                {/* LEFT PANEL — BLUE GRADIENT */}
                <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] p-12 text-white">

                    {/* Logo */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <Hospital className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold tracking-wider">KARUR GASTRO</p>
                                <p className="text-xs text-white/70">Healthcare Management</p>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl font-bold leading-tight">
                            Enterprise Healthcare <br /> Management System
                        </h1>
                        <p className="mt-4 text-white/80 text-sm leading-relaxed">
                            Secure, HIPAA-compliant platform with role-based access control,
                            audit trails, and real-time analytics for modern healthcare operations.
                        </p>
                    </div>

                    {/* Key Features */}
                    <div>
                        <p className="text-xs text-white/60 font-semibold mb-3 tracking-wider">
                            KEY FEATURES
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["Secure Access", "HIPAA Compliant", "Real-time Analytics", "Auto Backup"].map(
                                (feature) => (
                                    <span
                                        key={feature}
                                        className="px-3 py-1.5 bg-white/15 rounded-md text-xs font-medium backdrop-blur-sm"
                                    >
                                        {feature}
                                    </span>
                                )
                            )}
                        </div>
                    </div>

                    {/* Trust Badge */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-2 bg-white/15 rounded-lg backdrop-blur-sm mb-2">
                            <Shield className="w-4 h-4" />
                            <span className="text-xs font-semibold">
                                Trusted by 150+ Healthcare Institutions
                            </span>
                        </div>
                        <p className="text-xs text-white/70">
                            24/7 Support • ISO 27001 Certified • 99.9% Uptime
                        </p>
                    </div>
                </div>

                {/* RIGHT PANEL — LOGIN FORM */}
                <div className="flex flex-col justify-center px-8 py-10 lg:px-14">

                    {/* Desktop Header */}
                    <div className="hidden lg:flex items-center gap-3 mb-8 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 w-fit">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Hospital className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-800">KARUR GASTRO</p>
                            <p className="text-xs text-gray-600">Healthcare Management</p>
                        </div>
                    </div>

                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-6">
                        <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto">
                            <Hospital className="w-7 h-7 text-white" />
                        </div>
                        <p className="text-sm font-bold text-gray-800 mt-2">KARUR GASTRO</p>
                        <p className="text-xs text-gray-600">Healthcare Management System</p>
                    </div>

                    {/* Welcome */}
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Sign in to access your healthcare dashboard
                    </p>

                    {/* Error */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Email Address or Mobile</label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email or mobile number"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 text-sm"
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your secure password"
                                    className="w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* CAPTCHA */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Security Verification</label>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="relative flex-1">
                                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        value={captchaInput}
                                        onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                                        maxLength={5}
                                        placeholder="Enter code"
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 text-sm tracking-widest font-mono font-bold"
                                    />
                                </div>

                                <div className="relative w-28 h-12 bg-white border border-gray-300 rounded-xl flex items-center justify-center">
                                    <span className="font-mono font-bold text-lg tracking-wide text-gray-900">
                                        {captchaText}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={generateCaptcha}
                                        className="absolute right-1 top-1 p-1 hover:bg-gray-100 rounded"
                                    >
                                        <RefreshCw className="w-4 h-4 text-gray-700" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Remember / Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                />
                                Remember me for 30 days
                            </label>

                            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                                Forgot Password?
                            </button>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm"
                        >
                            {isLoading ? "Signing in..." : <>Sign In to Dashboard <span>→</span></>}
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                        <Shield className="w-3 h-3" />
                        Enterprise-grade Security
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
