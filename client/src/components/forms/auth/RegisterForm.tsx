// 97. Register Form
"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact2Icon, MailIcon, UserCheck2 } from "lucide-react";
// mutacja stworzona automatycznie na podstawie mutacji użytkownika rejestru
import { useRegisterUserMutation } from "@/lib/redux/features/auth/authApiSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
	registerUserSchema,
	TRregisterUserSchema,
} from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import { FormFieldComponent } from "@/components/inputs/MyFormFieldComponent";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";


export default function RegisterForm() {

	const [registerUser, { isLoading }] = useRegisterUserMutation();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TRregisterUserSchema>({
		resolver: zodResolver(registerUserSchema),
		mode: "all",
		defaultValues: {
			username: "",
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			re_password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof registerUserSchema>) => {
		try {
			await registerUser(values).unwrap();
			toast.success(
				"An Email with an activation link has been sent to your email address. Please check your email and activate your account.",
			);
			router.push("/login");
			reset();
		} catch (e) {
			const errorMessage = extractErrorMessage(e);
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
					label="Username"
					name="username"
					register={register}
					errors={errors}
					placeholder="Username"
					startIcon={
						<UserCheck2 className="font-medium dark:font-normal text-blue-800 dark:text-blue-50 size-8" />
					}
				/>

				<FormFieldComponent
					label="First Name"
					name="first_name"
					register={register}
					errors={errors}
					placeholder="First Name"
					startIcon={
						<Contact2Icon className="font-medium dark:font-normal text-blue-800 dark:text-blue-50 size-8" />
					}
				/>

				<FormFieldComponent
					label="Last Name"
					name="last_name"
					register={register}
					errors={errors}
					placeholder="Last Name"
					startIcon={
						<Contact2Icon className="font-medium dark:font-normal text-blue-800 dark:text-blue-50 size-8" />
					}
				/>

				<FormFieldComponent
					label="Email Address"
					name="email"
					register={register}
					errors={errors}
					placeholder="Email Address"
					startIcon={
						<MailIcon className="font-medium dark:font-normal text-blue-800 dark:text-blue-50 size-8" />
					}
				/>

				<FormFieldComponent
					label="Password"
					name="password"
					register={register}
					errors={errors}
					placeholder="Password"
					isPassword={true}
				/>

				<FormFieldComponent
					label="Password Confirm"
					name="re_password"
					register={register}
					errors={errors}
					placeholder="Confirm Password"
					isPassword={true}
				/>

				<Button
					type="submit"
					className="h4-semibold bg-blue-950/80 dark:bg-orange-500/80 w-full text-white hover:bg-blue-950/95 dark:hover:bg-orange-500/95"
					// przycisk będzie miał stan wyłączony i będzie się zmieniał w zależności od stanu ładowania
					disabled={isLoading}
				>
					{isLoading ? <Spinner size="sm" /> : `Submit`}
				</Button>
			</form>
		</main>
	);
}
