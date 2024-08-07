import Image from "next/image";
import { Dictionary } from "@/infrastructure/localization";
import Link from "next/link";

export interface ICategory {
	icon: string;
	nameKey: string;
}

interface IProps {
	categories: ICategory[];
	translations: Dictionary;
}

export function Sidebar({ categories, translations }: IProps) {
	function renderCategory(category: ICategory, index: number) {
		const key = category.nameKey as keyof Dictionary;
		return (
			<Link key={index} className="flex items-center justify-start gap-2 p-2 cursor-pointer" href={`/categories/${key}`}>
				<span>
					<Image
						className="mb-[2px]"
						width={20}
						height={20}
						alt={category.icon}
						src={`/icons/${category.icon}-icon.svg`}
						unoptimized
					/>
				</span>
				{/*@ts-ignore*/}
				<span className="uppercase font-medium text-base">{translations.sidebar.categories[key]}</span>
			</Link>
		)
	}
	return (
		<div className="p-11 px-16 flex flex-col bg-white border-r border-gray-200 fixed top-[86px] left-0 h-[calc(100%-86px)]">
			<div className="flex flex-col p-4 gap-2">
				{categories.map(renderCategory)}
			</div>
		</div>
	)
}
