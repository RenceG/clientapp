import React, { useEffect, useMemo, useState } from "react";

type KnowledgeArticle = {
  id: string;
  title: string;
  summary: string;
  body: string;
  tags: string[];
};

const ARTICLES: KnowledgeArticle[] = [
  {
    id: "KB-1001",
    title: "Password Reset (Agents)",
    summary: "How agents can reset their password in under 2 minutes.",
    body: `1) Go to the login page
2) Click "Forgot Password"
3) Follow the email link
4) Set a new password`,
    tags: ["login", "password", "agents"],
  },
  {
    id: "KB-1002",
    title: "Refund Policy Overview",
    summary: "Quick overview of refund eligibility and timelines.",
    body: `Refunds are allowed within 30 days of purchase.
Digital goods are non-refundable unless defective.
Refund processing takes 5–7 business days.`,
    tags: ["refund", "billing", "policy"],
  },
  {
    id: "KB-1003",
    title: "Shipping Delay Escalation",
    summary: "What to do when an order is delayed more than 7 days.",
    body: `1) Confirm the tracking number
2) Check carrier status
3) If delay > 7 days, escalate to Tier 2
4) Offer apology + coupon if applicable`,
    tags: ["shipping", "delay", "escalation"],
  },
  {
    id: "KB-1004",
    title: "How to Update Customer Email",
    summary: "Steps to update the email address in CRM.",
    body: `1) Open the customer profile
2) Click Edit
3) Replace email
4) Save and confirm via verification email`,
    tags: ["crm", "email", "customer"],
  },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function App() {
  const [query, setQuery] = useState("");
  const [article, setArticle] = useState<KnowledgeArticle | null>(null);

  // Filter articles that somewhat match the query
  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ARTICLES;

    return ARTICLES.filter((a) => {
      return (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.body.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query]);

  // Only show an article after the user types something
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setArticle(null);
      return;
    }

    if (filteredArticles.length === 0) {
      setArticle(null);
      return;
    }

    setArticle(pickRandom(filteredArticles));
  }, [query, filteredArticles]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.header}>Knowledge Search</h1>

        <input
          style={styles.search}
          placeholder="Type to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query.trim().length === 0 ? (
          <div style={styles.noResults}>
            Start typing to search knowledge...
          </div>
        ) : filteredArticles.length === 0 ? (
          <div style={styles.noResults}>
            No matching articles found for: <b>{query}</b>
          </div>
        ) : article ? (
          <div style={styles.card}>
            <div style={styles.metaRow}>
              <span style={styles.kbId}>{article.id}</span>
              <span style={styles.tags}>
                {article.tags.map((t) => (
                  <span key={t} style={styles.tag}>
                    {t}
                  </span>
                ))}
              </span>
            </div>

            <h2 style={styles.title}>{article.title}</h2>
            <p style={styles.summary}>{article.summary}</p>

            <pre style={styles.body}>{article.body}</pre>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: 24,
    background: "#0b1220",
    color: "#e8eefc",
    fontFamily: "Inter, system-ui, Arial, sans-serif",
  },
  container: {
    maxWidth: 720,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    fontSize: 28,
    marginBottom: 14,
  },
  search: {
    width: "100%",
    maxWidth: 720,
    padding: "14px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.06)",
    color: "#e8eefc",
    outline: "none",
    fontSize: 16,
    boxSizing: "border-box",
  },
  noResults: {
    marginTop: 18,
    padding: 16,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
  },
  card: {
    marginTop: 18,
    padding: 18,
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  kbId: {
    fontSize: 12,
    opacity: 0.8,
    border: "1px solid rgba(255,255,255,0.14)",
    padding: "6px 10px",
    borderRadius: 999,
  },
  tags: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  tag: {
    fontSize: 12,
    opacity: 0.85,
    padding: "5px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.03)",
  },
  title: {
    fontSize: 20,
    margin: "6px 0 6px 0",
  },
  summary: {
    opacity: 0.9,
    margin: "0 0 12px 0",
    lineHeight: 1.5,
  },
  body: {
    margin: 0,
    padding: 14,
    borderRadius: 14,
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.08)",
    whiteSpace: "pre-wrap",
    lineHeight: 1.5,
    fontSize: 14,
  },
};
