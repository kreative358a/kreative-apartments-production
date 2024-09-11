import React from "react";

interface ProfileItemProps {
	icon: React.ReactNode;
	label: string;
	value: string;
}

// element profilu jest elementem funkcjonalnym typu react dot, który przyjmuje generyczność profilu rekwizyty przedmiotów
export const ProfileItem: React.FC<ProfileItemProps> = ({
	icon,
	label,
	value,
}) => (
	<div className="flex items-center space-x-2">
		<div className="fill=blue-900">{icon}</div>
		<span className="font-semibold dark:font-medium">
			<span className="tab-font">{label}:</span>
			<span className="text-indigo-900 dark:text-babyPowder">{value}</span>
		</span>
	</div>
);