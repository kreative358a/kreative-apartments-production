// 129. ApartmentApiSlice and Apartment Form
"use client";
import { useCreateApartmentMutation } from "@/lib/redux/features/apartment/apartmentApiSlice";
import {
	apartmentCreateSchema,
	TApartmentCreateSchema,
} from "@/lib/validationSchemas/ApartmentCreateSchema";
import { extractErrorMessage } from "@/utils";
import { useRouter } from "next/navigation";
import { Controller, useForm, useFormState } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { FormFieldComponent } from "@/components/inputs/MyFormFieldComponent";
import {
	Briefcase,
	AlignVerticalSpaceAround,
	Building,
	Grid2X2,
	FileDigit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useRef } from "react";


export default function ApartmentCreateForm() {

	interface BuildingObjectC {
		building: string;
	}

	interface FloorObjectC {
		floor: string;
	}

	interface UnitNumberObjectC {
		unit_number: string;
	}

	interface ApartmentIdObjectC {
		apartment_id: string;
	}

	interface AvailableObjectC {
		available: string;
	}

	const [buildingCreate, setBuildingCreate] = useState("");
	const [floorCreate, setFloorCreate] = useState("");
	const [unit_numberCreate, setUnitNumberCreate] = useState("");
	const [apartment_idCreate, setApartmentIdCreate] = useState("");
	const [buildingObjC, setBuildingObjC] = useState<BuildingObjectC>({
		building: "",
	});
	const [floorObjC, setFloorObjC] = useState<FloorObjectC>({ floor: "" });
	const [unit_numberObjC, setUnitNumberObjC] = useState<UnitNumberObjectC>({
		unit_number: "",
	});
	const [apartment_idObjC, setApartmentIdObjC] = useState<ApartmentIdObjectC>({
		apartment_id: "",
	});
	const [availableObjC, setAvailableObjC] = useState<AvailableObjectC>({
		available: "",
	});

	const [createApartment, { isLoading }] = useCreateApartmentMutation();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		reset,
		setFocus,
		formState: { errors },
		setValue,
	} = useForm<TApartmentCreateSchema>({
		resolver: zodResolver(apartmentCreateSchema),
		mode: "all",
		defaultValues: {
			building: "",
			floor: "",
			unit_number: "",
			apartment_id: "",
			available: "disabled",
		},
	});

	React.useEffect(() => {
		setFocus("building");
	}, [setFocus]);

	const sleep = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	const onSubmit = async (values: z.infer<typeof apartmentCreateSchema>) => {
		// setFocus("apartment_id");
		// setFocus("available");
		try {
			await createApartment(values).unwrap();
			toast.success("Apartment Added");
			router.push("/profile");
			reset();
		} catch (error) {
			const errorMessage = extractErrorMessage(error);
			alert(errorMessage);
			toast.error(errorMessage || "An error occurred");
		}
	};

	const onSetFocus = () => {
		setFocus("apartment_id");
	};
	return (
		<main>
			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}

				className="w-full max-w-md"
			>
				<FormFieldComponent
					label="Building"
					name="building"
					register={register}
					errors={errors}
					value={buildingCreate}
					placeholder="building name"
					onChange={(e) => setBuildingCreate(e.target.value)}

					startIcon={
						<Building className="size-8 font-medium text-blue-800 dark:font-normal dark:text-blue-50" />
					}
				/>

			
				<FormFieldComponent
					label="Floor"
					name="floor"
					type="number"
					min={0}
					max={99}
					register={register}
					value={floorCreate}
					onChange={(e) => setFloorCreate(e.target.value)}
					errors={errors}

					startIcon={
						<Building className="size-8 font-medium text-blue-800 dark:font-normal dark:text-blue-50" />
					}
				/>

				<FormFieldComponent
					label="Apartment Unit Number"
					name="unit_number"
					register={register}
					errors={errors}
					placeholder="apartment number"
					value={unit_numberCreate}
					onChange={(e) => setUnitNumberCreate(e.target.value)}

					startIcon={
						<FileDigit className="size-8 font-medium text-blue-800 dark:font-normal dark:text-blue-50" />
					}
				/>
				<FormFieldComponent
					label="Apartment Id"
					name="apartment_id"
					register={register}
					errors={errors}
					placeholder="apartment id"
					// value={apartment_idObjC.apartment_id=`${buildingObjC.building}_${floorObjC.floor}_${unit_numberObjC.unit_number}`}
					value={`${buildingCreate}_${floorCreate}_${unit_numberCreate}` || ""}
					startIcon={
						<Building className="size-8 font-medium text-blue-800 dark:font-normal dark:text-blue-50" />
					}
					readOnly={true}
					/* onChange={(event: { target: { value: string; }; }) => {
						const val: string = event.target.value;
						setApartmentIdObjC((prevState) => {
						  return { ...prevState, apartment_id: val };
						});
					  }} */
				/>

				<FormFieldComponent
					label="Available"
					name="available"
					register={register}
					errors={errors}
					placeholder="available"
					// value={"disabled"}
					/* value={availableObjC.available = "disabled"}
					
					onChange={(event: { target: { value: string; }; }) => {
						const val: string = event.target.value;
						setAvailableObjC((prevState) => {
						  return { ...prevState, available: val };
						});
					  }} */
					startIcon={
						<Building className="size-8 font-medium text-blue-800 dark:font-normal dark:text-blue-50" />
					}
					readOnly={true}
				/>
				<Button
					type="submit"
					className="h4-semibold bg-eerieBlue mt-6 w-full text-white dark:bg-orange-500"
					disabled={isLoading}
					/* onClick={(e) =>{
						setFocus("apartment_id"), handleSubmit(onSubmit)(e)
					}} */
					onClick={() => {
						// setFocus("apartment_id")
						setValue(
							"apartment_id",
							`${buildingCreate}_${floorCreate}_${unit_numberCreate}`,
						);
					}}
				>
					{isLoading ? <Spinner size="sm" /> : `Create Your Apartment`}
				</Button>
			</form>
		</main>
	);
}
