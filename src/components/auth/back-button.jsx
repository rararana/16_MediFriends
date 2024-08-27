"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const BackButton = ({ label, href }) => {
	return (
		<Button
			variant="link"
			className="font-normal w-full text-[#2f6aa9]"
			size="small"
			asChild
		>
			<Link href={href}>{label}</Link>
		</Button>
	);
};
