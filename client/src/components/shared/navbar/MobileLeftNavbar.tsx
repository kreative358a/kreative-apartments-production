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
		<section className="flex h-full w-full flex-col justify-between mt-8">
			<div className="flex flex-1 flex-col gap-2 ">
			{filteredNavLinks.map((linkItem) => {
				const isActive =
					(pathname.includes(linkItem.path) && linkItem.path.length > 1) ||
					pathname === linkItem.path;
				return (
					<SheetClose asChild key={linkItem.path} className="text-blue-50 dark:text-blue-50/80 text-lg">
						<Link
							href={linkItem.path}
							className={`${isActive ? "font-semibold dark:font-medium electricIndigo-gradient text-blue-100/90 hover:text-blue-100 bg-blue-50/60 hover:bg-blue-50/90 dark:bg-slate-900/60 dark:hover:bg-slate-900/90 rounded-md hover:scale-102 duration-200 box-shadow-small"
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
			{/*<SheetOverlay className="bg-blue-50/40 dark:bg-slate-900/40"/>*/}
			<SheetTrigger asChild className="cursor-pointer">
				<Image
					src="/assets/icons/mobile-menu.svg"
					alt="Mobile Menu"
					width={36}
					height={36}
					className="invert-colors sm:hidden"
				/>
			</SheetTrigger>
			<SheetContent side="left" className="w-[297px] bg-blue-50/60 hover:bg-blue-50/80  shadow-slate-800/40 dark:shadow-blue-900/20 dark:bg-slate-800/60 dark:hover:bg-slate-800/80 light-border border-r">
			<div className="left-0 border-none h-full flex flex-col justify-between custom-scrollbar">
				<Link href="/" className="flex items-center gap-1">
				
					{/*<HomeModernIcon className="mr-2 size-11 text-lime-500" />*/}
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
									className="lime-gradient small-medium light-border-2 btn-tertiary text-babyPowder min-h-[41px] w-full rounded-md border px-4 py-3 mt-8 shadow-none"
								>
									Logout
								</Button>
								</SheetClose>
							) : (
								<div>
									<SheetClose asChild>
									<Link href={"/register"}>
										<Button className="electricIndigo-gradient small-medium light-border-2 btn-tertiary text-babyPowder min-h-[41px] w-full rounded-md border px-4 py-3 mt-4 shadow-none">
											Register
										</Button>
									</Link>
									</SheetClose>
									<SheetClose asChild>
									<Link href={"/login"}>
										<Button className="lime-gradient small-medium light-border-2 btn-tertiary text-babyPowder min-h-[41px] w-full rounded-md border px-4 py-3 mt-4 shadow-none">
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
