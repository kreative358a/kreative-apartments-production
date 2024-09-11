import * as z from "zod";

export const passwordResetConfirmSchema = z
	.object({
		uid: z.string().trim(),
		token: z.string().trim(),
		new_password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters"})
			.regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
			.regex(/[a-z]/, { message:  "Password must contain at least one lowercase letter" })
			.regex(/\d/, { message: "Password must contain at least one digit" }),
		// .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
		// .min(8, { message: "Password must be at least 8 characters long" }),
		re_new_password: z
			.string()
			.min(8, { message: "Confirm password must be at least 8 characters" })
			.regex(/[A-Z]/, { message: "Confirm password must contain at least one uppercase letter"} )
			.regex(/[a-z]/, { message: "Confirm password must contain at least one lowercase letter" })
			.regex(/\d/, { message:"Confirm password must contain at least one digit" }),
		// .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
		// .min(8, { message: "Password must be at least 8 characters long" }),
	})
	.refine((data) => data.new_password === data.re_new_password, {
		message: "Passwords do not match",
		path: ["re_new_password"],
	});

export type TPasswordResetConfirmSchema = z.infer<
	typeof passwordResetConfirmSchema
>;
