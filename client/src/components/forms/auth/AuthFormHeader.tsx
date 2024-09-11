import { HomeModernIcon, BuildingOffice2Icon } from "@heroicons/react/24/solid";
import Link from "next/link";

// definiuje typy
// typy i interfejsy można stosować zamiennie, interfejs jest używany przede wszystkim do: definiowanie kształtów obiektów i obsługa koncepcji zorientowanych obiektowo, podczas gdy typ służy do tworzenia czcionek
type FormHeaderProps = {
	// monity, które będą stanowić część właściwości nagłówka naszego formularza
	title?: string;
	staticText?: string;
	linkText?: string;
	linkHref?: string;
};

export default function AuthFormHeader({
	title,
	staticText,
	linkHref,
	linkText,
}: FormHeaderProps) {
	return (
		<div className="px-4 mx-auto sm:w-full sm:max-w-md sm:px-6 lg:px-8">
			{/* <HomeModernIcon className="mx-auto size-16 text-blue-950 dark:text-lime-500" /> */}
			<BuildingOffice2Icon className="mx-auto size-16 text-blue-800 dark:text-lime-500" />
			<h2 className="text-blue-900 h2-bold font-robotoSlab dark:text-orange-500 mt-3 text-center">
				{title}
			</h2>
			{/* instrukcja warunkowa */}
			{(staticText || linkText) && linkHref && (
				<p className="font-medium dark:font-normal text-blue-950 dark:text-blue-50 mt-4 text-center text-lg">
					{/* instrukcja warunkowa */}
					{staticText && <span>{staticText}</span>}
					{/* czy tekst linku istnieje, jeśli tak to renderujemy go */}
					{linkText && (
						<Link
							href={linkHref}
							className="ml-2 font-semibold text-indigo-600 hover:text-indigo-500 dark:text-lime-500 dark:hover:text-indigo-500"
						>
							{linkText}
						</Link>
					)}
				</p>
			)}
		</div>
	);
}

// następnie zostanie zagergowany w pliku components/forms/auth/index.ts
