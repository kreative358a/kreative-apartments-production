import CreateRatingForm from "@/components/forms/add-rating/CreateRatingForm";
import { AuthFormHeader } from "@/components/forms/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Kreative Apartments | Add Rating",
	description:
		"Tenants can rate the technicians, if they are satisfied or dissatisfied with the services rendered to them",
};

export default function AddRatingPage() {
	return (
		<div>
			<AuthFormHeader
				title="Rate a Technician"
				staticText="Tell us what you think about the services rendered"
				linkText="Back to Technicians Page"
				linkHref="/technicians"
			/>
			<div className="mx-auto mt-7 max-w-[480px] sm:w-full">
				<div className="rounded-md bg-blue-50/90 px-6 py-12 shadow hover:bg-blue-50 sm:rounded-md sm:px-12 md:rounded-xl dark:bg-slate-800/90 dark:hover:bg-slate-800">
					<CreateRatingForm />
				</div>
			</div>
		</div>
	);
}
