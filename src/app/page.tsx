import type { FormEvent } from "react";

export default function Home() {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const data = Object.fromEntries(formData.entries());

		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label className="flex justify-evenly">
				Email:
				<input type="email" name="email" />
			</label>
			<br />
			<label className="flex justify-evenly">
				Password:
				<input type="password" name="password" />
			</label>
		</form>
	);
}
