"use client";

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { registerUser } from '@/lib/redux/slices/authSlice';
import toast from 'react-hot-toast';
import { User, Mail, Lock } from 'lucide-react';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((state) => state.auth);
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !email || !password) {
            return toast.error("Please fill in all fields.");
        }
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long.");
        }

        try {
            await dispatch(registerUser({ name, email, password })).unwrap();
            toast.success('Registration successful! Please check your email for the OTP.');
            router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
        } catch (err) {
            toast.error(err as string || 'Failed to register.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1A2238] via-[#283149] to-[#455A64] p-4">
            <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 shadow-2xl">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "Philosopher, serif" }}>Create Admin Account</h1>
                    <p className="text-white/80">Join the Vastumaye team.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border border-white/30 bg-white/20 py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-white/30 bg-white/20 py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-white/30 bg-white/20 py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full rounded-lg bg-orange-600 py-3 text-lg font-bold text-white shadow-lg transition-all hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'loading' ? 'Registering...' : 'Register'}
                    </button>
                </form>

                 <p className="mt-8 text-center text-sm text-white/70">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-orange-400 hover:text-orange-300">
                       Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}