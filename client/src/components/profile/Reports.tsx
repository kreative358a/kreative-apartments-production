"use client";

import { useGetMyReportsQuery } from "@/lib/redux/features/reports/reportApiSlice";
import React from "react";
import Spinner from "../shared/Spinner";
import { TabsContent } from "../ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { formatDate } from "@/utils";

export default function Reports() {
	const { data, isLoading } = useGetMyReportsQuery();
	const myReport = data?.reports;

	if (isLoading) {
		<div className="flex-center pt-32">
			<Spinner size="xl" />
		</div>;
	}
	return (
		<TabsContent value="my-reports">
			<h2 className="h2-semibold flex-center font-robotoSlab text-blue-900 dark:text-orange-500 text-xl">
				Total: ({myReport?.count})
			</h2>
			<div className="mt-4 grid cursor-pointer grid-cols-1 gap-4 p-1.5 md:grid-cols-2 2xl:grid-cols-3">
				{myReport && myReport.results.length > 0 ? (
					myReport.results.map((report) => (
						<Card
							key={report.id}
							className="border-orange-500/60 hover:border-orange-500 dark:border-gray hover:dark:border-platinum rounded-lg border border-dashed"
						>
							<CardHeader>
								<CardTitle className="flex-center h3-semibold font-robotoSlab text-lime-900 dark:text-lime-500 h-10">
									{report.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-blue-950 bg-lime-100 dark:text-lime-100 dark:bg-deepBlueGrey p-2 h-30 rounded-sm">
									<p className="h4-semibold">{report.description}</p>
								</CardDescription>
							</CardContent>

							<CardFooter className="dark:yellow-50 flex flex-row justify-between">
								<p>
									<span className="text-blue-950 dark:text-orange-500 mr-1 font-bold">
										Created On:{" "}
									</span>
									<Badge className="bg-blue-900 text-blue-50 dark:bg-electricIndigo dark:text-babyPowder">
										{formatDate(report.created_at).toString()}
									</Badge>
								</p>
							</CardFooter>
						</Card>
					))
				) : (
					<p className="h3-semibold md:h2-semibold text-lime-900 dark:text-lime-500">
						You have not Reported any Tenant(s) Yet!
					</p>
				)}
			</div>
		</TabsContent>
	);
}
