// 140. Report Api Slice
// Funkcjonalność zaplecza, którą jest możliwość aby najemcy mogli zgłaszać innych najemców w przypadku niewłaściwego zachowania
// tworzymy wycinek interfejsu API raportu w folderze raportów w obszarze funkcji
import {
	MyReportsResponse,
	ReportTenantData,
	ReportTenantResponse,
} from "@/types";

// importujemy podstawowy fragment API
import { baseApiSlice } from "../api/baseApiSlice";

// używamy podstawowego fragmentu API
// wstrzykujemy punkty końcowe
export const reportApiSlice = baseApiSlice.injectEndpoints({
    // zwracamy obiekt
    // funkcja, która będzie przejmować konstruktora
	endpoints: (builder) => ({
        // mutacja której wyzwalaczem będzie raportowanie najemców
		reportTenant: builder.mutation<ReportTenantResponse, ReportTenantData>({
            // funkcja, która będzie pobierać dane z raportu.
			query: (reportData) => ({
				url: "/reports/create/",
				method: "POST",
                // w treści znajdą się dane raportu
				body: reportData,
			}),
            // ponieważ jest to mutacja, unieważnimy naszą pamięć podręczną.
			invalidatesTags: ["Report"],
		}),
        // builder, który doda nasze adnotacje typu, odpowiedź na raport
        // Ponieważ jest to zapytanie, nie będzie ono pobierać żadnych danych. Dlatego też adnotacja typu dla danych może być pusta.
		getMyReports: builder.query<MyReportsResponse, void>({
			query: () => "/reports/me/",
            // ponieważ jest to zapytanie, przekaże ono pewne dane do pamięci podręcznej.
			providesTags: ["Report"],
		}),
	}),
});

// fenerujemy kilka haków za pomocą zapytania R-tec i je eksportujemy
export const { useReportTenantMutation, useGetMyReportsQuery } = reportApiSlice;