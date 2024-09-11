import ProtectedRoute from "@/components/shared/ProtectedRoutes";

import React from "react";

import type { Metadata } from "next";
import Header from "@/components/profile/Header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import About from "@/components/profile/About";
import Posts from "@/components/profile/Posts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Issues from "@/components/profile/Issues";
import AssignedIssues from "@/components/profile/AssignedIssues";
import Reports from "@/components/profile/Reports";

export const metadata: Metadata = {
	title: "Kreative Apartments | User Profile",
	description: "Signed in users can view all their profile information",
};

function ProfilePageContent() {
	return (
		<>
			<div className="mx-auto grid items-start gap-4 px-4 pb-4 md:gap-6 md:px-6 max-sm:mx-0 sm:w-full">
				<Header />

				{/* the tabs */}
				<div className="mx-auto sm:w-full rounded-lg bg-blue-50/90 hover:bg-blue-50 dark:bg-slate-800/90 dark:hover:bg-slate-800">
					<Tabs
						className="mx-auto flex border-blue-600 dark:border-blue-800 rounded-lg border-2 flex-wrap"
						defaultValue="about"
					>
						<div className="mb-1 mx-auto sm:w-full max-sm:max-w-[480px]">
						<TabsList className="mx-auto bg-baby_rich flex flex-wrap space-x-4 mb-1 h-auto">
							<TabsTrigger
								value="about"
								className="h3-semibold h-10 tab rounded-sm border-blue-500 border-2 text-blue-900 dark:text-blue-50 mt-1 mb-1"
							>
								About
							</TabsTrigger>
							<TabsTrigger
								value="posts"
								className="h3-semibold h-10 tab rounded-sm border-blue-500 border-2 text-blue-900 dark:text-blue-50 mt-1 mb-1"
							>
								Posts
							</TabsTrigger>
							<TabsTrigger
								value="my-issues"
								className="h3-semibold h-10 tab rounded-sm border-blue-500 border-2 text-blue-900 dark:text-blue-50  mt-1 mb-1"
							>
								My Issues
							</TabsTrigger>
							<TabsTrigger
								value="my-reports"
								className="h3-semibold h-10 tab rounded-sm border-blue-500 border-2 text-blue-900 dark:text-blue-50  mt-1 mb-1"
							>
								My Reports
							</TabsTrigger>
							<TabsTrigger
								value="assigned-issues"
								className="h3-semibold h-10 tab rounded-sm border-blue-500 border-2 text-blue-900 dark:text-blue-50 mt-1 mb-1"
							>
								Assigned Issues
							</TabsTrigger>
						</TabsList>
						</div>
						<div className="mt-1">
						{/* about tabs content */}
						<About />

						{/* posts tab content */}
						<Posts />

						{/* issue tab content */}
						<Issues />

						{/* report tab content */}
						<Reports />
						
						{/* assigned Issue tab content */}
						<AssignedIssues />
						</div>
					</Tabs>
				</div>
			</div>
			<div className="items-center justify-center flex flex-wrap mx-auto space-x-4 mt-2 mb-2 w-4/5">
				<Link href="/profile/edit">
					<Button className="mr-4 ml-4 h3-semibold max-md:justify-self-center electricIndigo-gradient text-babyPowder w-64 rounded-lg mt-2">
						Update Profile
					</Button>
				</Link>
				<Link href="/apartment">
					<Button className="mr-4 ml-4 h3-semibold max-md:justify-self-center electricIndigo-gradient text-babyPowder w-64 rounded-lg mt-2">
						Add Your Apartment
					</Button>
				</Link>
			</div>
		</>
	);
}

export default function ProfilePage() {
	return (
		<ProtectedRoute>
			<ProfilePageContent 
			
			 />
		</ProtectedRoute>
	);
}
