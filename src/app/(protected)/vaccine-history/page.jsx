"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import VaccineHistory from "@/components/VaccineHistory/VaccineHistory";
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";
import Footer from "@/components/Footer/Footer";

export default function VaccineHistoryPage() {
	const [records, setRecords] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { data: session } = useSession();
	const userId = session?.user?.id;

	const fetchVaccineHistory = useCallback(async () => {
		if (userId) {
			setIsLoading(true);
			try {
				const response = await fetch(
					`/api/vaccineHistory/getVaccineHistory?userId=${userId}`
				);
				const data = await response.json();
				if (response.ok) {
					setRecords(data.records);
				} else {
					alert(data.message || "Failed to fetch vaccine history");
				}
			} catch (error) {
				console.error("Error fetching vaccine history:", error);
				alert("Error fetching vaccine history");
			} finally {
				setIsLoading(false);
			}
		}
	}, [userId]);

	useEffect(() => {
		fetchVaccineHistory();
	}, [fetchVaccineHistory]);

	const handleAddRecord = async (newRecord) => {
		try {
			const response = await fetch(
				"/api/vaccineHistory/createVaccineHistory",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ userId, ...newRecord }),
				}
			);
			const data = await response.json();
			if (response.ok) {
				setRecords((prevRecords) => [
					...prevRecords,
					data.vaccineHistory,
				]);
				alert("Vaccine record added successfully");
				return true;
			} else {
				alert(data.message || "Failed to add vaccine record");
				return false;
			}
		} catch (error) {
			console.error("Error adding vaccine record:", error);
			alert("Error adding vaccine record");
			return false;
		}
	};

	const handleDeleteRecord = async (id) => {
		try {
			const response = await fetch(
				"/api/vaccineHistory/deleteVaccineHistory",
				{
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ id }),
				}
			);
			if (response.ok) {
				setRecords((prevRecords) =>
					prevRecords.filter((r) => r.id !== id)
				);
				alert("Vaccine record deleted successfully");
				return true;
			} else {
				alert("Failed to delete vaccine record");
				return false;
			}
		} catch (error) {
			console.error("Error deleting vaccine record:", error);
			alert("Error deleting vaccine record");
			return false;
		}
	};

	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

	return (
		<div>
			<MobileNav nav={nav} closeNav={closeNav} />
			<NavDashboard openNav={openNav} closeNav={closeNav} />
			<VaccineHistory
				records={records}
				onAddRecord={handleAddRecord}
				onDeleteRecord={handleDeleteRecord}
			/>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}
