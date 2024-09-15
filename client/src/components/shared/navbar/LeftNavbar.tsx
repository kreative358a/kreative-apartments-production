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
		<section className="light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r bg-blue-50/60 p-6 pt-32 shadow-slate-800/40 hover:bg-blue-50/80 max-sm:hidden lg:w-[297px] dark:bg-slate-800/60 dark:hover:bg-slate-800/80">
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
									? "electricIndigo-gradient hover:scale-102 box-shadow-small rounded-md bg-blue-50/60 font-semibold text-blue-100/90 duration-200 hover:bg-blue-50/90 hover:text-blue-100 dark:bg-slate-900/60 dark:font-medium dark:hover:bg-slate-900/90"
									: "text-baby_richBlue"
							} bg-electricIndigo/20 hover:bg-electricIndigo/40 dark:bg-electricIndigo/20 dark:hover:bg-electricIndigo/40 hover:scale-102 box-shadow-small flex items-center justify-start gap-2 rounded-md p-4 duration-200`}
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
						className="lime-gradient small-medium light-border-2 btn-tertiary text-baby_ballon mt-4 min-h-[41px] w-full rounded-md border px-4 py-3 shadow-none"
					>
						Log Out
					</Button>
				</div>
			) : (
				<div className="flex flex-col gap-4">
					<Link href="/login">
						<Button className="lime-gradient small-medium light-border-2 btn-tertiary text-baby_ballon mt-4 min-h-[41px] w-full rounded-md border px-4 py-3 shadow-none">
							Login
						</Button>
					</Link>
					<Link href="/register">
						<Button className="electricIndigo-gradient small-medium light-border-2 btn-tertiary text-baby_ballon mt-2 min-h-[41px] w-full rounded-md border px-4 py-3 shadow-none">
							Register
						</Button>
					</Link>
				</div>
			)}
		</section>
	);
}
