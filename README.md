# Starnavi

## Overview

Starnavi is a web application that allows users to explore a list of Star Wars heroes and access detailed information about the starships and movies associated with each hero. The application leverages React.js for the front-end and React Flow for visualizing relationships in a graph format.

## Features

-   **Hero List**:

    -   Fetches and displays a paginated list of all Star Wars heroes using the API from [sw-api.starnavi.io](https://sw-api.starnavi.io).
    -   Implements either pagination or infinite scrolling for seamless browsing.

-   **Hero Details**:
    -   Click on a specific hero to view a detailed graph that displays:
        -   The selected hero as the main node.
        -   Connections to movies in which the hero appears.
        -   Connections to starships associated with each movie.

## Technologies Used

-   **Frontend**:
    -   [React.js](https://reactjs.org/) for building the user interface.
    -   [React Flow](https://reactflow.dev/) for graph visualization.
    -   [TypeScript](https://www.typescriptlang.org/) for type safety.
-   **Testing**:

    -   [Vitest](https://vitest.dev/) for unit testing the main components and logic.

-   **Styling**:
    -   [Material-UI](https://mui.com/) for a modern UI design.
    -   [Styled Components](https://styled-components.com/) for additional styling capabilities.

## Development Setup

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 20.18.0).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/AndrewShmorhunGit/starnavi.git
    cd starnavi
    ```
