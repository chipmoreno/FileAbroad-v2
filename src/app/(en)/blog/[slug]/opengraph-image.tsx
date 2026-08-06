import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const runtime = "nodejs";
export const alt = "FileAbroad Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "FileAbroad Blog";
  const category = post?.category ?? "Expat Taxes";
  const date = post?.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Georgia, serif",
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: 6,
            background:
              "linear-gradient(90deg, #A8520A 0%, #d97706 50%, #A8520A 100%)",
          }}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 60px 40px",
          }}
        >
          {/* Top row: category badge + brand */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "rgba(217, 119, 6, 0.15)",
                border: "1px solid rgba(217, 119, 6, 0.3)",
                color: "#d97706",
                padding: "6px 16px",
                borderRadius: 6,
                fontSize: 16,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {category}
            </div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#FAF9F6" }}>
                File
              </span>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#d97706" }}>
                Abroad
              </span>
            </div>
          </div>

          {/* Article title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              maxWidth: 900,
            }}
          >
            <div
              style={{
                fontSize: title.length > 60 ? 36 : 44,
                fontWeight: 700,
                color: "#FAF9F6",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </div>
          </div>

          {/* Bottom row: date + URL */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {date && (
              <div style={{ fontSize: 16, color: "#94a3b8" }}>{date}</div>
            )}
            <div
              style={{
                fontSize: 16,
                color: "#64748b",
                letterSpacing: "0.05em",
              }}
            >
              fileabroad.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
