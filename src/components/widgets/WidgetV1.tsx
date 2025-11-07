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

const FlowboxV1EmbedFlow = () => {
  const flowboxKey = "DEMO_V1_FLOW_KEY"; // Replace with actual V1 flow key

  useEffect(() => {
    const initializeFlowbox = () => {
      if (window.flowbox) {
        window.flowbox("init", {
          container: "#js-flowbox-flow-v1",
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
    <div id="js-flowbox-flow-v1"></div>
  );
};

export default function WidgetV1() {
  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 1,
        border: "2px solid #e0e0e0",
        minHeight: 400,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Chip label="V1 Legacy" size="small" color="default" />
        <Typography variant="caption" color="text.secondary">
          Basic grid implementation
        </Typography>
      </Box>
      
      {/* Flowbox V1 Embed */}
      <FlowboxV1EmbedFlow />
      
      {/* Fallback content when no flow key is configured */}
      <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
        <Typography variant="h6" gutterBottom>
          Flowbox V1 Widget Demo
        </Typography>
        <Typography variant="body2">
          Configure your V1 flow key to display actual content
        </Typography>
        <Typography variant="caption" sx={{ display: "block", mt: 2 }}>
          Flow Key: {"DEMO_V1_FLOW_KEY"}
        </Typography>
      </Box>
    </Box>
  );
}
