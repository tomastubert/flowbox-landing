"use client";

import { useEffect, useRef, useState } from "react";

interface FlowboxEmbedProps {
  flowKey: string;
  locale?: string;
  containerId: string;
  isTest?: boolean;
  isServerSide?: boolean;
  allowCookies?: boolean;
  operator?: 'OR' | 'AND';
  flowType?: 'dynamicTag' | 'dynamicProduct' | 'static';
  tags?: string[];
  productIds?: string[];
  iframe?: HTMLIFrameElement | null
}

export default function FlowboxEmbed({
  flowKey,
  locale = "en-eu",
  containerId,
  isTest = false,
  isServerSide = false,
  allowCookies = false,
  operator,
  tags,
  flowType,
  productIds,
  iframe = null,
}: FlowboxEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    // Make sure we have both the container ref and flowkey
    if (!containerRef.current || !flowKey) return undefined
    const scriptUrl = (isTest ? process.env.NEXT_PUBLIC_FLX_URL_TEST : process.env.NEXT_PUBLIC_FLX_URL) || 'https://connect.getflowbox.com/flowbox.js';

    const initializeFlowbox = () => {
      if (window.flowbox && containerRef.current) {
        window.flowbox("init", {
          container: containerRef.current,
          ...(iframe && {
            previewIframeContainer: iframe,
            preview: 'v2',
            isPreview: true,
          }),
          key: flowKey,
          ...(locale && { locale }),
          ...((flowType === 'dynamicTag' || flowType === 'dynamicProduct') && operator && { operator }),
          ...(flowType === 'dynamicTag' && tags && { tags }),
          ...(flowType === 'dynamicProduct' && productIds && { productIds }),
          ...(isServerSide && { lazyLoad: false }),
          ...(allowCookies && { allowCookies: true }),
        });
      }
    };

    const scriptId = `flowbox-js-embed-${isTest ? "test" : "prod"}-${flowKey}`;
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    const handleScriptError = () => {
      setScriptError("Failed to load Flowbox script. Please check your network connection or try again later.");
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = scriptUrl;
      script.onload = () => {
        scriptLoadedRef.current = true;
        initializeFlowbox();
      };
      script.onerror = handleScriptError;
      document.body.appendChild(script);
    } else {
      initializeFlowbox();
    }

    // Cleanup: remove script on unmount
    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
        console.log(`Removed Flowbox script: ${scriptId}`);
        if (window.flowbox) {
          window.flowbox('destroy', {
            container: `#${containerId}`,
          });
        }
      }
    };
  }, [flowKey, locale, containerId, isTest, isServerSide, allowCookies, iframe, flowType, operator, tags, productIds]);

  return (
    <>
      <div id={containerId} style={{ width: "100%", height: "100%" }} ref={containerRef}></div>
      {scriptError && (
        <div style={{ color: "red", marginTop: 16, textAlign: "center" }}>{scriptError}</div>
      )}
    </>
  );
}
