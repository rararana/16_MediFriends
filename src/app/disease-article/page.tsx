"use client"; // Ensure this file is treated as a Client Component

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Sample data
const articles = [
  {
    id: 1,
    title: 'Heart Disease',
    excerpt: 'Learn about diabetes, its symptoms, causes, and management tips.',
    image: '/images/1.jpg',
    link: "https://nutritionsource.hsph.harvard.edu/disease-prevention/cardiovascular-disease/",
  },
  {
    id: 2,
    title: 'About Mumps',
    excerpt: 'Important information about heart disease prevention and treatment.',
    image: '/images/2.jpg',
    link: "https://www.cdc.gov/mumps/about/index.html",
  },
  {
    id: 3,
    title: "Celiac Disease",
    excerpt: 'Effective strategies for managing high blood pressure.',
    image: '/images/3.jpg',
    link: "https://www.nejm.org/doi/full/10.1056/NEJMcp1113994",
  },
  {
    id: 4,
    title: "Sexually Transmitted Infections (STIs): Overview and More",
    excerpt: 'Effective strategies for managing high blood pressure.',
    image: '/images/4.jpg',
    link: "https://www.verywellhealth.com/std-overview-4581893",
  },
  {
    id: 5,
    title: "Cardiovascular diseases (CVDs)",
    excerpt: 'Effective strategies for managing high blood pressure.',
    image: '/images/5.jpg',
    link: "https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)",
  },
  {
    id: 6,
    title: "Diabetes",
    excerpt: 'Effective strategies for managing high blood pressure.',
    image: '/images/6.jpg',
    link: "https://www.who.int/health-topics/diabetes",
  },
  {
    id: 7,
    title: "COVID-19 Mythbusters",
    excerpt: 'Effective strategies for managing high blood pressure.',
    image: '/images/7.jpg',
    link: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters",
  },
  {
    id: 8,
    title: "Stunted growth ‘and’ obesity: the double burden of poor nutrition on our doorstep",
    excerpt: 'Effective strategies for managing high blood pressure.',
    image: '/images/8.jpg',
    link: "https://theconversation.com/stunted-growth-and-obesity-the-double-burden-of-poor-nutrition-on-our-doorstep-50385",
  },
  {
    id: 9,
    title: "Chronic Obstructive Pulmonary Disease (COPD): Overview and More",
    excerpt: 'Effective strategies for managing high blood pressure.',
    image: '/images/9.jpg',
    link: "https://www.verywellhealth.com/copd-4014741",
  },
];

const ArticlesPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Disease Articles | HealthSite</title>
        <meta name="description" content="Read articles about various diseases and health conditions." />
      </Head>
      <header className="header">
        <h1>Disease Articles</h1>
      </header>
      <main className="main">
        <section className="articles-grid">
          {articles.map(article => (
            <div key={article.id} className="article-card">
              <img src={article.image} alt={article.title} className="article-image" />
              <div className="article-content">
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
                <a href={article.link} className="read-more" target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            </div>
          ))}
        </section>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} MEDIFRIENDS. All rights reserved.</p>
      </footer>
      <style jsx>{`
        .header {
          background-color: #4CAF50; /* Fresh green */
          color: white;
          padding: 20px;
          text-align: center;
          border-bottom: 4px solid #388E3C; /* Darker green for emphasis */
        }
        .main {
          padding: 20px;
        }
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .article-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background-color: #fff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }
        .article-card:hover {
          transform: scale(1.02);
        }
        .article-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .article-content {
          padding: 15px;
        }
        .article-content h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }
        .article-content p {
          color: #666;
        }
        .read-more {
          color: #4CAF50; /* Fresh green */
          text-decoration: none;
          font-weight: bold;
        }
        .read-more:hover {
          text-decoration: underline;
        }
        .footer {
          background-color: #f1f1f1;
          padding: 10px;
          text-align: center;
          border-top: 1px solid #ddd;
        }
      `}</style>
    </div>
  );
};

export default ArticlesPage;
