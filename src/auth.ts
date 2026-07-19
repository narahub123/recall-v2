import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { ObjectId } from "mongodb";

import clientPromise from "@/lib/mongodb-client";
import { USER_ROLE } from "./constants/user";

const baseAdapter = MongoDBAdapter(clientPromise);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: {
    ...baseAdapter,

    async createUser(user) {
      if (!baseAdapter.createUser) {
        throw new Error("createUser adapter method is not implemented");
      }

      const createdUser = await baseAdapter.createUser(user);

      if (!ObjectId.isValid(createdUser.id)) {
        throw new Error(`Invalid MongoDB user id: ${createdUser.id}`);
      }

      const client = await clientPromise;
      const db = client.db();

      const now = new Date();

      await db.collection("users").updateOne(
        {
          _id: new ObjectId(createdUser.id),
        },
        {
          $set: {
            createdAt: now,
            updatedAt: now,
            role: USER_ROLE.USER,
          },
        },
      );

      return createdUser;
    },

    async updateUser(user) {
      if (!baseAdapter.updateUser) {
        throw new Error("updateUser adapter method is not implemented");
      }

      const updatedUser = await baseAdapter.updateUser(user);

      if (!ObjectId.isValid(updatedUser.id)) {
        throw new Error(`Invalid MongoDB user id: ${updatedUser.id}`);
      }

      const client = await clientPromise;
      const db = client.db();

      await db.collection("users").updateOne(
        {
          _id: new ObjectId(updatedUser.id),
        },
        {
          $set: {
            updatedAt: new Date(),
          },
        },
      );

      return updatedUser;
    },
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }

      return session;
    },
  },
});
