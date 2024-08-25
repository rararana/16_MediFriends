import React from "react";
import HospitalList from "@/components/NearestHospital/HospitalList";
import NearestHospital from "@/components/NearestHospital/NearestHospital";

export default function Home() {
	return (
		<div className="container mx-auto">
			<div className="min-h-screen">
				<NearestHospital />
				<HospitalList />
			</div>
		</div>
	);
}
