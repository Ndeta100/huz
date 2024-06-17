'use client'
import { signIn } from "next-auth/react";

export function SignIn() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                console.error("Sign in error:", result.error);
                // Handle error appropriately, e.g., show error message to the user
            } else {
                console.log("Sign in successful");
                // Redirect or update UI accordingly
            }
        } catch (error) {
            console.error("Sign in error:", error);
            // Handle error appropriately, e.g., show error message to the user
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email
                <input name="email" type="email" required />
            </label>
            <label>
                Password
                <input name="password" type="password" required />
            </label>
            <button type="submit">Sign In</button>
        </form>
    );
}
