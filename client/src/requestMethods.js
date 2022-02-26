import Axios from 'axios';
// ______________________ BASE_URL _____________________
const BASE_URL = `http://localhost:5001/api/`;
// _______________________ TOKEN ______________________
const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDc0ZWNiNjI3ZTdiNTkyNTVlZGQ4NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTg0NzYwMCwiZXhwIjoxNjQ2MTA2ODAwfQ.8oqoxqo9VHr3oYeWpwVR8bNGbH1hozjNBLAaE84eHC4`;

export const publicRequest = Axios.create({
	baseURL: BASE_URL,
});

export const userRequest = Axios.create({
	baseURL: BASE_URL,
	headers: {
		token: `Bearer ${TOKEN}`,
	},
});
