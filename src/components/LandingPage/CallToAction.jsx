import React from "react";
import { useRouter } from "next/navigation";

export const CallToAction = () => {
	const router = useRouter();
	return (
		<section className="bg-gradient-to-r from-[#2487c5] to-[#6BC2EB] py-16 px-6 md:px-16 text-center">
			<div className="max-w-2xl mx-auto">
				<h2 className="text-3xl md:text-4xl font-bold text-white mb-6 [text-shadow:0_0_4px_rgba(255,255,255,0.5),0_0_6px_rgba(255,255,255,0.3)]">
					Ready to Get Started?
				</h2>
				<p className="text-lg text-white mb-8">
					Join us today and start managing your health with ease. Our
					tools and resources are designed to help you stay on top of
					your well-being.
				</p>
				<a
					onClick={() => router.push("/auth/register")}
					className="inline-block cursor-pointer bg-white text-[#2487c5] text-lg font-semibold py-3 px-6 rounded-full shadow-md hover:scale-110 active:opacity-80 transition duration-200"
				>
					Sign Up
				</a>
			</div>
		</section>
	);
};
