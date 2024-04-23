import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '../database';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const adapter = PrismaAdapter(prisma);

async function getUser(email: string, password: string): Promise<any> {

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  let senhaBd = user ? user.password : 'ksksks'

  const result = await user && bcrypt.compare(password, senhaBd)

  if (result) {
    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      password: user?.password,
    };
  }

}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST }
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await getUser(
          credentials.email as string,
          credentials.password as string
        );

        return user ?? null;
      },
    }),
  ],
});
