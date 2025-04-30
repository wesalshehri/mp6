'use client';

export default function HomePage() {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI!;
    const scope = 'read:user user:email';

    const loginWithGitHub = () => {
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        window.location.href = authUrl;
    };

    return (
        <main className="h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-10 rounded-xl shadow-lg text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">CS391 GitHub OAuth</h1>
                <p className="text-gray-600">Click below to sign in with GitHub</p>
                <button
                    onClick={loginWithGitHub}
                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                >
                    Sign in with GitHub
                </button>
            </div>
        </main>
    );
}
