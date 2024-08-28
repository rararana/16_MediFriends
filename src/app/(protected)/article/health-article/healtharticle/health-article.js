import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ArticleCard = ({ article }) => {
  return (
    <div style={styles.card}>
      <Link href={article.link} passHref>
          <Image src={article.image} alt={article.title} width={300} height={200} style={styles.image} />
          <h3 style={styles.title}>{article.title}</h3>
      </Link>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    margin: '16px',
    width: '300px',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  image: {
    borderRadius: '8px',
  },
  title: {
    marginTop: '12px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default ArticleCard;
