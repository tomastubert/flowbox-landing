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

const FlowboxCarouselEmbedFlow = () => {
  const flowboxKey = "DEMO_CAROUSEL_FLOW_KEY"; // Replace with actual carousel flow key

  useEffect(() => {
    const initializeFlowbox = () => {
      if (window.flowbox) {
        window.flowbox("init", {
          container: "#js-flowbox-flow-carousel",
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
    <div id="js-flowbox-flow-carousel"></div>
  );
};

export default function CarouselWidget() {

  return (
    <Box
      sx={{
        position: "relative",
        p: 4,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        minHeight: 500,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent: "space-between" }}>
        <Chip label="V2 - Carousel" color="primary" />
        <Typography variant="caption" color="text.secondary">
          Horizontal scrolling with product tags
        </Typography>
      </Box>

      {/* Flowbox Carousel Embed */}
      <FlowboxCarouselEmbedFlow />

      {/* Fallback content when no flow key is configured */}
      <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
        <Typography variant="h6" gutterBottom>
          Flowbox V2 Carousel Widget
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          This widget displays content in a horizontal carousel format with navigation arrows
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Features: Product tagging, User avatars, Engagement metrics, Smooth navigation
        </Typography>
        <Typography variant="caption" sx={{ display: "block", mt: 2 }}>
          Flow Key: {"DEMO_CAROUSEL_FLOW_KEY"}
        </Typography>
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 3, textAlign: "center" }}>
        Configure your carousel flow key to display actual UGC content with product links
      </Typography>
    </Box>
  );
}
