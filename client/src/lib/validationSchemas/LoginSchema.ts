import * as z from "zod";

export const loginUserSchema = z.object({
	email: z.string().trim().email({ message: "Enter a valid email address" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters"})
		.regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
		.regex(/[a-z]/, { message:  "Password must contain at least one lowercase letter" })
		.regex(/\d/, { message: "Password must contain at least one digit" }),		
		// .min(8, { message: "Password must be at least 8 characters long" }),
});

export type TLoginUserSchema = z.infer<typeof loginUserSchema>;