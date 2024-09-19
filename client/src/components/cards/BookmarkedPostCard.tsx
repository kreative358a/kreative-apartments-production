// 161. Bookmarked Posts
"use client";

import { useGetAllMyBookmarksQuery } from "@/lib/redux/features/posts/postApiSlice";
import {
	formatDate,
	getRepliesText,
	getViewText,
	sortByDateDescending,
} from "@/utils";
import Spinner from "../shared/Spinner";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { formatDistanceToNow, parseISO } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";
import { EyeIcon, MessageSquareQuoteIcon } from "lucide-react";

export default function BookmarkedPostCard() {
	const { data, isLoading } = useGetAllMyBookmarksQuery();
	const bookmarks = data?.bookmarked_posts;

	const sortedBookmarks = sortByDateDescending(
		bookmarks?.results ?? [],
		"created_at",
	);

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}
	return (
		<>
			<div className="mx-auto flex flex-row items-center justify-between gap-4">
				<h1 className="font-robotoSlab text-[28px] font-medium text-orange-600 md:text-[32px] xl:text-[36px] 2xl:text-[40px] dark:font-normal dark:text-orange-600">
					My Bookmarks - ({bookmarks?.results.length})
				</h1>
			</div>

			<div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
				{sortedBookmarks && sortedBookmarks.length > 0 ? (
					sortedBookmarks.map((bookmarkItem) => (
						<Card
							key={bookmarkItem.id}
							className="box-shadow mx-auto max-w-[480px] rounded-md border border-indigo-800 bg-blue-50/90 duration-300 hover:scale-105 hover:bg-blue-50 sm:w-full dark:border-indigo-800 dark:bg-slate-800/90 dark:hover:bg-slate-800"
						>
							<CardHeader className="pb-4 font-medium text-blue-900 dark:font-normal dark:text-blue-50">
								<CardTitle className="text-center text-xl">
									{bookmarkItem.title.length > 25
										? `${bookmarkItem.title.substring(0, 25)}....`
										: bookmarkItem.title}
								</CardTitle>
								<CardDescription>
									<div className="text-md flex flex-row justify-between">
										<div className="font-semibold dark:font-medium">
											<span className="text-blue-900 dark:text-blue-50">
												Posted on:{" "}
											</span>
											<span className="ml-2 text-orange-800 dark:text-orange-600">
												{formatDate(bookmarkItem.created_at).toString()}
											</span>
										</div>
									</div>
									<div className="font-semibold dark:font-normal">
										<span className="text-blue-900 dark:text-blue-50">
											Last Updated:{" "}
										</span>
										<span className="ml-2 text-orange-700 dark:text-blue-500">
											{formatDistanceToNow(parseISO(bookmarkItem.updated_at), {
												addSuffix: true,
											})}
										</span>
									</div>
								</CardDescription>
							</CardHeader>

							<CardContent className="border-t-deepBlueGrey dark:border-gray text-md border-y py-4">
								<p className="rounded-sm p-2 font-semibold text-blue-950 dark:font-normal dark:text-blue-50">
									{bookmarkItem.body.length > 65
										? `${bookmarkItem.body.substring(0, 65)}....`
										: bookmarkItem.body}
								</p>
							</CardContent>

							<div className="flex flex-row items-center justify-between p-2">
								<div className="font-semibold dark:font-medium">
									<Link href={`/post/${bookmarkItem.slug}`}>
										<Button
											size="sm"
											className="lime-gradient text-blue-50 dark:text-blue-50"
										>
											View Post
										</Button>
									</Link>
								</div>

								<div className="flex-row-center font-semibold text-slate-800 dark:font-medium dark:text-blue-50">
									<EyeIcon className="post-icon text-electricIndigo dark:text-electricIndigo mr-1" />
									{getViewText(bookmarkItem.view_count)}
								</div>

								<div className="flex-row-center font-semibold text-slate-800 dark:font-medium dark:text-blue-50">
									<MessageSquareQuoteIcon className="post-icon text-electricIndigo dark:text-electricIndigo mr-1" />
									<span>{getRepliesText(bookmarkItem.replies.length)}</span>
								</div>
							</div>
						</Card>
					))
				) : (
					<p className="text-lg font-medium text-green-700 dark:font-normal dark:text-lime-500">
						No Bookmarks added Yet!
					</p>
				)}
			</div>
		</>
	);
}
