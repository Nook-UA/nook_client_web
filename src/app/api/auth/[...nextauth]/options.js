import CognitoProvider from "next-auth/providers/cognito";

const options = {
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID,
            clientSecret: process.env.COGNITO_CLIENT_SECRET,
            issuer: process.env.COGNITO_DOMAIN,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
          if (account) {
            token.accessToken = account.access_token;
            token.idToken = account.id_token;
            token.refreshToken = account.refresh_token;
          }
          return token;
        },
        async session({ session, token }) {
          session.accessToken = token.accessToken;
          session.user.idToken = token.idToken;
          session.refreshToken = token.refreshToken;
          return session;
        },
    },
    pages: {
      signIn: '/auth/signin',
    },

}

export default options;