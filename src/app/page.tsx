"use client";

import { useSession, signOut } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();

	if (!session?.user) {
		return <p>You are not logged in.</p>;
	}

	return (
		<div>
			<p>Welcome, {session.user.name}!</p>
			<button type="button" onClick={() => signOut()}>
				Sign Out
			</button>
		</div>
	);
}
