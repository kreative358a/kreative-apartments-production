import * as z from "zod";


// deklarujemy wyrażenie regularne nazwy użytkownika
// to wyrażenie regularne pozwala na tworzenie nazw użytkowników zawierających zarówno małe, jak i duże litery.
const usernameRegex = /^[a-zA-Z0-9_@+.-]+$/;
const passwordUpperCase = /[A-Z]/
const passwordLowerCase = /[a-z]/
const passwordDigit = /\d/
const passwordSpecialCharacter = /[^A-Za-z0-9]/

const pU = z.string().regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
const pL = z.string().regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
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
		
		/*password: z.string().regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/\d/, "Password must contain at least one digit").regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"), */
		password: z
			.union([
			z.string().trim().min(8, { message: "Password must be at least 8 characters"}),
			z.string().regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }),
			z.string().regex(/[a-z]/, { message: "Password must contain at least one uppercase letter" }),
			z.string().regex(/\d/, { message:  "Password must contain at least one lowercase letter" })
		]),			
			// .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
			// .regex(/[a-z]/, { message:  "Password must contain at least one lowercase letter" })
			// .regex(/\d/, { message: "Password must contain at least one digit" }),
			// .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
			// .min(8, { message: "Password must be at least 8 characters long" }),
		re_password: z
			.string()
			.trim()
			// .min(8, { message: "Confirm password must be at least 8 characters" })
			.min(8)
			// .regex(/[A-Z]/, { message: "Confirm password must contain at least one uppercase letter"} )
			// .regex(/[a-z]/, { message: "Confirm password must contain at least one lowercase letter" })
			// .regex(/\d/, { message:"Confirm password must contain at least one digit" }),
		// .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
		// .min(8, {message: "Confirm Password must be at least 8 characters long",}),
	})
	/*.superRefine(({ password }, checkPassComplexity) => {
		const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
		const containsLowercase = (ch: string) => /[a-z]/.test(ch);
		const containsSpecialChar = (ch: string) =>
		  /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
		let countOfUpperCase = 0,
		  countOfLowerCase = 0,
		  countOfNumbers = 0,
		  countOfSpecialChar = 0;
	
		for (let i = 0; i < password.length; i++) {
		  let ch = password.charAt(i);
		  if (!isNaN(+ch)) countOfNumbers++;
		  else if (containsUppercase(ch)) countOfUpperCase++;
		  else if (containsLowercase(ch)) countOfLowerCase++;
		  else if (containsSpecialChar(ch)) countOfSpecialChar++;
		}
	
		let errObj = {
		  // upperCase: { pass: true, message: "add upper case." },
		  // lowerCase: { pass: true, message: "add lower case." },
		  // specialCh: { pass: true, message: "add special ch." },
		  // totalNumber: { pass: true, message: "add number." },			
		  upperCase: { message: "add upper case." },
		  lowerCase: { message: "add lower case." },
		  specialCh: { message: "add special ch." },
		  totalNumber: { message: "add number." },
		};
	
		if (countOfLowerCase < 1) {
		  // errObj = { ...errObj, lowerCase: { ...errObj.lowerCase, pass: false } };
		  errObj = { ...errObj, lowerCase: { ...errObj.lowerCase} };
		}
		if (countOfNumbers < 1) {
		  errObj = {
			...errObj,
			// totalNumber: { ...errObj.totalNumber, pass: false },
			totalNumber: { ...errObj.totalNumber},
		  };
		}
		if (countOfUpperCase < 1) {
			// errObj = { ...errObj, upperCase: { ...errObj.upperCase, pass: false } };
		  errObj = { ...errObj, upperCase: { ...errObj.upperCase} };
		}
		if (countOfSpecialChar < 1) {
		//  errObj = { ...errObj, specialCh: { ...errObj.specialCh, pass: false } };
		  errObj = { ...errObj, specialCh: { ...errObj.specialCh } };
		}
	
		if (
		  countOfLowerCase < 1 ||
		  countOfUpperCase < 1 ||
		  countOfSpecialChar < 1 ||
		  countOfNumbers < 1
		) {
		  checkPassComplexity.addIssue({
			code: "custom",
			path: ["password"],
			message: errObj,
		  });
		}
	  })	
	  /*.superRefine(({ password }, checkPassComplexity) => {
		const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
		const containsLowercase = (ch: string) => /[a-z]/.test(ch);
		const containsSpecialChar = (ch: string) =>
		  /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
		let countOfUpperCase = 0,
		  countOfLowerCase = 0,
		  countOfNumbers = 0,
		  countOfSpecialChar = 0;
		for (let i = 0; i < password.length; i++) {
		  let ch = password.charAt(i);
		  if (!isNaN(+ch)) countOfNumbers++;
		  else if (containsUppercase(ch)) countOfUpperCase++;
		  else if (containsLowercase(ch)) countOfLowerCase++;
		  else if (containsSpecialChar(ch)) countOfSpecialChar++;
		}
		if (
		  countOfLowerCase < 1 ||
		  countOfUpperCase < 1 ||
		  countOfSpecialChar < 1 ||
		  countOfNumbers < 1
		) {
		  checkPassComplexity.addIssue({
			code: "custom",
			message: "password does not meet complexity requirements",
		  });
		}
	  })	*/  
	.refine((data) => data.password === data.re_password, {
		message: "Passwords do not match",
		path: ["re_password"],
	});

// ponieważ jest to typ generyczny, przyjętą konwencją jest dodanie dużej litery T
export type TRregisterUserSchema = z.infer<typeof registerUserSchema>;
