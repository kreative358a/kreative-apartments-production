// 113. Use Social Auth Hook
// Tworzymy hak, który pomoże nam uprościć obsługę naszych wywołań zwrotnych OAuth poprzez wyodrębnienie niezbędnych parametrów z adresu URL, a parametrami, o których mowa, są stan i kod

import { setAuth } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function useSocialAuth(authenticate: any, provider: string) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const searchParams = useSearchParams();

    // haka useref użyjemy do kontrolowania naszego haka useeffect, aby zapobiec ponownemu uruchomieniu uwierzytelniania proces przy kolejnych renderowaniach
	const effectRan = useRef(false);

	useEffect(() => {
        // wyodrębniamy parametry adresu URL stanu i kodu
		const state = searchParams.get("state");
		const code = searchParams.get("code");

		if (state && code && !effectRan.current) {
            // tworzymy funkcję uwierzytelniania, która jest oczekiwana do obsługi logiki uwierzytelniania, a ta funkcja po prostu przyjmie obiekt z dostawcą, stanem i kodem jako właściwościami
			authenticate({ provider, state, code })
				.unwrap()
				.then(() => {
					dispatch(setAuth());
					toast.success("Logged in successfully");
					router.push("/welcome");
				})
				.catch(() => {
					toast.error("Login Failed, Try Again!");
					router.push("/auth/login");
				});
		}
		return () => {
			effectRan.current = true;
		};
	}, [authenticate, dispatch, provider, router, searchParams]);
}