"use client";

import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import Spinner from "@/components/shared/Spinner";
import { TabsContent } from "@/components/ui/tabs";
import { ProfileItem } from "./ProfileItem";
import {
	BadgeCheck,
	Briefcase,
	CalendarDays,
	Contact,
	Home,
	Hotel,
	Map,
	MapPinnedIcon,
	Star,
	UserRoundCheck,
	AlignVerticalSpaceAround,
	FileDigit,
} from "lucide-react";
import { capitalizeFirstLetter, formatDate } from "@/utils";
import ProtectedRoute from "../shared/ProtectedRoutes";

function AboutContent() {
	const { data, isLoading } = useGetUserProfileQuery();
	const profile = data?.profile;

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}
	const baseapartments = profile?.apartments_base?.toString().slice(0, 100);
	return (
		<TabsContent value="about">
			<div className="mt-2 grid grid-cols-1 gap-4 p-4 md:grid-cols-2 2xl:grid-cols-3">
				{/* column 1 */}
				<div className="space-y-3">
					<ProfileItem
						icon={<Contact className="tab-icon" />}
						label="Name"
						value={profile?.full_name || ""}
					/>
					<ProfileItem
						icon={<UserRoundCheck className="tab-icon" />}
						label="Gender"
						value={capitalizeFirstLetter(profile?.gender || "")}
					/>
					<ProfileItem
						icon={<CalendarDays className="tab-icon" />}
						label="Joined"
						value={formatDate(profile?.date_joined).toString() || ""}
					/>
					<ProfileItem
						icon={<BadgeCheck className="tab-icon" />}
						label="Reputation"
						value={`${profile?.reputation} out of 100` || ""}
					/>
					<ProfileItem
						icon={<Map className="tab-icon" />}
						label="Country"
						value={profile?.country_of_origin || ""}
					/>
					<ProfileItem
						icon={<MapPinnedIcon className="tab-icon" />}
						label="City"
						value={profile?.city_of_origin || ""}
					/>
				</div>
				{/* column 2 */}
				<div className="space-y-3">
					<ProfileItem
						icon={<Briefcase className="tab-icon" />}
						label="Occupation"
						value={capitalizeFirstLetter(profile?.occupation || "")}
					/>
					<ProfileItem
						icon={<Hotel className="tab-icon" />}
						label="Building"
						// value={`${profile?.apartment?.building || "None"}`}
						value={profile?.apartment?.building || "None"}
					/>
					<ProfileItem
						icon={<AlignVerticalSpaceAround className="tab-icon" />}
						label="Floor"
						// value={`${profile?.apartment?.floor || "None"}`}
						value={profile?.apartment?.floor.toString() || "None"}
					/>
					<ProfileItem
						icon={<FileDigit className="tab-icon" />}
						label="Unit Number"
						value={profile?.apartment?.unit_number || "None"}
					/>

					<ProfileItem
						icon={<Star className="tab-icon" />}
						label="Average Rating"
						value={profile?.average_rating?.toString() || ""}
					/>
					{/*
					<ProfileItem
						icon={<Hotel className="tab-icon" />}
						label="Apartment Base"
						// value={profile?.apartments_base?.toString().slice(0, 100) || "json"}
					/>
					<ProfileItem
						icon={<Hotel className="tab-icon" />}
						label="Apartment Base Profile"
						value={profile?.apartments_base_profile?.toString().slice(0, 100) || "json"}
					/> 
					*/}
					<ProfileItem
						icon={<Hotel className="tab-icon" />}
						label="Apartment Id"
						value={profile?.apartment_profile?.toString() || ""}
					/>
					<div className="prose max-w-none">
						<p>
							<span className="tab-font">Bio:</span>
							<span className="dark:text-babyPowder font-medium text-green-900 dark:font-normal">
								{profile?.bio || "You have not added any bio info yet!"}
							</span>
						</p>
					</div>
				</div>
			</div>
		</TabsContent>
	);
}

export default function About() {
	return (
		<ProtectedRoute>
			<AboutContent />
		</ProtectedRoute>
	);
}
