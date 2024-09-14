"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
	() => import("react-leaflet").then((mod) => mod.MapContainer),
	{ ssr: false }
);
const TileLayer = dynamic(
	() => import("react-leaflet").then((mod) => mod.TileLayer),
	{ ssr: false }
);
const Marker = dynamic(
	() => import("react-leaflet").then((mod) => mod.Marker),
	{ ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
	ssr: false,
});

const useCustomIcons = () => {
	const [icons, setIcons] = useState({});

	useEffect(() => {
		const L = require("leaflet");

		const userIcon = new L.Icon({
			iconUrl: "/images/hospital/location.png",
			iconSize: [32, 32],
			iconAnchor: [16, 32],
			popupAnchor: [0, -32],
		});

		const hospitalIcon = new L.Icon({
			iconUrl: "/images/hospital/hospital.png",
			iconSize: [23, 23],
			iconAnchor: [16, 32],
			popupAnchor: [0, -32],
		});

		const customHospitalIcon = new L.Icon({
			iconUrl: "/images/hospital/hospital.png",
			iconSize: [30, 30],
			iconAnchor: [15, 30],
			popupAnchor: [0, -30],
		});

		setIcons({ userIcon, hospitalIcon, customHospitalIcon });
	}, []);

	return icons;
};

const NearestHospital = () => {
	const [hospitals, setHospitals] = useState([]);
	const [userLocation, setUserLocation] = useState(null);
	const icons = useCustomIcons();

	const customHospitals = [
		{ name: "RS Annisa Medical Center", lat: -6.940626, lon: 107.755813 },
		{ name: "Klinik Padjajaran", lat: -6.93114, lon: 107.772 },
	];

	useEffect(() => {
		const fetchHospitals = async (lat, lng) => {
			try {
				const response = await fetch(
					`https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"~"hospital|clinic|doctor"](around:3000,${lat},${lng});out;`
				);
				const data = await response.json();
				setHospitals(data.elements);
			} catch (error) {
				console.log(error);
			}
		};

		const handleGeolocationSuccess = (position) => {
			const { latitude, longitude } = position.coords;
			setUserLocation({ lat: latitude, lng: longitude });
			fetchHospitals(latitude, longitude);
		};

		const handleGeolocationError = (error) => {
			console.error("Error getting user location:", error);
			setUserLocation({ lat: -6.893303, lng: 107.610387 });
			fetchHospitals(-6.893303, 107.610387);
		};

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				handleGeolocationSuccess,
				handleGeolocationError
			);
		} else {
			console.log("Geolocation ERROR!!!");
			setUserLocation({ lat: -6.893303, lng: 107.610387 });
			fetchHospitals(-6.893303, 107.610387);
		}
	}, []);

	return (
		<div>
			<h1 className="text-[2.5rem] font-semibold my-4">
				Hospitals Near You
			</h1>
			{userLocation &&
				icons.userIcon &&
				icons.hospitalIcon &&
				icons.customHospitalIcon && (
					<MapContainer
						center={userLocation}
						zoom={14}
						style={{ height: "500px", width: "100%" }}
						className="relative z-0"
					>
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						/>
						<Marker position={userLocation} icon={icons.userIcon}>
							<Popup>You are here</Popup>
						</Marker>

						{hospitals.map((hospital, index) => (
							<Marker
								key={index}
								position={[hospital.lat, hospital.lon]}
								icon={icons.hospitalIcon}
							>
								<Popup>
									{hospital.tags.name || "Unknown Hospital"}
								</Popup>
							</Marker>
						))}

						{customHospitals.map((hospital, index) => (
							<Marker
								key={`custom-${index}`}
								position={[hospital.lat, hospital.lon]}
								icon={icons.customHospitalIcon}
							>
								<Popup>{hospital.name}</Popup>
							</Marker>
						))}
					</MapContainer>
				)}
		</div>
	);
};

export default NearestHospital;
