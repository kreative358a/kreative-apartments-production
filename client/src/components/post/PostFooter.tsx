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
		<CardFooter className="border-b-slate-800 dark:border-b-slate-500 text-slate-900 dark:text-orange-100 flex items-center justify-between border-b border-dashed">
			<TagList tags={tags ?? []} />
			<div className="flex items-center">
				<MessageCircleMoreIcon className="tab-icon text-electricIndigo" />
				<p className="ml-2 text-blue-900 dark:text-blue-50 font-semibold dark:font-medium">
					{getRepliesText(replies_count)}
				</p>
			</div>
		</CardFooter>
	);
}
