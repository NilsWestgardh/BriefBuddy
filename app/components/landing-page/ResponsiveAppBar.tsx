"use client";

// Hooks
import React, {
  useState
} from 'react';
// Utils
import Image from "next/image";
import Link from "next/link";
// Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

// Icons
import BriefBuddyLogoBlack from "@/public/briefbuddy_logo_black.svg";
import MenuIcon from '@mui/icons-material/Menu';

const pages = ["Pricing", "Contact"];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  function handleOpenNavMenu(
    event: React.MouseEvent<HTMLElement>
  ) {
    setAnchorElNav(event.currentTarget);
  };

  function handleCloseNavMenu() {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      className="
        bg-neutral-50
        shadow-none
        border-b
        border-neutral-200
        z-10
        fixed
        top-0
      "
    >
      <Container
        maxWidth="xl"
      >
        <Toolbar disableGutters>
          <Link href="/">
            <Button
              className="
                flex
                flex-col
                justify-center
                items-center
                hover:cursor-pointer
                hover:opacity-90
              "
            >
              <Image
                src={BriefBuddyLogoBlack}
                alt="BriefBuddy logo"
                width={126}
                height={24}
              />
            </Button>
          </Link>

          <Box
            id="nav-menu-container"
            sx={{ 
              flexGrow: 1, 
              display: { 
                xs: 'flex', 
                md: 'none' 
              } 
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Typography
                    textAlign="center"
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                color="secondary"
                className="text-black"
              >
                {page}
              </Button>
            ))}
          </Box>
          <Link
            href="/login"
          >
            <Button
              color="secondary"
              className="text-black"
            >
              Login
            </Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};