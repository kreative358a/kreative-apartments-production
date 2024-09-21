"use client";
import { Input } from "./input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";
import { useEffect, useState, useId } from "react";
import "./input-tooltip.css";

export interface PasswordInputTooltipProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInputTooltip = React.forwardRef<
	HTMLInputElement,
	PasswordInputTooltipProps
>(({ className, ...props }, ref) => {
	const passwordId = useId();
	const [showPassword, setShowPassword] = useState(false);




	// const messagePass: HTMLElement | null =
	// document.getElementById("messagePass");
	useEffect(() => {
		const inputPass: HTMLInputElement | null = document.getElementById(
			"password",
		) as HTMLInputElement;
		const tooltiptextPass: HTMLElement | null =
		document.getElementById("tooltiptextPass");
	// const inputPassword: HTMLInputElement | null =
	const letterPass: HTMLElement | null = document.getElementById("letterPass");
	const capitalPass: HTMLElement | null =
		document.getElementById("capitalPass");
	const numberPass: HTMLElement | null = document.getElementById("numberPass");
	const lengthPass: HTMLElement | null = document.getElementById("lengthPass");
	const specialPass: HTMLElement | null =
		document.getElementById("specialPass");		
	if (inputPass != null) {
		inputPass.onfocus = function (): void {
			if (tooltiptextPass) {
				tooltiptextPass.style.display = "block";
			}
		};
		// When the user clicks outside of the password field, hide the message box
		inputPass.onblur = function (): void {
			if (tooltiptextPass) {
				tooltiptextPass.style.display = "none";
			}
		};
		inputPass.onkeyup = function (): void {
			// Validate lowercase letters
			const lowerCaseLetters: RegExp = /[a-z]/g;
			if (inputPass.value.match(lowerCaseLetters)) {
				letterPass?.classList.remove("invalid");
				letterPass?.classList.add("valid");
			} else {
				letterPass?.classList.remove("valid");
				letterPass?.classList.add("invalid");
			}

			// Validate capital letters
			const upperCaseLettersPass: RegExp = /[A-Z]/g;
			if (inputPass?.value.match(upperCaseLettersPass)) {
				capitalPass?.classList.remove("invalid");
				capitalPass?.classList.add("valid");
			} else {
				capitalPass?.classList.remove("valid");
				capitalPass?.classList.add("invalid");
			}

			// Validate numbers
			const numbersPass: RegExp = /[0-9]/g;
			if (inputPass?.value.match(numbersPass)) {
				numberPass?.classList.remove("invalid");
				numberPass?.classList.add("valid");
			} else {
				numberPass?.classList.remove("valid");
				numberPass?.classList.add("invalid");
			}

			const specialsPass: RegExp = /[^A-Za-z0-9]/g;
			if (inputPass?.value.match(specialsPass)) {
				specialPass?.classList.remove("invalid");
				specialPass?.classList.add("valid");
			} else {
				specialPass?.classList.remove("valid");
				specialPass?.classList.add("invalid");
			}

			if (inputPass?.value && inputPass.value.length >= 8) {
				lengthPass?.classList.remove("invalid");
				lengthPass?.classList.add("valid");
			} else {
				lengthPass?.classList.remove("valid");
				lengthPass?.classList.add("invalid");
			}
		};
	}
}, []);
	return (
		<>
			<div id="tooltipPass" className="tooltip">
			<span
					id="tooltiptextPass"
					className="bg-blue-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-900"
				>
					<div id="messagePass" className="font-semibold dark:font-medium">
						<h4 className="text-blue-950 dark:text-blue-50">
							Password must contain the following:
						</h4>
						<p id="letterPass" className="invalid">
							A <b>lowercase</b> letter
						</p>
						<p id="capitalPass" className="invalid">
							A <b>capital (uppercase)</b> letter
						</p>
						<p id="numberPass" className="invalid">
							A <b>number</b>
						</p>
						<p id="specialPass" className="invalid">
							A <b>special character</b>
						</p>
						<p id="lengthPass" className="invalid">
							Minimum <b>8 characters</b>
						</p>
					</div>
				</span>				
				<Input
					type={showPassword ? "text" : "password"}
					id={"password"}
					startIcon={
						showPassword ? (
							<EyeIcon
								onClick={() => setShowPassword(false)}
								className="size-8 font-medium text-blue-800 dark:font-normal dark:text-blue-50"
							/>
						) : (
							<EyeOffIcon
								onClick={() => setShowPassword(true)}
								className="size-8 font-medium text-blue-800 dark:font-normal dark:text-blue-50"
							/>
						)
					}
					className={
						"border-2 border-blue-900/60 bg-slate-50/40 dark:border-blue-200/60 dark:bg-slate-800/40"
					}
					{...props}
					ref={ref}
				/>

			</div>
		</>
	);
});
PasswordInputTooltip.displayName = "PasswordInputTooltip";

export { PasswordInputTooltip };
