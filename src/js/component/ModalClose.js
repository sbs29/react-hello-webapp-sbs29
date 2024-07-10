import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const ModalClose = props => {
	
	const { actions } = useContext(Context);

	const handleDelete = () => {
		actions.deleteContact(props.id);
	};

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
						<p>You are about to eliminate the contact {props.name}, are you sure?!</p>
					</div>
					<div className="modal-footer">
						<button
							onClick={() => {props.onClose();}}
							type="button"
							className="btn btn-primary"
						>
							Cancel
						</button>
						<button
							onClick={() => {
								handleDelete();
								props.onClose();
							}}
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal"
							>
							Accept
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};