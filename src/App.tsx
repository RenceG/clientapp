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
  // Fill the iframe and let Genesys control the available width/height
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

  // IMPORTANT: no fixed maxWidth here — adapt to Small/Medium/Large/XL
  // Padding scales smoothly with panel width.
  container: {
    width: "100%",
    padding: "clamp(10px, 2.2vw, 20px)",
    boxSizing: "border-box",
  },

  header: {
    fontSize: "clamp(18px, 2.2vw, 26px)",
    margin: "0 0 12px 0",
    lineHeight: 1.2,
  },

  // Input matches the same width as the card (100% of container)
  search: {
    width: "100%",
    boxSizing: "border-box",
    padding: "clamp(10px, 1.4vw, 14px)",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.06)",
    color: "#e8eefc",
    outline: "none",
    fontSize: "clamp(14px, 1.6vw, 16px)",
  },

  hint: {
    marginTop: 12,
    padding: "clamp(10px, 1.8vw, 14px)",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    fontSize: "clamp(13px, 1.5vw, 14px)",
  },

  card: {
    marginTop: 12,
    width: "100%",
    boxSizing: "border-box",
    padding: "clamp(12px, 2vw, 18px)",
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },

  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
    flexWrap: "wrap", // helps small widths
  },

  kbId: {
    fontSize: "clamp(11px, 1.3vw, 12px)",
    opacity: 0.85,
    border: "1px solid rgba(255,255,255,0.14)",
    padding: "6px 10px",
    borderRadius: 999,
    whiteSpace: "nowrap",
  },

  tags: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    justifyContent: "flex-end",
    flex: 1,
  },

  tag: {
    fontSize: "clamp(11px, 1.2vw, 12px)",
    opacity: 0.85,
    padding: "5px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.03)",
    whiteSpace: "nowrap",
  },

  title: {
    fontSize: "clamp(16px, 2vw, 20px)",
    margin: "6px 0 6px 0",
    lineHeight: 1.25,
  },

  summary: {
    opacity: 0.92,
    margin: "0 0 12px 0",
    lineHeight: 1.5,
    fontSize: "clamp(13px, 1.6vw, 15px)",
  },

  // Pre will wrap and stay readable at small widths.
  // MaxHeight gives better behavior if the panel is short.
  body: {
    margin: 0,
    padding: "clamp(10px, 1.8vw, 14px)",
    borderRadius: 14,
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.08)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    lineHeight: 1.5,
    fontSize: "clamp(12px, 1.5vw, 14px)",
    maxHeight: "40vh",
    overflow: "auto",
    boxSizing: "border-box",
  },
};
