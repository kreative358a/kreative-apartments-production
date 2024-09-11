import * as z from "zod";

export const apartmentCreateSchema = z.object({

	// building: z.string().trim().min(1, { message: "The Bilding Name should be one capital letter" }).max(1, { message: "The Bilding Name should be max one capital letter" }).regex(/^[A-Z]$/, { message: "The Bilding Name should be one capital letter" }),
	building: z.string().trim().regex(/^[A-Z]$/, { message: "The Bilding Name should be one capital letter" }),
	// building: z.string().trim(),
	/*floor: z
		.number()
		.nonnegative({ message: "The building floor can't be negative" })
		.max(5, { message: "The Floor in the building can't be more than 5" }), */
	/*floor: 
	z
	.number({ coerce: true })
	.nonnegative({ message: "The building floor can't be negative" })
	.min(0, "The Floor in the building can't be less than 0")
	.max(99, { message: "The Floor in the building can't be more than 99" }), */
	floor: z.string().trim().regex(/^\d{1,2}$/, { message: "The Unit Number accepted format digit from 0 to 99"}),
	// floor: z.string().regex(/^\d+$/).transform(Number),
	//unit_number: z.string().trim().regex(/^(?:[0-9]|[0-9][0-9])-(?:[0-9]|[0-9][0-9])$/),
	// ^(\d{1,2})-(\d{1,2})$
	unit_number: z.string().trim().regex(/^(\d{1,2})-(\d{1,2})$/, { message: "The Unit Number accepted format digit from 0 to 99 dash digit from 0 to 99 dash" }),
	apartment_id: z.string().trim(),
	available: z.string().trim(),
});

export type TApartmentCreateSchema = z.infer<typeof apartmentCreateSchema>;