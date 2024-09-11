import { baseApiSlice } from "@/lib/redux/features/api/baseApiSlice";
import { 
	ActivateUserData,
	LoginResponse,
	LoginUserData,
	RegisterUserData,
	RegisterUserResponse,
	ResetPasswordConfirmData,
	ResetPasswordData,
	SocialAuthArgs,
	SocialAuthResponse,
	UserResponse,
} from "@/types";

export const authApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation<RegisterUserResponse,RegisterUserData>({
            query: (userData) => ({
				url: "/auth/users/",
				method: "POST",
				body: userData,
			}),
        }),
        // punkty końcowe mutacji służą do wysyłania aktualizacji danych do serwera i stosowania zmian
        loginUser: builder.mutation<LoginResponse, LoginUserData>({
			query: (credentials) => ({
				url: "/auth/login/",
				method: "POST",
				body: credentials,
			}),
		}),
		activateUser: builder.mutation<void, ActivateUserData>({
			query: (credentials) => ({
				url: "/auth/users/activation/",
				method: "POST",
				body: credentials,
			}),
		}),
		resetPasswordRequest: builder.mutation<void, ResetPasswordData>({
			query: (formData) => ({
				url: "/auth/users/reset_password/",
				method: "POST",
				body: formData,
			}),
		}),
		resetPasswordConfirm: builder.mutation<void, ResetPasswordConfirmData>({
			query: (formData) => ({
				url: "/auth/users/reset_password_confirm/",
				method: "POST",
				body: formData,
			}),
		}),
        // void, void ponieważ kiedy wylogowujesz użytkownika, nie otrzymujemy żadnej odpowiedzi i nie mamy żadnych danych.
		logoutUser: builder.mutation<void, void>({
			query: () => ({
				url: "/auth/logout/",
				method: "POST",
			}),
		}),
        // generuje odświeżający token JWT, który jest mutacją, nie zwraca żadnej odpowiedzi, nie pobiera żadnych danyc
		refreshJWT: builder.mutation<void, void>({
			query: () => ({
				url: "/auth/refresh/",
				method: "POST",
			}),
		}),
		getUser: builder.query<UserResponse, void>({
			query: () => "/auth/users/me/",
		}),
		socialAuthentication: builder.mutation<SocialAuthResponse, SocialAuthArgs>({
			query: ({ provider, state, code }) => ({
				url: `/auth/o/${provider}/?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`,
                // encodeURIComponent to komponent kodowania URI jest wbudowaną funkcją JavaScript, która koduje ciąg znaków do wykorzystania jako prawidłowy składnik URI. Zastępuje pewne znaki o szczególnym znaczeniu w URI ich zakodowanym odpowiednikiem. Dlatego trzeba to dodać dla stanu i kodu.
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}),
		}),                          
    })
})

// na koniec, po użyciu zestawu narzędzi Redux z zapytaniem ATK, po utworzeniu wycinka automatycznie generowane są haki oparte na nazwach, które podałeś dla naszych mutacji i naszych zapytań.
// ponieważ nassze zapytanie oznacza pobierz użytkownika dlatego dodajemy "use", a następnie "get" czyli pobierz zapytanie użytkownika
export const {
	useSocialAuthenticationMutation,
	useActivateUserMutation,
	useLoginUserMutation,
	useLogoutUserMutation,
	useGetUserQuery,
	useRegisterUserMutation,
	useResetPasswordConfirmMutation,
	useResetPasswordRequestMutation,
	useRefreshJWTMutation,
} = authApiSlice;

// jest jedna z zalet korzystania z zestawu narzędzi Redux w przypadku zapytań reklamowych, ponieważ teraz narzędzie automatycznie dokonuje introspekcji wycinków i generuje haki na podstawie mutacji lub zapytań, które zostały zdefiniowane. Więc wykorzystamy te mutacje i zapytania w naszej aplikacji, aby wysłać dane do serwera lub pobrać dane z serwera.
// Dodając adnotacje typu do naszych mutacji i zapytań, zapewniamy bezpieczeństwo typu w naszym mutacje i nasze zapytania.