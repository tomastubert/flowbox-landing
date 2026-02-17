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
import MobileView from "@/components/widgets/MobileView";


import CircularProgress from "@mui/material/CircularProgress";
import { createRoot } from "react-dom/client";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";

interface FlowTesterProps {
  isTestMode?: boolean;
}

export default function FlowTester({ isTestMode }: FlowTesterProps) {
  const [flowKey, setFlowKey] = useState("");
  const [locale, setLocale] = useState<string>("");
  const [allowCookies, setAllowCookies] = useState(false);
  const [enforceV2, setEnforceV2] = useState(false);
  const [error, setError] = useState("");
  const [isRendered, setIsRendered] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [flowType, setFlowType] = useState<'static' | 'dynamicTag' | 'dynamicProduct' | 'dynamicTagLegacy' | 'dynamicProductLegacy'>('static');
  const [operator, setOperator] = useState<'OR' | 'AND'>('OR');
  const [tags, setTags] = useState<string[]>([]);
  const [productIds, setProductIds] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleOperator = (event: SelectChangeEvent<'OR' | 'AND'>) => {
    setOperator(event.target.value as 'OR' | 'AND')
  }

  // Handler for adding chips
  const handleAddChip = () => {
    const value = inputValue.trim();
    if (!value) return;
    if (flowType === 'dynamicTag' && !tags.includes(value)) {
      setTags([...tags, value]);
    } else if ((flowType === 'dynamicProduct' || flowType === 'dynamicProductLegacy') && !productIds.includes(value)) {
      setProductIds([...productIds, value]);
    }
    setInputValue('');
  };

  // Handler for deleting chips
  const handleDeleteChip = (chip: string) => {
    if (flowType === 'dynamicTag') {
      setTags(tags.filter(t => t !== chip));
    } else if (flowType === 'dynamicProduct' || flowType === 'dynamicProductLegacy') {
      setProductIds(productIds.filter(id => id !== chip));
    }
  };

  const onRemoveAll = () => {
    if (flowType === 'dynamicTag') {
      setTags([]);
    } else if (flowType === 'dynamicProduct') {
      setProductIds([]);
    }
  }


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
    setLocale("");
    setError("");
    setIsLoading(false);

  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleRenderFlow();
    }
  }

  useEffect(() => {
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
        <style>
         #flowbox-tester-${renderKey}{
         margin-top:100px;
         }
        </style>
          <div id="root"></div>
        </body>
      </html>
    `)
    iframeDoc.close()

    // Wait for iframe to be ready, then render React component
    const rootElement = iframeDoc.getElementById('root')
    if (rootElement) {
      const root = createRoot(rootElement)
      root.render(<FlowboxEmbed
        key={renderKey}
        flowKey={flowKey}
        locale={locale}
        containerId={`flowbox-tester-${renderKey}`}
        isTest={isTestMode}
        isServerSide={true}
        allowCookies={allowCookies}
        iframe={iframeRef.current}
        flowType={flowType}
        tags={tags}
        productIds={productIds}
        operator={operator}
        enforceV2={enforceV2}
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
  }, [flowKey, iframeRef.current, viewMode, isRendered, enforceV2])

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
        {/* Locale Input */}
        <TextField
          fullWidth
          label="Locale"
          placeholder="e.g., en-US, es-ES, etc."
          value={locale || ''}
          onChange={e => setLocale(e.target.value)}
          variant="outlined"
          helperText="Set a custom locale (optional)"
          disabled={isRendered}
          sx={{ mb: 2 }}
        />
        {/* Flow Type Selection */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button
            variant={flowType === 'static' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setFlowType('static')}
            disabled={isRendered}
          >
            Static
          </Button>
          <Button
            variant={flowType === 'dynamicTag' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setFlowType('dynamicTag')}
            disabled={isRendered}
          >
            Dynamic Tag
          </Button>
          <Button
            variant={flowType === 'dynamicProduct' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setFlowType('dynamicProduct')}
            disabled={isRendered}
          >
            Dynamic Product
          </Button>
          <Button
            variant={flowType === 'dynamicTagLegacy' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setFlowType('dynamicTagLegacy')}
            disabled={isRendered}
          >
            Dynamic Tag Legacy
          </Button>
          <Button
            variant={flowType === 'dynamicProductLegacy' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setFlowType('dynamicProductLegacy')}
            disabled={isRendered}
          >
            Dynamic Product Legacy
          </Button>
        </Box>

        {/* Operator Selection */}
        {(flowType === 'dynamicTag' || (flowType === 'dynamicProduct') || (flowType === 'dynamicTagLegacy')) && (
          <Box
            sx={{
              pt: 3,
              pb: 1,
              mb: 1,
              justifyContent: 'space-between',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                Posts must have
              </Typography>
              <FormControl size="small" variant="standard" sx={{ ml: 1 }}>
                <Select
                  value={operator}
                  onChange={handleOperator}
                  displayEmpty
                  disableUnderline
                  sx={{
                    color: 'text.primary',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: 1.43,
                    '& .MuiSelect-select': {
                      p: 0,
                      fontWeight: 400,
                      lineHeight: 1.43,
                      background: 'none',
                      border: 'none',
                    },
                    '& .MuiSelect-icon': {
                      right: 0,
                      color: 'text.primary',
                    },
                    '&:before, &:after': {
                      display: 'none',
                    },
                    '&:hover': {
                      color: 'primary.main',
                      '& .MuiSelect-icon': {
                        color: 'primary.main',
                      },
                    },
                  }}
                >
                  <MenuItem value="OR">at least one of these products</MenuItem>
                  <MenuItem value="AND">all of the selected products</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button onClick={() => onRemoveAll()}>Remove All</Button>
          </Box>
        )}

        {/* Chip Input for Tags or Product IDs */}
        {(flowType === 'dynamicTag' || flowType === 'dynamicTagLegacy' || flowType === 'dynamicProduct' || flowType === 'dynamicProductLegacy') && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {(flowType === 'dynamicTag' || flowType === 'dynamicTagLegacy') ? 'Tags' : 'Product IDs'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleAddChip();
                }}
                placeholder={`Add ${(flowType === 'dynamicTag' || flowType === 'dynamicTagLegacy') ? 'tag' : 'product ID'}`}
                disabled={isRendered || (flowType === 'dynamicProductLegacy' && productIds.length >= 1)}
                size="small"
                sx={{ flex: 1 }}
              />
              <Button
                onClick={handleAddChip}
                disabled={isRendered || !inputValue.trim()}
                variant="outlined"
                size="small"
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {(flowType === 'dynamicTag' ? tags : productIds).map(chip => (
                <Chip
                  key={chip}
                  label={chip}
                  onDelete={() => handleDeleteChip(chip)}
                  disabled={isRendered}
                  sx={{ mb: 0.5 }}
                />
              ))}
            </Box>
          </Box>
        )}
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
        <Stack direction="row" spacing={2} alignItems="center">
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

          <FormControlLabel
            control={
              <Checkbox
                checked={enforceV2}
                onChange={(e) => setEnforceV2(e.target.checked)}
                disabled={isRendered}
              />
            }
            label={
              <Box>
                <Typography variant="body2">
                  Enforce V2
                </Typography>
              </Box>
            }
          />
        </Stack>


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
            <MobileView iframeRef={iframeRef} />
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
                locale={locale}
                containerId={`flowbox-tester-${renderKey}`}
                isTest={isTestMode}
                isServerSide={true}
                allowCookies={allowCookies}
                iframe={null}
                flowType={flowType}
                tags={tags}
                productIds={productIds}
                operator={operator}
                enforceV2={enforceV2}
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
