import Link from "next/link";
import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Hotel, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	BuildingOfficeIcon,
	Bars4Icon,
	Squares2X2Icon,
} from "@heroicons/react/24/solid";

interface Issue {
	id: string;
	title: string;
	description: string;
	apartment_building: string;
	apartment_floor: number;
	apartment_unit: string;
	status: string;
	priority: string;
}

interface IssueCardProps {
	issue: Issue;
}

export default function IssueCard({ issue }: IssueCardProps) {
	return (
		<Link href={`/issue/${issue.id}`} key={issue.id}>
			<Card
				key={issue.id}
				className="dark:border-gray hover:dark:border-platinum box-shadow rounded-lg border border-dashed border-orange-500/80 bg-blue-50/90 duration-300 hover:scale-105 hover:border-orange-500 hover:bg-blue-50 dark:bg-slate-800/90 dark:hover:bg-slate-800"
			>
				<CardHeader>
					<CardTitle className="flex-center h3-semibold font-robotoSlab text-lime-700 dark:text-lime-500">
						{issue.title.length > 20
							? `${issue.title.substring(0, 20)}....`
							: issue.title}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription className="text-blue-950 dark:text-blue-50">
						<p className="h4-semibold">
							{issue.description.length > 35
								? `${issue.description.substring(0, 50)}....`
								: issue.description}
						</p>
					</CardDescription>
				</CardContent>

				<CardContent>
					<CardDescription className="text-blue-950 dark:text-blue-50">
						<p className="flex items-center space-x-2">
							<BuildingOfficeIcon className="tab-icon" />
							<span className="tab-font">Apartment Building: </span>
							<span className="text-lg">{issue.apartment_building}</span>
							<p className="flex items-center space-x-2"></p>
							<Bars4Icon className="tab-icon" />
							<span className="tab-font">Apartment Floor: </span>
							<span className="text-lg">{issue.apartment_floor}</span>
						</p>
						<p className="mt-2 flex items-center space-x-2">
							<LayoutGrid className="tab-icon" />
							<span className="tab-font">Apartment Number: </span>
							<span className="text-lg">{issue.apartment_unit}</span>
						</p>
					</CardDescription>
				</CardContent>

				<CardFooter className="dark:text-babyPowder flex flex-row justify-between">
					<p>
						<p className="mr-0.5 font-bold">Status: </p>
						<Badge className="text-babyPowder dark:bg-electricIndigo dark:text-babyPowder bg-blue-950">
							{issue.status}
						</Badge>
					</p>

					<p>
						<p className="mr-0.5 font-bold">Priority: </p>
						<Badge className="text-babyPowder bg-blue-900/80  hover:bg-blue-900 dark:bg-lime-500 dark:text-blue-950">
							{issue.priority}
						</Badge>
					</p>
				</CardFooter>
			</Card>
		</Link>
	);
}
