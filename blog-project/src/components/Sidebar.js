"use client";

import Link from "next/link";
import styles from "@/app/articles/article.module.css";

export default function Sidebar({ exploreMoreArticles, tourGuides }) {
  return (
    <aside className={styles.sidebar}>
      {/* Explore More Section */}
      <div className={styles.exploreSection}>
        <h3>Explore more</h3>
        {exploreMoreArticles?.map((article) => (
          <div key={article.id} className={styles.exploreItem}>
            <img
              src={article.image}
              alt={article.title}
              className={styles.exploreImage}
            />
            <div className={styles.exploreInfo}>
             <p className={styles.exploreMeta}>
  <span className={styles.title}>{article.title}</span>
  <span className={styles.separator}> | </span>
  <span className={styles.date}>{article.date}</span>
</p>
              <p className={styles.exploreText}>{article.excerpt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tour Guides Section */}
      <div className={styles.tourGuidesSection} style={{ marginTop: "30px" }}>
        <h3 style={{ marginBottom: "20px", fontSize: "18px", color: "#333" }}>
          Tour Guides
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {tourGuides?.map((guide) => (
            <div
              className={styles.guideCard}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "15px",
                padding: "0 0 20px 0",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <div
                key={guide.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: "15px",
                }}
              >
                {/* Circular Profile Image */}
                <img
                  src={guide.image}
                  alt={guide.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    backgroundColor: "#f0f0f0",
                    flexShrink: 0,
                  }}
                />

                {/* Guide Info */}
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      margin: "0 0 6px 0",
                      fontSize: "16px",
                      color: "#333",
                      fontWeight: "600",
                    }}
                  >
                    {guide.name}
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "8px",
                      color: "#666",
                      fontSize: "13px",
                    }}
                  >
                    📍 {guide.location}
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span style={{ color: "#ffc107", fontSize: "14px" }}>
                  {"⭐".repeat(Math.floor(guide.rating))}
                  {guide.rating % 1 !== 0 && "☆"}
                </span>
                <span
                  style={{ color: "#999", fontSize: "13px", marginLeft: "2px" }}
                >
                  ({guide.rating})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
