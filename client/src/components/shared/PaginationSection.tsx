import { setCurrentPage as setUserCurrentPage } from "@/lib/redux/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination";

import { setCurrentPage as setPostCurrentPage } from "@/lib/redux/features/posts/postSlice";

interface PaginationSectionProps {
	totalPages: number;
	entityType: "user" | "post";
}

const PaginationSection = ({
	totalPages,
	entityType,
}: PaginationSectionProps) => {
	const dispatch = useAppDispatch();


	const currentPage = useAppSelector((state) =>
		// state.user.page
		entityType === "user" ? state.user.page : state.post.page,
	);

	const setCurrentPageAction =
		entityType === "user" ? setUserCurrentPage : setPostCurrentPage;

	const handlePreviousClick = () => {
		if (currentPage > 1) dispatch(setCurrentPageAction(currentPage - 1));
	};

	const handleNextClick = () => {
		if (currentPage < totalPages)
			dispatch(setCurrentPageAction(currentPage + 1));
	};

	return (
		<Pagination className="bg-blue-50 dark:bg-eerieBlue dark:text-blue-50 mt-4 rounded-full">
			<PaginationContent>
				<PaginationItem className="cursor-pointer">
					<PaginationPrevious onClick={handlePreviousClick} />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink className="h3-semibold font-robotoSlab text-red-100/80 hover:text-red-100 dark:text-blue-100/80 dark:hover:text-blue-100 inline-flex items-center rounded-md border border-transparent bg-green-500/80 dark:bg-lime-500/80 hover:bg-green-500 dark:hover:bg-lime-500">
						{currentPage}
					</PaginationLink>
				</PaginationItem>
				<PaginationItem className="cursor-pointer">
					<PaginationNext onClick={handleNextClick} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationSection;
