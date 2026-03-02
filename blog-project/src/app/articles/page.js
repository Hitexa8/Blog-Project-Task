import Link from 'next/link';
import styles from '@/app/articles/article.module.css';
import { API_ENDPOINTS } from '@/config/api';

async function getArticles() {
  try {
    const res = await fetch(API_ENDPOINTS.POSTS, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    const { data } = await res.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();
  console.log('Fetched articles:', articles);
  const mainArticle = articles[0] || { heroImage: '/rope.jpg' };

  return (
    <div>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.breadcrumb}>
            <Link href="/">HOME</Link> / <span>ARTICLES</span> /
          </div>
          <h1 className={styles.pageTitle}>All Articles</h1>
        </div>
      </header>

      {/* Main Content */}
      <div  style={{ padding: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', marginTop: '30px' }}>
          {articles.map((article) => (
            <div key={article._id} className={styles.articleCard} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
              <img
                src={article.heroImage || '/rope.jpg'}
                alt={article.title}
                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <h3 style={{ marginTop: '15px' }}>{article.title}</h3>
              <p className={styles.excerpt}>{article.excerpt}</p>
              <div style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                <span>{article.date}</span> | <span>{article.category}</span>
              </div>
              <Link
                href={`/articles/${article.slug}`}
                className={styles.readMore}
                style={{ display: 'inline-block', marginTop: '15px', color: '#007bff', textDecoration: 'none' }}
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
