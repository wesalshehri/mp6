import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { code } = await req.json();

    const client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!;
    const client_secret = process.env.GITHUB_CLIENT_SECRET!;
    const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI!;

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ client_id, client_secret, code, redirect_uri }),
    });

    const tokenData = await tokenRes.json();

    console.log('Token Response:', tokenData);

    if (!tokenData.access_token) {
        return NextResponse.json({ error: 'Token fetch failed' }, { status: 500 });
    }

    const userRes = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
        },
    });

    const userData = await userRes.json();
    return NextResponse.json(userData);
}
