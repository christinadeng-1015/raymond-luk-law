import { useEffect, useRef } from "react";

export default function InstagramEmbed({ mediaUrl }) {
  const embedRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div
      className="flex justify-center items-center overflow-hidden rounded-lg relative"
      style={{
        height: "400px", // Adjust to the height of the visible content
        width: "100%",
        maxWidth: "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid #e0e0e0",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "12px",
        backgroundColor: "#fff",
      }}
    >
      <div
        ref={embedRef}
        style={{
          position: "relative",
          top: "-35px", // Move the embed upward to hide the header
          height: "450px",
          width: "100%",
        }}
        dangerouslySetInnerHTML={{
          __html: `<blockquote class="instagram-media" data-instgrm-permalink="${mediaUrl}" data-instgrm-version="14" style="border: none; width: 100%;"></blockquote>`,
        }}
      ></div>
    </div>
  );
}
