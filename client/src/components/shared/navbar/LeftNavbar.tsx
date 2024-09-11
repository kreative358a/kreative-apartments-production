"use client";
import { Button } from "@/components/ui/button";
import { leftNavLinks } from "@/constants";
import { useAuthNavigation } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeftNavbar() {
	const pathname = usePathname();
	const { handleLogout, filteredNavLinks, isAuthenticated } =
		useAuthNavigation();
	return (
		<section className="h-screen sticky top-0 bg-blue-50/60 hover:bg-blue-50/80 dark:bg-slate-800/60 dark:hover:bg-slate-800/80 light-border custom-scrollbar shadow-slate-800/40 left-0 flex flex-col justify-between overflow-y-auto border-r p-6 pt-32 max-sm:hidden lg:w-[297px]">
			<div className="flex flex-1 flex-col gap-2 ">
				{/* {leftNavLinks.map((linkItem) => { */}
				{filteredNavLinks.map((linkItem) => {
					const isActive =
						(pathname.includes(linkItem.path) && linkItem.path.length > 1) ||
						pathname === linkItem.path;
					return (
						<Link
							href={linkItem.path}
							key={linkItem.label}
							className={`${
								isActive
									? "font-semibold dark:font-medium electricIndigo-gradient text-blue-100/90 hover:text-blue-100 bg-blue-50/60 hover:bg-blue-50/90 hover:scale-102 duration-200 box-shadow-small dark:bg-slate-900/60 dark:hover:bg-slate-900/90 rounded-md"
									: "text-baby_richBlue"
							} flex items-center justify-start gap-2 bg-electricIndigo/20 p-4 hover:bg-electricIndigo/40 dark:bg-electricIndigo/20 dark:hover:bg-electricIndigo/40 rounded-md hover:scale-102 duration-200 box-shadow-small`}
						>
							<Image
								src={linkItem.imgLocation}
								alt={linkItem.label}
								width={22}
								height={22}
								className={`${isActive ? "" : "color-invert"}`}
							/> 
							<p
								className={`${isActive ? "base-semibold" : "base-medium"} max-lg:hidden`}
							>
								{linkItem.label}
							</p>
						</Link>
					);
				})}
			</div>

			{isAuthenticated ? (
				<div className="flex flex-col gap-4">
					<Button
						onClick={handleLogout}
						className="lime-gradient small-medium light-border-2 btn-tertiary text-baby_ballon min-h-[41px] w-full rounded-md border px-4 py-3 mt-4 shadow-none"
					>
						Log Out
					</Button>
				</div>
			) : (
				<div className="flex flex-col gap-4">
					<Link href="/login">
						<Button className="lime-gradient small-medium light-border-2 btn-tertiary text-baby_ballon min-h-[41px] w-full rounded-md border px-4 py-3 mt-4 shadow-none">
							Login
						</Button>
					</Link>
					<Link href="/register">
						<Button className="electricIndigo-gradient small-medium light-border-2 btn-tertiary text-baby_ballon min-h-[41px] w-full rounded-md border px-4 py-3 mt-2 shadow-none">
							Register
						</Button>
					</Link>
				</div>
			)}
		</section>
	);
}
