import * as z from "zod";
// import PasswordChecklist from "react-password-checklist"

// deklarujemy wyrażenie regularne nazwy użytkownika
// to wyrażenie regularne pozwala na tworzenie nazw użytkowników zawierających zarówno małe, jak i duże litery.
const usernameRegex = /^[a-zA-Z0-9_@+.-]+$/;
const passwordUpperCase = /[A-Z]/
const passwordLowerCase = /[a-z]/
const passwordDigit = /\d/
const passwordSpecialCharacter = /[^A-Za-z0-9]/

const pU = z.string().regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
const pL = z.string().regex(/[a-z]/, { message: "Password must contain at least one uppercase letter" })
const pD = z.string().regex(/\d/, { message:  "Password must contain at least one lowercase letter" })
const pS = z.string().regex(/^A-Za-z0-9]/, { message: "Password must contain at least one special character" })

const prL = z.string().regex(passwordLowerCase)
const prD = z.string().regex(passwordDigit)
const prS = z.string().regex(passwordSpecialCharacter)

// tworzymy schemat użytkownika rejestru
export const registerUserSchema = z
	.object({
		username: z.string().regex(usernameRegex, {
			message:
				"Usernames can only contain letters(uppercase and lowercase), digits, _, @, +, ., and -",
		}),
		first_name: z
			.string()
			.trim()
			.min(2, { message: "First name must be at least 2 characters long" })
			.max(50, { message: "First name must be less than 50 characters long" }),
		last_name: z
			.string()
			.trim()
			.min(2, { message: "Last name must be at least 2 characters long" })
			.max(50, { message: "Last name must be less than 50 characters long" }),
		email: z.string().trim().email({ message: "Enter a valid email address" }),
		//  password: z
		//	.string()
		//	.trim()
		//	.min(8, { message: "Password must be at least 8 characters"})
		//	.union([pU, pL, pD]),
		
		/* password: z.string().regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/\d/, "Password must contain at least one digit").regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"), */
		/* password: z
			.union([
			z.string().trim().min(8, { message: "Password must be at least 8 characters"}),
			z.string().regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }),
			z.string().regex(/[a-z]/, { message: "Password must contain at least one uppercase letter" }),
			z.string().regex(/\d/, { message:  "Password must contain at least one lowercase letter" })
		]), */	// ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*\_)).{8,}$
		password: z.string().trim().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {message: "Must contain at least one number, one uppercase, lowercase letter, and at least 8 or more characters"}),		
			// .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
			// .regex(/[a-z]/, { message:  "Password must contain at least one lowercase letter" })
			// .regex(/\d/, { message: "Password must contain at least one digit" }),
			// .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
			// .min(8, { message: "Password must be at least 8 characters long" }),
		re_password: z
			.string()
			.trim()
			.min(8, { message: "Confirm password must be at least 8 characters" })
			// .regex(/[A-Z]/, { message: "Confirm password must contain at least one uppercase letter"} )
			// .regex(/[a-z]/, { message: "Confirm password must contain at least one lowercase letter" })
			// .regex(/\d/, { message:"Confirm password must contain at least one digit" }),
		// .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
		// .min(8, {message: "Confirm Password must be at least 8 characters long",}),
	})		
	.refine((data) => data.password === data.re_password, {
		message: "Passwords do not match",
		path: ["re_password"],
	});

// ponieważ jest to typ generyczny, przyjętą konwencją jest dodanie dużej litery T
export type TRregisterUserSchema = z.infer<typeof registerUserSchema>;
