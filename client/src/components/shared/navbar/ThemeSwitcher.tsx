"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

const themeOptions = [
	{ value: "light", label: "Light" },
	{ value: "dark", label: "Dark" },
	{ value: "system", label: "System" },
];

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				asChild
				className="cursor-pointer border-none bg-transparent shadow-none"
			>
				<Button size="icon">
					<SunIcon
						className={`hover-scale-110 size-[1.8rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:hover:scale-0  ${
							theme === "light" ? "text-orange-300" : "text-orange-700"
						}`}
						suppressHydrationWarning
					/>
					<MoonIcon
						className={`absolute size-[1.8rem] rotate-90 scale-0 transition-all hover:scale-0 dark:rotate-0 dark:scale-100 dark:hover:scale-110 ${
							theme === "light" ? "text-blue-500" : "text-slate-300"
						}`}
						suppressHydrationWarning
					/>
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="bg-babyPowder cursor-pointer rounded-md border-2 border-blue-900 p-2  outline-none hover:border-blue-700 hover:ring hover:focus:border-blue-50 dark:border-blue-200 dark:bg-slate-800"
			>
				{themeOptions.map(({ value, label }) => (
					<DropdownMenuItem
						key={value}
						onClick={() => setTheme(value)}
						className={`dark:hover:bg-gray cursor-pointer font-medium hover:bg-blue-300 dark:font-normal ${theme === "light" && value === "light" ? "text-orange-500" : theme === "dark" && value === "dark" ? "text-blue-400" : theme === "light" ? "hover:text-babyPowder text-indigo-950" : "text-babyPowder"}`}
					>
						{label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
