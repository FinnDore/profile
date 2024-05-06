import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { GetServerSidePropsContext } from "next";
import type { AuthOptions, DefaultSession, Session } from "next-auth";
import NextAuth, { getServerSession } from "next-auth";
import type { SendVerificationRequestParams } from "next-auth/providers";
import EmailProvider from "next-auth/providers/email";
import { Resend } from "resend";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      verified: boolean;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams
) => {
  try {
    await resend.emails.send({
      from: "Finn <noreply@finndore.dev>",
      to: params.identifier,
      subject: "yes",
      html: `your login email :3 ${params.url}`,
    });
  } catch (error) {
    console.log("email error: ", { error });
  }
};

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      from: "Finn <noreply@finndore.dev>",
      sendVerificationRequest,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.verified = (user as unknown as Session["user"]).verified;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
