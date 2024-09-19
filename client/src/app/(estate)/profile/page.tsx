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
			<div className="mx-auto grid items-start gap-4 px-4 pb-4 max-sm:mx-0 sm:w-full md:gap-6 md:px-6">
				<Header />

				{/* the tabs */}
				<div className="mx-auto rounded-md bg-blue-50/90 hover:bg-blue-50 sm:w-full dark:bg-slate-800/90 dark:hover:bg-slate-800">
					<Tabs
						className="mx-auto flex flex-wrap rounded-md border-2 border-blue-600 dark:border-blue-800"
						defaultValue="about"
					>
						<div className="mx-auto mb-1 max-sm:max-w-[480px] sm:w-full">
							<TabsList className="bg-baby_rich mx-auto mb-1 flex h-auto flex-wrap space-x-4">
								<TabsTrigger
									value="about"
									className="h3-semibold tab my-1 h-10 rounded-sm border-2 border-blue-500 text-blue-900 dark:text-blue-50"
								>
									About
								</TabsTrigger>
								<TabsTrigger
									value="posts"
									className="h3-semibold tab my-1 h-10 rounded-sm border-2 border-blue-500 text-blue-900 dark:text-blue-50"
								>
									Posts
								</TabsTrigger>
								<TabsTrigger
									value="my-issues"
									className="h3-semibold tab my-1 h-10 rounded-sm border-2 border-blue-500 text-blue-900  dark:text-blue-50"
								>
									My Issues
								</TabsTrigger>
								<TabsTrigger
									value="my-reports"
									className="h3-semibold tab my-1 h-10 rounded-sm border-2 border-blue-500 text-blue-900  dark:text-blue-50"
								>
									My Reports
								</TabsTrigger>
								<TabsTrigger
									value="assigned-issues"
									className="h3-semibold tab my-1 h-10 rounded-sm border-2 border-blue-500 text-blue-900 dark:text-blue-50"
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
			<div className="mx-auto my-2 flex w-4/5 flex-wrap items-center justify-center space-x-4">
				<Link href="/profile/edit">
					<Button className="h3-semibold electricIndigo-gradient text-babyPowder mx-4 mt-2 w-64 rounded-md max-md:justify-self-center">
						Update Profile
					</Button>
				</Link>
				<Link href="/apartment">
					<Button className="h3-semibold electricIndigo-gradient text-babyPowder mx-4 mt-2 w-64 rounded-md max-md:justify-self-center">
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
			<ProfilePageContent />
		</ProtectedRoute>
	);
}
