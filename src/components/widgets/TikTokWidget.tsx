"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import FlowboxEmbed from "../FlowboxEmbed";

interface TikTokWidgetProps {
  isTestMode?: boolean;
  isServerSide?: boolean;
}

export default function TikTokWidget({ isTestMode, isServerSide }: TikTokWidgetProps) {
  const prodflowKey = ""; // Replace with actual TikTok flow key
  const testFlowKey = "loo_zhuQRQK0IjATvAhd4w"; // Replace with actual test flow key
  const flowKey = isTestMode ? testFlowKey : prodflowKey;
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
      <FlowboxEmbed
        key={flowKey}
        flowKey={flowKey.trim()}
        containerId={`flowbox-tester-${flowKey}`}
        isTest={isTestMode}
        isServerSide={isServerSide}
      />
    </Box>
  );
}
