import { AuthFormHeader } from "@/components/forms/auth";
import EditProfileForm from "@/components/forms/profile/EditProfileForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Kreative Apartments | Profile Edit",
	description: "Signed in users can edit their profile information",
};

export default function EditProfilePage() {
	return (
		<div>
			<AuthFormHeader title="Update Profile" />
			<div className="mx-auto mt-7 max-w-[480px] sm:w-full">
				<div className="rounded-lg bg-blue-50/90 p-6 shadow  hover:bg-blue-50 sm:px-12 dark:bg-slate-800/90 dark:hover:bg-slate-800">
					<EditProfileForm />
				</div>
			</div>
		</div>
	);
}
