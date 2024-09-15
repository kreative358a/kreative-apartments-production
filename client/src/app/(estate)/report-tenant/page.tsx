import { AuthFormHeader } from "@/components/forms/auth";
import CreateReportForm from "@/components/forms/report-tenant/CreateReportForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Kreative Apartments | Report Tenant",
	description:
		"Tenants can report their fellow tenants in cases of misconduct or misbehavior",
};

export default function ReportTenantPage() {
	return (
		<div>
			<AuthFormHeader
				title="Report a Tenant"
				staticText="All reports shall remain anonymous. We shall act accordingly, but shall not discolose details of who raised the concern."
				linkText="Back to Profile"
				linkHref="/profile"
			/>
			<div className="mx-auto mt-7 max-w-[480px] sm:w-full">
				<div className="rounded-lg bg-blue-50/90 px-6 py-12 shadow hover:bg-blue-50 sm:rounded-lg sm:px-12 md:rounded-xl dark:bg-slate-800/90 dark:hover:bg-slate-800">
					<CreateReportForm />
				</div>
			</div>
		</div>
	);
}
