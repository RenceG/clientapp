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
          <div style={styles.hint}>Start typing to search knowledge...</div>
        ) : filteredArticles.length === 0 ? (
          <div style={styles.hint}>
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
    height: "100vh",
    width: "100%",
    margin: 0,
    padding: 0,
    overflow: "auto",
    background: "#0b1220",
    color: "#e8eefc",
    fontFamily: "Inter, system-ui, Arial, sans-serif",
  },

  // More compact base padding (better for Genesys Small)
  container: {
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
  },

  header: {
    fontSize: "14px",
    margin: "0 0 10px 0",
    lineHeight: 1.2,
  },

  search: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.06)",
    color: "#e8eefc",
    outline: "none",
    fontSize: "12px",
  },

  hint: {
    marginTop: 10,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    fontSize: "12px",
    lineHeight: 1.4,
  },

  card: {
    marginTop: 10,
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },

  // For small width: stack meta info nicely
  metaRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 10,
  },

  kbId: {
    fontSize: "11px",
    opacity: 0.85,
    border: "1px solid rgba(255,255,255,0.14)",
    padding: "5px 9px",
    borderRadius: 999,
    whiteSpace: "nowrap",
  },

  tags: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },

  tag: {
    fontSize: "11px",
    opacity: 0.85,
    padding: "5px 9px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.03)",
    whiteSpace: "nowrap",
  },

  title: {
    fontSize: "15px",
    margin: "6px 0 6px 0",
    lineHeight: 1.25,
  },

  summary: {
    opacity: 0.92,
    margin: "0 0 10px 0",
    lineHeight: 1.45,
    fontSize: "13px",
  },

  body: {
    margin: 0,
    padding: "10px 12px",
    borderRadius: 14,
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.08)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    lineHeight: 1.45,
    fontSize: "12px",
    maxHeight: "38vh",
    overflow: "auto",
    boxSizing: "border-box",
  },
};
