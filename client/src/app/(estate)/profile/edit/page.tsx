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
			<div className="mt-7 mx-auto sm:w-full max-w-[480px]">
				<div className="bg-blue-50/90 hover:bg-blue-50 dark:bg-slate-800/90 dark:hover:bg-slate-800  rounded-lg px-6 py-6 shadow sm:px-12">
					<EditProfileForm />
				</div>
			</div>
		</div>
	);
}
