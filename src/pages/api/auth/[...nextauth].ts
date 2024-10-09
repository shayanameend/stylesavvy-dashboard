import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					if (!credentials?.email || !credentials?.password) {
						return null;
					}

					const response = await axios.post("http://localhost:8080/login", {
						email: credentials.email,
						password: credentials.password,
						deviceOS: "web",
						deviceToken: "device-token",
					});

					const user = response.data.data.user;
					const tokens = response.data.data.tokens;

					if (user && tokens) {
						return { ...user, tokens };
					}

					return null;
				} catch (error) {
					console.error("Login error:", error);

					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				// @ts-ignore
				token.accessToken = user.tokens.access.token;
				// @ts-ignore
				token.refreshToken = user.tokens.refresh.token;
			}

			return token;
		},
		async session({ session, token }) {
			// @ts-ignore
			session.accessToken = token.accessToken;
			// @ts-ignore
			session.refreshToken = token.refreshToken;

			return session;
		},
	},
	pages: {
		signIn: "/auth/signin",
	},
	secret: process.env.NEXTAUTH_SECRET,
});
