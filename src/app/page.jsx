"use client";

import React, { useState, useEffect } from "react";
import Hero from "../components/LandingPage/Hero";
import Head from "next/head";
import Nav from "../components/LandingPage/Nav";
import MobileNav from "../components/LandingPage/MobileNav";
import AOS from "aos";
import Carousel from "../components/LandingPage/Carousel";
import "aos/dist/aos.css";

const HomePage = () => {
	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});
	}, []);

	return (
		<>
			<Head>
				<title>Home | Andrew Tedjapratama</title>
			</Head>
			<Hero />
			<div>
				<Carousel />
			</div>
		</>
	);
};

export default HomePage;
