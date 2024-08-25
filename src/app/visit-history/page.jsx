"use client";
import React from "react";
import CardList from "../components/VisitHistory/CardList";
import Form from "../components/VisitHistory/Form";
import { useEffect, useState } from "react";

const Datas = async () => {
	const [datas, setDatas] = useState([]);
	const fetchData = async () => {
		try {
			const response = await fetch("/api/visitHistory/getVisitHistory");
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const dataa = await response.json(); // Parsing the response as JSON
			setDatas(dataa.articles || []); // Updating the state with the fetched
		} catch (error) {
			console.error("Failed to fetch data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<h1 className="text-center text-neutral-700 font-bold text-lg m-5">
				Data Kunjungan Rumah Sakit
			</h1>
			<Form />
			{datas.map((data) => {
				return (
					<CardList>
						<div className="font-semibold rounded-md mb-3 bg-gradient-to-br from-stone-200 to-stone-50 p-1">
							{data.name}
						</div>
						<div className="rounded-md bg-gradient-to-br from-stone-200 to-stone-50 p-1">
							<div>{data.clinicHospitalName}</div>
							<div>{data.diagnose}</div>
							<div>{data.treatment}</div>
						</div>
					</CardList>
				);
			})}
		</>
	);
};

export default Datas;
