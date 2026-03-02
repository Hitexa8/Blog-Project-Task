
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styles from '@/app/articles/article.module.css';
import CommentsSection from '@/components/CommentsSection';
import Sidebar from '@/components/Sidebar';
import RelatedArticles from '@/components/RelatedArticles';
import { tourGuides, exploreMoreArticles } from '@/data/sidebarData';
import Image from 'next/image';
import { API_ENDPOINTS } from '@/config/api';

// Dynamically import EditArticleWrapper only when needed
const EditArticleWrapper = dynamic(() => import('@/components/EditArticleWrapper'), {
  loading: () => (
    <button
      disabled
      style={{
        marginTop: '15px',
        padding: '8px 16px',
        backgroundColor: '#ccc',
        color: '#666',
        border: 'none',
        borderRadius: '4px',
        cursor: 'not-allowed',
        fontSize: '14px',
        fontWeight: '600',
      }}
    >
     Loading...
    </button>
  ),
});

// Generate static paths for all articles
export async function generateStaticParams() {
  try {
    const res = await fetch(API_ENDPOINTS.POSTS, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    const { data } = await res.json();
    return data.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Fetch article data
async function getArticle(slug) {
  try {
    const res = await fetch(API_ENDPOINTS.POST_DETAIL(slug), {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!res.ok) throw new Error('Failed to fetch article');
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Fetch all posts for related articles
async function getAllArticles() {
  try {
    const res = await fetch(API_ENDPOINTS.POSTS, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    const { data } = await res.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  const allArticles = await getAllArticles();

  if (!article) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Article not found</h1>
        <p>The article you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/articles">Back to all articles</Link>
      </div>
    );
  }

  // Get related articles (other articles, excluding current one)
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 4) || [];

  return (
    <div>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.breadcrumb}>
            <Link href="/">HOME</Link> / <Link href="/articles">ARTICLES</Link> /
          </div>
          <h1 className={styles.pageTitle}>{article.title}</h1>
          <EditArticleWrapper article={article} />
        </div>
        {/* Hero Image */}
        <div className={styles.heroImage}>
          <img
            src={article.heroImage}
            alt={article.title}
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          />
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.mainContent}>
          {/* Article Meta */}
          <div className={styles.articleMeta}>
            <div className={styles.authorInfo}>
              <img
                src={article.author.image}
                alt={article.author.name}
                className={styles.authorImage}
              />
              <div>
                <p className={styles.authorName}>{article.author.name}</p>
              </div>
            </div>
            <p className={styles.date}>{article.date}</p>
          </div>

          {/* Article Content */}
          <article className={styles.article}>
            <p className={styles.excerpt}>{article.excerpt}</p>

            {article.content?.map((section, idx) => (
              <div key={idx}>
                {section.type === 'paragraph' && (
                  <p className={styles.paragraph}>{section.text}</p>
                )}
                {section.type === 'section' && (
                  <>
                    <h2 className={styles.sectionTitle}>{section.title}</h2>
                    <p className={styles.paragraph}>{section.content}</p>
                  </>
                )}
              </div>
            ))}
          
          </article>

          {/* About Author - Combined with Navigation */}
          <section className={styles.aboutAuthor}>
            <h3>About {article.author.name}</h3>
            <div className={styles.authorSection}>
              <img
                src={article.author.image}
                alt={article.author.name}
                className={styles.authorBioImage}
              />
              <p>{article.author.bio}</p>
            </div>

            {/* Navigation Buttons */}
            <div className={styles.prevNext}>
              <div>
                
                <button className={styles.prevBtn}> <Image width={16} height={16} src="/icon/prevIcon.svg"></Image> Previous </button>
                <p className={styles.navText}>
                  {relatedArticles.length > 0
                    ? relatedArticles[0].title
                    : 'Previous Article'}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <button className={styles.nextBtn}>Next <Image width={16} height={16} src="/icon/nextIcon.svg"></Image></button>
                <p className={styles.navText}>
                  {relatedArticles.length > 1
                    ? relatedArticles[1].title
                    : 'Next Article'}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <Sidebar
          exploreMoreArticles={exploreMoreArticles}
          tourGuides={tourGuides}
        />

        <CommentsSection postId={article._id} />
      </div>

      <RelatedArticles articles={relatedArticles} />
    </div>
  );
}
