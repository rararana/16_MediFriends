"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

// Dynamically import (leaflet imports) to make sure it's only used on the client side (not on the server side)
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

// Custom icon for markers
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

		// Update state with the icons
		setIcons({ userIcon, hospitalIcon });
	}, []);

	return icons;
};

// Function to find nearest hospital
const NearestHospital = () => {
	const [hospitals, setHospitals] = useState([]);
	const [userLocation, setUserLocation] = useState(null);
	const icons = useCustomIcons();

	useEffect(() => {
		// Fetch nearby hospitals based on user location with certain radius
		const fetchHospitals = async (lat, lng) => {
			try {
				// Fetch response from Overpass API (OpenStreetMap)
				const response = await fetch(
					`https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"~"hospital|clinic|doctor"](around:3000,${lat},${lng});out;`
				);
				const data = await response.json();
				setHospitals(data.elements);
			} catch (error) {
				console.log(error);
			}
		};

		// Successful geolocation request handler
		const handleGeolocationSuccess = (position) => {
			const { latitude, longitude } = position.coords;
			setUserLocation({ lat: latitude, lng: longitude });
			fetchHospitals(latitude, longitude);
		};

		// Error geolocation request handler (if permission denied or location unavailable, then redirects to default location)
		const handleGeolocationError = (error) => {
			console.error("Error getting user location:", error);
			setUserLocation({ lat: -6.893303, lng: 107.610387 }); // Default location (Bandung)
			fetchHospitals(-6.893303, 107.610387);
		};

		// Checks if browser supports geolocation
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				handleGeolocationSuccess,
				handleGeolocationError
			);
		} else {
			// Geolocation is not supported
			console.log("Geolocation ERROR!!!");
			setUserLocation({ lat: -6.893303, lng: 107.610387 }); // Default location (Bandung)
			fetchHospitals(-6.893303, 107.610387);
		}
	}, []);

	return (
		<div>
			<h1 className="text-[2.5rem] font-semibold my-4">
				Nearest Hospitals
			</h1>
			{userLocation && icons.userIcon && icons.hospitalIcon && (
				<MapContainer
					center={userLocation}
					zoom={14}
					style={{ height: "500px", width: "100%" }}
				>
					{/* Renders OpenStreetMap Map Tiles */}
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					{/* User current position */}
					<Marker position={userLocation} icon={icons.userIcon}>
						<Popup>You are here</Popup>
					</Marker>

					{/* Nearby hospitals position */}
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
				</MapContainer>
			)}
		</div>
	);
};

export default NearestHospital;
