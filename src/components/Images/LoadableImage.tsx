import { Box, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";

interface LoadableImageProps {
    src: string;
    alt: string;
}

export const LoadableImage: React.FC<LoadableImageProps> = ({ src, alt }) => {
    const [loading, setLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);
    const [loadComplete, setLoadComplete] = useState(false);

    useEffect(() => {
        // Show the spinner for at least 1 second
        const timer = setTimeout(() => {
            setShowSpinner(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleLoad = () => {
        setLoadComplete(true); // Image loading is complete
        setLoading(false); // Set loading to false
    };

    const handleError = () => {
        setLoadComplete(true); // Image loading failed
        setLoading(false); // Set loading to false
    };

    // Hide the spinner only if the loading is complete and the minimum time has passed
    useEffect(() => {
        if (loadComplete) {
            const hideSpinnerTimer = setTimeout(() => {
                setShowSpinner(false);
            }, 0); // We can hide the spinner immediately after loadComplete

            return () => clearTimeout(hideSpinnerTimer);
        }
    }, [loadComplete]);

    return (
        <Box style={{ position: "relative" }}>
            {showSpinner && loading && (
                <Box
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                >
                    <CircularProgress size={24} />
                </Box>
            )}
            <img
                src={src}
                alt={alt}
                style={{ width: "100%", height: "100%" }}
                onLoad={handleLoad}
                onError={handleError} // Handle error case
            />
        </Box>
    );
};
