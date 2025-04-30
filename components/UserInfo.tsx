type UserInfoProps = {
    user: {
        login: string;
        name?: string;
        email?: string;
        avatar_url: string;
    };
};

export default function UserInfo({ user }: UserInfoProps) {
    return (
        <div className="bg-white shadow-lg p-10 rounded-xl max-w-sm text-center space-y-4">
            <img
                src={user.avatar_url}
                alt="avatar"
                className="w-24 h-24 rounded-full mx-auto border"
            />
            <h2 className="text-xl font-bold text-gray-800">
                Welcome, {user.name || user.login}!
            </h2>
            <p className="text-gray-600 text-sm">Username: {user.login}</p>
            <p className="text-gray-600 text-sm">Email: {user.email || 'Not public'}</p>

            <a
                href="/"
                className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
                Sign out
            </a>
        </div>
    );
}
