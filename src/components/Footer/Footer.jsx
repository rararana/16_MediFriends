import React from "react";
import { ArrowUpCircle, Phone, MapPin } from "lucide-react";

const Footer = () => {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<footer className="bg-gray-800 text-white py-8">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="flex flex-col">
						<h3 className="text-xl font-bold mb-4">Company Name</h3>
						<div className="flex items-center mb-2">
							<MapPin size={18} className="mr-2" />
							<p>123 Main St, City, State 12345</p>
						</div>
						<div className="flex items-center">
							<Phone size={18} className="mr-2" />
							<p>(123) 456-7890</p>
						</div>
					</div>

					<div className="flex flex-col">
						<h3 className="text-xl font-bold mb-4">
							Latest Articles
						</h3>
						<ul>
							<li className="mb-2">
								<a href="#" className="hover:text-gray-300">
									Article 1
								</a>
							</li>
							<li className="mb-2">
								<a href="#" className="hover:text-gray-300">
									Article 2
								</a>
							</li>
							<li className="mb-2">
								<a href="#" className="hover:text-gray-300">
									Article 3
								</a>
							</li>
						</ul>
					</div>

					<div className="flex flex-col">
						<h3 className="text-xl font-bold mb-4">Quick Links</h3>
						<ul>
							<li className="mb-2">
								<a href="#" className="hover:text-gray-300">
									About Us
								</a>
							</li>
							<li className="mb-2">
								<a href="#" className="hover:text-gray-300">
									Services
								</a>
							</li>
							<li className="mb-2">
								<a href="#" className="hover:text-gray-300">
									Contact
								</a>
							</li>
						</ul>
					</div>

					<div className="flex flex-col items-center md:items-end">
						<div className="text-3xl font-bold mb-4">LOGO</div>
						<button
							onClick={scrollToTop}
							className="bg-white text-gray-800 px-4 py-2 rounded flex items-center hover:bg-gray-200 transition-colors"
						>
							<ArrowUpCircle size={18} className="mr-2" />
							Back to Top
						</button>
					</div>
				</div>

				<div className="mt-8 text-center">
					<p>&copy; 2024 Company Name. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
