"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import FlowboxEmbed from "../FlowboxEmbed";

interface PhotowallWidgetProps {
  isTestMode?: boolean;
  isServerSide?: boolean;
}

export default function PhotowallWidget({ isTestMode, isServerSide }: PhotowallWidgetProps) {
  const prodflowKey = ""; // Replace with actual photowall flow key
  const testFlowKey = "qkhRWdwjSUqPOAkOfSTMRw"; // Replace with actual test flow key
  const flowKey = isTestMode ? testFlowKey : prodflowKey;
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
