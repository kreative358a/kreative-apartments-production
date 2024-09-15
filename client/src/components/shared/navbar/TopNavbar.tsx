import { HomeModernIcon, BuildingOffice2Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import MobileNavbar from "./MobileLeftNavbar";
import MobileNavbarRight from "./MobileRightNavbar";
import ThemeSwitcher from "./ThemeSwitcher";
import AuthAvatar from "@/components/shared/navbar/AuthAvatar";
import React from "react";

export default function Navbar() {
	return (
		<nav className="flex-between bg-baby_rich border-b-platinum fixed z-50 w-full gap-5 border-b-2 p-4 shadow-slate-800/40 sm:p-6 lg:px-12 dark:border-b-0">
			<div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
			<MobileNavbarRight />
			<Link href="/" className="flex items-center">
				{/* <HomeModernIcon className="mr-2 size-11 text-lime-500" /> */}
				<BuildingOffice2Icon className="mr-2 size-11 text-lime-500 sm:ml-6" />
				<p className="h2-bold font-robotoSlab hidden text-blue-900 sm:block dark:text-blue-200">
					Kreative <span className="text-lime-500"> Apartments</span>
				</p>
			</Link>
			</div>
			<div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
				{/* placeholder theme switcher component */}
				
				<ThemeSwitcher />
				<AuthAvatar />
				{/* placeholder theme switcher component */}
				<MobileNavbar />
			</div>
		</nav>
	);
}
