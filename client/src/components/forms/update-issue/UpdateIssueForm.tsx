// 138. Update Issue Form
"use client";
import { useUpdateIssueMutation } from "@/lib/redux/features/issues/issueApiSlice";
import React from "react";
import { TIssueUpdateSchema } from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { statusOptions } from "@/constants";
import customStyles from "../selectStyles";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

const ClientOnly = dynamic<{ children: React.ReactNode }>(
	() => Promise.resolve(({ children }) => <>{children}</>),
	{ ssr: false },
);

interface UpdateParamsProps {
	params: {
		id: string;
	};
}

export default function UpdateIssueForm({ params }: UpdateParamsProps) {
	const issueId = params.id;
	const [updateIssue, { isLoading }] = useUpdateIssueMutation();
	const router = useRouter();

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<TIssueUpdateSchema>();

	const onSubmit = async (formValues: TIssueUpdateSchema) => {
		if (issueId) {
			const valuesWithIssueId = {
				...formValues,
				issueId,
			};

			try {
				await updateIssue(valuesWithIssueId).unwrap();
				toast.success(
					"The Issue assigned to you has been updated. A confirmation email has been sent to the tenant",
				);
				reset();
				router.push("/profile");
			} catch (error) {
				const errorMessage = extractErrorMessage(error);
				toast.error(errorMessage || "An error occurred");
			}
		}
	};

	return (
		<main>
			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full max-w-md flex-col gap-1 dark:text-blue-950"
			>
				<div>
					<label
						htmlFor="Status"
						className="h4-semibold text-blue-900 dark:text-babyPowder"
					>
						Status
					</label>
					<div className="mt-1 flex items-center space-x-3 text-sm">
						<ClientOnly>
							<Controller
								name="status"
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Select
										className="mt-1 w-full"
										// Każda opcja będzie renderowana jako element możliwy do wybrania w menu rozwijanym
										options={statusOptions}
										// metoda find zasadniczo wyszukuje opcję obiekt w tablicy, który spełnia podany przez nas warunek
										value={statusOptions.find(
											// sprawdzamy wartość każdej właściwości opcji względem zmiennej wartości
											// jeśli zostanie znaleziona opcja, której wartość odpowiada zmiennej value, opcja ta zostanie przypisana do zmiennej value właściwość wybranego komponentu.Ustawia początkową lub aktualnie wybraną wartość listy rozwijanej
											// eżeli nie zostanie znaleziona żadna pasująca opcja, wartość prop będzie niezdefiniowana i zostanie wyświetlona lista rozwijana wartość domyślna lub zastępcza
											(option) => option.value === value,
										)}
										// zmiana będzie funkcją przyjmującą wartość i funkcja zwraca wartość po przekazaniu zmiany.
										onChange={(val) => onChange(val?.value)}
										// symbol zastępczy dla tego wybranego komponentu będzie aktualizował status problemu.
										onBlur={onBlur}
										placeholder="Update the Issue Status"
										// identyfikator instancji, która ma zostać wydana,
										instanceId="issue-status-select"
										// określamy że będą to style niestandardowe
										// zaimportować i upewnić się, że po przewinięciu do góry style niestandardowe powinny zostać zaimportowane z nasze wybrane style, które znajdują się w naszych komponentach, a następnie w katalogu formularzy
										styles={customStyles}

										// zamkamy wybrane style niestandardowe
									/>
								)}
							/>
						</ClientOnly>
					</div>
					{/* określamy obsługę błędów */}
					{errors.status && (
						<p className="min-h-4 max-h-6 font-medium dark:font-normal pl-6 my-0.5 text-sm leading-4 text-red-500">
						⚠ {errors.status.message}</p>
					)}
				</div>

				<Button
					type="submit"
					className="h4-semibold bg-blue-800/80 hover:bg-blue-800 dark:bg-orange-500/80 dark:hover:bg-orange-500 mt-2 w-full text-blue-50/80 hover:text-blue-50"
					// odpowiada za to żę wyłączony rekwizyt będzie regulowany przez stan łatwego załadunku
					disabled={isLoading}
				>
					{/* w przycisku wyświetli się komunikat informujący, czy ładowanie jest prawidłowe, a w stanie ładowania zamierzamy wyrenderować spinner. */}
					{isLoading ? <Spinner size="sm" /> : `Update Status`}
				</Button>
			</form>
		</main>
	);
}

// Następnie aby uzyskać szczegółowe informacje o problemie, potrzebujemy identyfikatora problemu zgodnie z naszą funkcjonalnością, stworzymy więc stronę przy użyciu next.js która zdefiniuje w pliku app/issue/[id]/page.tsxtrasę dynamiczną posiadającą identyfikator w
