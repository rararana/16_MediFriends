"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

export const CardWrapper = ({
	children,
	headerTitle,
	headerLabel,
	backButtonLabel,
	backButtonHref,
	showSocial,
	headerLevel = "h1", // Default to "h1" if not provided
	headerClassName = "", // Custom className for additional styling
}) => {
	return (
		<Card className="w-[400px] border border-gray shadow-md;">
			<CardHeader>
				<Header
					title={headerTitle}
					label={headerLabel}
					level={headerLevel}
					className={headerClassName}
				/>
			</CardHeader>
			<CardContent>{children}</CardContent>
			{/* {showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)} */}
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	);
};
