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
			<h3 className="flex-center font-semibold dark:font-medium text-blue-900 font-robotoSlab dark:text-blue-400 text-3xl md:text-4xl xl:text-5xl">
				All Technicians - ({technicians?.results.length})
			</h3>

			<div className="mt-4 grid cursor-pointer grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3 ">
				{technicians && technicians.results.length > 0 ? (
					technicians.results.map((technician) => (
						<Card key={technician.id}
						className="bg-blue-50/90 hover:bg-blue-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 dark:border-blue-950 rounded-lg border-2 hover:scale-105 duration-300 box-shadow mx-auto sm:w-full max-w-[480px]">
							<CardContent >
								<CardHeader className="flex-col-center text-center">
									<Avatar className="border-orange-500 mx-auto w-28 h-32 overflow-hidden rounded-full border-4 object-cover">
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
											className="electricIndigo-gradient text-blue-50 mt-3"
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
