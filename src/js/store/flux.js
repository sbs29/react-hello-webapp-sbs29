const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			agenda: "sebas",
			contacts: []
		},
		actions: {

			// https://playground.4geeks.com/contact/docs#/		API-DOCS

			getContacts: async () => {
				try {
					const agendaName = getStore().agenda;
					const response = await fetch(
						`https://playground.4geeks.com/contact/agendas/${agendaName}`
					);
					if (response.status == 404 ) {
						await getActions().createAgenda();
					}
					if (!response.ok) {
						throw `API ERROR: ${response.statusText}`;
					}
					const data = await response.json();
					setStore( { contacts: data.contacts });
				} catch (error) {
					console.error(error);
				}
				
			},
			createAgenda: async () => {
				try {
					const agendaName = getStore().agenda;
					await fetch(
						`https://playground.4geeks.com/contact/agendas/${agendaName}`,
						{
							method: "POST"
						}
					);
				} catch (error) {
					console.error(error);
				}
			},
			addContact: async contactData => {
				try {
					const agendaName = getStore().agenda;
					await fetch(
						`https://playground.4geeks.com/contact/agendas/${agendaName}/contacts`,
						{
							method: "POST",
							body: JSON.stringify({
								name: `${contactData.name}`,
								email: `${contactData.email}`,
								address: `${contactData.address}`,
								phone: `${contactData.phone}`
							}),
							headers: {
								"Content-Type": "application/json"
							}
						}
					);
				} catch (error) {
					console.error(error);
				}
			},
			deleteContact: async (id) => {
				const agendaName = getStore().agenda;
				const response = await fetch(
					`https://playground.4geeks.com/contact/agendas/${agendaName}/contacts/${id}`,
					{
						method: "DELETE"
					}
				);
				if (response.status == 204) {
					//1ª opcion: Llamar a la función getContacts
					//await getActions().getContacts();
					//2ª opcion: Setear el store sin hacer ninguna llamada a la API
					const allContact = getStore().contacts;
					const filteredContacts = allContact.filter((item) => item.id !== id);
					setStore({ contacts : filteredContacts});
				}
			},
			updateContact: async (contactData , id) => {
				try {
					const agendaName = getStore().agenda;
					const response = await fetch(
						`https://playground.4geeks.com/contact/agendas/${agendaName}/contacts/${id}`,
						{
							method: "PUT",
							body: JSON.stringify({
								name: `${contactData.name}`,
								email: `${contactData.email}`,
								address: `${contactData.address}`,
								phone: `${contactData.phone}`
							}),
							headers: {
								"Content-Type": "application/json"
							}
						}
					);
					// console.log(response.status);
					if (response.status == 200) {
						await getActions().getContacts();
					}
				} catch (error) {
					console.error(error);
				}
			}
		}
	};
};

export default getState;
