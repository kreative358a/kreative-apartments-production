import LeftNavbar from "@/components/shared/navbar/LeftNavbar";
import Navbar from "@/components/shared/navbar/TopNavbar";
import RightNavbar from "@/components/shared/navbar/RightNavbar";
import React from "react";
import buildings from "@/../public/assets/images/buildings.webp";
import Image from "next/image";

interface LayoutProps {
	children: React.ReactNode;
}

export default function layout({ children }: LayoutProps) {
	return (
		<div className="relative h-screen">
		<div className="fixed inset-0 z-0 ">
			<Image
				src={buildings}
				alt="Apartments"
				fill
				style={{ objectFit: "cover", objectPosition: "center" }}
				priority
				className="image-light dark:image-dark"
			/>
		</div>    		
		<main className="bg-baby_veryBlack relative">
			<Navbar />
			<div className="flex">
				{/* placeholder LeftNavbar component */}
				<LeftNavbar />
				<section className="flex min-h-screen flex-1 flex-col px-4 pb-6 pt-24 lg:px-8 lg:pt-32">
					<div>{children}</div>
				</section>
				{/* placeholder right navbar component */}
				<RightNavbar />
			</div>
		</main>

		</div>
	);
}

