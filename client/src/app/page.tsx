import type { Metadata } from "next";
import buildings from "@/../public/assets/images/buildings.webp";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import  { DialogInfoApp }  from "../components/shared/navbar/InfoDialog";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Home | Kreative Apartments",
	description:
		"Kreative Apartments Home Page. Create your account to get started.",
};

export default function HomePage() {
	return (
		<div className="relative h-screen">
			<div className="absolute inset-0 z-0">
				<Image
					src={buildings}
					alt="Apartments"
					fill
					style={{ objectFit: "cover", objectPosition: "center" }}
					priority
				/>
			</div>
			
			<div className="relative z-10 m-auto h-full">
			<DialogInfoApp/>
				<div className="text-shine">
					<div className="mb-0">Welcome</div>
					<div className="mt-0">Kreative Apartments</div>
				</div>
				<div className="text-mainsite">
					<p className="home-text mb-2 mt-36 text-4xl sm:text-5xl 2xl:text-6xl">
						If you are not a tenant.
					</p>
					<Link href="/register" prefetch={false}>
						<button className="home-btn rounded-md px-4 py-2 text-xl font-semibold sm:px-4 md:text-2xl">
							<span className="inline-flex items-center">
								Create Your Account
								<ArrowRightIcon className="ml-2 size-6" />
							</span>
						</button>
					</Link>

					<p className="home-text mb-2 mt-8 text-4xl sm:text-5xl 2xl:text-6xl">
						If you are a tenant.
					</p>
					<Link href="/login" prefetch={false}>
						<button className="home-btn rounded-md px-4 py-2 text-xl font-semibold sm:px-4 md:text-2xl">
							<span className="inline-flex items-center">
								Login your Account
								<ArrowRightIcon className="ml-2 size-6" />
							</span>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}