// 115. User Avatar
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthNavigation } from "@/hooks";
import { useUserProfile } from "@/hooks/useUseProfile";
import { BookMarked, CircleUser, LogOut, User, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AuthAvatar() {
	const { handleLogout } = useAuthNavigation();

	const { profile, isLoading, isError } = useUserProfile();

	if (isLoading) {
		return null;
	}

	if (isError) {
		return null;
	}

	return (
		<div>
			{profile && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar className="box-shadow cursor-pointer border-2 border-orange-500 duration-300 hover:scale-110">
							<AvatarImage alt="auth image" src={profile.avatar} />
							<AvatarFallback>
								<CircleUser className="size-8 text-blue-900 dark:text-orange-100 " />
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>

					<DropdownMenuContent className="border-4 border-slate-600/60 bg-slate-100 font-semibold text-slate-800 dark:border-slate-400/60 dark:bg-slate-800 dark:font-medium dark:text-orange-100">
						<DropdownMenuLabel className="border-b-2">
							Manage Account
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="auth-nav">
							<Link href="/profile" className="flex-row-center">
								<User className="mr-1" /> My Profile
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem className="auth-nav">
							<Link href="/tenants" className="flex-row-center">
								<Users className="mr-1" /> Tenants
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem className="auth-nav">
							<Link href="/bookmarks" className="flex-row-center">
								<BookMarked className="mr-1" /> My Bookmarks
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem
							onClick={handleLogout}
							className="flex-row-center auth-nav cursor-pointer"
						>
							<LogOut className="mr-1" /> Log Out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
}
