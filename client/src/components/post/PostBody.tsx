import { useGetSinglePostQuery } from "@/lib/redux/features/posts/postApiSlice";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import React from "react";
import { CardContent, CardDescription } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

interface PostBodyProps {
	body: string | undefined;
	slug: string | undefined;
}

export default function PostBody({ body, slug }: PostBodyProps) {
	const { data: currentUser } = useGetUserProfileQuery();
	const { data } = useGetSinglePostQuery(slug || "");
	const canUpdate =
		data?.post.author_username === currentUser?.profile.username;
	return (
		<CardContent className="border-b-slate-800 dark:border-slate-500 border-b border-dashed">
			<CardDescription className="mt-3">
				<div className="flex items-center space-x-2">
					<span className="text-base font-semibold dark:font-medium text-slate-800 dark:text-blue-50">
						{body}
					</span>
				</div>
				{canUpdate && (
					<Link href={`/post/update-post/${slug}`}>
						<Button className="lime-gradient text-babyPowder mt-3.5">
							Update Post
						</Button>
					</Link>
				)}
			</CardDescription>
		</CardContent>
	);
}
