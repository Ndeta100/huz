import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {UserRole} from "@/types/roles";
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            authorize: async (credentials) => {
                const response = await fetch("http://localhost:5000/api/auth", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    })
                });

                if (!response.ok) {
                    throw new Error('Invalid credentials');
                }
                const data = await response.json();

                if (data && data.user && data.token) {
                    return {
                        id: data.user.id,
                        name: `${data.user.firstName} ${data.user.lastName}`,
                        email: data.user.email,
                        role: data.user.role,
                        accessToken: data.token,
                    };
                }

                return null;
                // const user = await response.json();
                //
                // if (user) {
                //     return user;
                // } else {
                //     return null;
                // }
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.sub = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role as UserRole;
                token.accessToken = user.accessToken;
            }
            return token;
        },

        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if (session.user) {
                session.user.name = token.name;
                if (token.email != null) {
                    session.user.email = token.email;
                }
                session.user.accessToken = token.accessToken as string;
            }

            return session;
        },
    }
})