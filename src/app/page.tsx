"use client";

import { Box, Container, Typography } from "@mui/material";

import { UserSearch } from "./components";

export default function Home() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Box
        component="main"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          fontSize={48}
          sx={{ maxWidth: "max-content", mb: 2 }}
        >
          GitHub User Search
        </Typography>
        <UserSearch />
      </Box>
    </Container>
  );
}
