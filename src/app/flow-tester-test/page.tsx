"use client";

import { Container, Typography, Box } from "@mui/material";
import FlowTester from "@/components/widgets/FlowTester";

export default function FlowTesterPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Interactive Flow Tester
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Test your Flowbox flows with custom Flow Keys and locales
        </Typography>
      </Box>

      <FlowTester isTestMode/>
    </Container>
  );
}
