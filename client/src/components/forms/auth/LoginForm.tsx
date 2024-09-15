"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "@/lib/redux/features/auth/authApiSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { useForm } from "react-hook-form";
import { loginUserSchema, TLoginUserSchema } from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import { setAuth } from "@/lib/redux/features/auth/authSlice";
import { FormFieldComponent } from "@/components/inputs/MyFormFieldComponent";
import { MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

export default function LoginForm() {
	const [loginUser, { isLoading }] = useLoginUserMutation();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TLoginUserSchema>({
		resolver: zodResolver(loginUserSchema),
		mode: "all",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof loginUserSchema>) => {
		try {
			await loginUser(values).unwrap();
			dispatch(setAuth());
			toast.success("Login Successful");
			router.push("/welcome");
			reset();
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
				className="flex w-full max-w-md flex-col gap-2"
			>
				<FormFieldComponent
					label="Email Address"
					name="email"
					register={register}
					errors={errors}
					placeholder="Email Address"
					startIcon={
						<MailIcon className="size-8 font-medium text-blue-800 dark:font-normal dark:text-blue-50" />
					}
					// className="font-medium dark:font-normal text-blue-900 dark:text-blue-50 focus:outline-none focus:ring border-blue-900 focus:border-blue-800 dark:border-blue-200 dark:focus:border-blue-50 border-2"
				/>

				<FormFieldComponent
					label="Password"
					name="password"
					register={register}
					errors={errors}
					placeholder="Password"
					isPassword={true}
					// className="font-medium dark:font-normal text-blue-900 dark:text-blue-50 focus:outline-none focus:ring border-blue-900 focus:border-blue-800 dark:border-blue-200 dark:focus:border-blue-50 border-2"
					link={{ linkText: "Forgot Password?", linkUrl: "/forgot-password" }}
				/>
				<Button
					type="submit"
					className="h4-semibold w-full bg-blue-950/80 text-blue-50 hover:bg-blue-950/95 dark:bg-orange-500/80 dark:hover:bg-orange-500/95"
					disabled={isLoading}
				>
					{isLoading ? <Spinner size="sm" /> : `Sign In`}
				</Button>
			</form>
		</main>
	);
}
