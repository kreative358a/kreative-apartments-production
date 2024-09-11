"use client";
import { AuthFormHeader, RegisterForm } from "@/components/forms/auth";
import OauthButtons from "@/components/shared/OauthButtons";
import { useRedirectIfAuthenticated } from "@/hooks";

export default function RegisterPage() {
	useRedirectIfAuthenticated();
	return (
		<div>
			<AuthFormHeader
				title="Sign up for an account"
				staticText="Already have an account?"
				linkText="Login Here"
				linkHref="/login"
			/>
			<div className="mt-7 mx-auto sm:w-full max-w-[480px]">
				<div className="bg-blue-50/90 hover:bg-blue-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 rounded-lg px-6 py-12 shadow sm:px-12">
					<RegisterForm />
					<div className="flex-center mt-5 space-x-2">
					<div className="bg-indigo-950/80 hover:bg-indigo-950 dark:text-blue-50/80 dark:bg-blue-50/95 dark:hover:bg-blue-50 h-0.5 flex-1"></div>
						<span className="font-semibold dark:font-medium text-indigo-950 dark:text-blue-50 px-2 text-md">
							Or
						</span>
						<div className="bg-indigo-950/80 hover:bg-indigo-950 dark:text-blue-50/80 dark:bg-blue-50/95 dark:hover:bg-blue-50 h-0.5 flex-1"></div>
					</div>
					<OauthButtons />
				</div>
			</div>
		</div>
	);
}
