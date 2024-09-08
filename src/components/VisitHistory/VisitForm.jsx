import { useState } from "react";

const VisitForm = ({ onAddVisit }) => {
	const [visitDate, setVisitDate] = useState("");
	const [clinicHospitalName, setClinicHospitalName] = useState("");
	const [diagnosis, setDiagnosis] = useState("");
	const [treatment, setTreatment] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		onAddVisit({
			visitDate,
			clinicHospitalName,
			diagnosis,
			treatment,
		});

		// Reset form
		setVisitDate("");
		setClinicHospitalName("");
		setDiagnosis("");
		setTreatment("");
	};

	return (
		<div className="bg-white shadow-lg rounded-lg max-w-md mx-auto p-6 mt-8 mb-10">
			<h2 className="text-2xl font-bold text-gray-800 mb-6">Add Visit</h2>
			<form onSubmit={handleSubmit} className="space-y-5">
				<input
					className="w-full bg-gray-100 border border-gray-300 rounded-md p-3 text-sm placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition duration-150"
					required
					type="text"
					value={clinicHospitalName}
					placeholder="Nama Rumah Sakit"
					onChange={(e) => setClinicHospitalName(e.target.value)}
				/>
				<input
					className="w-full bg-gray-100 border border-gray-300 rounded-md p-3 text-sm placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition duration-150"
					required
					type="date"
					value={visitDate}
					placeholder="Waktu Berkunjung"
					onChange={(e) => setVisitDate(e.target.value)}
				/>
				<input
					className="w-full bg-gray-100 border border-gray-300 rounded-md p-3 text-sm placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition duration-150"
					required
					type="text"
					value={diagnosis}
					placeholder="Diagnosa"
					onChange={(e) => setDiagnosis(e.target.value)}
				/>
				<input
					className="w-full bg-gray-100 border border-gray-300 rounded-md p-3 text-sm placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition duration-150"
					required
					type="text"
					value={treatment}
					placeholder="Pengobatan"
					onChange={(e) => setTreatment(e.target.value)}
				/>
				<button
					className="bg-sky-500 hover:bg-sky-600 text-white w-full font-semibold py-3 rounded-md transition duration-300 transform"
					type="submit"
				>
					Add Record
				</button>
			</form>
		</div>
	);
};

export default VisitForm;
