import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";

interface LoadableImageProps {
    src: string;
    alt: string;
}

export const LoadableImage: React.FC<LoadableImageProps> = ({ src, alt }) => {
    const [loading, setLoading] = useState(true);

    const handleLoad = () => {
        setLoading(false); // Image loading is complete
    };

    const handleError = () => {
        setLoading(false); // Image loading failed
    };

    return (
        <Box sx={(theme) => ({ position: "relative", background: theme.palette.background.paper, height: "100%" })}>
            {loading && (
                <Box
                    sx={{
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
