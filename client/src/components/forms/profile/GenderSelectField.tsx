// 120. Gender Select Field
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import { TProfileSchema } from "@/lib/validationSchemas";
import { UserSearch } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import Select from "react-select";
import customStyles from "../selectStyles";

// wyłączymy renderowanie po stronie serwera dla tego komponentu
const ClientOnly = dynamic<{ children: React.ReactNode }>(
	() => Promise.resolve(({ children }) => <>{children}</>),
	{ ssr: false },
);

// tworzymy niestandardową ochronę typu, która będzie sprawdzać, czy dany ciąg znaków ma określoną płeć
type Gender = "male" | "female" | "other";

// funkcja Przekaże wartość typu any, a ta funkcja zmieni wartość na gender z typ
function isGender(value: any): value is Gender {
	return ["male", "female", "other"].includes(value);
}

// niestandardowy typ zabezpieczający, który sprawdza, czy dany ciąg znaków ma określoną płeć
const genderOptions = [
	{ value: "male", label: "Male" },
	{ value: "female", label: "Female" },
	{ value: "other", label: "Other" },
];

// interfejs będzie umożliwiał wybór płci i pola rekwizytów
interface GenderSelectFieldProps {
	setValue: UseFormSetValue<TProfileSchema>;
	control: Control<TProfileSchema>;
}

export default function GenderSelectField({
	// rozłożymy na czynniki pierwsze pewien zbiór wartości i kontroli
	setValue,
	control,
	// to są rekwizyty typu wyboru płci
}: GenderSelectFieldProps) {
	// na górze naszego komponentu możemy użyć zapytania Get Profile
	// destrukturyzujemy dane, danym nadajemy alias danych profilowych
	const { data: profileData } = useGetUserProfileQuery();
	// pobranie naszego profilu i uzyskanie z niego danych
	const profile = profileData?.profile;

	useEffect(() => {
		if (profile?.gender) {
			const genderValue = genderOptions.find(
				(option) => option.value === profile.gender,
			);

			if (genderValue && isGender(genderValue.value)) {
				setValue("gender", genderValue.value);
			}
		}
	}, [profile, setValue]);

	return (
		<div>
			<label
				htmlFor="gender"
				className="h4-semibold dark:text-babyPowder text-blue-900"
			>
				Gender
			</label>
			<div className="mt-1 flex w-full items-center gap-2">
				<UserSearch className="size-8 font-medium text-blue-800 dark:font-normal dark:text-blue-50" />
				<ClientOnly>
					<Controller
						control={control}
						name="gender"
						render={({ field }) => (
							<Select
								className="mt-1 w-full"
								isSearchable={false}
								{...field}
								options={genderOptions}
								value={genderOptions.find(
									(option) => option.value === field.value,
								)}
								onChange={(option) => field.onChange(option?.value)}
								instanceId="gender-select"
								styles={customStyles}
							/>
						)}
					/>
				</ClientOnly>
			</div>
		</div>
	);
}

// stworzyliśmy komponent, który będzie wykorzystywał pakiet React Select, aby utworzyć komponent wyboru, który jest specyficzny dla naszego pola wyboru płci, a to pozwoli tylko na wartości męskie, żeńskie i inne
