import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        error: '/',
        signIn: '/',
        signOut: '/',
    },
    callbacks: {
        authorized({ auth }) {
            const isAuthenticated = !!auth?.user;
            return isAuthenticated;
        },
        session({ session, token, user }) {
            if (token.sub) {
                session.user.id = token.sub;
            }
            return session;
        }
    },
    providers: [],
} satisfies NextAuthConfig;