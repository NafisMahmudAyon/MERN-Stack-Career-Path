import axios from "axios";

export const contactApi = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});
