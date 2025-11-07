"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import FlowboxEmbed from "../FlowboxEmbed";

interface CarouselWidgetProps {
  isTestMode?: boolean;
  isServerSide?: boolean;
}

export default function CarouselWidget({ isTestMode, isServerSide }: CarouselWidgetProps) {
  const prodflowKey = ""; // Replace with actual Carousel flow key
  const testFlowKey = "8-XCNg_UR0alSi3IABAM5w"; // Replace with actual test flow key
  const flowKey = isTestMode ? testFlowKey : prodflowKey;
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
