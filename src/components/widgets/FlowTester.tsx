"use client";

import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Refresh from "@mui/icons-material/Refresh";

declare global {
  interface Window {
    flowbox?: (action: string, options: { container: string; key: string; locale: string }) => void;
  }
}

// const LOCALE_OPTIONS = [
//   { value: "en-US", label: "English (US)" },
//   { value: "en-GB", label: "English (UK)" },
//   { value: "es-ES", label: "Spanish (Spain)" },
//   { value: "es-MX", label: "Spanish (Mexico)" },
//   { value: "fr-FR", label: "French (France)" },
//   { value: "de-DE", label: "German (Germany)" },
//   { value: "it-IT", label: "Italian (Italy)" },
//   { value: "pt-BR", label: "Portuguese (Brazil)" },
//   { value: "sv-SE", label: "Swedish (Sweden)" },
//   { value: "da-DK", label: "Danish (Denmark)" },
//   { value: "no-NO", label: "Norwegian (Norway)" },
//   { value: "fi-FI", label: "Finnish (Finland)" },
//   { value: "nl-NL", label: "Dutch (Netherlands)" },
// ];

export default function FlowTester() {
  const [flowKey, setFlowKey] = useState("");
  const [locale, setLocale] = useState("en-US");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRendered, setIsRendered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderIdRef = useRef(0);

  useEffect(() => {
    // Load Flowbox script on component mount
    const scriptId = "flowbox-js-embed";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = "https://connect.getflowbox.com/flowbox.js";
      document.body.appendChild(script);
    }
  }, []);

  const clearFlow = () => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      setIsRendered(false);
      setError("");
    }
  };

  const handleRenderFlow = () => {
    if (!flowKey.trim()) {
      setError("Please enter a Flow Key");
      return;
    }

    setIsLoading(true);
    setError("");
    clearFlow();

    // Increment render ID to create unique container
    renderIdRef.current += 1;
    const containerId = `js-flowbox-flow-tester-${renderIdRef.current}`;

    // Create new container div
    if (containerRef.current) {
      const newContainer = document.createElement("div");
      newContainer.id = containerId;
      containerRef.current.appendChild(newContainer);
    }

    // Wait a bit for the container to be ready
    setTimeout(() => {
      try {
        if (window.flowbox) {
          window.flowbox("init", {
            container: `#${containerId}`,
            key: flowKey.trim(),
            locale: locale,
          });
          setIsRendered(true);
          setIsLoading(false);
        } else {
          setError("Flowbox script not loaded yet. Please try again.");
          setIsLoading(false);
        }
      } catch (err) {
        setError(`Failed to render flow: ${err instanceof Error ? err.message : "Unknown error"}`);
        setIsLoading(false);
      }
    }, 300);
  };

  const handleReset = () => {
    clearFlow();
    setFlowKey("");
    setLocale("en-US");
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
          disabled={isLoading}
        />

        {/* <FormControl fullWidth>
          <InputLabel id="locale-select-label">Locale</InputLabel>
          <Select
            labelId="locale-select-label"
            value={locale}
            label="Locale"
            onChange={(e) => setLocale(e.target.value)}
            disabled={isLoading}
          >
            {LOCALE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={isLoading ? <CircularProgress size={20} /> : <PlayArrow />}
            onClick={handleRenderFlow}
            disabled={isLoading || !flowKey.trim()}
            sx={{ flex: 1 }}
          >
            {isLoading ? "Loading..." : "Render Flow"}
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Refresh />}
            onClick={handleReset}
            disabled={isLoading}
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
        ref={containerRef}
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
        {!isRendered && !isLoading && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", p: 4 }}>
            Your flow will appear here once you enter a Flow Key and click &quot;Render Flow&quot;
          </Typography>
        )}
        {isLoading && (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Loading your flow...
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 3, p: 2, backgroundColor: "grey.50", borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
          <strong>💡 Tips:</strong>
        </Typography>
        <Typography variant="caption" color="text.secondary" component="ul" sx={{ m: 0, pl: 2 }}>
          <li>Flow Keys are found in your Flowbox dashboard under Flows</li>
          <li>Different locales may show different product catalogs</li>
          <li>Use the Reset button to clear and try a different flow</li>
          <li>The locale format must be language-COUNTRY (e.g., en-US, not en_US)</li>
        </Typography>
      </Box>
    </Paper>
  );
}
