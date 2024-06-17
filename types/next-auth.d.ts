
import NextAuth, { DefaultSession } from "next-auth";
import {UserRole} from "@/types/roles";

export type ExtendedUser = DefaultSession["user"] & {
    id: string;
    role?: UserRole
    accessToken?: string;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }

    interface User {
        id: string;
        role?: UserRole
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        sub: string;
        name: string;
        email: string;
        role?: UserRole
        accessToken?: string;
    }
}
