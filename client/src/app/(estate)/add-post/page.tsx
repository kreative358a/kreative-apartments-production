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
			<div className="mt-7 mx-auto sm:w-full max-w-[480px]">
				<div className="bg-blue-50/90 hover:bg-blue-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 rounded-lg px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-xl">
					<CreatePostForm />
				</div>
			</div>
		</div>
	);
}
