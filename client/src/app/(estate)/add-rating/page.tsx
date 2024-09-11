import CreateRatingForm from "@/components/forms/add-rating/CreateRatingForm";
import { AuthFormHeader } from "@/components/forms/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Alpha Apartments | Add Rating",
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
			<div className="mt-7 mx-auto sm:w-full max-w-[480px]">
				<div className="bg-blue-50/90 hover:bg-blue-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 rounded-lg px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-xl">
					<CreateRatingForm />
				</div>
			</div>
		</div>
	);
}
