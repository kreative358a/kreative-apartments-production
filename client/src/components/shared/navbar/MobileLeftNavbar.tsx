"use client";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetOverlay,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetTrigger,
} from "@/components/ui/sheet";
import { leftNavLinks } from "@/constants";
import { useAuthNavigation } from "@/hooks";
import { HomeModernIcon, BuildingOffice2Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function LeftNavContent() {
	const pathname = usePathname();

	const { filteredNavLinks } = useAuthNavigation();
	return (
		<section className="mt-8 flex size-full flex-col justify-between">
			<div className="flex flex-1 flex-col gap-2 ">
			{filteredNavLinks.map((linkItem) => {
				const isActive =
					(pathname.includes(linkItem.path) && linkItem.path.length > 1) ||
					pathname === linkItem.path;
				return (
					<SheetClose asChild key={linkItem.path} className="text-lg text-blue-50 dark:text-blue-50/80">
						<Link
							href={linkItem.path}
							className={`${isActive ? "electricIndigo-gradient hover:scale-102 box-shadow-small rounded-md bg-blue-50/60 font-semibold text-blue-100/90 duration-200 hover:bg-blue-50/90 hover:text-blue-100 dark:bg-slate-900/60 dark:font-medium dark:hover:bg-slate-900/90"
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
							<p className={`${isActive ? "base-bold" : "base-medium"}`}>
								{linkItem.label}
							</p>
						</Link>
					</SheetClose>
				);
			})}
			</div>
		</section>
	);
}

export default function MobileNavbar() {
	const { handleLogout, isAuthenticated } = useAuthNavigation();
	return (
		<Sheet>
			{/* <SheetOverlay className="bg-blue-50/40 dark:bg-slate-900/40"/> */}
			<SheetTrigger asChild className="cursor-pointer">
				<Image
					src="/assets/icons/mobile-menu.svg"
					alt="Mobile Menu"
					width={36}
					height={36}
					className="invert-colors sm:hidden"
				/>
			</SheetTrigger>
			<SheetContent side="left" className="light-border custom-scrollbar w-[297px] overflow-y-auto border-r bg-blue-50/60 shadow-slate-800/40 hover:bg-blue-50/80 dark:bg-slate-800/60 dark:shadow-blue-900/20 dark:hover:bg-slate-800/80">
			<div className="left-0 flex h-full flex-col justify-between border-none">
				<Link href="/" className="flex items-center gap-1">
				
					{/* <HomeModernIcon className="mr-2 size-11 text-lime-500" /> */}
					<BuildingOffice2Icon className="mr-2 size-11 text-lime-500" />
					<p className="h2-bold font-robotoSlab text-blue-900 dark:text-blue-200">
						Kreative <span className="text-lime-500"> Apartments</span>
					</p>
				</Link>
				
				
					<SheetClose asChild >
						<LeftNavContent />
					</SheetClose>

					
						<SheetFooter>
							{isAuthenticated ? (
								<SheetClose asChild>
								<Button
									onClick={handleLogout}
									className="lime-gradient small-medium light-border-2 btn-tertiary text-babyPowder mt-8 min-h-[41px] w-full rounded-md border px-4 py-3 shadow-none"
								>
									Logout
								</Button>
								</SheetClose>
							) : (
								<div>
									<SheetClose asChild>
									<Link href={"/register"}>
										<Button className="electricIndigo-gradient small-medium light-border-2 btn-tertiary text-babyPowder mt-4 min-h-[41px] w-full rounded-md border px-4 py-3 shadow-none">
											Register
										</Button>
									</Link>
									</SheetClose>
									<SheetClose asChild>
									<Link href={"/login"}>
										<Button className="lime-gradient small-medium light-border-2 btn-tertiary text-babyPowder mt-4 min-h-[41px] w-full rounded-md border px-4 py-3 shadow-none">
											Login
										</Button>
									</Link>
									</SheetClose>
								</div>
							)}
						</SheetFooter>
					
			</div>		
			</SheetContent>
			
		</Sheet>
	);
}
