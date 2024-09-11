// 107. Re-Authorization
// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuth, setLogout } from "@/lib/redux/features/auth/authSlice";
import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { Mutex } from "async-mutex";

const mutex = new Mutex();

// tworzymy funkcję zapytania bazowego, korzystając z zapytania bazowego fetch z zapytania RK
const baseQuery = fetchBaseQuery({
	baseUrl: "/api/v1",
	credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	// gdy zostanie wysłane żądanie, szybko czeka ono na zakończenie wszystkich trwających żądań odświeżenia
	await mutex.waitForUnlock();

	// zmienna odpowiedzi
	let response = await baseQuery(args, api, extraOptions);

	// zapytanie bazowe await i przekazanie argumentów API oraz dodatkowych opcji, a następnie, jeśli odpowiedź zawiera błąd o statusie 401, co oznacza nieautoryzowane działanie, sprawdzimy jeśli żądanie odświeżenia jest już w toku, należy sprawdzić, czy mutex jest zablokowany
	if (response.error && response.error.status === 401) {
		// jeśli nie ma żadnego żądania odświeżenia w toku, to uzyskamy blokadę za pomocą mutex dot, pobierz i wyślij żądanie odświeżenia tokena do punktu końcowego uwierzytelniania
		if (!mutex.isLocked()) {
			// gdy zostanie wysłane żądanie, szybko czeka ono na zakończenie wszystkich trwających żądań odświeżenia
			const release = await mutex.acquire();
			try {
				// W ramach próby możesz następuje odświeżyć odpowiedź, co jest oczekiwaniem na zapytanie bazowe
				const refreshResponse = await baseQuery(
					{
						url: "/auth/refresh/",
						method: "POST",
					},
					api,
					extraOptions,
				);
				// jeśli żądanie odświeżenia zakończy się powodzeniem, wyślemy akcję uwierzytelniania w celu zaktualizowania stanu uwierzytelniania i ponawiamy oryginalne żądanie
				if (refreshResponse?.data) {
					// wysyłamy zestaw uwierzytelniania
					api.dispatch(setAuth());
					// odpowiedzią będzie oczekiwanie na przekazanie zapytania bazowego w interfejsie API args i dodatkowych opcji.
					response = await baseQuery(args, api, extraOptions);
					// w bloku else zajmiemy się przypadkiem, w którym żądanie odświeżenia się nie powiedzie
				} else {
					// wyślemy akcję wylogowania, aby wylogować użytkownika
					api.dispatch(setLogout());
				}
				// na koniec zwolnimy blokadę za pomocą funkcji zwalniania, aby umożliwić innym prośby o kontynuację
			} finally {
				release();
			}
			// w tym bloku else, jeśli żądanie odświeżenia jest już w toku, będziemy czekać na blokada ma zostać zwolniona za pomocą funkcji mutex
		} else {
			await mutex.waitForUnlock();
			// odpowiedzią będzie oczekiwanie na przekazanie zapytania bazowego w argumentach API i dodatkowych opcjach.
			response = await baseQuery(args, api, extraOptions);
		}
	}
	return response;
};

export const baseApiSlice = createApi({
	reducerPath: "api",
	// Zapytanie RTK zasadniczo wykorzystuje koncepcję tagów w celu ustalenia, czy mutacja dla jednego punktu końcowego ma na celu unieważnić niektóre dane dostarczone przez zapytanie z innego punktu końcowego
	baseQuery: baseQueryWithReauth,
	// tagTypes ten typ tagów deklaruje typy tagów, które punkty końcowe mogą dostarczać do pamięci podręcznej.
	tagTypes: ["User", "Apartment", "Issue", "Report", "Post", "ApartmentBase"],
	// tagTypes: ["User", "Apartment", "Issue", "Report", "Post", "Profile"],
	// odświeżenie po ustawieniu fokusu określa, czy zapytanie RTK powinno odświeżać subskrybowane zapytania, gdy okno aplikacji odzyskuje ostrość
	refetchOnFocus: true,
	// gdy mówimy o odświeżaniu przy montowaniu lub zmianie argumentu, zasadniczo określamy, że zapytanie RTK powinno odśwież zapytania, gdy komponent zostanie zamontowany lub gdy argumenty ulegną zmianie
	refetchOnMountOrArgChange: true,
	endpoints: (builder) => ({}),
});
