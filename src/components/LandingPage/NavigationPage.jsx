import { useRouter } from "next/navigation";

const NavigationPage = () => {
	const router = useRouter();

	const handleNavigation = (path) => {
		router.push(path);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] p-6 bg-gray-100">
			<h1 className="text-3xl font-bold mb-8">
				Explore Your Health Insights
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
				<div
					onClick={() => handleNavigation("/profile")}
					className="nav-box"
				>
					<h2 className="text-xl font-semibold mb-2">
						Profile & BMI Calculator
					</h2>
					<p className="text-gray-600">
						Manage your profile and track your Body Mass Index
					</p>
				</div>
				<div
					onClick={() => handleNavigation("/sleep-history")}
					className="nav-box"
				>
					<h2 className="text-xl font-semibold mb-2">
						Sleep Tracker
					</h2>
					<p className="text-gray-600">Monitor your sleep patterns</p>
				</div>
				<div
					onClick={() => handleNavigation("/visit-history")}
					className="nav-box"
				>
					<h2 className="text-xl font-semibold mb-2">
						Visit History
					</h2>
					<p className="text-gray-600">Track your medical visits</p>
				</div>
				<div
					onClick={() => handleNavigation("/vaccine-history")}
					className="nav-box"
				>
					<h2 className="text-xl font-semibold mb-2">
						Vaccine History
					</h2>
					<p className="text-gray-600">
						View your vaccination records
					</p>
				</div>
				<div
					onClick={() => handleNavigation("/nearest-hospital")}
					className="nav-box"
				>
					<h2 className="text-xl font-semibold mb-2">
						Nearest Hospital
					</h2>
					<p className="text-gray-600">Find hospitals near you</p>
				</div>
				<div
					onClick={() => handleNavigation("/article")}
					className="nav-box"
				>
					<h2 className="text-xl font-semibold mb-2">Article</h2>
					<p className="text-gray-600">
						Read informative articles about health.
					</p>
				</div>
			</div>
		</div>
	);
};

export default NavigationPage;
