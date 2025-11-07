"use client";

import { useEffect, useRef, useState } from "react";

interface FlowboxEmbedProps {
  flowKey: string;
  locale?: string;
  containerId: string;
  isTest?: boolean;
  isServerSide?: boolean;
}

export default function FlowboxEmbed({
  flowKey,
  locale,
  containerId,
  isTest = false,
  isServerSide = false,
}: FlowboxEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    const scriptUrl = isTest
      ? "https://connect.flowbox.me/flowbox.js"
      : "https://connect.getflowbox.com/flowbox.js";

    const initializeFlowbox = () => {
      if (window.flowbox && containerRef.current) {
        window.flowbox("init", {
          container: `#${containerId}`,
          key: flowKey,
          ...(locale && { locale }),
          ...(isServerSide && { lazyLoad: true }),
        });
      }
    };

    const scriptId = `flowbox-js-embed-${isTest ? "test" : "prod"}`;
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
    } else if (scriptLoadedRef.current || window.flowbox) {
      initializeFlowbox();
    } else {
      existingScript.addEventListener("load", initializeFlowbox);
      existingScript.addEventListener("error", handleScriptError);
      return () => {
        existingScript.removeEventListener("load", initializeFlowbox);
        existingScript.removeEventListener("error", handleScriptError);
      };
    }
  }, [flowKey, locale, containerId, isTest, isServerSide]);

  // Reset scriptError when any prop changes
  useEffect(() => {
    setScriptError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowKey, locale, containerId, isTest]);
  return (
    <>
      <div id={containerId} ref={containerRef}></div>
      {scriptError && (
        <div style={{ color: "red", marginTop: 16, textAlign: "center" }}>{scriptError}</div>
      )}
    </>
  );
}
