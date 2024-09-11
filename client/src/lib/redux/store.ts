import { rootReducer } from "@/lib/redux/features/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApiSlice } from "./features/api/baseApiSlice";

// https://redux-toolkit.js.org/rtk-query/api/setupListeners

export const makeStore = () => {
	return configureStore({
        //  reduktor trasy który łączy wszystkie pozostałe reduktory w naszej aplikacji
		reducer: rootReducer,
        // pobieranie domyślnego oprogramowania pośredniczącego dodaje do zestawu narzędzi Redux skonfiguruj sklep jako oprogramowanie pośredniczące domyślne, takie jak oprogramowanie pośredniczące Redux thunk lub do obsługi logiki asynchronicznej i oprogramowanie pośredniczące do sprawdź przypadkowe mutacje stanu
        // dodajemy oprogramowanie pośredniczące dostarczone przez podstawowy wycinek API do domyślnej tablicy oprogramowania pośredniczącego
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(baseApiSlice.middleware),
        // ponieważ aktywowaliśmy narzędzia programistyczne, musimy zainstalować rozszerzenie przeglądarki
        // opcja konfiguracji, która informuje Redux Toolkit, czy włączyć integracja Redux DevTools
        //  kontrola warunkowa polegająca na sprawdzeniu środowiska, w którym działa aplikacja. Jeśli więc aplikacja nie jest w fazie produkcyjnej, to znaczy, że znajduje się w fazie rozwoju lub testowania Narzędzia deweloperskie Redux zostaną włączone        
		devTools: process.env.NODE_ENV !== "production",
	});
};

// Narzędzia programistyczne Redux będą więc bardzo przydatne podczas debugowania, ponieważ pozwolą nam sprawdź akcje, zmiany stanu i wiele więcej w naszej przeglądarce, a następnie skonfiguruj Mixto

// narzędzie, które jest wymagane do włączenia odświeżania w celu skupienia uwagi oraz odświeżania i łączenia zachowań
// określamy że skonfigurowano słuchaczy
setupListeners(makeStore().dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];