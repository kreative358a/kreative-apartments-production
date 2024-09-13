// 166. Technician Card
"use client";

import { useGetAllTechniciansQuery } from "@/lib/redux/features/users/usersApiSlice";
import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { UserState } from "@/types";
import { useTheme } from "next-themes";
import Spinner from "../shared/Spinner";
import UsersSearch from "../shared/search/UsersSearch";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import TechnicianCardDetails from "./TechnicianCardDetails";
import Link from "next/link";
import { Button } from "../ui/button";
import PaginationSection from "../shared/PaginationSection";

export default function TechnicianCard() {
	const { theme } = useTheme();
	const searchTerm = useAppSelector(
		(state: UserState) => state.user.searchTerm,
	);
	const page = useAppSelector((state: UserState) => state.user.page);
	const { data, isLoading } = useGetAllTechniciansQuery({ searchTerm, page });
	const technicians = data?.non_tenant_profiles;

	const totalCount = technicians?.count || 0;
	const totalPages = Math.ceil(totalCount / 9);

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}

	return (
		<div>
			<UsersSearch />
			<h3 className="flex-center font-robotoSlab text-3xl font-semibold text-blue-900 md:text-4xl xl:text-5xl dark:font-medium dark:text-blue-400">
				All Technicians - ({technicians?.results.length})
			</h3>

			<div className="mt-4 grid cursor-pointer grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3 ">
				{technicians && technicians.results.length > 0 ? (
					technicians.results.map((technician) => (
						<Card key={technician.id}
							className="box-shadow hover:scale-103 mx-auto border-2 border-blue-900/60 bg-blue-50/90 duration-300 hover:bg-blue-50 max-2xl:max-w-md max-sm:w-9/12 dark:border-blue-200/60 dark:bg-slate-800/90 dark:hover:bg-slate-800"
						>
							<CardContent >
								<CardHeader className="flex-col-center text-center">
									<Avatar className="mx-auto h-32 w-28 overflow-hidden rounded-full border-4 border-orange-500 object-cover">
										<AvatarImage
											// className="rounded-full"
											alt="User Profile Avatar"
											src={
												technician.avatar ||
												(theme === "dark"
													? "/assets/icons/user-profile-circle.svg"
													: "/assets/icons/user-profile-light-circle.svg")
											}
											// width={100}
											// height={100}
										/>
									</Avatar>
									<CardTitle className="h3-semibold font-robotoSlab text-slate-800 dark:text-slate-50">
										{technician.full_name}
									</CardTitle>
								</CardHeader>
								<CardTitle className="flex-center">
									<p className="h4-semibold text-green-700 dark:text-green-500">
										@{technician.username}
									</p>
								</CardTitle>
								<CardDescription className="mt-2 grid">
									<TechnicianCardDetails
										country_of_origin={technician.country_of_origin}
										occupation={technician.occupation}
										date_joined={technician.date_joined}
										average_rating={technician.average_rating}
									/>
								</CardDescription>
								<div className="flex-center">
									<Link href={`/add-rating?username=${technician.username}`}>
										<Button
											size="sm"
											className="electricIndigo-gradient mt-3 text-blue-50"
										>
											Give me a Rating
										</Button>
									</Link>
								</div>
							</CardContent>
						</Card>
					))
				) : (
					<p className="h4-semibold text-green-700 dark:text-green-500">
						No technicians(s) found!
					</p>
				)}
			</div>
			<PaginationSection totalPages={totalPages} entityType="user" />
		</div>
	);
}
