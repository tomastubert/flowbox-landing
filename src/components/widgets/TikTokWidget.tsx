"use client";

import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

declare global {
  interface Window {
    flowbox?: (action: string, options: { container: string; key: string; locale: string }) => void;
  }
}

const FlowboxTikTokEmbedFlow = () => {
  const flowboxKey = "DEMO_TIKTOK_FLOW_KEY"; // Replace with actual TikTok flow key

  useEffect(() => {
    const initializeFlowbox = () => {
      if (window.flowbox) {
        window.flowbox("init", {
          container: "#js-flowbox-flow-tiktok",
          key: flowboxKey,
          locale: "en-US"
        });
      }
    };

    const scriptId = "flowbox-js-embed";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = "https://connect.getflowbox.com/flowbox.js";
      script.onload = initializeFlowbox;
      document.body.appendChild(script);
    } else {
      initializeFlowbox();
    }
  }, []);

  return (
    <div id="js-flowbox-flow-tiktok"></div>
  );
};

export default function TikTokWidget() {
  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        minHeight: 700,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent: "space-between" }}>
        <Chip label="V2 - TikTok" sx={{ backgroundColor: "#000", color: "#fff" }} />
        <Typography variant="caption" color="text.secondary">
          Vertical video feed
        </Typography>
      </Box>

      {/* Flowbox TikTok Embed */}
      <FlowboxTikTokEmbedFlow />

      {/* Fallback content when no flow key is configured */}
      <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
        <Typography variant="h6" gutterBottom>
          Flowbox V2 TikTok Widget
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          This widget displays vertical video content in a TikTok-style feed
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Features: 9:16 aspect ratio, Video playback, Engagement buttons, Sound controls
        </Typography>
        <Typography variant="caption" sx={{ display: "block", mt: 2 }}>
          Flow Key: {"DEMO_TIKTOK_FLOW_KEY"}
        </Typography>
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 3, textAlign: "center" }}>
        Configure your TikTok flow key to display vertical video content
      </Typography>
    </Box>
  );
}
