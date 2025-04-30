'use client';

import { useEffect, useState } from 'react';
import UserInfo from '@/components/UserInfo';
import { useRouter } from 'next/navigation';

type GitHubUser = {
  login: string;
  name?: string;
  email?: string;
  avatar_url: string;
};


export default function CallbackPage() {
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');

        if (!code) {
            setError('You are not signed in.');
            setTimeout(() => router.push('/'), 2000); // redirect after 2s
            return;
        }

        const fetchData = async () => {
            try {
                const res = await fetch('/api/github', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code }),
                });

                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                } else {
                    setError('Login expired or invalid. Redirecting...');
                    setTimeout(() => router.push('/'), 2000); // redirect after 2s
                }
            } catch {
                setError('Network error. Redirecting...');
                setTimeout(() => router.push('/'), 2000);
            }
        };

        fetchData();
    }, [router]);

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-center">
                <p className="text-red-600 text-lg">{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-700 text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
            <UserInfo user={user} />
        </main>
    );
}
