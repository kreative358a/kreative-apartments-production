"use client";

import { useCreatePostMutation } from "@/lib/redux/features/posts/postApiSlice";
import React from "react";
import { postSchema, TPostSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { extractErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import { FormFieldComponent } from "@/components/inputs/MyFormFieldComponent";
import { FileText, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";
import ProtectedRoute from "@/components/shared/ProtectedRoutes";

function CreatePostFormContent() {
	const [createPost, { isLoading }] = useCreatePostMutation();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm<TPostSchema>({
		resolver: zodResolver(postSchema),
		mode: "all",
		defaultValues: {
			title: "",
			tags: [],
			body: "",
		},
	});

	const handleInputKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		field: any,
	) => {
		if (e.key === "Enter" && field.name === "tags") {
			e.preventDefault();

			const target = e.target as HTMLInputElement;
			const tagInput = target.value.trim();

			if (tagInput !== "" && !field.value.includes(tagInput)) {
				setValue("tags", [...field.value, tagInput], { shouldValidate: true });

				target.value = "";
			}
		}
	};

	const handleRemoveTag = (tagToRemove: string, field: any) => {
		const updatedTags = field.value.filter(
			(tag: string) => tag !== tagToRemove,
		);
		setValue("tags", updatedTags, { shouldValidate: true });
	};

	const onSubmit = async (values: TPostSchema) => {
		try {
			await createPost(values).unwrap();
			toast.success("Your Post has been added");
			router.push("/welcome");
		} catch (error) {
			const errorMessage = extractErrorMessage(error);
			toast.error(errorMessage || "An error occurred");
		}
	};

	return (
		<main>
			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-md"
			>
				<FormFieldComponent
					label="Title"
					name="title"
					register={register}
					errors={errors}
					placeholder="Post Title"
					startIcon={
						<FileText className="text-blue-800 dark:text-blue-50 size-8" />
					}
				/>
				<FormFieldComponent
					label="Body"
					name="body"
					register={register}
					errors={errors}
					placeholder="Ask a question or share what you have in mind..."
					isTextArea
				/>
				<label
					htmlFor="tags"
					className="h4-medium italic text-blue-700 dark:text-blue-200"
				>
					To add tag write and press enter
				</label>
				<Controller
					name="tags"
					control={control}
					render={({ field }) => (
						<>
							<div>
								<span className="mr-2">tags: </span>
								{field.value.map((tag: string, index: number) => (
									<Badge
										key={index}
										className="border-orange-500 dark:border-orange-500 mb-1 mt-1 mr-2 inline-flex items-center border text-lime-500 dark:text-lime-500"
									>
										{tag}
										<button
											type="button"
											onClick={() => handleRemoveTag(tag, field)}
											className="ml-1.5 cursor-pointer text-red-600 dark:text-red-600"
										>
											<XIcon className="size-5" />
										</button>
									</Badge>
								))}
							</div>
							<input
								type="text"
								id="tags"
								placeholder="Add your tags..."
								onKeyDown={(e) => handleInputKeyDown(e, field)}
								className="flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							/>
						</>
					)}
				/>

				{errors.tags && errors.tags.message && (
					<p className="text-sm text-red-500">{errors.tags.message}</p>
				)}

				<Button
					type="submit"
					className="h4-semibold bg-blue-900/80 hover:bg-blue-900 dark:bg-orange-500/80 dark:hover:bg-orange-500 w-full text-blue-50"
					disabled={isLoading}
				>
					{isLoading ? <Spinner size="sm" /> : `Create Your Post`}
				</Button>
			</form>
		</main>
	);
}

export default function CreatePostForm() {
	return (
		<ProtectedRoute>
			<CreatePostFormContent />
		</ProtectedRoute>
	);
}
