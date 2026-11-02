import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

// Reuse one connection in dev hot reloads
const client = globalThis._booknookMongo ?? new MongoClient(process.env.MONGODB_URI);
if (process.env.NODE_ENV !== "production") globalThis._booknookMongo = client;
const db = client.db(process.env.DB_NAME || "booknook");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true, minPasswordLength: 6, autoSignIn: false },
  socialProviders: {
    google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET },
  },
  // Issues signed JWTs (JWKS at /api/auth/jwks) that the Express server verifies
  plugins: [jwt()],
});
