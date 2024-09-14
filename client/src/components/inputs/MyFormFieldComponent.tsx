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
	type,
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
					className={`border-2 border-blue-900/60 bg-slate-50/40 font-semibold text-blue-900 hover:bg-slate-50/60 focus:border-blue-800 focus:bg-slate-50/80 focus:outline-none focus:ring dark:border-blue-200/60  dark:bg-slate-800/40 dark:font-medium dark:text-blue-50 dark:hover:bg-slate-800/60 dark:focus:border-blue-50 dark:focus:bg-slate-800/80 ${className}`}
				/>
			);
		} else if (isPassword) {
			return (
				<PasswordInputTooltip
					{...register(name, { required })}
					placeholder={placeholder}
					className={`border-2 border-blue-900/60 bg-slate-50/40 font-semibold text-blue-900 hover:bg-slate-50/60 focus:border-none focus:bg-slate-50/80 focus:outline-none focus:ring dark:border-blue-200/60  dark:bg-slate-800/40 dark:font-medium dark:text-blue-50 dark:hover:bg-slate-800/60 dark:focus:border-blue-50 dark:focus:bg-slate-800/80 ${className}`}
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
					className={`border-2 border-blue-900/60 bg-slate-50/40 font-semibold text-blue-900 hover:bg-slate-50/60 focus:border-blue-800 focus:bg-slate-50/80 focus:outline-none focus:ring dark:border-blue-200/60  dark:bg-slate-800/40 dark:font-medium dark:text-blue-50 dark:hover:bg-slate-800/60 dark:focus:border-blue-50 dark:focus:bg-slate-800/80 ${className}`}
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
					className="h4-semibold mb-0.5 mt-1 text-blue-900 dark:text-blue-50"
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
				<p className="my-0.5 max-h-6 min-h-4 pl-6 text-sm font-medium leading-4 text-red-500 dark:font-normal">
					⚠ {errorMessage}
				</p>
			)}
		</div>
	);
}
