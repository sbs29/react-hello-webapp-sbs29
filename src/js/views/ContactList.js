import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { ContactCard } from "../component/ContactCard.js";
import { ModalClose } from "../component/ModalClose.js";
import { ModalEdit } from "../component/ModalEdit.js";

export const ContactList = () => {

	const [state, setState] = useState({
		showCloseModal: false,
		showEditModal: false,
		id: null
	});

	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getContacts();
	}, []);

	//console.log(store.contacts);
	//console.log(state.id);

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add-contact">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.contacts.map(item => (
							<ContactCard
								key={item.id}
								contactInfo={item}
								onDelete={() => setState({ showCloseModal: true, id: item.id })}
								onUpdate={() => setState({ showEditModal: true, id: item.id })}
							/>
						))}
					</ul>
				</div>
			</div>
			<ModalClose 
				id={state.id} 
				name={store.contacts.find(contact => contact.id === state.id)?.name || ""}
				show={state.showCloseModal} 
				onClose={() => setState({ showCloseModal: false })} 
			/>
			<ModalEdit
				id={state.id}
				name={store.contacts.find(contact => contact.id === state.id)?.name || ""}
				email={store.contacts.find(contact => contact.id === state.id)?.email || ""}
				phone={store.contacts.find(contact => contact.id === state.id)?.phone || ""}
				address={store.contacts.find(contact => contact.id === state.id)?.address || ""}
				show={state.showEditModal}
				onClose={() => setState({ showEditModal: false })}
			/>
		</div>
	);
};
