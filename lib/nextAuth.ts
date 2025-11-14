/* eslint-disable @typescript-eslint/no-explicit-any */



// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "./prisma";
// import EmailProvider from "next-auth/providers/email";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     EmailProvider({

//           server: process.env.EMAIL_SERVER,
//           from: process.env.EMAIL_FROM
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: { strategy: "jwt"},
//   callbacks: {
//   async jwt({ token, user }) {
//     // وقتی کاربر برای اولین بار لاگین می‌کند
//     if (user) {
//       token.id = user.id;
//     }
//     return token;
//   },

//   async session({ session, token }) {
//     if (session.user) {
//       session.user.id = token.id;
//     }
//     return session;
//   }
// },
// };




import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import EmailProvider from "next-auth/providers/email";

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};




      // server: {
      //   host: process.env.EMAIL_SERVER_HOST,
      //   port: Number(process.env.EMAIL_SERVER_PORT || 587),
      //   auth: {
      //     user: process.env.EMAIL_SERVER_USER,
      //     pass: process.env.EMAIL_SERVER_PASSWORD,
      //   },
      // },
      // from: process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
