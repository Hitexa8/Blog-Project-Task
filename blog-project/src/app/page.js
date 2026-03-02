import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Blog Application</h1>
          <p>
            Welcome to the blog. Start exploring articles and content.
          </p>
        </div>
        <div className={styles.ctas}>
          <Link
            className={styles.primary}
            href="/articles"
          >
            View All Articles
          </Link>
        </div>
      </main>
    </div>
  );
}
