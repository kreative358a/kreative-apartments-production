import { occupationOptions } from "@/constants";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import { TProfileSchema } from "@/lib/validationSchemas";
import { Occupation } from "@/types";
import { Briefcase } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, FC, useCallback, useState } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import Select from "react-select";
import customStyles from "../selectStyles";
// import { MbscSelectChangeEvent, Select, setOptions } from '@mobiscroll/react';

const ClientOnly = dynamic<{ children: React.ReactNode }>(
	() => Promise.resolve(({ children }) => <>{children}</>),
	{ ssr: false },
);

function isOccupation(value: any): value is Occupation {
	return [
		"mason",
		"carpenter",
		"plumber",
		"roofer",
		"painter",
		"electrician",
		"hvac",
		"tenant",
	].includes(value);
}

interface OccupationSelectFieldProps {
	setValue: UseFormSetValue<TProfileSchema>;
	control: Control<TProfileSchema>;
}

export default function OccupationSelectField({
	setValue,
	control,
}: OccupationSelectFieldProps) {
	const { data: profileData } = useGetUserProfileQuery();
	const profile = profileData?.profile;

	useEffect(() => {
		if (profile?.gender) {
			const occupationValue = occupationOptions.find(
				(option) => option.value === profile.occupation,
			);

			if (occupationValue && isOccupation(occupationValue.value)) {
				setValue("occupation", occupationValue.value);
			}
		}
	}, [profile, setValue]);

	return (
		<div>
			<label
				htmlFor="occupation"
				className="h4-semibold dark:text-babyPowder text-blue-900"
			>
				Occupation
			</label>
			<div className="mt-1 flex w-full items-center gap-2">
				<Briefcase className="size-8 font-medium text-blue-800 dark:font-normal dark:text-blue-50" />
				<ClientOnly>
					<Controller
						control={control}
						name="occupation"
						render={({ field }) => (
							<Select
								className="mt-1 w-full"
								isSearchable={false}
								{...field}
								options={occupationOptions}
								value={occupationOptions.find(
									(option) => option.value === field.value,
								)}
								onChange={(option) => field.onChange(option?.value)}
								instanceId="occupation-select"
								styles={customStyles}
							/>
						)}
					/>
				</ClientOnly>
			</div>
		</div>
	);
}
