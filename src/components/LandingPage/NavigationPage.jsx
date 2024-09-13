import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { User, Moon, Calendar, Syringe, Hospital, Book } from "lucide-react";

const NavigationPage = () => {
	const router = useRouter();

	const handleNavigation = (path) => {
		router.push(path);
	};

	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
			once: true,
		});
		AOS.refresh();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#FAF8F5]">
			<div className="w-full max-w-6xl">
				<h1 className="text-5xl font-bold mb-12 text-center text-[#141414]">
					Explore Your Health Insights
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Profile & BMI Calculator */}
					<div
						onClick={() => handleNavigation("/profile")}
						className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:bg-sky-50 active:bg-sky-100 cursor-pointer"
						data-aos="fade-up"
					>
						<div className="flex items-center mb-4">
							<div className="bg-[#1D2F6F] p-3 rounded-full mr-4">
								<User className="w-6 h-6 text-[#FAF8F5]" />
							</div>
							<h2 className="text-xl font-semibold text-[#141414]">
								Profile & BMI Calculator
							</h2>
						</div>
						<p className="text-gray-600">
							Manage your profile and track your Body Mass Index
						</p>
					</div>

					{/* Sleep Tracker */}
					<div
						onClick={() => handleNavigation("/sleep-history")}
						className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:bg-sky-50 active:bg-sky-100 cursor-pointer"
						data-aos="fade-up"
						data-aos-delay="100"
					>
						<div className="flex items-center mb-4">
							<div className="bg-[#1D2F6F] p-3 rounded-full mr-4">
								<Moon className="w-6 h-6 text-[#FAF8F5]" />
							</div>
							<h2 className="text-xl font-semibold text-[#141414]">
								Sleep Tracker
							</h2>
						</div>
						<p className="text-gray-600">
							Monitor your sleep patterns
						</p>
					</div>

					{/* Visit History */}
					<div
						onClick={() => handleNavigation("/visit-history")}
						className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:bg-sky-50 active:bg-sky-100 cursor-pointer"
						data-aos="fade-up"
						data-aos-delay="200"
					>
						<div className="flex items-center mb-4">
							<div className="bg-[#1D2F6F] p-3 rounded-full mr-4">
								<Calendar className="w-6 h-6 text-[#FAF8F5]" />
							</div>
							<h2 className="text-xl font-semibold text-[#141414]">
								Visit History
							</h2>
						</div>
						<p className="text-gray-600">
							Track your medical visits
						</p>
					</div>

					{/* Vaccine History */}
					<div
						onClick={() => handleNavigation("/vaccine-history")}
						className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:bg-sky-50 active:bg-sky-100 cursor-pointer"
						data-aos="fade-up"
						data-aos-delay="300"
					>
						<div className="flex items-center mb-4">
							<div className="bg-[#1D2F6F] p-3 rounded-full mr-4">
								<Syringe className="w-6 h-6 text-[#FAF8F5]" />
							</div>
							<h2 className="text-xl font-semibold text-[#141414]">
								Vaccine History
							</h2>
						</div>
						<p className="text-gray-600">
							View your vaccination records
						</p>
					</div>

					{/* Nearest Hospital */}
					<div
						onClick={() => handleNavigation("/nearest-hospital")}
						className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:bg-sky-50 active:bg-sky-100 cursor-pointer"
						data-aos="fade-up"
						data-aos-delay="400"
					>
						<div className="flex items-center mb-4">
							<div className="bg-[#1D2F6F] p-3 rounded-full mr-4">
								<Hospital className="w-6 h-6 text-[#FAF8F5]" />
							</div>
							<h2 className="text-xl font-semibold text-[#141414]">
								Nearest Hospital
							</h2>
						</div>
						<p className="text-gray-600">Find hospitals near you</p>
					</div>

					{/* Article */}
					<div
						onClick={() => handleNavigation("/article")}
						className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:bg-sky-50 active:bg-sky-100 cursor-pointer"
						data-aos="fade-up"
						data-aos-delay="500"
					>
						<div className="flex items-center mb-4">
							<div className="bg-[#1D2F6F] p-3 rounded-full mr-4">
								<Book className="w-6 h-6 text-[#FAF8F5]" />
							</div>
							<h2 className="text-xl font-semibold text-[#141414]">
								Article
							</h2>
						</div>
						<p className="text-gray-600">
							Read informative articles about health
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavigationPage;
