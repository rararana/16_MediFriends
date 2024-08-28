"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { CardWrapper } from "./card-wrapper";
import { FormError } from "@/components//form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			login(values)
				.then((data) => {
					if (data && typeof data === "object") {
						if (data.error) {
							setError(data.error || "Default error message");
						} else if (data.success) {
							setSuccess(data.success);
							setTimeout(() => {
								router.push("/");
							}, 2000);
						}
					} else {
						setError("Unexpected response format");
					}
				})
				.catch((error) => {
					setError("Network or server error");
				});
		});
	};

	return (
		<CardWrapper
			headerTitle="Sign In"
			headerLabel="Log in to your MediFriends account 🫶"
			backButtonLabel="Don't have an account?"
			backButtonHref="/auth/register"
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4 ">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="sparta.hmif@example.com"
											type="email"
											className="transition-all duration-400"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="******"
											type="password"
											className="transition-all duration-400"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button
						type="submit"
						className="w-full"
						disabled={isPending}
					>
						Sign In
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
