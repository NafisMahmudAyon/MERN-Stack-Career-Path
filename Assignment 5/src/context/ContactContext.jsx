import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { contactApi } from "../api/contactApi";

const ContactContext = createContext(null);

export const useContacts = () => useContext(ContactContext);

export default function ContactProvider({ children }) {
	const [contacts, setContacts] = useState([]);
	const [loading, setLoading] = useState(false);

	const [searchText, setSearchText] = useState("");
	const [filterBy, setFilterBy] = useState("default");

	const fetchContacts = async () => {
		setLoading(true);
		try {
			const res = await contactApi.get("/contacts");
			setContacts(res.data);
		} catch (err) {
			console.log("Fetch error:", err);
		} finally {
			setLoading(false);
		}
	};

	const addContact = async (payload) => {
		try {
			const contactData = {
				...payload,
				createdAt: new Date().toISOString(),
			};

			const res = await contactApi.post("/contacts", contactData);
			setContacts((prev) => [res.data, ...prev]);
			return true;
		} catch (err) {
			console.log("Add error:", err);
			return false;
		}
	};

	const updateContact = async (id, payload) => {
		try {
			const old = contacts.find((c) => c.id === id);
			const res = await contactApi.put(`/contacts/${id}`, {
				...old,
				...payload,
			});

			setContacts((prev) => prev.map((c) => (c.id === id ? res.data : c)));
			return true;
		} catch (err) {
			console.log("Update error:", err);
			return false;
		}
	};

	const deleteContact = async (id) => {
		try {
			await contactApi.delete(`/contacts/${id}`);
			setContacts((prev) => prev.filter((c) => c.id !== id));
			return true;
		} catch (err) {
			console.log("Delete error:", err);
			return false;
		}
	};

	useEffect(() => {
		fetchContacts();
	}, []);

	const filteredContacts = useMemo(() => {
		let list = [...contacts];

		if (searchText.trim()) {
			const q = searchText.toLowerCase();
			list = list.filter((c) => {
				return (
					c.firstName.toLowerCase().includes(q) ||
					c.lastName.toLowerCase().includes(q) ||
					c.email.toLowerCase().includes(q) ||
					c.phone.toLowerCase().includes(q)
				);
			});
		}

		if (filterBy === "firstName") {
			list.sort((a, b) => a.firstName.localeCompare(b.firstName));
		} else if (filterBy === "lastName") {
			list.sort((a, b) => a.lastName.localeCompare(b.lastName));
		} else if (filterBy === "oldest") {
			list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
		}

		return list;
	}, [contacts, searchText, filterBy]);

	const value = {
		contacts,
		filteredContacts,
		loading,

		searchText,
		setSearchText,

		filterBy,
		setFilterBy,

		fetchContacts,
		addContact,
		updateContact,
		deleteContact,
	};

	return (
		<ContactContext.Provider value={value}>{children}</ContactContext.Provider>
	);
}
