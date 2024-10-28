import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import { THero } from "@utils/types/types";
// import { useHeroGraphData } from "./hooks/useHeroGraphData";
// import { LoadingSpinner } from "./components/LoadingSpinner";
// import { ErrorMessage } from "./components/ErrorMessage";
// import { NoFilmsMessage } from "./components/NoFilmsMessage";
// import { createNodes } from "./utils/createNodes";
// import { createEdges } from "./utils/createEdges";

import "reactflow/dist/style.css";
import { ErrorMessage } from "./Messages/ErrorMessage";
import { LoadingSpinner } from "@components/Loaders/LaodingSpinner";
import { NoFilmsMessage } from "./Messages/NoFilmsMessage";
import { useHeroGraphData } from "./hooks/useHeroGrephData";
import { createEdges } from "./Nodes/Edges";
import { createNodes } from "./Nodes/Nodes";

interface HeroGraphProps {
    hero: THero;
}

function HeroGraphComponent({ hero }: HeroGraphProps) {
    const theme = useTheme();
    const { films, starships, isLoading, error } = useHeroGraphData(hero);

    const nodes = useMemo(() => createNodes(hero, films, starships, theme), [hero, films, starships, theme]);
    const edges = useMemo(() => createEdges(hero, films), [hero, films]);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage />;

    return (
        <Box style={{ height: "80vh" }}>
            <ReactFlow nodes={nodes} edges={edges}>
                <MiniMap style={{ background: theme.palette.background.paper }} />
                <Controls style={{ fill: theme.palette.primary.main, left: "0", bottom: 5 }} />
                <Background gap={32} size={3} />
            </ReactFlow>
        </Box>
    );
}

export const HeroGraph = React.memo(HeroGraphComponent);
