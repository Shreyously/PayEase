import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import signIn from "next-auth/react";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
        },
        password: { label: "Password", type: "password" },
      },
      // TODO: User credentials type from next-aut
      async authorize(credentials: any) {
        console.log("Received credentials:", credentials);

        // Do zod validation, OTP validation here
        const existingUser = await db.user.findUnique({
          where: {
            phoneNumber: credentials.phoneNumber,
          },
        });
        console.log("Existing user:", existingUser);
        
        // const userhashedpass = await bcrypt.hash(credentials.password, 10);
        // console.log({ dbhashpass: existingUser?.password });
        // console.log({ newhashpass: userhashedpass });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
            };
          }
        }

        return null;
      },
    }),
  ],
  
  secret: process.env.JWT_SECRET || "secret",
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
    
  },
  
  synchronize : false
};
