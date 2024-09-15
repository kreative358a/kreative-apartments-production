// 163. Get Posts by Tag
"use client";

import { useGetPostsByTagQuery } from "@/lib/redux/features/posts/postApiSlice";
import Spinner from "../shared/Spinner";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { formatDate, getRepliesText, getViewText } from "@/utils";
import { formatDistanceToNow, parseISO } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";
import { EyeIcon, MessageSquareQuoteIcon } from "lucide-react";

interface SlugParamsProps {
	params: {
		tagSlug: string;
	};
}

export default function PostTagCard({ params }: SlugParamsProps) {
	const { data, isLoading } = useGetPostsByTagQuery(params.tagSlug);
	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}

	const posts = data?.posts_by_tag.results || [];

	return (
		<>
		<div className="mx-auto flex flex-row items-center justify-between gap-4">
			<h2 className="flex-center font-robotoSlab text-[28px] font-semibold text-blue-900 md:text-[32px] xl:text-[36px] 2xl:text-[40px] dark:font-medium dark:text-blue-500">
				Posts tagged with {"  "}
				<span className="text-electricIndigo ml-1 font-semibold dark:font-medium dark:text-lime-500">
					&ldquo;{params.tagSlug}&rdquo;
				</span>
			</h2>
		</div>
			<div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
				{posts.map((post) => (
					<Card
						key={post.id}
						className="box-shadow mx-auto max-w-[480px] rounded-lg border border-indigo-800 bg-blue-50/90 duration-300 hover:scale-105 hover:bg-blue-50 sm:w-full dark:border-indigo-800 dark:bg-slate-800/90 dark:hover:bg-slate-800"
					>
						<CardHeader
							className="pb-4 font-medium text-blue-900 dark:font-normal dark:text-blue-50"
						>
							<CardTitle className=" text-center text-xl">
								{post.title.length > 25
									? `${post.title.substring(0, 25)}....`
									: post.title}
							</CardTitle>
							<CardDescription>
								<div className="text-md flex flex-row justify-between">
									<div className="font-semibold dark:font-medium">
										<span className="text-blue-900 dark:text-blue-50">
											Posted on:{" "}
											</span>
										<span className="ml-2 text-orange-800 dark:text-orange-600">
											{formatDate(post.created_at).toString()}
										</span>
									</div>
								</div>

								<div className="font-semibold dark:font-medium">
									<span className="text-blue-900 dark:text-blue-50">
										Last Updated:{" "}
										</span>
									<span className="ml-2 text-orange-700 dark:text-blue-500">
										{formatDistanceToNow(parseISO(post.updated_at), {
											addSuffix: true,
										})}
									</span>
								</div>
								
							</CardDescription>
						</CardHeader>

						<CardContent className="border-t-deepBlueGrey dark:border-gray text-md border-y py-4">

							<p className="rounded-sm p-2 font-semibold text-blue-950 dark:font-normal dark:text-blue-50">
								{post.body.length > 65
									? `${post.body.substring(0, 65)}....`
									: post.body}
							</p>
						</CardContent>

						<div className="flex flex-row items-center justify-between p-2">
							<div className="font-semibold dark:font-medium">
								<Link href={`/post/${post.slug}`}>
									<Button size="sm" className="lime-gradient text-blue-50">
										View Post
									</Button>
								</Link>
							</div>
							<div className="flex-row-center font-semibold text-slate-800 dark:font-medium dark:text-blue-50">
								<EyeIcon className="post-icon text-electricIndigo mr-1" />
								{getViewText(post.view_count)}
							</div>
							<div className="flex-row-center font-semibold text-slate-800 dark:font-medium dark:text-blue-50">
								<MessageSquareQuoteIcon className="post-icon text-electricIndigo mr-1" />
								<span  className="text-blue-900 dark:text-blue-50">
									{getRepliesText(post.replies_count)}
								</span>
							</div>
						</div>
					</Card>
				))}
			</div>
		
	</>
	);
	
}
