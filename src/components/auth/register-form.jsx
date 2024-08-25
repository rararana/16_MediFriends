"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";

export const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const form = useForm({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
	});

	const onSubmit = (values) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			register(values).then((data) => {
				if (data) {
					setError(data.error || "Default error message");
					setSuccess(data.success);
				} else {
					setError("Unexpected error occurred");
				}
			});
		});
	};

	return (
		<CardWrapper
			headerTitle="Create an Account"
			headerLabel="Start Your Health Journey with Us 🌟"
			backButtonLabel="Already have an account?"
			backButtonHref="/auth/login"
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="Sparta Sigma"
											type="text	"
											className="transition-all duration-400"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						Sign Up
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
