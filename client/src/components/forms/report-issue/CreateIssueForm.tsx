// 133. Create Issue Form
"use client";

import { useGetMyApartmentQuery } from "@/lib/redux/features/apartment/apartmentApiSlice";
import { useReportIssueMutation } from "@/lib/redux/features/issues/issueApiSlice";
import { issueCreateSchema, TIssueCreateSchema } from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormFieldComponent } from "@/components/inputs/MyFormFieldComponent";
import { FlagIcon } from "lucide-react";
import Select from "react-select";
import { priorityOptions, statusOptions } from "@/constants";
import customStyles from "../selectStyles";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

const ClientOnly = dynamic<{ children: React.ReactNode }>(
	() => Promise.resolve(({ children }) => <>{children}</>),
	{ ssr: false },
);

export default function CreateIssueForm() {
	const { data } = useGetMyApartmentQuery();
	const apartment = data?.apartment;

	const [reportIssue, { isLoading }] = useReportIssueMutation();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<TIssueCreateSchema>({
		resolver: zodResolver(issueCreateSchema),
		mode: "all",
	});

	const onSubmit = async (formValues: TIssueCreateSchema) => {
		if (!apartment?.id) {
			toast.error(
				"Create your apartment first in your profile, before creating an issue",
			);
			return;
		}

		const valuesWithApartmentId = {
			...formValues,
			apartmentId: apartment.id,
		};

		try {
			await reportIssue(valuesWithApartmentId).unwrap();
			toast.success(
				"Your Issue has been reported. A confirmation email has been sent to you.",
			);
			reset();
			router.push("/profile");
		} catch (error) {
			const errorMessage = extractErrorMessage(error);
			toast.error(errorMessage || "An error occurred");
		}
	};

	return (
		<main>
			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full max-w-md flex-col gap-1 dark:text-blue-950"
			>
				<FormFieldComponent
					label="Title"
					name="title"
					register={register}
					errors={errors}
					placeholder="Issue Title"
					startIcon={
						<FlagIcon className="size-8 font-medium text-blue-900 dark:font-normal dark:text-blue-50" />
					}
					// onChange={undefined}
				/>
				<FormFieldComponent
					label="Description"
					name="description"
					register={register}
					errors={errors}
					placeholder="Detailed Description of the issue"
					isTextArea
					startIcon={
						<FlagIcon className="size-8 font-medium text-blue-900 dark:font-normal dark:text-blue-50" />
					}
					// onChange={undefined}
				/>
				<div>
					<label
						htmlFor="Status"
						className="h4-semibold text-blue-950 dark:text-blue-50"
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
										className="my-1 w-full"
										options={statusOptions}
										value={statusOptions.find(
											(option) => option.value === value,
										)}
										onChange={(val) => onChange(val?.value)}
										onBlur={onBlur}
										placeholder="Select Reported if you are reportign an issue"
										instanceId="status-select"
										styles={customStyles}
									/>
								)}
							/>
						</ClientOnly>
					</div>
					{errors.status && (
						<p className="my-0.5 max-h-6 min-h-4 pl-6 text-sm font-medium leading-4 text-red-500 dark:font-normal">
						⚠ {errors.status.message}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="Status"
						className="h4-semibold text-blue-950 dark:text-blue-50"
					>
						Priority
					</label>
					<div className="mt-1 flex items-center space-x-3 text-sm">
						<ClientOnly>
							<Controller
								name="priority"
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Select
										className="my-1 w-full"
										options={priorityOptions}
										value={priorityOptions.find(
											(option) => option.value === value,
										)}
										onChange={(val) => onChange(val?.value)}
										onBlur={onBlur}
										placeholder="What priority is your issue?"
										instanceId="priority-select"
										styles={customStyles}
									/>
								)}
							/>
						</ClientOnly>
					</div>
					{errors.priority && (
						<p className="my-0.5 max-h-6 min-h-4 pl-6 text-sm font-medium leading-4 text-red-500 dark:font-normal">
						⚠ {errors.priority.message}
						</p>
					)}
				</div>
				<Button
					type="submit"
					className="h4-semibold hoverbg-blue-900/80 mt-6 w-full bg-blue-900/80 text-white dark:bg-orange-500/80 dark:hover:bg-orange-500"
					disabled={isLoading}
				>
					{isLoading ? <Spinner size="sm" /> : `Report`}
				</Button>
			</form>
		</main>
	);
}
