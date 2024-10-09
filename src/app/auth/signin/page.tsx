"use client";

import { signIn } from "next-auth/react";
import { type FormEvent, useState } from "react";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		await signIn("credentials", { email, password });
	};

	return (
		<form
			className="h-screen flex flex-col justify-center items-center"
			onSubmit={handleSubmit}
		>
			<label>
				Email:
				<input
					className="ml-12 border border-gray-300"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</label>
			<br />
			<br />
			<label>
				Password:
				<input
					className="ml-4 border border-gray-300"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>
			<br />
			<br />
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				type="submit"
			>
				Sign In
			</button>
		</form>
	);
}
