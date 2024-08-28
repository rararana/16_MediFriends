import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const ArticleCard = ({ article }) => {
	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
			once: true,
		});
		AOS.refresh();
	}, []);

	return (
		<div
			className="hover:scale-110 transition duration-500"
			style={styles.card}
			data-aos="slide-up"
		>
			<Link href={article.link} passHref>
				<Image
					src={article.image}
					alt={article.title}
					width={300}
					height={200}
					style={styles.image}
				/>
				<h3 style={styles.title}>{article.title}</h3>
			</Link>
		</div>
	);
};

const styles = {
	card: {
		border: "1px solid #ccc",
		borderRadius: "8px",
		padding: "16px",
		textAlign: "center",
		margin: "16px",
		width: "300px",
	},
	link: {
		textDecoration: "none",
		color: "inherit",
	},
	image: {
		borderRadius: "8px",
	},
	title: {
		marginTop: "12px",
		fontSize: "18px",
		fontWeight: "bold",
	},
};

export default ArticleCard;
