import React from "react";
import { Phone, MapPin, Mail } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-[#FAF8F5] text-[#1D2F6F] py-4 border-t-2">
			<div className="mx-auto px-4 max-w-[93%]">
				<div className="flex flex-col sm:flex-row justify-between items-center">
					<div className="text-2xl font-bold mb-4 sm:mb-0">
						MediFriends
					</div>

					<div className="flex flex-col sm:flex-row items-center sm:items-end">
						<div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
							<Phone size={18} className="mr-2 text-[#1D2F6F]" />
							<p>(196) 135-182-0000</p>
						</div>
						<div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
							<MapPin size={18} className="mr-2 text-[#1D2F6F]" />
							<p>ATM Center, ITB Ganesha</p>
						</div>
						<div className="flex items-center">
							<Mail size={18} className="mr-2 text-[#1D2F6F]" />
							<p>medifriends@gmail.com</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
