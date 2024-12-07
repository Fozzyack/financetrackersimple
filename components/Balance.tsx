"use client"
import React from 'react';
const Balance = ({balance} : {balance: string}) => {

	return (
		<div className="flex flex-col">
			<h1 className="text-lg">Balance</h1>
			<span className="text-4xl">{balance}</span>
		</div>
	);
};

export default Balance;
