'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

const SignUpPage = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            setLoading(true)
            await register({ name, email, password });
            router.push('/')
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || "Signup Failed";
            setErrorMessage(message);
        }
        setLoading(false)
    }

    return (
        <>
            <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {errorMessage && (
                        <p className="text-red-600 text-sm text-center">{errorMessage}</p>
                    )}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1 font-medium">Name:</label>
                        <input
                            autoComplete="name"
                            type="name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            required
                            id="name"
                            name="name"
                            placeholder="name"
                            className="border rounded px-3 py-2 focus outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 font-medium">Email:</label>
                        <input
                            autoComplete="email"
                            type="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                            id="email"
                            name="email"
                            placeholder="your@email.com"
                            className="border rounded px-3 py-2 focus outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 font-medium">Password:</label>
                        <div className="relative group">
                            <input
                                autoComplete="current-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                required
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={()=> setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 group-hover:block hover:text-black hidden group-focus-within:block"
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>
                                        <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 font-medium"> Confirm Password:</label>
                        <div className="relative group">
                            <input
                                autoComplete="current-password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                                required
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Re-enter your password"
                                className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={()=> setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 group-hover:block hover:text-black hidden group-focus-within:block"
                            >
                                {showConfirmPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>
                    <button
                    type="submit"
                    disabled={loading}
                    className={`w-3/5 mx-auto bg-blue-600 text-white py-2 rounded transition ${
                        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                    >
                    {loading ? 'Signing in...' : 'Sign Up'}
                    </button>
                    <p className="text-sm text-center mt-2">
                        Have an account?{' '}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default SignUpPage;
