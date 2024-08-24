import React from "react";
import { RegisterForm } from "@/components/auth/register-form";

const RegisterPage = () => {
	return (
		<div className="bg-gray-950 flex min-h-screen flex-col items-center justify-center ">
			<RegisterForm />
		</div>
	);
};

export default RegisterPage;
