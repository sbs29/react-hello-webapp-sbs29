import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {

	const { actions } = useContext(Context);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	const handleAddContact = e => {
		e.preventDefault();

		const data = {
			name: name,
			email: email,
			phone: phone,
			address: address
		};

		actions.addContact(data);

		setName("");
		setEmail("");
		setPhone("");
		setAddress("");
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form onSubmit={handleAddContact}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							value={name}
							className="form-control"
							placeholder="Name"
							onChange={e => setName(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							value={email}
							className="form-control"
							placeholder="Email"
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							value={phone}
							className="form-control"
							placeholder="Phone"
							onChange={e => setPhone(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							value={address}
							className="form-control"
							placeholder="Address"
							onChange={e => setAddress(e.target.value)}
						/>
					</div>
					<button type="submit" className="btn btn-primary form-control">
						SAVE
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
