import Image from "next/image";
import { getDictionary } from "@/infrastructure/localization";
import { Locale } from "@/infrastructure/i18n.config";

interface IProps {
	params: { lng: Locale }
}

export default async function SubPage({ params: { lng } }: IProps) {
	const dict = await getDictionary(lng);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div>
				<Image
					src="/images/vercel.svg"
					alt="Vercel Logo"
					className="dark:invert"
					width={100}
					height={24}
					priority
				/>

				SubPage
			</div>
		</main>
	);
}
