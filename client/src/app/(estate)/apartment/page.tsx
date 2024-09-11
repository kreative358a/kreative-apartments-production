// 128.-130. Apartment Page & Validation Schema
import ApartmentCreateForm from "@/components/forms/apartment/ApartmentCreateForm";
// import MyApartmentCreateForm from "@/components/forms/apartment/MyApartmentCreateForm";
import {ApartmentSelectForm} from "@/components/forms/apartment/ApartmentSelectForm";
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
			<div className="mt-7 mx-auto sm:w-full max-w-[480px]">
				<div className="bg-blue-50/90 hover:bg-blue-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 rounded-lg px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-xl">
					<ApartmentCreateForm />
				</div>
			</div>
			<div className="mt-7 mx-auto sm:w-full max-w-[480px]">
				<div className="bg-blue-50/90 hover:bg-blue-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 rounded-lg px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-xl">
					<ApartmentSelectForm />
				</div>
			</div>			
		</div>
	);
}
