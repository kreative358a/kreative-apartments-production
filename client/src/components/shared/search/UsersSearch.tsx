// 126. Users Search
"use client";

import { Input } from "@/components/ui/input";
import { setSearchTerm } from "@/lib/redux/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import Image from "next/image";

const UsersSearch = () => {
	// hak wysyłania aplikacji
	const dispatch = useAppDispatch();
	// haka selektora aplikacji, służący do wyszukiwania terminu z naszego stanu
	// user istnieje ponieważ w reduktorze głównym nadaliśmi reduktorowi użytkownika klucz użytkownika
	// w polu wprowadzania nazwy użytkownika wysyłamy zestaw akcji twórcy terminu wyszukiwania
	const searchTerm = useAppSelector((state) => state.user.searchTerm);
	// obsługa zdarzenia zmiany wejścia uchwytu
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchTerm(event.target.value));
	}; 
	return (
		<div className="bg-blue-100/60 dark:bg-blue-900/60 hover:bg-blue-100/80 dark:hover:bg-blue-900/80  mb-3 flex min-h-[56px] w-full grow rounded-full border-blue-500/40 hover:border-blue-500/60 border-2">
			<Image
				src="/assets/icons/search.svg"
				alt="Search"
				width={24}
				height={24}
				className="mx-3"
			/>
			<Input
				placeholder="Search by username or occupation or apartment id"
				type="search"
				value={searchTerm}
				onChange={handleInputChange}
				className="bg-transparent search-text no-focus text-blue-950 dark:text-blue-50 border-none shadow-none outline-none"
			/>
		</div>
	);
};

export default UsersSearch;

// Następnie zmodyfikujemy również komponent karty lokatora TenantCard.tsx, tak aby można było powrócić do komponentów klienta, a następnie źródła.