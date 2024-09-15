"use client";

import {
	useGetSinglePostQuery,
	useUpdatePostMutation,
} from "@/lib/redux/features/posts/postApiSlice";
import { postUpdateSchema, TPostUpdateSchema } from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { FormFieldComponent } from "@/components/inputs/MyFormFieldComponent";
import { Text } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

interface UpdateParamsProps {
	params: {
		slug: string;
	};
}

export default function UpdatePostForm({ params }: UpdateParamsProps) {
	const postSlug = params.slug;
	const { data } = useGetSinglePostQuery(postSlug);
	const post = data?.post;
	const [updatePost, { isLoading }] = useUpdatePostMutation();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TPostUpdateSchema>({
		resolver: zodResolver(postUpdateSchema),
	});

	useEffect(() => {
		if (post) {
			reset({
				...post,
			});
		}
	}, [post, reset]);

	const onSubmit = async (formValues: z.infer<typeof postUpdateSchema>) => {
		try {
			await updatePost({ postSlug, ...formValues }).unwrap();
			toast.success("Post updated successfully");
			router.push(`/post/${postSlug}`);
		} catch (error) {
			toast.error(extractErrorMessage(error) || "Failed to update post");
		}
	};

	return (
		<main>
			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full max-w-md flex-col gap-2 text-blue-950 dark:text-orange-100"
			>
				<FormFieldComponent
					label="Title"
					name="title"
					register={register}
					errors={errors}
					startIcon={
						<Text className="size-8 text-slate-800 dark:text-orange-200" />
					}
				/>

				<FormFieldComponent
					label="Content"
					name="body"
					register={register}
					errors={errors}
					isTextArea
				/>

				<Button
					type="submit"
					className="h4-semibold mt-6 w-full bg-slate-700/80 text-blue-50 hover:bg-slate-700 dark:bg-orange-500/80 dark:text-blue-50 dark:hover:bg-orange-500"
					disabled={isLoading}
				>
					{isLoading ? <Spinner size="sm" /> : `Update Your Post`}
				</Button>
			</form>
		</main>
	);
}
