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
			<div className="mx-auto mt-7 max-w-[480px] sm:w-full">
				<div className="rounded-md bg-blue-50/90 px-6 py-12 shadow hover:bg-blue-50 sm:px-12 md:rounded-lg dark:bg-slate-800/90 dark:hover:bg-slate-800">
					<p className="text-2xl text-blue-950 dark:text-orange-500"></p>
					<CreateIssueForm />
				</div>
			</div>
		</div>
	);
}
