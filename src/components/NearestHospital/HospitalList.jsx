import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const HospitalList = () => {
	const [hospitals, setHospitals] = useState([]);
	const [userLocation, setUserLocation] = useState(null);

	useEffect(() => {
		// // Fetch nearby hospitals based on user location with certain radius
		const fetchHospitals = async (lat, lng) => {
			try {
				const response = await fetch(
					`https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"~"hospital|clinic"](around:50000,${lat},${lng});out;`
				);
				const data = await response.json();

				// Calculate distance for each hospital from user location and sort by distance
				const hospitalsWithDistance = data.elements
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

				// Take 10 nearest
				setHospitals(hospitalsWithDistance.slice(0, 10));
			} catch (error) {
				console.log(error);
			}
		};

		// Algorithm for calculating distance between 2 points
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
			return R * c; // Distance in km
		};

		// Successful geolocation request handler
		const handleGeolocationSuccess = (position) => {
			const { latitude, longitude } = position.coords;
			setUserLocation({ lat: latitude, lng: longitude });
			fetchHospitals(latitude, longitude);
		};

		// Error geolocation request handler
		const handleGeolocationError = (error) => {
			if (error.code === error.PERMISSION_DENIED) {
				console.error("User denied the request for geolocation.");
			} else if (error.code === error.POSITION_UNAVAILABLE) {
				console.error("Location information is unavailable.");
			} else if (error.code === error.TIMEOUT) {
				console.error("The request to get user location timed out.");
			} else if (error.code === error.UNKNOWN_ERROR) {
				console.error("An unknown error occurred.");
			} else {
				console.error("Error getting user location:", error.message);
			}
			setUserLocation({ lat: -6.893303, lng: 107.610387 });
			fetchHospitals(-6.893303, 107.610387);
		};

		// Checks if browser supports geolocation
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				handleGeolocationSuccess,
				handleGeolocationError
			);
		} else {
			// Geolocation is not supported, redirects user position to default location (Bandung)
			console.error("Geolocation is not supported by this browser.");
			setUserLocation({ lat: -6.893303, lng: 107.610387 });
			fetchHospitals(-6.893303, 107.610387);
		}
	}, []);

	return (
		<div>
			<h2 className="text-[1.5rem] font-semibold my-4">
				Nearest Hospitals List
			</h2>
			{hospitals.map((hospital, index) => (
				<div
					key={index}
					className="p-2 border border-collapse rounded my-2"
				>
					<h3 className="text-xl">
						{hospital.tags.name || "Unknown Hospital"}
					</h3>
					<p>Distance: {hospital.distance.toFixed(2)} km</p>
					<a
						href={hospital.googleMapsUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-500 underline"
					>
						View on Google Maps
					</a>
				</div>
			))}
		</div>
	);
};

export default HospitalList;
