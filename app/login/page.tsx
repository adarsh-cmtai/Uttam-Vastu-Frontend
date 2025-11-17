"use client";

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { loginUser } from '@/lib/redux/slices/authSlice';
import toast from 'react-hot-toast';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((state) => state.auth);
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            return toast.error("Please fill in all fields.");
        }

        try {
            await dispatch(loginUser({ email, password })).unwrap();
            toast.success('Logged in successfully! Redirecting...');
            window.location.href = '/admin/dashboard';
        } catch (err) {
            toast.error(err as string || 'Failed to login.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1A2238] via-[#283149] to-[#455A64] p-4">
            <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 shadow-2xl">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "Philosopher, serif" }}>Vastumaye Admin</h1>
                    <p className="text-white/80">Welcome back! Please login to your account.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-lg border border-white/30 bg-white/20 py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-lg border border-white/30 bg-white/20 py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div className="text-right">
                        <Link href="/forgot-password" className="text-sm text-orange-400 hover:text-orange-300">Forgot Password?</Link>
                    </div>
                    <button type="submit" disabled={status === 'loading'} className="w-full flex items-center justify-center gap-2 rounded-lg bg-orange-600 py-3 text-lg font-bold text-white shadow-lg transition-all hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed">
                        <LogIn />
                        {status === 'loading' ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                 <p className="mt-8 text-center text-sm text-white/70">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-semibold text-orange-400 hover:text-orange-300">Register here</Link>
                </p>
            </div>
        </div>
    );
}