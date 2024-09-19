import React from "react";

import type { Metadata } from "next";
import { AuthFormHeader } from "@/components/forms/auth";
import PasswordResetRequestForm from "@/components/forms/auth/PasswordResetRequestForm";

export const metadata: Metadata = {
	title: "Kreative Apartments | Password Reset Request",
	description: "Password request reset page",
};

export default function ForgotPassword() {
	return (
		<div>
			<AuthFormHeader
				title="Reset Password Request"
				staticText="Want to go back?"
				linkText="Back to Login Page"
				linkHref="/login"
			/>
			<div className="mx-auto mt-7 max-w-[480px] sm:w-full">
				<div className="bg-lightGrey/80 hover:bg-lightGrey/95 dark:bg-deepBlueGrey/80 dark:hover:bg-deepBlueGrey/95 px-6 py-12 shadow sm:rounded-md sm:px-12 md:rounded-xl">
					<PasswordResetRequestForm />
				</div>
			</div>
		</div>
	);
}
