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
			<h2 className="h2-semibold flex-center font-robotoSlab text-xl text-blue-900 dark:text-orange-500">
				Total: ({myReport?.count})
			</h2>
			<div className="mt-4 grid cursor-pointer grid-cols-1 gap-4 p-1.5 md:grid-cols-2 2xl:grid-cols-3">
				{myReport && myReport.results.length > 0 ? (
					myReport.results.map((report) => (
						<Card
							key={report.id}
							className="dark:border-gray hover:dark:border-platinum rounded-lg border border-dashed border-orange-500/60 hover:border-orange-500"
						>
							<CardHeader>
								<CardTitle className="flex-center h3-semibold font-robotoSlab h-10 text-lime-900 dark:text-lime-500">
									{report.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="dark:bg-deepBlueGrey h-30 rounded-sm bg-lime-100 p-2 text-blue-950 dark:text-lime-100">
									<p className="h4-semibold">{report.description}</p>
								</CardDescription>
							</CardContent>

							<CardFooter className="dark:yellow-50 flex flex-row justify-between">
								<p>
									<span className="mr-1 font-bold text-blue-950 dark:text-orange-500">
										Created On:{" "}
									</span>
									<Badge className="dark:bg-electricIndigo dark:text-babyPowder bg-blue-900 text-blue-50">
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
