// 108. Users Api Slice
import { baseApiSlice } from "@/lib/redux/features/api/baseApiSlice";
import {
	NonTenantResponse,
	ProfileData,
	ProfileResponse,
	ProfilesResponse,
	QueryParams,
} from "@/types";

export const usersApiSlice = baseApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllUsers: builder.query<ProfilesResponse, QueryParams>({
			query: (params = {}) => {
				const queryString = new URLSearchParams();

				if (params.page) {
					queryString.append("page", params.page.toString());
				}
				if (params.searchTerm) {
					queryString.append("search", params.searchTerm);
				}
				return `/profiles/all/?${queryString.toString()}`;
			},
			providesTags: ["User"],
			// providesTags: ["User", "Profile"],
		}),

        // parametry zapytania sugerują stronę i termin wyszukiwania 
		getAllTechnicians: builder.query<NonTenantResponse, QueryParams>({
			query: (params = {}) => {
				const queryString = new URLSearchParams();

				if (params.page) {
					queryString.append("page", params.page.toString());
				}
				if (params.searchTerm) {
					queryString.append("search", params.searchTerm);
				}
				return `/profiles/non-tenant-profiles/?${queryString.toString()}`;
			},
            
            // Każdy indywidualny punkt końcowy zapytania może mieć swoje buforowane dane przypisane do konkretnego znacznika.
            // Dzięki temu możliwe jest nawiązanie relacji między danymi w pamięci podręcznej z jednego lub większej liczby punktów końcowych zapytania a zachowanie jednego lub więcej punktów końcowyc mutacji.
            // Dzięki użyciu tego tagu użytkownika w naszym zapytaniu umożliwiamy nawiązanie relacji między danymi w pamięci podręcznej użytkownika i tego konkretnego zapytania Get lub users
			providesTags: ["User"],
		}),
        // zapytanie służące do uzyskania profilu użytkownika
		getUserProfile: builder.query<ProfileResponse, void>({
			query: () => "/profiles/user/my-profile/",
            
			providesTags: ["User"],
		}),
        // mutacja oznaczająca aktualizację profilu użytkownika
		updateUserProfile: builder.mutation<ProfileData, ProfileData>({
			query: (formData) => ({
				url: "/profiles/user/update/",
				method: "PATCH",
				body: formData,
			}),
            // Celem unieważniania tagów jest zapewnienie, że dane w pamięci podręcznej zostaną odświeżone, gdy zajdzie taka potrzeba.
            // Dlatego gdy mutacja modyfikuje dane na serwerze, zawsze ważne jest unieważnienie powiązanej z nią pamięci podręcznej danych, dzięki czemu aplikacja będzie mogła pobrać zaktualizowane dane z serwera przy następnym żądaniu.
            // Dlatego stosujemy tutaj znaczniki unieważniające.            
			invalidatesTags: ["User"],
		}),
	}),
});

// po utworzeniu punktów końcowych zapytanie RTK automatycznie użyje tych punktów końcowych do utworzenia haków i możemy wyeksportować te haki
export const {
	useGetAllUsersQuery,
	useGetUserProfileQuery,
	useUpdateUserProfileMutation,
	useGetAllTechniciansQuery,
} = usersApiSlice;