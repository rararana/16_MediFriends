import React from "react";

const Hero = () => {
	return (
		<div className="container mx-auto my-10 p-4 h-[150vh] overflow-hidden">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
				<div className="md:col-span-2 flex flex-col space-y-4">
					<div className="hero-box bg-gradient-to-r from-[#6BC2EB] to-[#2487c5] min-h-[250px] flex items-center justify-center">
						<h1 className="text-[4rem] lg:text-[6rem] font-poppins font-semibold">
							Medi
							<span className="text-white [text-shadow:0_0_8px_rgba(255,255,255,0.5),0_0_8px_rgba(255,255,255,0.6)]">
								Friends
							</span>
						</h1>
					</div>
					<div className="hero-box bg-gray-300 flex-grow max-h-[420px] bg-[url('/images/hero/hero-img-5.png')] bg-cover bg-center"></div>
					<div className="grid grid-cols-5 gap-4 h-1/7 flex-grow">
						<div className="hero-box col-span-3 bg-gray-400 bg-[url('/images/hero/hero-img-3.jpeg')] bg-cover bg-center"></div>
						<div className="hero-box col-span-2 bg-gray-100 bg-[url('/images/hero/hero-img-4.jpeg')] bg-cover bg-center"></div>
					</div>
				</div>
				<div className="flex flex-col space-y-4 h-full">
					<div className="hero-box bg-gray-200 h-2/5 bg-[url('/images/hero/hero-img-1.jpeg')] bg-cover bg-center"></div>
					<div className="hero-box bg-gradient-to-br from-[#2487c5] to-[#6BC2EB] flex-grow flex h-3/5 items-center justify-center">
						<h2 className="text-[2rem] md:text-[2.5rem] xl:text-[4rem] text-white text-left font-[600] overflow-hidden">
							<div className="flex md:flex-col">
								{/* Below md screen */}
								<span className="inline md:hidden mr-4">
									Your
								</span>
								<span className="inline md:hidden text-black mr-4">
									Health
								</span>
								<div className="inline md:hidden text-white">
									Tool &
								</div>
								<span className="inline md:hidden text-black ml-2">
									Assistant
								</span>

								{/* Above md screen */}
								<div className="hidden md:flex md:flex-col">
									<span className="text-white [text-shadow:0_0_4px_rgba(255,255,255,0.5),0_0_6px_rgba(255,255,255,0.3)]">
										Your
									</span>
									<span className="text-black">Health</span>
									<div className="flex items-center">
										<span className="[text-shadow:0_0_4px_rgba(255,255,255,0.5),0_0_6px_rgba(255,255,255,0.3)]">
											Tool &
										</span>
									</div>
									<span className="text-black">
										Assistant
									</span>
								</div>
							</div>
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
