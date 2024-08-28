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
		title: (
			<>
				<span className="text-white [text-shadow:0_0_4px_rgba(255,255,255,0.5),0_0_6px_rgba(255,255,255,0.3)]">
					Track
				</span>{" "}
				your schedule
			</>
		),
		image: "/images/carousel/carousel-img-1.png",
	},
	{
		title: (
			<>
				<span className="text-white [text-shadow:0_0_4px_rgba(255,255,255,0.5),0_0_6px_rgba(255,255,255,0.3)]">
					Record
				</span>{" "}
				your activity
			</>
		),
		image: "/images/carousel/carousel-img-3.png",
	},
	{
		title: (
			<>
				<span className="text-white [text-shadow:0_0_4px_rgba(255,255,255,0.5),0_0_6px_rgba(255,255,255,0.3)]">
					Inform
				</span>{" "}
				you with news
			</>
		),
		image: "/images/carousel/carousel-img-2.png",
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
		<UiCarousel className="w-full max-w-2xl mx-auto" data-aos="fade-up">
			<CarouselContent>
				{carouselItems.map((item, index) => (
					<CarouselItem
						key={index}
						data-aos="fade-up"
						data-aos-delay={`${index * 200}`}
					>
						<div className="p-6">
							<Card className="max-w-md mx-auto">
								<CardContent className="rounded-3xl flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#3fa2ff] to-[#6BC2EB]">
									<h2 className="text-2xl font-bold mb-4">
										{item.title}
									</h2>
									<img
										src={item.image}
										alt={item.title}
										className="w-20 h-20 rounded-full object-cover"
									/>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="w-12 h-12 text-black bg-[#EEEEEE]" />
			<CarouselNext className="w-12 h-12 text-black bg-[#EEEEEE]" />
		</UiCarousel>
	);
}
