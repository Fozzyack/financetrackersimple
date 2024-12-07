"use client";
import React from "react";
const Overview = ({
	sessionName,
	user_id,
}: {
	sessionName: string;
	user_id: number;
}) => {
	const [name, setName] = React.useState(sessionName);
	const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetch("/api/user", {
			method: "PUT",
			body: JSON.stringify({
				name: name,
				id: user_id,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(() => window.location.reload());
	};

	return (
		<div className="">
			<form onSubmit={submitForm} className="group flex flex-row gap-2">
				<span className="text-2xl font-bold">Welcome </span>
				<input
					value={name}
					onChange={changeName}
					className="text-2xl text-blue-500 font-bold placeholder-blue-500 max-w-[150px]"
				/>
				<button
					type="submit"
					className="group-focus-within:block hidden bg-blue-500 px-3 py-1 rounded-xl text-white"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Overview;
