import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const ModalEdit = props => {

    const { actions } = useContext(Context);

	const [name, setName] = useState(props.name);
	const [email, setEmail] = useState(props.email);
	const [phone, setPhone] = useState(props.phone);
	const [address, setAddress] = useState(props.address);

	useEffect(() => {
		setName(props.name);
		setEmail(props.email);
		setPhone(props.phone);
		setAddress(props.address);
	}, [props]);

	const handleUpdate = () => {
		const contactData = {
			name: name,
			email: email,
			phone: phone,
			address: address
		};
		actions.updateContact(contactData, props.id);
		props.onClose();
	};

	//console.log("Name: "+name,"Email: "+email,"Phone: "+phone,"Address: "+address;

	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Are you sure?</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body">
						<div className="form-group">
							<label>Name</label>
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
								placeholder="Enter email"
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input
								type="phone"
								value={phone}
								className="form-control"
								placeholder="Enter phone"
								onChange={e => setPhone(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label>Address</label>
							<input
								type="text"
								value={address}
								className="form-control"
								placeholder="Enter address"
								onChange={e => setAddress(e.target.value)}
							/>
						</div>
					</div>
					<div className="modal-footer">
						<button
							onClick={() => {
								props.onClose();
							}}
							type="button"
							className="btn btn-primary">
							Cancel
						</button>
						<button
							onClick={() => {
								handleUpdate();
								props.onClose();
							}}
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal">
							Confirm
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};