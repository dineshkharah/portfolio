import { ImageResponse } from "next/og";
import { profile, site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name}, ${profile.role}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0f1115",
          padding: "0 90px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#959ba6", letterSpacing: 2 }}>
          {profile.role.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            color: "#e8e8ea",
            marginTop: 18,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            width: 96,
            height: 6,
            backgroundColor: "#fbbf24",
            marginTop: 38,
            marginBottom: 38,
          }}
        />
        <div style={{ display: "flex", fontSize: 42, color: "#e8e8ea" }}>{profile.tagline}</div>
        <div style={{ display: "flex", fontSize: 26, color: "#959ba6", marginTop: 52 }}>
          {site.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
