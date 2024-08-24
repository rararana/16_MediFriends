import React from "react";
import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
	return (
		<div className="bg-blue-500 flex min-h-screen flex-col items-center justify-center">
			<LoginForm />
		</div>
	);
};

export default LoginPage;
