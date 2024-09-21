// 128.-130. Apartment Page & Validation Schema
import ApartmentCreateForm from "@/components/forms/apartment/ApartmentCreateForm";
// import MyApartmentCreateForm from "@/components/forms/apartment/MyApartmentCreateForm";
import { ApartmentSelectForm } from "@/components/forms/apartment/ApartmentSelectForm";
import { AuthFormHeader } from "@/components/forms/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Kreative Apartments | Create Apartment",
	description: "Authenticated users can add their apartment details",
};

export default function AddApartmentPage() {
	return (
		<div>
			<AuthFormHeader
				title="Add Your Apartment"
				staticText="Want to go back?"
				linkText="Back to Profile"
				linkHref="/profile"
			/>
			<div className="mx-auto mt-7 max-w-[480px] sm:w-full">
				<div className="rounded-md bg-blue-50/90 px-6 py-12 shadow hover:bg-blue-50 sm:px-12 md:rounded-lg dark:bg-slate-800/90 dark:hover:bg-slate-800">
					<ApartmentCreateForm />
				</div>
			</div>
			<div className="mx-auto mt-7 max-w-[480px] sm:w-full">
				<div className="rounded-md bg-blue-50/90 px-6 py-12 shadow hover:bg-blue-50 sm:px-12 md:rounded-lg dark:bg-slate-800/90 dark:hover:bg-slate-800">
					<ApartmentSelectForm />
				</div>
			</div>
		</div>
	);
}
