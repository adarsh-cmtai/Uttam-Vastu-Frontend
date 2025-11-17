"use client";

import { useState, useEffect, Suspense, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import authService from '@/services/authService';
import { ShieldCheck } from 'lucide-react';

function VerifyOTPComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        if (!email) {
            toast.error("Email not found. Please register again.");
            router.push('/register');
        }
    }, [email, router]);

    const handleVerify = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            return toast.error("Please enter a valid 6-digit OTP.");
        }
        setIsLoading(true);
        try {
            await authService.verifyOTP({ email: email!, otp });
            toast.success("Email verified successfully! You can now log in.");
            router.push('/login');
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to verify OTP.";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        try {
            await authService.resendOTP({ email: email! });
            toast.success("A new OTP has been sent to your email.");
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to resend OTP.";
            toast.error(message);
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1A2238] via-[#283149] to-[#455A64] p-4">
            <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 shadow-2xl text-center">
                <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "Philosopher, serif" }}>Verify Your Account</h1>
                <p className="text-white/80">An OTP has been sent to <strong>{email}</strong>. Please enter it below.</p>

                <form onSubmit={handleVerify} className="mt-8 space-y-6">
                    <input
                        type="text"
                        placeholder="Enter 6-Digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        className="w-full text-center tracking-[1em] text-2xl font-bold rounded-lg border border-white/30 bg-white/20 py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-orange-600 py-3 text-lg font-bold text-white shadow-lg transition-all hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ShieldCheck />
                        {isLoading ? 'Verifying...' : 'Verify Account'}
                    </button>
                </form>

                <p className="mt-6 text-sm text-white/70">
                    Didn't receive the OTP?{' '}
                    <button 
                        onClick={handleResend}
                        disabled={isResending}
                        className="font-semibold text-orange-400 hover:text-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isResending ? 'Resending...' : 'Resend OTP'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default function VerifyOTPPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyOTPComponent />
        </Suspense>
    );
}