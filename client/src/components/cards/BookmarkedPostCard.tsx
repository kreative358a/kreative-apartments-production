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
		<div className="flex mx-auto flex-row justify-between gap-4 items-center">
			<h1 className="font-robotoSlab font-medium dark:font-normal text-orange-600 dark:text-orange-600 text-[28px] md:text-[32px] xl:text-[36px] 2xl:text-[40px]">
				My Bookmarks - ({bookmarks?.results.length})
			</h1>
		</div>

				<div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
					{sortedBookmarks && sortedBookmarks.length > 0 ? (
						sortedBookmarks.map((bookmarkItem) => (
							<Card
								key={bookmarkItem.id}
								className="bg-blue-50/90 hover:bg-blue-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 border-indigo-800 dark:border-indigo-800 rounded-lg border hover:scale-105 duration-300 box-shadow mx-auto sm:w-full max-w-[480px]"
							>
								<CardHeader className="font-medium dark:font-normal text-blue-900 dark:text-blue-50 pb-4">
									<CardTitle className="text-center text-xl">
										{bookmarkItem.title.length > 25
											? `${bookmarkItem.title.substring(0, 25)}....`
											: bookmarkItem.title}
									</CardTitle>
									<CardDescription>
										<div className="flex flex-row justify-between text-md">
											<div className="font-semibold dark:font-medium">
												<span className="text-blue-900 dark:text-blue-50">
													Posted on:{" "}
												</span>
												<span className="text-orange-800 dark:text-orange-600 ml-2">
													{formatDate(bookmarkItem.created_at).toString()}
												</span>
											</div>
										</div>	
										<div className="font-semibold dark:font-normal">
											<span className="text-blue-900 dark:text-blue-50">
												Last Updated:{" "}
											</span>
											<span className="text-orange-700 dark:text-blue-500 ml-2">
												{formatDistanceToNow(
													parseISO(bookmarkItem.updated_at),
													{
														addSuffix: true,
													},
												)}
											</span>
										</div>
										
									</CardDescription>
								</CardHeader>

								<CardContent className="border-t-deepBlueGrey dark:border-gray border-y py-4 text-md">
									<p className="font-semibold dark:font-normal rounded-sm text-blue-950 dark:text-blue-50 p-2">
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

									<div className="flex-row-center font-semibold dark:font-medium text-slate-800 dark:text-blue-50">
										<EyeIcon className="post-icon text-electricIndigo dark:text-electricIndigo mr-1" />
										{getViewText(bookmarkItem.view_count)}
									</div>

									<div className="flex-row-center font-semibold dark:font-medium text-slate-800 dark:text-blue-50">
										<MessageSquareQuoteIcon className="post-icon text-electricIndigo dark:text-electricIndigo mr-1" />
										<span>{getRepliesText(bookmarkItem.replies.length)}</span>
									</div>
								</div>
							</Card>
						))
					) : (
						<p className="text-lg font-medium dark:font-normal text-green-700 dark:text-lime-500">
							No Bookmarks added Yet!
						</p>
					)}
				</div>

		</>
	);
}
