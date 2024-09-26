"use client";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useAuthNavigation } from "@/hooks";
import { HomeModernIcon, BuildingOffice2Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	useGetPopularTagsQuery,
	useGetTopPostsQuery,
} from "@/lib/redux/features/posts/postApiSlice";
import { ChevronRight } from "lucide-react";

function RightNavContent() {
	const { data } = useGetTopPostsQuery();
	const topPosts = data?.top_posts.results;
	const { data: tagData } = useGetPopularTagsQuery();
	return (
		<section className="custom-scrollbar right-0 mt-8 flex size-full min-h-[480px] flex-col justify-between overflow-y-auto">
			<div className="rounded-md bg-blue-50/60 p-2 hover:bg-blue-50/90 dark:bg-slate-900/60 dark:hover:bg-slate-900/90">
				<h3 className="h3-semibold text-green-800 dark:text-green-500">
					Top Posts
				</h3>
				<div className="mt-4 flex w-full flex-col gap-[20px]">
					{topPosts && topPosts.length > 0 ? (
						topPosts.map((post) => (
							// return (
							<SheetClose
								asChild
								key={post.slug}
								className={"text-lg text-blue-50 dark:text-blue-50/80"}
							>
								<Link
									key={post.id}
									href={`/post/${post.slug}`}
									className="flex cursor-pointer items-center justify-between gap-7"
								>
									<p className="hover:text-electricIndigo dark:hover:text-electricIndigo my-1 text-base font-semibold text-blue-950 dark:font-medium dark:text-blue-50">
										{post.title.length > 34
											? `${post.title.substring(0, 34)}...`
											: post.title}
									</p>
									<ChevronRight className="tab-icon text-blue-500" />
								</Link>
							</SheetClose>
							// )
						))
					) : (
						<p className="h4-semibold text-orange-800 dark:text-orange-500">
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
							<SheetClose asChild key={tag.slug}>
								<Link
									key={tag.slug}
									href={`/tags/${tag.slug}`}
									className="flex cursor-pointer items-center justify-between gap-7"
								>
									<div className="flex items-center gap-2">
										<span className="hover:text-electricIndigo dark:hover:text-electricIndigo text-base font-semibold text-blue-950 dark:font-medium dark:text-blue-50">
											{tag.name}
										</span>
										<span
											className="
                                   text-base font-semibold text-blue-950 dark:font-medium dark:text-blue-50"
										>
											({tag.post_count})
										</span>
									</div>
									<ChevronRight className="tab-icon text-blue-500" />
								</Link>
							</SheetClose>
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

export default function MobileNavbarRight() {
	return (
		<Sheet>
			<SheetTrigger asChild className="cursor-pointer">
				<Image
					src="/assets/icons/mobile-menu.svg"
					alt="Mobile Posts"
					width={36}
					height={36}
					className="invert-colors xl:hidden"
				/>
			</SheetTrigger>
			<SheetContent side="right" className="custom-scrollbar light-border w-[297px] overflow-y-auto border-l  bg-blue-50/60 shadow-slate-800/40 hover:bg-blue-50/80 dark:bg-slate-800/60 dark:hover:bg-slate-800/80">
			<div className="right-0 flex h-full flex-col justify-between border-none" >
				<Link href="/" className="flex items-center gap-1">
					<BuildingOffice2Icon className="mr-2 size-11 text-lime-500" />
					<p className="h2-bold font-robotoSlab text-blue-900 dark:text-blue-200">
						Kreative <span className="text-lime-500"> Apartments</span>
					</p>
				</Link>
				{/* <RightNavContent /> */}
				
					<SheetClose asChild>
						<RightNavContent />
					</SheetClose>

			</div>

			</SheetContent>
		</Sheet>
	);
}
