"use client";

import { useAddRatingMutation } from "@/lib/redux/features/rating/ratingApiSlice";
import {
	ratingCreateSchema,
	TRatingCreateSchema,
} from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormFieldComponent } from "@/components/inputs/MyFormFieldComponent";
import { UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

export default function CreateRatingForm() {
	const router = useRouter();
	const [addRating, { isLoading }] = useAddRatingMutation();

	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { errors },
	} = useForm<TRatingCreateSchema>({
		resolver: zodResolver(ratingCreateSchema),
		mode: "all",
	});

	const [username, setUsername] = useState("");

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const ratedUserUsername = queryParams.get("username");
		if (ratedUserUsername) {
			setValue("rated_user_username", ratedUserUsername);
			setUsername(ratedUserUsername);
		}
	}, [setValue]);

	const onSubmit = async (data: TRatingCreateSchema) => {
		try {
			await addRating(data).unwrap();
			toast.success("Your Rating has been added!");
			router.push("/technicians");
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
				className="flex w-full max-w-md flex-col gap-4"
			>
				<FormFieldComponent
					label={`${username}'s username (This is auto filled in)`}
					name="rated_user_username"
					register={register}
					errors={errors}
					startIcon={
						<UserCog className="size-8 text-blue-800 dark:text-blue-50" />
					}
					disabled
					// onChange={undefined}
				/>
				<label
					htmlFor="rating"
					className="h4-semibold dark:text-orange-5 text-blue-950"
				>
					{" "}
					Rating{" "}
				</label>
				<Controller
					name="rating"
					control={control}
					render={({ field }) => (
						<input
							{...field}
							id="rating"
							type="number"
							placeholder="Choose a value of between 1 and 5"
							onChange={(e) => field.onChange(parseInt(e.target.value))}
							className="border-2 border-blue-900/60 bg-slate-50/40 font-semibold text-blue-900 hover:bg-slate-50/60 focus:bg-slate-50/80 focus:outline-none focus:ring focus-visible:ring-offset-0  dark:border-blue-200/60 dark:bg-slate-800/40 dark:font-medium dark:text-blue-50 dark:hover:bg-slate-800/60 dark:focus:border-blue-50 dark:focus:bg-slate-800/80"
						/>
					)}
				/>
				{errors.rating && (
					<p className="text-sm text-red-500">{errors.rating.message}</p>
				)}
				<FormFieldComponent
					label="Comment"
					name="comment"
					errors={errors}
					register={register}
					placeholder="Tell us why you have given the rating, it will help us improve service delivery"
					isTextArea
					// onChange={undefined}
				/>
				<Button
					type="submit"
					className="h4-semibold w-full bg-blue-800/80  text-blue-50 hover:bg-blue-800 dark:bg-orange-500/80 hover:dark:bg-orange-500"
					disabled={isLoading}
				>
					{isLoading ? <Spinner size="sm" /> : `Add Rating`}
				</Button>
			</form>
		</main>
	);
}
