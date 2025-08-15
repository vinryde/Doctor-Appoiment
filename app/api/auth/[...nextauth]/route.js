import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { google } from "googleapis";

// Exported so getServerSession(authOptions) works in server actions
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar.events",
          access_type: "offline",   // get refresh_token
          prompt: "consent",        // force refresh_token on first connect
        },
      },
    }),
  ],
  callbacks: {
    // Persist tokens + handle refresh
    async jwt({ token, account }) {
      // First time (after signIn)
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token ?? token.refreshToken;
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000 // -> ms
          : Date.now() + 60 * 60 * 1000; // fallback 1h
        return token;
      }

      // If the access token is still valid, return it
      if (token.accessToken && token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Refresh the access token
      try {
        const oauth2 = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET
        );
        oauth2.setCredentials({ refresh_token: token.refreshToken });

        // Refresh and update token
        const { credentials } = await oauth2.refreshAccessToken();
        token.accessToken = credentials.access_token;
        token.accessTokenExpires = credentials.expiry_date ?? (Date.now() + 60 * 60 * 1000);
        // Some refreshes don't return a new refresh_token
        token.refreshToken = credentials.refresh_token ?? token.refreshToken;
        return token;
      } catch (err) {
        console.error("Failed to refresh Google access token:", err);
        token.error = "RefreshAccessTokenError";
        return token;
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken ?? null;
      session.refreshToken = token.refreshToken ?? null;
      session.error = token.error ?? null;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
