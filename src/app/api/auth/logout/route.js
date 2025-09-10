import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

const TOKEN_NAME = 'auth_token';

export async function POST() {
  // To logout, we clear the cookie by setting its maxAge to -1
  const cookie = serialize(TOKEN_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: -1,
    path: '/',
  });

  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.headers.set('Set-Cookie', cookie);

  return response;
}
