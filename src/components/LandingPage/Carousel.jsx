import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel as UiCarousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import AOS from "aos";
import "aos/dist/aos.css";

const carouselItems = [
	{
		title: "Track your Schedule",
		description:
			"Keep your activities on track and never miss out appointment with your doctor or forget to drink your medication.",
		image: "/images/carousel/carousel-img-1.png",
		gradientColor: "#6BC2EB",
		titleAlignment: "text-left",
	},
	{
		title: "Record your activity",
		description:
			"Keep your body on good health by keeping tabs on your sleep schedule, BMI score, and vaccine history",
		image: "/images/carousel/carousel-img-2.png",
		gradientColor: "#6BC2EB",
		titleAlignment: "text-center",
	},
	{
		title: "Inform you with news",
		description:
			"Don't be left out in this everychanging world. Get on with the latest news you can get about health",
		image: "/images/carousel/carousel-img-3.png",
		gradientColor: "#6BC2EB",
		titleAlignment: "text-right",
	},
];

export function CarouselDemo() {
	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
			once: true,
		});
		AOS.refresh();
	}, []);

	return (
		<div className="relative w-full max-w-3xl mx-auto">
			<UiCarousel className="w-full" data-aos="fade-up">
				<CarouselContent>
					{carouselItems.map((item, index) => (
						<CarouselItem
							key={index}
							data-aos="fade-up"
							data-aos-delay={`${index * 200}`}
						>
							<div className="p-6">
								<Card className="overflow-hidden rounded-3xl relative">
									<div className="absolute top-0 left-0 right-0 px-8 py-4 z-10">
										<h2
											className={`mt-3 text-2xl md:text-4xl font-bold ${item.titleAlignment} text-black`}
										>
											<span className="text-white [text-shadow:0_0_4px_rgba(255,255,255,0.5),0_0_6px_rgba(255,255,255,0.3)]">
												{item.title.split(" ")[0]}
											</span>{" "}
											{item.title
												.split(" ")
												.slice(1)
												.join(" ")}
										</h2>
									</div>
									<CardContent className="p-0 flex h-[300px]">
										{index === 1 ? (
											<>
												<div
													className="w-1/2 p-4 md:p-8 flex flex-col justify-center"
													style={{
														backgroundColor:
															item.gradientColor,
													}}
												>
													<p className="text-base md:text-lg text-white">
														{item.description}
													</p>
												</div>
												<div className="w-1/2 relative">
													<img
														src={item.image}
														alt={item.title}
														className="w-full h-full object-cover"
													/>
													<div
														className="absolute inset-0"
														style={{
															background: `linear-gradient(to left, transparent, ${item.gradientColor})`,
														}}
													></div>
												</div>
											</>
										) : (
											<>
												<div className="w-1/2 relative">
													<img
														src={item.image}
														alt={item.title}
														className="w-full h-full object-cover"
													/>
													<div
														className="absolute inset-0"
														style={{
															background: `linear-gradient(to right, transparent, ${item.gradientColor})`,
														}}
													></div>
												</div>
												<div
													className="w-1/2 p-4 md:p-8 flex flex-col justify-center"
													style={{
														backgroundColor:
															item.gradientColor,
													}}
												>
													<p className="text-base md:text-lg text-white">
														{item.description}
													</p>
												</div>
											</>
										)}
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 w-12 h-12 text-black bg-[#EEEEEE] rounded-full" />
				<CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 w-12 h-12 text-black bg-[#EEEEEE] rounded-full" />
			</UiCarousel>
		</div>
	);
}
