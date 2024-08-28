import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white py-8">
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap justify-between">
					{/* Logo and Description */}
					<div className="w-full sm:w-1/3 mb-6 sm:mb-0">
						<h1 className="text-2xl font-bold mb-2">MediFriends</h1>
						<p className="text-gray-400">
							Connecting you with health and wellness resources.
							Stay informed and stay healthy!
						</p>
					</div>

					{/* Navigation Links */}
					<div className="w-full sm:w-1/3 mb-6 sm:mb-0">
						<h2 className="text-lg font-semibold mb-4">
							Quick Links
						</h2>
						<ul className="space-y-2">
							<li>
								<a href="/" className="hover:text-gray-400">
									Home
								</a>
							</li>
							<li>
								<a
									href="/about"
									className="hover:text-gray-400"
								>
									About Us
								</a>
							</li>
							<li>
								<a
									href="/services"
									className="hover:text-gray-400"
								>
									Services
								</a>
							</li>
							<li>
								<a
									href="/contact"
									className="hover:text-gray-400"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>

					{/* Contact Information */}
					<div className="w-full sm:w-1/3 mb-6 sm:mb-0">
						<h2 className="text-lg font-semibold mb-4">
							Contact Us
						</h2>
						<p className="mb-2">
							123 Health Street, Wellness City, HC 12345
						</p>
						<p className="mb-2">
							Email:{" "}
							<a
								href="mailto:info@medifriends.com"
								className="hover:text-gray-400"
							>
								info@medifriends.com
							</a>
						</p>
						<p>
							Phone:{" "}
							<a
								href="tel:+1234567890"
								className="hover:text-gray-400"
							>
								+1 (234) 567-890
							</a>
						</p>
					</div>
				</div>

				{/* Social Media Icons */}
				<div className="mt-8 text-center">
					<a
						href="https://facebook.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 hover:text-white mx-2"
					>
						<FaFacebook size={24} />
					</a>
					<a
						href="https://twitter.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 hover:text-white mx-2"
					>
						<FaTwitter size={24} />
					</a>
					<a
						href="https://instagram.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 hover:text-white mx-2"
					>
						<FaInstagram size={24} />
					</a>
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 hover:text-white mx-2"
					>
						<FaLinkedin size={24} />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
