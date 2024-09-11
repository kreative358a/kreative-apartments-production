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
			<div className="mt-7 mx-auto sm:w-full max-w-[480px]">
				<div className="bg-blue-50/90 hover:bg-blue-50 dark:bg-slate-800/90 dark:hover:bg-slate-800  rounded-lg px-6 py-6 shadow sm:px-12">
					<UpdatePostForm params={params} />
				</div>
			</div>
		</div>
	);
}
