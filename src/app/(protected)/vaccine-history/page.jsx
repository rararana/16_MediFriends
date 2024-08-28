"use client";

import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";
import { useEffect, useState } from "react";
import styles from "@/styles/styles.module.css";

export default function VaccineHistory() {
	const [vaccines, setVaccines] = useState([]);
	const [form, setForm] = useState({
		vaccineName: "",
		date: "",
		hospitalName: "",
	});
	const [editIndex, setEditIndex] = useState(null);

	const fetchData = async () => {
		try {
			const response = await fetch(
				"/api/vaccineHistory/getVaccineHistory"
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			console.log(response);
			const dataa = await response.json();
			setVaccines(dataa.allVaccineHistory || []);
		} catch (error) {
			console.error("Failed to fetch data:", error);
		}
	};

	useEffect(() => {
		const triggerFetch = async () => {
			await fetchData();
		};
		triggerFetch();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (editIndex !== null) {
			const updateVaccines = vaccines.map((vaccine, index) =>
				index === editIndex ? form : vaccine
			);
			setVaccines(updateVaccines);
			setEditIndex(null);
		} else {
			const response = await fetch(
				"/api/vaccineHistory/createVaccineHistory",
				{
					method: "POST",
					body: JSON.stringify({
						userId: "cm0dgb9lv0000r8ra38gr40ps",
						vaccineName: form.vaccineName,
						vaccineDate: form.date,
						clinicHospitalName: form.hospitalName,
					}),
				}
			);
			if (response.status == 201) {
				const form = await response.json();
				setVaccines([...vaccines, form]);
			}
		}

		setForm({ vaccineName: "", date: "", hospitalName: "" });
	};

	const handleEdit = (index) => {
		setForm(vaccines[index]);
		setEditIndex(index);
	};

	const handleDelete = async (id) => {
		const response = await fetch(
			"/api/vaccineHistory/deleteVaccineHistory",
			{
				method: "DELETE",
				body: JSON.stringify({ id }),
			}
		);

		if (response.status == 200) {
			setVaccines(vaccines.filter((_, i) => i !== id));
		}
	};

	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

	return (
		<div>
			{/* Navigation */}
			<MobileNav nav={nav} closeNav={closeNav} />
			<NavDashboard openNav={openNav} closeNav={closeNav} />
			<div className="mt-[6rem] container">
				<h1 className={styles.bigBoldText}>Vaccine History</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label>Vaccine Name:</label>
						<input
							type="text"
							name="vaccineName"
							value={form.vaccineName}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div>
						<label>Vaccine Date:</label>
						<input
							type="text"
							name="date"
							value={form.date}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div>
						<label>Hospital Name:</label>
						<input
							type="text"
							name="hospitalName"
							value={form.hospitalName}
							onChange={handleInputChange}
							required
						/>
					</div>
					<button type="submit" className={styles.boxedButton}>
						{editIndex !== null ? "Update Vaccine" : "Add Vaccine"}
					</button>
					{editIndex !== null && (
						<>
							<br />
							<button
								className={styles.boxedButton}
								type="button"
								onClick={() => {
									setForm({
										vaccineName: "",
										date: "",
										hospitalName: "",
									});
									setEditIndex(null);
								}}
							>
								Cancel Edit
							</button>
						</>
					)}
				</form>

				<br />
				<h2 className={styles.bigBoldText2}>Vaccine List</h2>
				<ul>
					{vaccines.map((vaccine, index) => (
						<li key={index}>
							<br /><h3 className={styles.bigBoldText3}>{vaccine.vaccineName}</h3>
							<br />
							Date: {vaccine.vaccineDate}
							<br />
							Hospital Name: {vaccine.clinicHospitalName}
							<div>
								<button className={styles.boxedButton} onClick={() => handleEdit(index)}>
									Edit
								</button>
								<br />
								<button
									className={styles.boxedButton}
									onClick={() => handleDelete(vaccine.id)}
								>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
