import { Input } from "./input";
import { PasswordInputTooltip } from "./password-input-tooltip";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React from "react";
import {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister,
	ValidationRule,
} from "react-hook-form";


type FormFieldComponentProps<TFieldValues extends FieldValues> = {
	label?: string;
	name: Path<TFieldValues>;
	register: UseFormRegister<TFieldValues>;
	errors: FieldErrors<TFieldValues>;
	type?: React.HTMLInputTypeAttribute;
	placeholder?: string;
	required?: boolean;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	isPassword?: boolean;
	isTextArea?: boolean;
	link?: {
		linkText: string;
		linkUrl: string;
	};
	className?: string;
	disabled?: boolean;
	valueText?: string;
	valueNumber?: number;
	readOnly?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string | number;
	pattern?: ValidationRule<RegExp>;	
	min?: number;
	max?: number;
};

export function FormFieldComponent<TFieldValues extends FieldValues>({
	label,
	name,
	register,
	disabled = false,
	errors,
	// type = "text",
	type = "text" || "number",
	placeholder,
	required = false,
	startIcon,
	endIcon,
	link,
	className,
	isPassword = false,
	isTextArea = false,
	readOnly,
	value,
	// onChange
}: FormFieldComponentProps<TFieldValues>) {
	const errorMessage = errors[name]?.message as unknown as string;
	const renderInputComponent = () => {
		if (isTextArea) {
			return (
				<Textarea
					{...register(name, { required })}
					placeholder={placeholder}
					className={`font-semibold dark:font-medium hover:bg-slate-50/60 focus:bg-slate-50/80 dark:hover:bg-slate-800/60 dark:focus:bg-slate-800/80 text-blue-900 dark:text-blue-50 focus:outline-none focus:ring focus:border-blue-800  dark:focus:border-blue-50 bg-slate-50/40 dark:bg-slate-800/40 border-blue-900/60 dark:border-blue-200/60 border-2 ${className}`}
				/>
			);
		} else if (isPassword) {
			return (
				<PasswordInputTooltip
					{...register(name, { required })}
					placeholder={placeholder}
					className={`font-semibold dark:font-medium hover:bg-slate-50/60 focus:bg-slate-50/80 dark:hover:bg-slate-800/60 dark:focus:bg-slate-800/80 text-blue-900 dark:text-blue-50 focus:outline-none focus:ring focus:border-blue-800  dark:focus:border-blue-50 bg-slate-50/40 dark:bg-slate-800/40 border-blue-900/60 dark:border-blue-200/60 border-2 ${className}`}
				/>
			);
		} else {
			return (
				<Input
					id={name}
					{...register(name, { required })}
					type={type}
					placeholder={placeholder}
					startIcon={startIcon}
					endIcon={endIcon}
					disabled={disabled}
					className={`font-semibold dark:font-medium hover:bg-slate-50/60 focus:bg-slate-50/80 dark:hover:bg-slate-800/60 dark:focus:bg-slate-800/80 text-blue-900 dark:text-blue-50 focus:outline-none focus:ring focus:border-blue-800  dark:focus:border-blue-50 bg-slate-50/40 dark:bg-slate-800/40 border-blue-900/60 dark:border-blue-200/60 border-2 ${className}`}
					value={value}
					readOnly={readOnly}
					// onChange={onChange}
				/>
			);
		}
	};

	return (
		<div className="my-0">
			<div className="flex justify-between">
				<label
					htmlFor={name}
					className="h4-semibold text-blue-900 dark:text-blue-50 mt-1 mb-0.5"
				>
					{label}
				</label>
				{link && (
					<Link
						href={link.linkUrl}
						className="h4-semibold cursor-pointer text-lime-600/90 hover:text-lime-600 dark:text-lime-500/90 dark:hover:text-lime-500"
					>
						{link.linkText}
					</Link>
				)}
			</div>
			<div className="mb-1 mt-0.5">{renderInputComponent()}</div>
			{errorMessage && (
				<p className="min-h-4 max-h-6 font-medium dark:font-normal pl-6 my-0.5 text-sm leading-4 text-red-500">
					⚠ {errorMessage}
				</p>
			)}
		</div>
	);
}
