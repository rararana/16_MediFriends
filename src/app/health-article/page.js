import React from 'react';
import { articles } from './data/data-article';
import ArticleCard from './healtharticle/health-article';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Health Articles</h1>
      <div style={styles.grid}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};
