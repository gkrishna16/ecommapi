import Axios from 'axios';
// ______________________ BASE_URL _____________________
const BASE_URL = `http://localhost:5001/api/`;
// _______________________ TOKEN ______________________
const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDc0ZWNiNjI3ZTdiNTkyNTVlZGQ4NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NDgxMDk4MSwiZXhwIjoxNjQ1MDcwMTgxfQ.0SM4rYutYZ7H53gprD378eV1g5zWfdvIFHzS0LT6yvg`;

export const publicRequest = Axios.create({
	baseURL: BASE_URL,
});

export const userRequest = Axios.create({
	baseURL: BASE_URL,
	headers: {
		token: `Bearer ${TOKEN}`,
	},
});
