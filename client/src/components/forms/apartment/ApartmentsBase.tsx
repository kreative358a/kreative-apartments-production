// 115. User Avatar
"use client";
import { useUserProfile } from "@/hooks/useUseProfile";

import React, { useRef } from "react";

export function getApartmentsBase() {
	const { profile, isLoading, isError } = useUserProfile();
	const getbaseapartments: string = profile?.apartments_base.toString() || ""

	return getbaseapartments
}


