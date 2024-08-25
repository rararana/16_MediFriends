import React from "react";
import { RegisterForm } from "@/components/auth/register-form";

const RegisterPage = () => {
	return (
		<div className="bg-gradient-to-br from-[#48dbef] via-[#3bdaf6] to-[#60a5fa] flex min-h-screen flex-col items-center justify-center ">
			<RegisterForm />
		</div>
	);
};

export default RegisterPage;
