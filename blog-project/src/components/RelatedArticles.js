'use client';

import Link from 'next/link';
import styles from '@/app/articles/article.module.css';

export default function RelatedArticles({ articles }) {
  return (
    <section className={styles.relatedArticlesWrapper}>
      <div className={styles.relatedArticles}>
        <h3>Related articles</h3>
        <div className={styles.relatedGrid}>
          {articles?.map((article) => (
            <div key={article._id} className={styles.relatedCard}>
              <img
                src={article.heroImage}
                alt={article.title}
                className={styles.relatedImage}
              />
              <h4>{article.title}</h4>
              <p className={styles.relatedExcerpt}>{article.excerpt}</p>
              <Link
                href={`/articles/${article.slug}`}
                className={styles.readMore}
              >
                Read more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
