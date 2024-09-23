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
						<FileText className="size-8 text-blue-800 dark:text-blue-50" />
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
										className="mb-2 mr-2 mt-1 inline-flex items-center border border-orange-500 py-1 text-lime-700 dark:border-orange-500 dark:text-lime-500"
									>
										{tag}
										<button
											type="button"
											onClick={() => handleRemoveTag(tag, field)}
											className="my-auto ml-1.5 cursor-pointer text-red-600 dark:text-red-600"
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
								className="roudnded-sm border-2 border-blue-900/60 bg-slate-50/40 p-1 text-sm font-medium text-blue-900 hover:bg-slate-50/60 focus:bg-slate-50/80 focus:outline-none  focus:ring focus-visible:ring-offset-0 dark:border-blue-200/60 dark:bg-slate-800/40 dark:font-normal dark:text-blue-50 dark:hover:bg-slate-800/60 dark:focus:border-blue-50 dark:focus:bg-slate-800/80"
							/>
						</>
					)}
				/>

				{errors.tags && errors.tags.message && (
					<p className="text-sm text-red-500">{errors.tags.message}</p>
				)}

				<Button
					type="submit"
					className="h4-semibold mt-4 w-full bg-blue-900/80 text-blue-50 hover:bg-blue-900 dark:bg-orange-500/80 dark:hover:bg-orange-500"
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
