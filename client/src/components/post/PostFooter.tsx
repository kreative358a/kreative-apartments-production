import { MessageCircleMoreIcon } from "lucide-react";
import TagList from "../shared/TagList";
import { CardFooter } from "../ui/card";
import { getRepliesText } from "@/utils";

interface PostFooterProps {
	tags: string[] | undefined;
	replies_count: number | undefined;
}

export default function PostFooter({ tags, replies_count }: PostFooterProps) {
	return (
		<CardFooter className="flex items-center justify-between border-b border-dashed border-b-slate-800 text-slate-900 dark:border-b-slate-500 dark:text-orange-100">
			<TagList tags={tags ?? []} />
			<div className="flex items-center">
				<MessageCircleMoreIcon className="tab-icon text-electricIndigo" />
				<p className="ml-2 font-semibold text-blue-900 dark:font-medium dark:text-blue-50">
					{getRepliesText(replies_count)}
				</p>
			</div>
		</CardFooter>
	);
}
