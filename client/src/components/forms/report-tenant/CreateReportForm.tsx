"use client";

import { useReportTenantMutation } from "@/lib/redux/features/reports/reportApiSlice";
import {
	reportCreateSchema,
	TReportCreateSchema,
} from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormFieldComponent } from "@/components/inputs/MyFormFieldComponent";
import { Contact2Icon, FlagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

export default function CreateReportForm() {
	const router = useRouter();
	const [reportTenant, { isLoading }] = useReportTenantMutation();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TReportCreateSchema>({
		resolver: zodResolver(reportCreateSchema),
		mode: "all",
	});

	const onSubmit = async (values: TReportCreateSchema) => {
		try {
			await reportTenant(values).unwrap();
			toast.success(
				"Your report has been received. The management shall take action immediately",
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
				className="flex w-full max-w-md flex-col gap-4 text-blue-100 dark:text-blue-900"
			>
				<FormFieldComponent
					label="Title"
					name="title"
					register={register}
					errors={errors}
					placeholder="Title"
					startIcon={
						<FlagIcon className="size-8 text-blue-900 dark:text-blue-100" />
					}
					// onChange={undefined}
				/>

				<FormFieldComponent
					label="Tenant's Username"
					name="reported_user_username"
					register={register}
					errors={errors}
					placeholder="Add Tenants Username"
					startIcon={
						<Contact2Icon className="size-8 text-blue-900 dark:text-blue-100" />
					}
					// onChange={undefined}
				/>

				<FormFieldComponent
					label="Description"
					name="description"
					register={register}
					errors={errors}
					placeholder="Detailed Description of the problem"
					isTextArea
					// onChange={undefined}
				/>

				<Button
					type="submit"
					className="h4-semibold mt-2 w-full bg-blue-900/80 text-blue-50/80 hover:bg-blue-900 hover:text-blue-50 dark:bg-orange-500/80 dark:hover:bg-orange-500"
					disabled={isLoading}
				>
					{isLoading ? <Spinner size="sm" /> : `Send Report`}
				</Button>
			</form>
		</main>
	);
}
