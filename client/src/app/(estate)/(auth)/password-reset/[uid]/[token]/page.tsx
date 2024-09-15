import { AuthFormHeader } from "@/components/forms/auth";
import PasswordResetConfirmForm from "@/components/forms/auth/PasswordResetConfirmForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Kreative Apartments | Password Reset Request",
	description: "Password request reset page",
};

export default function ForgotPassword() {
	return (
		<div>
			<AuthFormHeader title="Create your New Password" />
			<div className="mx-auto mt-7 max-w-[480px] sm:w-full">
				<div className="bg-lightGrey/80 hover:bg-lightGrey/95 dark:bg-deepBlueGrey/80 dark:hover:bg-deepBlueGrey/95 px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-xl">
					<PasswordResetConfirmForm />
				</div>
			</div>
		</div>
	);
}