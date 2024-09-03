import React from "react";
import { Calendar, Stethoscope, Pill } from "lucide-react";

const VisitCard = ({ visits }) => {
	if (!visits || visits.length === 0) {
		return (
			<div className="p-4 bg-gray-100 rounded-lg shadow-md">
				<p className="text-gray-600 text-center">
					No visit records available.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{visits.map((visit, index) => (
				<div
					key={index}
					className="bg-white rounded-lg shadow-md overflow-hidden"
				>
					<div className="bg-gradient-to-r from-[#27a1da] to-[#48b4f7] p-4">
						<h3 className="text-xl font-semibold text-white">
							{visit.clinicHospitalName}
						</h3>
					</div>
					<div className="p-4 space-y-3">
						<div className="flex items-center space-x-2">
							<Calendar className="text-gray-500" size={20} />
							<p className="text-gray-700">
								Date: {visit.visitDate}
							</p>
						</div>
						<div className="flex items-center space-x-2">
							<Stethoscope className="text-gray-500" size={20} />
							<p className="text-gray-700">
								Diagnosis: {visit.diagnosis}
							</p>
						</div>
						<div className="flex items-center space-x-2">
							<Pill className="text-gray-500" size={20} />
							<p className="text-gray-700">
								Treatment: {visit.treatment}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default VisitCard;
