"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import FlowboxEmbed from "../FlowboxEmbed";

interface WidgetV1Props {
  isTestMode?: boolean;
  isServerSide?: boolean;
}

export default function WidgetV1({ isTestMode, isServerSide }: WidgetV1Props) {
  const prodflowKey = ""; // Replace with actual V1 flow key
  const testFlowKey = "0RFLoizNS96DE7sZvTrtgQ"; // Replace with actual test flow key
  const flowKey = isTestMode ? testFlowKey : prodflowKey;

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
