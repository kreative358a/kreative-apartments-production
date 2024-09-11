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
						className={`size-[1.8rem] rotate-0 scale-100 hover-scale-110 transition-all dark:-rotate-90 dark:scale-0 dark:hover:scale-0  ${
							theme === "light" ? "text-orange-300" : "text-orange-700"
						}`}
						suppressHydrationWarning
					/>
					<MoonIcon
						className={`absolute size-[1.8rem] rotate-90 scale-0 hover:scale-0 transition-all dark:rotate-0 dark:scale-100 dark:hover:scale-110 ${
							theme === "light" ? "text-blue-500" : "text-slate-300"
						}`}
						suppressHydrationWarning
					/>
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="bg-babyPowder dark:bg-slate-800 cursor-pointer rounded-md p-2 outline-none  hover:ring border-blue-900 hover:border-blue-700 dark:border-blue-200 hover:focus:border-blue-50 border-2"
			>
				{themeOptions.map(({ value, label }) => (
					<DropdownMenuItem
						key={value}
						onClick={() => setTheme(value)}
						className={`font-medium dark:font-normal hover:bg-blue-300 dark:hover:bg-gray cursor-pointer ${theme === "light" && value === "light" ? "text-orange-500" : theme === "dark" && value === "dark" ? "text-blue-400" : theme === "light" ? "text-indigo-950 hover:text-babyPowder" : "text-babyPowder"}`}
					>
						{label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
