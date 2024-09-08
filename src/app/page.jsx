"use client";

import React, { useState } from "react";
import Hero from "../components/LandingPage/Hero";
import Head from "next/head";
import { CarouselDemo } from "../components/LandingPage/Carousel";
import { CallToAction } from "../components/LandingPage/CallToAction";
import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import "aos/dist/aos.css";
import "../styles/globals.css";
import Footer from "@/components/Footer/Footer";

const HomePage = () => {
	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);
	return (
		<>
			<Head>
				<title>Medifriends</title>
			</Head>
			<div id="landing-hero-section" className="mt-[6rem]">
				<Hero />
			</div>
			{/* Nav */}
			<MobileNav nav={nav} closeNav={closeNav} />
			<Nav openNav={openNav} closeNav={closeNav} />
			<div id="landing-carousel-section">
				<CarouselDemo />
			</div>
			<div id="landing-signup-section">
				<CallToAction />
			</div>
			<footer>
				<Footer />
			</footer>
		</>
	);
};

export default HomePage;
