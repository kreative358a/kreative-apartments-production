"use client";
import { useGetAllUsersQuery } from "@/lib/redux/features/users/usersApiSlice";
import { useTheme } from "next-themes";

import React from "react";
import Spinner from "../shared/Spinner";
import UsersSearch from "../shared/search/UsersSearch";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import TenantInfo from "./TenantInfo";
import {
	BrickWall,
	Briefcase,
	Building,
	CalendarDays,
	Map,
	School,
} from "lucide-react";
import { formatDate } from "@/utils";
import ProtectedRoute from "../shared/ProtectedRoutes";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
import PaginationSection from "../shared/PaginationSection";

function TenantCardContent() {
	const { theme } = useTheme();
	// w komponencie karty lokatora użyjemy haka selektora aplikacji, aby dostać się do naszego state
	const searchTerm = useAppSelector((state) => state.user.searchTerm);
	const page = useAppSelector((state) => state.user.page);

	// w ramach zapytania wszystkich użytkowników przekażemy nasze zapytanie
	const { data, isLoading } = useGetAllUsersQuery({ searchTerm, page });

	const totalCount = data?.profiles.count || 0;
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
			<h1 className="flex-center font-robotoSlab text-3xl text-blue-950 md:text-4xl xl:text-5xl dark:text-orange-500">
				All Tenants - ({data?.profiles.results.length})
			</h1>

			<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
				{data && data.profiles.results.length > 0 ? (
					data.profiles.results.map((tenant) => (
						<Card
							key={tenant.id}
							className="box-shadow hover:scale-103 mx-auto border-2 border-blue-900/60 bg-blue-50/90 duration-300 hover:bg-blue-50 max-2xl:max-w-md max-sm:w-9/12 dark:border-blue-200/60 dark:bg-slate-800/90 dark:hover:bg-slate-800"
						>
							<CardContent>
								<CardHeader className="flex-col-center text-center">
									<Avatar className="mx-auto h-32 w-28 overflow-hidden rounded-full border-4 border-orange-500 object-cover">
										<AvatarImage
											alt="User profile avatar"
											src={
												tenant.avatar ||
												(theme === "dark"
													? "/assets/icons/user-profile-circle.svg"
													: "/assets/icons/user-profile-light-circle.svg")
											}
										/>
									</Avatar>
									<CardTitle className="h3-semibold font-robotoSlab text-slate-800 dark:text-slate-50">
										{tenant.full_name}
									</CardTitle>
								</CardHeader>
								<CardTitle className="flex-center">
									<p className="h4-semibold text-green-800 dark:text-green-500">
										@{tenant.username}
									</p>
								</CardTitle>
								<CardDescription className="mt-4 space-y-2 border-b-0">
									<div>
										<TenantInfo
											label="Country of Origin"
											value={tenant.country_of_origin}
											icon={Map}
										/>
										<TenantInfo
											label="Occupation"
											value={tenant.occupation}
											icon={Briefcase}
										/>
										<TenantInfo
											label="Date Joined"
											value={formatDate(tenant.date_joined).toString()}
											icon={CalendarDays}
										/>
									</div>
									{tenant.apartment && (
										<>
											<TenantInfo
												label="Building"
												value={tenant.apartment.building}
												icon={Building}
											/>
											<TenantInfo
												label="Apartment Floor"
												value={tenant.apartment.floor}
												icon={School}
											/>
											<TenantInfo
												label="Unit Number"
												value={tenant.apartment.unit_number}
												icon={BrickWall}
											/>
										</>
									)}
								</CardDescription>
							</CardContent>
						</Card>
					))
				) : (
					<p>No tenants found</p>
				)}
			</div>
			{/* <PaginationSection totalPages={totalPages} /> */}

			{/* komponent sekcji paginacji jest dynamiczny i można go używać zarówno z encją użytkowników, jak i encją wpisu */}
			<PaginationSection totalPages={totalPages} entityType="user" />
		</div>
	);
}

export default function TenantCard() {
	return (
		<ProtectedRoute>
			<TenantCardContent />
		</ProtectedRoute>
	);
}
