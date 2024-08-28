"use client";
import React, { useEffect, useState } from "react";
import CardList from "../../../components/VisitHistory/CardList";
import Form from "../../../components/VisitHistory/Form";
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";
import { useSession } from "next-auth/react";

const Datas = () => {
	const [datas, setDatas] = useState([]);
	const session = useSession();
	const [nav, setNav] = useState(false);

	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

	const fetchData = async () => {
		try {
			const response = await fetch("/api/visitHistory/getVisitHistory");
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const dataa = await response.json();
			setDatas(dataa.allVisitHistory || []);
		} catch (error) {
			console.error("Failed to fetch data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<MobileNav nav={nav} closeNav={closeNav} />
			<NavDashboard openNav={openNav} closeNav={closeNav} />
			<div className="mt-[6rem]">
				<h1 className="text-center text-neutral-700 font-bold text-lg m-5">
					Data Kunjungan Rumah Sakit
				</h1>
				<Form />
				{datas.map((data, index) => (
					<CardList key={data.id || index}>
						<div className="ml-5 font-semibold rounded-md text-xl mb-3 tracking-wider">
							{data.clinicHospitalName}
						</div>
						<div className="leading-relaxed mx-5 my-1 pl-5 rounded-md bg-sky-200 bg-opacity-40 text-lg border-sky-100 border-opacity-20 border-2 py-3">
							<div>{data.visitDate}</div>
							<div>{data.diagnose}</div>
							<div>{data.treatment}</div>
						</div>
					</CardList>
				))}
			</div>
		</>
	);
};

export default Datas;
