import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const HospitalList = () => {
	const [hospitals, setHospitals] = useState([]);
	const [userLocation, setUserLocation] = useState(null);

	const customHospitals = [
		{
			id: "custom1",
			tags: { name: "RS Annisa Medical Center" },
			lat: -6.940626,
			lon: 107.755813,
			isCustom: true,
		},
		{
			id: "custom2",
			tags: { name: "Klinik Padjajaran" },
			lat: -6.93114,
			lon: 107.772,
			isCustom: true,
		},
	];

	useEffect(() => {
		const calculateDistance = (lat1, lon1, lat2, lon2) => {
			const toRad = (x) => (x * Math.PI) / 180;
			const R = 6371; // Radius of the Earth in km
			const dLat = toRad(lat2 - lat1);
			const dLon = toRad(lon2 - lon1);
			const a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(toRad(lat1)) *
					Math.cos(toRad(lat2)) *
					Math.sin(dLon / 2) *
					Math.sin(dLon / 2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			return R * c;
		};

		const fetchHospitals = async (lat, lng) => {
			try {
				const response = await fetch(
					`https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"~"hospital|clinic"](around:50000,${lat},${lng});out;`
				);
				const data = await response.json();

				const allHospitals = [...data.elements, ...customHospitals];

				const hospitalsWithDistance = allHospitals
					.map((hospital) => ({
						...hospital,
						distance: calculateDistance(
							lat,
							lng,
							hospital.lat,
							hospital.lon
						),
						googleMapsUrl: `https://www.google.com/maps?q=${hospital.lat},${hospital.lon}`,
					}))
					.sort((a, b) => a.distance - b.distance);

				// Take 10 nearest hospitals
				setHospitals(hospitalsWithDistance.slice(0, 10));
			} catch (error) {
				console.log(error);
				setHospitals(
					customHospitals.map((hospital) => ({
						...hospital,
						distance: calculateDistance(
							lat,
							lng,
							hospital.lat,
							hospital.lon
						),
						googleMapsUrl: `https://www.google.com/maps?q=${hospital.lat},${hospital.lon}`,
					}))
				);
			}
		};

		const handleGeolocationSuccess = (position) => {
			const { latitude, longitude } = position.coords;
			setUserLocation({ lat: latitude, lng: longitude });
			fetchHospitals(latitude, longitude);
		};

		const handleGeolocationError = (error) => {
			console.error("Error getting user location:", error.message);
			const defaultLat = -6.893303;
			const defaultLng = 107.610387;
			setUserLocation({ lat: defaultLat, lng: defaultLng });
			fetchHospitals(defaultLat, defaultLng);
		};

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				handleGeolocationSuccess,
				handleGeolocationError
			);
		} else {
			console.error("Geolocation is not supported by this browser.");
			const defaultLat = -6.893303;
			const defaultLng = 107.610387;
			setUserLocation({ lat: defaultLat, lng: defaultLng });
			fetchHospitals(defaultLat, defaultLng);
		}
	}, []);

	return (
		<div>
			<h2 className="text-[1.5rem] font-semibold my-4">
				Nearest Hospitals List
			</h2>
			{hospitals.map((hospital, index) => (
				<div
					key={hospital.id || index}
					className={`p-5 border bg-white border-collapse shadow-md rounded-xl my-2 max-h-[500px] overflow-y-auto transition-all hover:bg-sky-50 cursor-pointer ${
						hospital.isCustom ? "border-blue-500" : ""
					}`}
				>
					<h3>{hospital.tags.name || "Unknown Hospital"}</h3>
					<p>Distance: {hospital.distance.toFixed(2)} km</p>
					<a
						href={hospital.googleMapsUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-500 underline"
					>
						View on Google Maps
					</a>
					{hospital.isCustom && (
						<p className="text-blue-500 font-semibold mt-2">
							Featured Hospital
						</p>
					)}
				</div>
			))}
		</div>
	);
};

export default HospitalList;
