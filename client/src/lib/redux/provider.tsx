// tworzymy niestandardowego dostawcę Redux, którego głównym celem będzie zapewnić sklep Redux dla całej naszej aplikacji
// ten dostawca będzie częścią składową klienta.
"use client";
// importujemy App Store i utworzymy store
import { AppStore, makeStore } from "@/lib/redux/store";
// z Reacta importujemy Reacta
import React, { useRef } from "react";
// import dostawcy z React Redux
import { Provider } from "react-redux";

// tworzymy interfejs, o nazwie dostawca rekwizytów
interface ProviderProps {
	children: React.ReactNode;
}

// ma na celu zdestrukturyzować dzieci, a rekwizyty dla dzieci są rekwizytami typu dostawcy
// upewnimy się, że ten komponent klienta jest bezpieczny podczas ponownego renderowania, sprawdzając wartość odniesienia, aby mieć pewność, że sklep zostanie utworzony tylko raz
export default function ReduxProvider({ children }: ProviderProps) {
    // dzięki wykorzystaniu haka ref ten komponent staje się komponentem klienckim
	const storeRef = useRef<AppStore>();
    // jeśli nie ma punktu odniesienia do sklepu zrobi to instancja za pierwszym razem, gdy to renderuje
	if (!storeRef.current) {
        // czyli bieżąca referencja sklepu będzie wyglądać tak: make store
		storeRef.current = makeStore();
	}
    // zwracamy dostawcę i przekazujemy dzieci
	return <Provider store={storeRef.current}>{children}</Provider>;
}