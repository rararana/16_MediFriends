import React from "react";
import Hero from "../components/LandingPage/Hero";
import Head from "next/head";
import { CarouselDemo } from "../components/LandingPage/Carousel";
import { CallToAction } from "../components/LandingPage/CallToAction";
import "aos/dist/aos.css";
import "../styles/globals.css";

const HomePage = () => {
	return (
		<>
			<Head>
				<title>Home | Andrew Tedjapratama</title>
			</Head>
			<Hero />
			<div id="landing-carousel-section">
				<CarouselDemo />
			</div>
			<div id="landing-signup-section">
				<CallToAction />
			</div>
		</>
	);
};

export default HomePage;
