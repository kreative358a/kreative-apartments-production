"use client";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetTrigger,
} from "@/components/ui/sheet";
import { leftNavLinks, rightNavLinks } from "@/constants";
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
		<section className="flex h-full w-full flex-col justify-between mt-8 right-0 custom-scrollbar overflow-y-auto">
			<div className="bg-blue-50/60 hover:bg-blue-50/90 dark:bg-slate-900/60 dark:hover:bg-slate-900/90 p-2 rounded-md">
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
								className={"text-blue-50 dark:text-blue-50/80 text-lg"}
							>
								<Link
									key={post.id}
									href={`/post/${post.slug}`}
									className="flex cursor-pointer items-center justify-between gap-7"
								>
									<p className="font-semibold dark:font-medium text-base mt-1 mb-1 hover:text-electricIndigo text-blue-950 dark:text-blue-50 dark:hover:text-electricIndigo">
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

			<div className="bg-blue-50/60 hover:bg-blue-50/90 dark:bg-slate-900/60 dark:hover:bg-slate-900/90 p-2 rounded-md">
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
										<span className="font-semibold dark:font-medium text-base text-blue-950 hover:text-electricIndigo dark:text-blue-50 dark:hover:text-electricIndigo">
											{tag.name}
										</span>
										<span
											className="
                                   font-semibold dark:font-medium text-base text-blue-950 dark:text-blue-50"
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
			<SheetContent side="right" className="w-[297px] bg-blue-50/60 hover:bg-blue-50/80  shadow-slate-800/40 dark:bg-slate-800/60 dark:hover:bg-slate-800/80 light-border border-l">
			<div className="right-0 border-none h-full flex flex-col justify-between custom-scrollbar" >
				<Link href="/" className="flex items-center gap-1">
					<BuildingOffice2Icon className="mr-2 size-11 text-lime-500" />
					<p className="h2-bold font-robotoSlab text-blue-900 dark:text-blue-200">
						Kreative <span className="text-lime-500"> Apartments</span>
					</p>
				</Link>
				{/*<RightNavContent />*/}
				
					<SheetClose asChild>
						<RightNavContent />
					</SheetClose>

			</div>

			</SheetContent>
		</Sheet>
	);
}
