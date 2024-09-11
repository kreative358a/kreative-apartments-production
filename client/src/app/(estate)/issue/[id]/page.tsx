// 139. Issue Pages
// opracujmy nad tą stroną, tak aby można było zobaczyć RFC i utworzyć nasz komponent
import IssueDetails from "@/components/issue/IssueDetails";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Kreative Apartments | Issue Details",
	description:
		"Authenticated uses can get the details of the issue they have raised. They can also delete the issue",
};

interface ParamsProps {
	params: {
		id: string;
	};
}

// tworzymy stronę ze szczegółami.
export default function IssueDetailPage({ params }: ParamsProps) {
	return (
		<div>
			<IssueDetails params={params} />
		</div>
	);
}
