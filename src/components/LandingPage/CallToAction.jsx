import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export const CallToAction = () => {
	const router = useRouter();

	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
			once: true,
		});
		AOS.refresh();
	}, []);

	return (
		<section
			className="bg-[#1D2F6F] py-16 px-6 md:px-16 text-center"
			data-aos="fade-up"
		>
			<div className="max-w-2xl mx-auto" data-aos="slide-up">
				<h2 className="text-3xl md:text-4xl font-bold text-white mb-6 [text-shadow:0_0_4px_rgba(255,255,255,0.5),0_0_6px_rgba(255,255,255,0.3)]">
					Ready to Get Started?
				</h2>
				<p
					className="text-lg text-white mb-8"
					data-aos="slide-up"
					data-aos-delay="100"
				>
					Join us today and start managing your health with ease. Our
					tools and resources are designed to help you stay on top of
					your well-being.
				</p>
				<a
					onClick={() => router.push("/auth/register")}
					data-aos="slide-up"
					data-aos-delay="200"
				>
					<button class="cursor-pointer text-white font-bold shadow-md hover:scale-[1.2] shadow-blue-400 rounded-full px-5 py-2 bg-gradient-to-bl from-blue-800 to-blue-900">
						Sign Up
					</button>
				</a>
			</div>
		</section>
	);
};
