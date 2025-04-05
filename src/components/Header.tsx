import type React from "react";
import { useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import {
  Logout,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import "../styles/header.scss";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header">
      <div className="avatar-container">
        <IconButton
          className="avatar-button"
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            alt="Milena Santana Borges"
            sx={{
              width: 40,
              height: 40,
              bgcolor: "#032221",
              fontSize: "14px",
              border: "2px solid #00606D",
            }}
          >
            MS
          </Avatar>
        </IconButton>
        <div className={`arrow-indicator ${open ? "open" : ""}`}>
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </div>
      </div>

      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
            mt: 1.5,

            width: 280,
            borderRadius: "8px",
            "& .MuiAvatar-root": {
              width: 40,
              height: 40,
            },
          },
        }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Avatar
              alt="Milena Santana Borges"
              sx={{
                width: 48,
                height: 48,
                bgcolor: "#032221",
                fontSize: "18px",
                mr: 2,
              }}
            >
              MS
            </Avatar>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "#0290a4" }}
              >
                Milena Santana Borges
              </Typography>
              <Typography variant="body2" sx={{ color: "#0B2B25" }}>
                milena.santana@energy.org.br
              </Typography>
            </Box>
          </Box>
        </Box>

        <MenuItem
          onClick={handleClose}
          className="logout-button"
          sx={{ mx: 2, borderRadius: "6px" }}
        >
          <Logout fontSize="small" sx={{ mr: 1 }} />
          <span className="logout-text">Sair</span>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
