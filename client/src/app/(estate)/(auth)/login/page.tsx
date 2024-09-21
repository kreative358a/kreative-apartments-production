"use client";
import { AuthFormHeader, LoginForm } from "@/components/forms/auth";
import OauthButtons from "@/components/shared/OauthButtons";
import { useRedirectIfAuthenticated } from "@/hooks";

export default function LoginPage() {
	useRedirectIfAuthenticated();
	return (
		<div>
			<AuthFormHeader
				title="Login to your account"
				staticText="Don't have an account?"
				linkText="Register Here"
				linkHref="/register"
			/>
			<div className="mx-auto mt-7 max-w-[480px] sm:w-full">
				<div className="rounded-md bg-blue-50/90 px-6 py-12 shadow hover:bg-blue-50 sm:px-12 md:rounded-lg dark:bg-slate-800/90 dark:hover:bg-slate-800">
					<LoginForm />
					<div className="flex-center mt-5 space-x-2">
						<div className="h-0.5 flex-1 bg-indigo-950/80 hover:bg-indigo-950 dark:bg-blue-50/95 dark:text-blue-50/80 dark:hover:bg-blue-50"></div>
						<span className="text-md px-2 font-semibold text-indigo-950 dark:font-medium dark:text-blue-50">
							Or
						</span>
						<div className="h-0.5 flex-1 bg-indigo-950/80 hover:bg-indigo-950 dark:bg-blue-50/95 dark:text-blue-50/80 dark:hover:bg-blue-50"></div>
					</div>
					<OauthButtons />
				</div>
			</div>
		</div>
	);
}
