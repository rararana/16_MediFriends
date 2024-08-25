import React from "react";
import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
	return (
		<div className="bg-gradient-to-br from-[#48dbef] via-[#3bdaf6] to-[#60a5fa] flex min-h-screen flex-col items-center justify-center ">
			<LoginForm />
		</div>
	);
};

export default LoginPage;
