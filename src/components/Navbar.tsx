"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Server Side", path: "/" },
    { label: "Client Side", path: "/client-side" },
    { label: "Flow Tester", path: "/flow-tester" },
  ];

  return (
    <AppBar position="static" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 0,
              fontWeight: 700,
              mr: 4,
              display: { xs: "none", md: "flex" },
            }}
          >
            Flowbox Widgets
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                href={item.path}
                sx={{
                  color: pathname === item.path ? "primary.contrastText" : "rgba(255,255,255,0.7)",
                  fontWeight: pathname === item.path ? 600 : 400,
                  backgroundColor: pathname === item.path ? "rgba(255,255,255,0.1)" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
