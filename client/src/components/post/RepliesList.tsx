import { Reply } from "@/types";
import { useTheme } from "next-themes";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow, parseISO } from "date-fns";

interface ReplyProps {
	reply: Reply;
}

export default function RepliesList({ reply }: ReplyProps) {
	const { theme } = useTheme();
	return (
		<div className="flex items-center space-x-3">
			<Avatar>
				<AvatarImage
					src={
						reply.avatar ??
						(theme === "dark"
							? "/assets/icons/user-profile-circle.svg"
							: "/assets/icons/user-profile-light-circle.svg")
					}
					alt="Author Avatar"
					className="rounded-full border-2 border-orange-500 dark:border-orange-500"
					width={35}
					height={35}
				/>
			</Avatar>
			<div>
				<p className="flex items-center space-x-2  font-semibold dark:font-medium">
					<span className="text-slate-800 dark:text-blue-50">
						@{reply.author_username}
					</span>
					<span className="text-electricIndigo text-lg dark:text-lime-500">
						{formatDistanceToNow(parseISO(reply.created_at), {
							addSuffix: true,
						})}
					</span>
				</p>
				<p className="text-lg dark:text-blue-50">{reply.body}</p>
			</div>
		</div>
	);
}
