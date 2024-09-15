import { AuthFormHeader } from "@/components/forms/auth";
import UpdatePostForm from "@/components/forms/update-post/UpdatePostForm";
import React from "react";

interface UpdateParamsProps {
	params: {
		slug: string;
	};
}

export default function UpdatePostPage({ params }: UpdateParamsProps) {
	return (
		<div>
			<AuthFormHeader
				title="Update Post"
				staticText="Want to go back?"
				linkText="Back to Posts"
				linkHref="/welcome"
			/>
			<div className="mx-auto mt-7 max-w-[480px] sm:w-full">
				<div className="rounded-lg bg-blue-50/90 p-6 shadow  hover:bg-blue-50 sm:px-12 dark:bg-slate-800/90 dark:hover:bg-slate-800">
					<UpdatePostForm params={params} />
				</div>
			</div>
		</div>
	);
}
