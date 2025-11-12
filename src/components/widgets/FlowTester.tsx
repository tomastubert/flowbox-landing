"use client";

import React, { useEffect, useRef, useState } from "react";
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


import CircularProgress from "@mui/material/CircularProgress";
import { createRoot } from "react-dom/client";

interface FlowTesterProps {
  isTestMode?: boolean;
}

export default function FlowTester({ isTestMode }: FlowTesterProps) {
  const [flowKey, setFlowKey] = useState("");
  const [locale, setLocale] = useState();
  const [isTest, setIsTest] = useState(false);
  const [allowCookies, setAllowCookies] = useState(false);
  const [error, setError] = useState("");
  const [isRendered, setIsRendered] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const iframeRef = useRef<HTMLIFrameElement>(null)



  const handleRenderFlow = () => {
    if (!flowKey.trim()) {
      setError("Please enter a Flow Key");
      return;
    }
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsRendered(true);
      setRenderKey((prev) => prev + 1);
      setIsLoading(false);
    }, 400); // simulate loading for UX
  };

  // Update flow: destroy and re-initialize
  const handleUpdateFlow = () => {
    setIsLoading(true);
    setIsRendered(false);
    setTimeout(() => {
      setIsRendered(true);
      setRenderKey((prev) => prev + 1);
      setIsLoading(false);
    }, 400); // simulate loading for UX
  };

  const handleReset = () => {
    setIsRendered(false);
    setFlowKey("");
    setLocale(undefined);
    setIsTest(false);
    setError("");
    setIsLoading(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleRenderFlow();
    }
  }

  useEffect(() => {
    console.log('viewMode changed to', viewMode)
    console.log('iframeRef.current', iframeRef.current)
    if (viewMode === 'desktop') return
    const iframe = iframeRef.current
    if (!iframe) return undefined

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    if (!iframeDoc) return undefined

    // Clear iframe content and set up basic HTML structure
    iframeDoc.open()
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `)
    iframeDoc.close()

    // Wait for iframe to be ready, then render React component
    const rootElement = iframeDoc.getElementById('root')
    if (rootElement) {
      console.log('Rendering FlowboxEmbed in iframe')
      const root = createRoot(rootElement)
      root.render(<FlowboxEmbed
        key={renderKey}
        flowKey={flowKey}
        // locale={locale}
        containerId={`flowbox-tester-${renderKey}`}
        isTest={isTestMode}
        isServerSide={true}
        allowCookies={allowCookies}
        iframe={iframeRef.current}
      />)

      // Cleanup function - defer unmount to avoid race condition with React rendering
      return () => {
        setTimeout(() => {
          root.unmount()
        }, 0)
      }
    }
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowKey, iframeRef.current, viewMode, isRendered])

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
        {/* Desktop/Mobile Toggle */}
        <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
          <Button
            variant={viewMode === 'desktop' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setViewMode('desktop')}
            sx={{ flex: 1 }}
          >
            Desktop
          </Button>
          <Button
            variant={viewMode === 'mobile' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setViewMode('mobile')}
            sx={{ flex: 1 }}
          >
            Mobile
          </Button>
        </Box>
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
          {!isRendered ? (
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={handleRenderFlow}
              disabled={!flowKey.trim()}
              sx={{ flex: 1 }}
            >
              Render Flow
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              startIcon={<Refresh />}
              onClick={handleUpdateFlow}
              sx={{ flex: 1 }}
            >
              Update Flow
            </Button>
          )}
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
          minHeight: 400,
          backgroundColor: isRendered ? "transparent" : "#f5f5f5",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed",
          borderColor: isRendered ? "transparent" : "divider",
          transition: "all 0.3s ease",
          position: "relative",
        }}
      >
        {isLoading ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <CircularProgress color="primary" />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Loading Flow...
            </Typography>
          </Box>
        ) : isRendered && flowKey ? (
          viewMode === 'mobile' ? (
            <Box
              component="iframe"
              ref={iframeRef}
              sx={{
                width: 390,
                height: 844,
                aspectRatio: '390 / 844',
                maxWidth: '100%',
                margin: '0 auto',
                boxShadow: 3,
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'width 0.3s',
                border: '1px solid #ccc',
                background: '#fff',
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                maxWidth: '100%',
                margin: '0 auto',
                boxShadow: 'none',
                borderRadius: 0,
                overflow: 'hidden',
                transition: 'width 0.3s',
              }}
            >
              <FlowboxEmbed
                key={renderKey}
                flowKey={flowKey}
                // locale={locale}
                containerId={`flowbox-tester-${renderKey}`}
                isTest={isTestMode}
                isServerSide={true}
                allowCookies={allowCookies}
                iframe={null}
              />
            </Box>
          )
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
          <li>Use the Reset button to clear and try a different flow or refresh the view</li>
        </Typography>
      </Box>
    </Paper>
  );
}
