// 162. Right Navbar 1
"use client";

import {
	useGetPopularTagsQuery,
	useGetTopPostsQuery,
} from "@/lib/redux/features/posts/postApiSlice";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function RightNavbar() {
	const { data } = useGetTopPostsQuery();
	const topPosts = data?.top_posts.results;
	const { data: tagData } = useGetPopularTagsQuery();
	return (
		<section className="light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[297px] flex-col justify-between overflow-y-auto border-l bg-blue-50/60 p-6 pt-32 shadow-slate-800/40 hover:bg-blue-50/80 max-xl:hidden dark:bg-slate-800/60 dark:hover:bg-slate-800/80">
			<div className="rounded-md bg-blue-50/60 p-2 hover:bg-blue-50/90 dark:bg-slate-900/60 dark:hover:bg-slate-900/90">
				<h3 className="h3-semibold text-green-700 dark:text-green-500">
					Top Posts
				</h3>
				<div className="mt-4 flex w-full flex-col gap-[20px]">
					{topPosts && topPosts.length > 0 ? (
						topPosts.map((post) => (
							<Link
								key={post.id}
								href={`/post/${post.slug}`}
								className="flex cursor-pointer items-center justify-between gap-7"
							>
								<p className="hover:text-electricIndigo dark:hover:text-electricIndigo font-semibold text-blue-950 dark:font-medium dark:text-blue-50">
									{post.title.length > 34
										? `${post.title.substring(0, 34)}...`
										: post.title}
								</p>
								<ChevronRight className="tab-icon text-blue-500" />
							</Link>
						))
					) : (
						<p className="h4-semibold text-orange-700 dark:text-blue-500">
							No Top Posts found!
						</p>
					)}
				</div>
			</div>

			<div className="rounded-md bg-blue-50/60 p-2 hover:bg-blue-50/90 dark:bg-slate-900/60 dark:hover:bg-slate-900/90">
				<h3 className="h3-semibold text-green-700 dark:text-green-500">
					Popular Tags
				</h3>
				<div className="mt-4 flex w-full flex-col gap-[20px]">
					{tagData && tagData.popular_tags.results.length > 0 ? (
						tagData.popular_tags.results.slice(0, 5).map((tag) => (
							<Link
								key={tag.slug}
								href={`/tags/${tag.slug}`}
								className="flex cursor-pointer items-center justify-between gap-7"
							>
								<div className="flex items-center gap-2">
									<span className="hover:text-electricIndigo dark:hover:text-electricIndigo font-semibold text-blue-950 dark:font-medium dark:text-blue-50">
										{tag.name}
									</span>
									<span
										className="
                                   font-semibold text-blue-950 dark:font-medium dark:text-blue-50"
									>
										({tag.post_count})
									</span>
								</div>
								<ChevronRight className="tab-icon text-blue-500" />
							</Link>
						))
					) : (
						<p className="h4-semibold text-orange-700 dark:text-blue-500">
							No Popular Tags found!
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
