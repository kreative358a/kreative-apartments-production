"use client";
import ProtectedRoute from "@/components/shared/ProtectedRoutes";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import { useTheme } from "next-themes";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

function HeaderContent() {
	const { data } = useGetUserProfileQuery();
	const { theme } = useTheme();
	const profile = data?.profile;
	return (
		<div className="flex flex-col gap-2">
			<Avatar className="mx-auto size-32 overflow-hidden rounded-full border-4 border-orange-500 object-cover">
				<AvatarImage
					src={
						profile?.avatar ||
						(theme === "dark"
							? "/assets/icons/user-profile-circle.svg"
							: "/assets/icons/user-profile-light-circle.svg")
					}
					alt="profile image"
					width={128}
					height={128}
				/>
			</Avatar>
			<div className="flex flex-col items-center justify-center space-y-3">
				<h1 className="font-robotoSlab text-2xl text-indigo-900 sm:max-lg:text-3xl lg:text-4xl dark:text-blue-50">
					{profile?.full_name}
				</h1>
				<p className="text-lg lg:text-xl dark:text-lime-500">@{profile?.username}</p>
			</div>
		</div>
	);
}

export default function Header() {
	return (
		<ProtectedRoute>
			<HeaderContent />
		</ProtectedRoute>
	);
}
