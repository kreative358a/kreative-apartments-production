// tworzymy funkcję narzędzia inicjującego uwierzytelnianie społecznościowe

import { toast } from "react-toastify";

interface SocialAuthResponse {
	authorization_url: string;
}

    // http://localhost:8080/api/v1/auth/o/google-oauth2/?redirect_uri=http://localhost:8080/api/v1/auth/google
export default async function InitiateSocialAuth(
    // google-oauth2
	provider: string,
    // redirect_uri
	redirect: string,
) {
	try {
		const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/auth/o/${provider}/?redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/auth/${redirect}`;

		const res = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
			credentials: "include",
		});

		const data: SocialAuthResponse = await res.json();

		if (res.status === 200 && typeof window !== "undefined") {
			window.location.replace(data.authorization_url);
		} else {
			toast.error("Something went wrong with social authentication");
		}
	} catch (e) {
		console.error(e);
		toast.error("An error occurred during social authentication\nerror: " + e);
	}
}