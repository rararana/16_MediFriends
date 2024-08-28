import React from "react";
import Image from "next/image";

const ArticlePage = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-4 text-center">Articles</h1>
			<h2 className="text-2xl text-gray-600 mb-8 text-center">
				Explore Health and Disease Information
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<ArticleBox
					title="Health Articles"
					imageSrc="/api/placeholder/400/250"
					altText="Health Articles"
					link="/health-articles"
				/>
				<ArticleBox
					title="Disease Articles"
					imageSrc="/api/placeholder/400/250"
					altText="Disease Articles"
					link="/disease-articles"
				/>
			</div>
		</div>
	);
};

const ArticleBox = ({ title, imageSrc, altText, link }) => {
	return (
		<a href={link} className="block group">
			<div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105">
				<Image
					src={imageSrc}
					alt={altText}
					width={400}
					height={250}
					className="w-full h-64 object-cover"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
				<div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
					<h3 className="text-xl font-semibold">{title}</h3>
				</div>
			</div>
		</a>
	);
};

export default ArticlePage;
