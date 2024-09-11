import { AuthFormHeader } from "@/components/forms/auth";
import CreateIssueForm from "@/components/forms/report-issue/CreateIssueForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Kreative Apartments | Report Issue",
	description:
		"Tenants can report any issues to the management with regards to their apartments",
};

export default function ReportIssuePage() {
	return (
		<div>
			<AuthFormHeader title="Report an issue with your Apartment" />
			<div className="mt-7 mx-auto sm:w-full max-w-[480px]">
				<div className="bg-blue-50/90 hover:bg-blue-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 rounded-lg px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-xl">
					<p className="text-blue-950 dark:text-orange-500 text-2xl">
						
					</p>
					<CreateIssueForm />
				</div>
			</div>
		</div>
	);
}
