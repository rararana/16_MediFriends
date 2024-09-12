"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
			once: true,
		});
		AOS.refresh();
	}, []);

	return (
		<div className="bg-[FAF8F5]">
			<div className="container mx-auto my-10 p-4 h-[150vh]">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
					<div className="md:col-span-2 flex flex-col space-y-4">
						<div
							className="hero-box bg-[#1D2F6F] min-h-[250px] flex items-center justify-center"
							data-aos="slide-right"
						>
							<h1 className="text-[#FAF8F5] [text-shadow:0_0_15px_rgba(255,255,255,0.5),0_0_4px_rgba(255,255,255,0.3)] text-[3rem] md:text-[4rem] lg:text-[6rem] font-poppins font-semibold">
								MediFriends
							</h1>
						</div>
						<div
							className="hero-box bg-gray-300 flex-grow max-h-[420px] bg-[url('/images/hero/hero-img-5.png')] bg-cover bg-center"
							data-aos="fade-right"
						></div>
						<div className="grid grid-cols-5 gap-4 h-1/7 flex-grow">
							<div
								className="hero-box col-span-3 bg-gray-400 bg-[url('/images/hero/hero-img-3.jpeg')] bg-cover bg-center"
								data-aos="fade-left"
							></div>
							<div
								className="hero-box col-span-2 bg-gray-100 bg-[url('/images/hero/hero-img-4.jpeg')] bg-cover bg-center"
								data-aos="fade-up"
							></div>
						</div>
					</div>
					<div className="flex flex-col space-y-4 h-full">
						<div
							className="hero-box bg-gray-200 h-2/5 bg-[url('/images/hero/hero-img-1.jpeg')] bg-cover bg-center"
							data-aos="fade-up"
						></div>
						<div
							className="hero-box bg-[#1D2F6F] flex-grow flex h-3/5 items-center justify-center"
							data-aos="zoom-in"
						>
							<h2 className="text-[1rem] md:text-[2.5rem] xl:text-[4rem] text-white text-left font-[600] overflow-hidden">
								<div className="flex md:flex-col">
									{/* Below md screen */}
									<span className="inline md:hidden mr-4">
										Your
									</span>
									<span className="inline md:hidden mr-4">
										Health
									</span>
									<div className="inline md:hidden">
										Tool &amp;
									</div>
									<span className="inline md:hidden ml-2">
										Assistant
									</span>

									{/* Above md screen */}
									<div className="hidden md:flex md:flex-col [text-shadow:0_0_4px_rgba(255,255,255,0.5),0_0_6px_rgba(255,255,255,0.3)]">
										<span className="">Your</span>
										<span className="">Health</span>
										<div className="flex items-center">
											<span className="">Tool &amp;</span>
										</div>
										<span className="">Assistant</span>
									</div>
								</div>
							</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
