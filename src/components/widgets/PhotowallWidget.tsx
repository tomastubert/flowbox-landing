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

const FlowboxPhotowallEmbedFlow = () => {
  const flowboxKey = "DEMO_PHOTOWALL_FLOW_KEY"; // Replace with actual photowall flow key

  useEffect(() => {
    const initializeFlowbox = () => {
      if (window.flowbox) {
        window.flowbox("init", {
          container: "#js-flowbox-flow-photowall",
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
    <div id="js-flowbox-flow-photowall"></div>
  );
};

export default function PhotowallWidget() {
  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        minHeight: 600,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent: "space-between" }}>
        <Chip label="V2 - Photowall" color="secondary" />
        <Typography variant="caption" color="text.secondary">
          Masonry grid with varied layouts
        </Typography>
      </Box>

      {/* Flowbox Photowall Embed */}
      <FlowboxPhotowallEmbedFlow />

      {/* Fallback content when no flow key is configured */}
      <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
        <Typography variant="h6" gutterBottom>
          Flowbox V2 Photowall Widget
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          This widget displays content in a dynamic masonry-style grid layout
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Features: Varied image sizes, Hover interactions, Product counts, Engagement stats
        </Typography>
        <Typography variant="caption" sx={{ display: "block", mt: 2 }}>
          Flow Key: {"DEMO_PHOTOWALL_FLOW_KEY"}
        </Typography>
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 3, textAlign: "center" }}>
        Configure your photowall flow key to display UGC in a beautiful masonry grid
      </Typography>
    </Box>
  );
}
