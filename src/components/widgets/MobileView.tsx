import React, { RefObject } from "react";
import Box from "@mui/material/Box";

interface MobileViewProps {
    iframeRef: RefObject<HTMLIFrameElement | null>;
}

const MobileView: React.FC<MobileViewProps> = ({ iframeRef }) => (
    <Box
        sx={{
            position: 'relative',
            width: 390,
            height: 844,
            aspectRatio: '390 / 844',
            maxWidth: '100%',
            margin: '0 auto',
            // background: '#111',
            borderRadius: '48px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            border: '8px solid #222',
            overflow: 'hidden',
            transition: 'width 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // pt: 10
        }}
    >
        {/* Simulated iPhone notch */}
        <Box
            sx={{
                position: 'absolute',
                top: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 120,
                height: 24,
                background: '#222',
                borderRadius: '12px',
                zIndex: 2,
            }}
        />
        <Box
            component="iframe"
            ref={iframeRef}
            sx={{
                width: 390,
                height: 844,
                border: 'none',
                borderRadius: '0 0 40px 40px',
                background: '#fff',
                // boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                position: 'relative',
                zIndex: 1,
                transition: 'width 0.3s',
            }}
        />
    </Box>
);

export default MobileView;
