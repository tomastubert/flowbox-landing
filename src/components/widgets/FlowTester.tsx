"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { PlayArrow, Refresh } from "@mui/icons-material";
import FlowboxEmbed from "@/components/FlowboxEmbed";


export default function FlowTester() {
  const [flowKey, setFlowKey] = useState("");
  const [locale, setLocale] = useState();
  const [isTest, setIsTest] = useState(false);
  const [allowCookies, setAllowCookies] = useState(false);
  const [error, setError] = useState("");
  const [isRendered, setIsRendered] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  const handleRenderFlow = () => {
    if (!flowKey.trim()) {
      setError("Please enter a Flow Key");
      return;
    }

    setError("");
    setIsRendered(true);
    setRenderKey((prev) => prev + 1);
  };

  const handleReset = () => {
    setIsRendered(false);
    setFlowKey("");
    setLocale(undefined);
    setIsTest(false);
    setError("");
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleRenderFlow();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        backgroundColor: "background.paper",
        borderRadius: 2,
        border: "2px solid",
        borderColor: "primary.main",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Typography variant="h5" component="h3" sx={{ fontWeight: "bold" }}>
            🧪 Flow Tester
          </Typography>
          <Chip label="Interactive" color="primary" size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Enter your Flowbox Flow Key to preview it instantly. Get your Flow Key from the Flowbox
          dashboard (three-dot menu → Copy Flow Key).
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}>
        <TextField
          fullWidth
          label="Flow Key"
          placeholder="e.g., abc123xyz456"
          value={flowKey}
          onChange={(e) => setFlowKey(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
          helperText="Paste your Flow Key from the Flowbox dashboard"
          disabled={isRendered}
        />

        {/* <FormControlLabel
          control={
            <Checkbox
              checked={isTest}
              onChange={(e) => setIsTest(e.target.checked)}
              disabled={isRendered}
            />
          }
          label={
            <Box>
              <Typography variant="body2">
                Use Test Environment
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {isTest ? "https://connect.flowbox.me" : "https://connect.getflowbox.com"}
              </Typography>
            </Box>
          }
        /> */}

        <FormControlLabel
          control={
            <Checkbox
              checked={allowCookies}
              onChange={(e) => setAllowCookies(e.target.checked)}
              disabled={isRendered}
            />
          }
          label={
            <Box>
              <Typography variant="body2">
                Set Allow Cookies
              </Typography>
            </Box>
          }
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrow />}
            onClick={handleRenderFlow}
            disabled={isRendered || !flowKey.trim()}
            sx={{ flex: 1 }}
          >
            Render Flow
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Refresh />}
            onClick={handleReset}
            disabled={!isRendered}
          >
            Reset
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {isRendered && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Flow rendered successfully! Scroll down to see your content.
        </Alert>
      )}

      {/* Flow Container */}
      <Box
        sx={{
          minHeight: isRendered ? 400 : 200,
          backgroundColor: isRendered ? "transparent" : "#f5f5f5",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed",
          borderColor: isRendered ? "transparent" : "divider",
          transition: "all 0.3s ease",
        }}
      >
        {isRendered && flowKey ? (
          <FlowboxEmbed
            key={renderKey}
            flowKey={flowKey}
            // locale={locale}
            containerId={`flowbox-tester-${renderKey}`}
            isTest={isTest}
            isServerSide={true}
            allowCookies={allowCookies}
          />
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", p: 4 }}>
            Your flow will appear here once you enter a Flow Key and click &quot;Render Flow&quot;
          </Typography>
        )}
      </Box>

      <Box sx={{ mt: 3, p: 2, backgroundColor: "grey.50", borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
          <strong>💡 Tips:</strong>
        </Typography>
        <Typography variant="caption" color="text.secondary" component="ul" sx={{ m: 0, pl: 2 }}>
          <li>Flow Keys are found in your Flowbox dashboard under Flows</li>
          <li>Use Test Environment for flows in your test/staging environment</li>
          <li>Use the Reset button to clear and try a different flow</li>
        </Typography>
      </Box>
    </Paper>
  );
}
