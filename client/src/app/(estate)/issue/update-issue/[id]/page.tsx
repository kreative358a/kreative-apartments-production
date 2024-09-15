// 139. Issue Pages
import React from "react";
import type { Metadata } from "next";
import { AuthFormHeader } from "@/components/forms/auth";
import UpdateIssueForm from "@/components/forms/update-issue/UpdateIssueForm";

export const metadata: Metadata = {
	title: "Kreative Apartments | Update Issue ",
	description:
		"Technicians assigned to an issue can update the status of the issue",
};

interface UpdateParamsProps {
	params: {
		id: string;
	};
}

export default function UpdateIssuePage({ params }: UpdateParamsProps) {
	return (
		<div>
			<AuthFormHeader
				title="Update Issue"
				staticText="Want to go back?"
				linkText="Back to Profile"
				linkHref="/profile"
			/>
			<div className="mx-auto mt-7 max-w-[480px] sm:w-full">
				<div className="bg-lightGrey/80 hover:bg-lightGrey/80 dark:bg-deepBlueGrey/80 dark:hover:bg-deepBlueGrey rounded-lg px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-xl">
					<UpdateIssueForm params={params} />
				</div>
			</div>
		</div>
	);
}
