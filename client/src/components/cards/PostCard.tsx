// 151. Post Card Component
"use client";

import { useGetAllPostsQuery } from "@/lib/redux/features/posts/postApiSlice";
import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { PostState } from "@/types";
import {
	formatDate,
	getRepliesText,
	getViewText,
	sortByDateDescending,
} from "@/utils";
import Spinner from "../shared/Spinner";
import Link from "next/link";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { formatDistanceToNow, parseISO } from "date-fns";
import { EyeIcon, MessageSquareQuoteIcon } from "lucide-react";
import PaginationSection from "../shared/PaginationSection";

export default function PostCard() {
	const page = useAppSelector((state: PostState) => state.post.page);
	const { data, isLoading } = useGetAllPostsQuery({ page });

	const totalCount = data?.posts.count || 0;
	const totalPages = Math.ceil(totalCount / 9);

	const sortedPosts = sortByDateDescending(
		data?.posts.results ?? [],
		"created_at",
	);

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}
	// h3-semibold electricIndigo-gradient text-blue-50 min-h-[46px] px-4 py-3
	return (
		<>
			<div className="mx-auto flex flex-row items-center justify-between gap-4">
				<Link href="/add-post">
					<Button className="h3-semibold electricIndigo-gradient min-h-[46px] px-4 py-3 text-blue-50">
						Create a Post
					</Button>
				</Link>

				<p className="font-robotoSlab text-[28px] font-medium text-orange-600 md:text-[32px] xl:text-[36px] 2xl:text-[40px] dark:font-normal dark:text-orange-600">
					ALL POSTS ({data?.posts.results.length})
				</p>
			</div>

			<div className="mt-7 grid grid-cols-1 gap-6 max-sm:mx-auto max-sm:max-w-[480px] md:grid-cols-2 2xl:grid-cols-3">
				{sortedPosts && sortedPosts.length > 0 ? (
					sortedPosts.map((postItem) => (
						<Card
							key={postItem.id}
							className="box-shadow hover:scale-103 mx-auto rounded-md border border-indigo-800 bg-blue-50/90 duration-300 hover:bg-blue-50 max-2xl:max-w-md max-sm:w-9/12 dark:border-indigo-900 dark:bg-slate-800/90 dark:hover:bg-slate-800"
						>
							<CardHeader className="pb-4 font-medium text-blue-900 dark:font-normal dark:text-blue-50">
								<CardTitle className="text-center text-xl">
									{postItem.title.length > 25
										? `${postItem.title.substring(0, 25)}....`
										: postItem.title}
								</CardTitle>
								<CardDescription>
									<div className="text-md flex flex-row justify-between">
										<div className="font-semibold dark:font-medium">
											<span className="text-blue-900 dark:text-blue-50">
												Posted on:{" "}
											</span>
											<span className="ml-2 text-orange-800 dark:text-orange-600">
												{formatDate(postItem.created_at).toString()}
											</span>
										</div>
									</div>

									<div className="font-semibold dark:font-normal">
										<span className="text-blue-900 dark:text-blue-50">
											Last Updated:{" "}
										</span>
										<span className="ml-2 text-orange-700 dark:text-blue-500">
											{formatDistanceToNow(parseISO(postItem.updated_at), {
												addSuffix: true,
											})}
										</span>
									</div>
								</CardDescription>
							</CardHeader>

							<CardContent className="border-t-deepBlueGrey dark:border-gray text-md border-y py-4">
								<p className="rounded-sm p-2 font-semibold text-blue-950 dark:font-normal dark:text-blue-50">
									{postItem.body.length > 65
										? `${postItem.body.substring(0, 65)}....`
										: postItem.body}
								</p>
							</CardContent>

							<div className="flex flex-row items-center justify-between p-2">
								<div className="font-semibold dark:font-medium">
									<Link href={`/post/${postItem.slug}`}>
										<Button size="sm" className="lime-gradient text-blue-50">
											View Post
										</Button>
									</Link>
								</div>

								<div className="flex-row-center font-semibold text-slate-800 dark:font-medium dark:text-blue-50">
									<EyeIcon className="post-icon text-electricIndigo mr-1" />
									{getViewText(postItem.view_count)}
								</div>

								<div className="flex-row-center font-semibold text-slate-800 dark:font-medium dark:text-blue-50">
									<MessageSquareQuoteIcon className="post-icon text-electricIndigo mr-1" />
									<span className="text-blue-900 dark:text-blue-50">
										{getRepliesText(postItem.replies_count)}
									</span>
								</div>
							</div>
						</Card>
					))
				) : (
					<p className="h2-semibold text-lime-600 dark:text-lime-400">
						No Posts Found!
					</p>
				)}
			</div>

			<PaginationSection totalPages={totalPages} entityType="post" />
		</>
	);
}
