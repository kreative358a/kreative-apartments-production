"use client";
import { useCreateApartmentMutation } from "@/lib/redux/features/apartment/apartmentApiSlice";
import {
	apartmentCreateSchema,
	TApartmentCreateSchema,
} from "@/lib/validationSchemas/ApartmentCreateSchema";
import { extractErrorMessage } from "@/utils";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { FormFieldComponent } from "@/components/inputs/MyFormFieldComponent";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Briefcase,
	AlignVerticalSpaceAround,
	Building,
	Grid2X2,
	FileDigit,
	Ban,
	BookLock,
	BookKey,
	WalletMinimal,
	CreditCard,
	ChevronUp,
	ChevronDown,
} from "lucide-react";

import React, { useState, FC, useRef } from "react";
import Select, { Props } from "react-select";
import customStyles from "../selectStyles";
import { type ClassValue, clsx } from "clsx";
import { selectComponent, selectClassStyle, selectStyle } from "../myselectStyles";

import { useGetApartmentsBase } from "./ApartmentsBase";


// export default function ApartmentSelectForm() {
export const ApartmentSelectForm = ({ ...props }: Props) => {
	// const ApartmentSelectForm: FC = () => {

	const apartmentsBase: string = useGetApartmentsBase().toString();

	const apartmentsJson: string =
		'{"Building-A": {"Floor-0": ["0-1 disabled", "0-2", "0-3", "0-4"], "Floor-1": ["1-1", "1-2", "1-3", "1-4"], "Floor-2": ["2-1", "2-2", "2-3", "2-4"], "Floor-3": ["3-1", "3-2", "3-3", "3-4"]}, "Building-B": {"Floor-0": ["0-1", "0-2", "0-3", "0-4"], "Floor-1": ["1-1", "1-2", "1-3", "1-4"], "Floor-2": ["2-1", "2-2", "2-3", "2-4"], "Floor-3": ["3-1", "3-2", "3-3", "3-4"]}, "Building-C": {"Floor-1": ["0-1", "0-2", "0-3", "0-4"], "Floor-2": ["1-1", "1-2", "1-3", "1-4"], "Floor-3": ["2-1", "2-2", "2-3", "2-4"], "Floor-4": ["3-1", "3-2", "3-3", "3-4"]}, "Building-D": {"Floor-0": ["0-1", "0-2", "0-3", "0-4"], "Floor-1": ["1-1", "1-2", "1-3", "1-4"], "Floor-2": ["2-1", "2-2", "2-3", "2-4"], "Floor-3": ["3-1", "3-2", "3-3", "3-4"]}}';

	// const baseapartments = BaseApartments
	// const apartmentsObject = data?.apartment;
	const apartmentsObject: Record<string, Record<string, string[]>> = JSON.parse(
		apartmentsBase || apartmentsJson,
	);

	const [buildingSel, setBuildingSel] = useState("");
	const [floorSel, setFloorSel] = useState("");
	const [unit_numberSel, setUnitNumberSel] = useState("");
	const [apartment_idSel, setApartmentIdSel] = useState("");

	const [selectApartment, { isLoading }] = useCreateApartmentMutation();
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

	/* React.useEffect(() => {
		setFocus("building");
	}, [setFocus]); */

	const buildingOptions = Object.keys(apartmentsObject).map((buildingSel) => ({
		value: buildingSel,
		label: buildingSel,
		isDisabled: buildingSel.includes("disabled"),
	}));

	const floorOptions =
		buildingSel &&
		Object.keys(apartmentsObject[buildingSel]).map((floorSel) => ({
			value: floorSel,
			// value: parseInt(floor.split("-")[1]),
			label: floorSel,
			isDisabled: floorSel.includes("disabled"),
		}));

	const unitNumberOptions =
		floorSel &&
		apartmentsObject[buildingSel][floorSel].map((unit_numberSel) => ({
			value: "nr. " + unit_numberSel,
			label: "nr. " + unit_numberSel,
			isDisabled: unit_numberSel.includes("disabled"),
		}));

	const handleBuildingSelectChange = (selectedOption: any) => {
		setBuildingSel(selectedOption.value);
		setFloorSel("");
		setUnitNumberSel("");
		setTimeout(() => {
			setFocus("building");
		}, 10);

		// setValue("text", selectedOption.value, { shouldTouch: true });
	};

	const handleFloorSelectChange = (selectedOption: any) => {
		setFloorSel(selectedOption.value);
		setFocus("floor");
		setUnitNumberSel("");
	};

	const handleUnitNumberSelectChange = (selectedOption: any) => {
		setUnitNumberSel(selectedOption.value);
		setFocus("unit_number");
		setTimeout(() => {
			setFocus("apartment_id");
		}, 10);
		setTimeout(() => {
			setFocus("available");
		}, 20);
	};

	const sleep = (ms: number | undefined) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	const onSubmit = async (values: z.infer<typeof apartmentCreateSchema>) => {
		try {
			await selectApartment(values).unwrap();
			toast.success("Apartment Select");
			router.push("/profile");
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
				className="flex w-full max-w-md flex-col gap-1"
			>
				<label
					htmlFor="building-select"
					className="h4-semibold mb-0 text-blue-900 dark:text-blue-50"
				>
					Select Building
				</label>
				<Select
				{...props}
				isSearchable={false}
				
					options={buildingOptions}
					value={{
						value: buildingSel || "",
						label: buildingSel || "Select building",
					}}
					onChange={handleBuildingSelectChange}
					unstyled
					components={selectComponent}
					classNames={selectClassStyle}
					styles={selectStyle}			
				/>
				<FormFieldComponent
					label="Building"
					name="building"
					type="text"
					register={register}
					// value={`${form.building.split("-")[1] || ""}`}
					value={`${buildingSel.split("-")[1] || ""}`}
					errors={errors}
					placeholder="building name"
					startIcon={
						<Building className="size-8 font-medium text-blue-800 dark:font-normal dark:text-blue-50" />
					}
					readOnly={true}
				/>
				<label
					htmlFor="floor-select"
					className="h4-semibold mb-0 text-blue-900 dark:text-blue-50"
				>
					Select Floor
				</label>

				<Select
				{...props}
				isSearchable={false}
					className="mt-0 w-full"
					options={floorOptions || undefined}
					value={{
						value: floorSel || "",
						label: floorSel || "Select building first",
					}}
					onChange={handleFloorSelectChange}
					isDisabled={!buildingSel}
					// instanceId="floor-select"
					unstyled
					components={selectComponent}
					classNames={selectClassStyle}
					styles={selectStyle}
					
				/>
				<FormFieldComponent
					label="Floor"
					name="floor"
					type="number"
					// type="text"
					register={register}
					value={`${floorSel.split("-")[1] || ""}`}
					errors={errors}
					placeholder="floor number"
					startIcon={
						<AlignVerticalSpaceAround className="size-8 font-medium text-blue-800 dark:font-normal dark:text-blue-50" />
					}
					readOnly={true}
				/>

				<label
					htmlFor="number-select"
					className="h4-semibold mb-0 text-blue-900 dark:text-blue-50"
				>
					Select Unit Number
				</label>
				<Select
				isSearchable={false}
				// isClearable={true}
					className="mt-0 w-full"
					options={unitNumberOptions || undefined}
					value={{
						value: unit_numberSel || "",
						label: unit_numberSel || "Select floor first",
					}}
					onChange={handleUnitNumberSelectChange}
					isDisabled={!floorSel}
					// instanceId="floor-select"
					unstyled
					components={selectComponent}
					classNames={selectClassStyle}
					styles={selectStyle}
					{...props}
				/>
				<FormFieldComponent
					label="Apartment Unit Number"
					name="unit_number"
					register={register}
					type={"text"}
					value={`${unit_numberSel.split(" ")[1] || ""}`}
					errors={errors}
					placeholder="apartment number"
					startIcon={
						<FileDigit className="size-8 font-medium text-blue-800 dark:font-normal dark:text-blue-50" />
					}
					readOnly={true}
				/>
				<FormFieldComponent
					label="Apartment Id"
					name="apartment_id"
					register={register}
					value={
						`${buildingSel.split("-")[1] || ""}_${
							floorSel.split("-")[1] || ""
						}_${unit_numberSel.split(" ")[1] || ""}` || ""
					}
					errors={errors}
					startIcon={
						<WalletMinimal className="size-8 font-medium text-blue-800 dark:font-normal dark:text-blue-50" />
					}
					readOnly={true}
				/>
				<FormFieldComponent
					label="Apartment Available"
					name="available"
					register={register}
					value={"disabled"}
					errors={errors}
					startIcon={
						<Ban className="size-8 font-medium text-blue-800 dark:font-normal dark:text-blue-50" />
					}
					readOnly={true}
				/>
				<Button
					type="submit"
					className="h4-semibold bg-eerieBlue mt-6 w-full text-white dark:bg-orange-500"
					disabled={isLoading}
					// onClick={handleClick}
				>
					{isLoading ? <Spinner size="sm" /> : `Select Your Apartment`}
				</Button>


			</form>
		</main>
	);
}


