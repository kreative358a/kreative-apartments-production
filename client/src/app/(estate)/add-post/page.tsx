import CreatePostForm from "@/components/forms/add-post/CreatePostForm";
import { AuthFormHeader } from "@/components/forms/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Kreative Apartments | Add a Post",
	description:
		"Authenticated users can ask any question or post some content for all users to see",
};

export default function AddPostPage() {
	return (
		<div>
			<AuthFormHeader
				title="Create a post"
				staticText="Ask questions, share thoughts or information with everyone!"
				linkText="Back to Home Page"
				linkHref="/welcome"
			/>
			<div className="mx-auto mt-7 max-w-[480px] sm:w-full">
				<div className="rounded-md bg-blue-50/90 px-6 py-12 shadow hover:bg-blue-50 sm:px-12 md:rounded-lg dark:bg-slate-800/90 dark:hover:bg-slate-800">
					<CreatePostForm />
				</div>
			</div>
		</div>
	);
}
