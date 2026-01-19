import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";

let authInsstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
  if (authInsstance) return authInsstance;

  const mongoose = await connectToDatabase();

  const db = mongoose.connection.db;

  if (!db) throw new Error("mongoDB connection not found");

  authInsstance = betterAuth({
    database: mongodbAdapter(db as any),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },
    plugins: [nextCookies()],
  });

  return authInsstance;
};

export const auth = await getAuth();
