"use client";

import React, { useEffect, useState, useCallback } from "react";
import VisitForm from "@/components/VisitHistory/VisitForm";
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";
import { useSession } from "next-auth/react";
import VisitCard from "@/components/VisitHistory/VisitCard";

const Datas = () => {
	const [datas, setDatas] = useState([]);
	const [nav, setNav] = useState(false);

	const { data: session } = useSession();
	const userId = session?.user?.id;

	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

	const fetchVisitHistory = useCallback(async () => {
		if (userId) {
			try {
				const response = await fetch(
					`/api/visitHistory/getVisitHistory?userId=${userId}`
				);

				const data = await response.json();
				if (response.ok) {
					setDatas(data.datas);
				} else {
					console.error(
						"Failed to fetch visit history:",
						data.message
					);
				}
			} catch (error) {
				console.error("Error fetching visit history:", error);
			}
		}
	}, [userId]);

	useEffect(() => {
		fetchVisitHistory();
	}, [fetchVisitHistory]);

	const handleAddVisit = async (newVisit) => {
		try {
			const response = await fetch(
				"/api/visitHistory/createVisitHistory",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ ...newVisit, userId }),
				}
			);

			const data = await response.json();

			if (response.ok) {
				if (data.visitHistory) {
					setDatas((prevDatas) => [...prevDatas, data.visitHistory]);
				} else {
					console.error(
						"visitHistory not found in response data:",
						data
					);
				}
			} else {
				console.error("Failed to add visit record:", data.message);
			}
		} catch (error) {
			console.error("Error adding visit record:", error);
		}
	};

	return (
		<>
			<MobileNav nav={nav} closeNav={closeNav} />
			<NavDashboard openNav={openNav} closeNav={closeNav} />
			<div className="container mt-[9rem]">
				<h1 className="text-3xl font-semibold text-center">
					Hospital Visit Records
				</h1>
				<VisitForm onAddVisit={handleAddVisit} />
				<VisitCard visits={datas} />
			</div>
		</>
	);
};

export default Datas;
