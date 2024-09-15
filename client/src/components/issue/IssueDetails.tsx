"use client";

import {
	useDeleteIssueMutation,
	useGetSingleIssueQuery,
} from "@/lib/redux/features/issues/issueApiSlice";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import { extractErrorMessage } from "@/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { AuthFormHeader } from "../forms/auth";
import {
	CheckCheck,
	CircleDot,
	EyeIcon,
	Hotel,
	LayoutGrid,
} from "lucide-react";
import {
	BuildingOfficeIcon,
	Bars4Icon,
	Squares2X2Icon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { Button } from "../ui/button";

interface IssueDetailsProps {
	params: {
		id: string;
	};
}

export default function IssueDetails({ params }: IssueDetailsProps) {
	const id = params.id;
	const { data } = useGetSingleIssueQuery(id);
	const issue = data?.issue;
	const router = useRouter();

	const { data: currentUser } = useGetUserProfileQuery();

	// tylko użytkownik, który zgłosił problem, będzie mógł go usunąć problem
	const canUpdate = issue?.assigned_to === currentUser?.profile.full_name;

	// że tylko użytkownik, który zgłosił problem, będzie mógł go usunąć
	const canDelete = issue?.reported_by === currentUser?.profile.full_name;

	// tworzymy uchwyt usuwania problemu
	const [deleteIssue] = useDeleteIssueMutation();

	// usunięcie uchwytu const będzie funkcją asynchroniczną.
	const handleDeleteIssue = async () => {
		if (issue?.id) {
			try {
				await deleteIssue(issue.id).unwrap();
				router.push("/profile");
				toast.success("Your Issue was deleted");
			} catch (e) {
				const errorMessage = extractErrorMessage(e);
				toast.error(errorMessage || "An error occurred");
			}
		}
	};
	return (
		<Card className="border-2 border-dashed border-blue-900/60 dark:border-blue-200/60">
			<AuthFormHeader
				title={issue?.title}
				linkText="Go back to profile"
				linkHref="/profile"
			/>

			<CardHeader className="flex flex-row justify-between gap-4 border-b border-b-blue-950 p-4 sm:p-6 md:flex-row md:items-center md:gap-6 ">
				<div className="grid gap-0.5">
					<CardTitle className="text-blue-950 dark:text-blue-50">
						<p className="flex items-center space-x-2">
							<BuildingOfficeIcon className="tab-icon" />
							<span className="text-lg text-blue-900 dark:text-blue-100">
								Apartment Building:{" "}
							</span>
							<span className="text-lg font-semibold text-blue-950 dark:text-blue-50">
								{issue?.apartment_building}
							</span>
						</p>
						<p className="flex items-center space-x-2">
							<Bars4Icon className="tab-icon" />
							<span className="text-lg text-blue-900 dark:text-blue-100">
								Apartment Floor:{" "}
							</span>
							<span className="text-lg font-semibold text-blue-950 dark:text-blue-50">
								{issue?.apartment_floor}
							</span>
						</p>
						<p className="flex items-center space-x-2">
							<LayoutGrid className="tab-icon" />
							<span className="text-lg font-semibold text-blue-900 dark:text-blue-100">
								Apartment Number:{" "}
							</span>
							<span className="text-lg font-semibold text-blue-950 dark:text-blue-50">
								{issue?.apartment_unit}
							</span>
						</p>
					</CardTitle>

					<CardDescription className="mt-2">
						<p className="flex items-center space-x-2">
							<CheckCheck className="tab-icon" />
							<span className="text-xl text-blue-950 dark:text-blue-100">
								Occupied By:{" "}
							</span>
							<span className="text-xl text-blue-950 dark:text-blue-50">
								{issue?.reported_by}
							</span>
						</p>
					</CardDescription>
				</div>

				<div className="flex flex-col gap-y-3">
					{canUpdate && (
						<Link href={`/issue/update-issue/${id}`}>
							<Button
								className="bg-electricIndigo/90 hover:bg-electricIndigo dark:bg-electricIndigo/90 dark:hover:bg-electricIndigo dark:text-babyPowder ml-auto h-10 max-w-[200px] text-blue-50 sm:ml-0 md:max-w-[300px]"
								size="sm"
								variant="outline"
							>
								Update Issue
							</Button>
						</Link>
					)}

					{canDelete && (
						<Button
							onClick={handleDeleteIssue}
							className="ml-auto h-10 max-w-[200px] bg-red-500 text-blue-50 sm:ml-0 md:max-w-[300px] dark:bg-red-500 dark:text-blue-50"
							size="sm"
							variant="outline"
						>
							Delete Issue
						</Button>
					)}
				</div>
			</CardHeader>

			<CardContent className="border-b-eerieBlack border-b">
				<CardDescription className="mt-3">
					<div className="flex items-center space-x-2">
						<CircleDot className="tab-icon" />
						<span className="text-lg text-blue-950 dark:text-blue-50 ">
							{issue?.description}
						</span>
					</div>
				</CardDescription>
			</CardContent>

			<CardFooter className="mt-2 flex flex-row justify-between font-medium text-blue-950 dark:text-lime-500">
				<p className="text-base">
					assigned to:
					<span className="ml-2 text-blue-950 dark:text-blue-50">
						{issue?.assigned_to || "Not assigned Yet!"}
					</span>
				</p>
				<p className="text-base">
					Status:
					<span className="ml-2 text-blue-950 dark:text-blue-50">
						{issue?.status}
					</span>
				</p>
				<p className="text-base">
					Priority:
					<span className="ml-2 text-blue-950 dark:text-blue-50">
						{issue?.priority}
					</span>
				</p>
				<p className="flex flex-row items-center">
					<EyeIcon className="mr-1 size-5 text-blue-800 dark:text-lime-500" />
					<span className="text-blue-950 dark:text-blue-50">
						View Count: {issue?.view_count}
					</span>
				</p>
			</CardFooter>
		</Card>
	);
}
