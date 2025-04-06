import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  styled,
  IconButton,
} from "@mui/material"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import { Link } from "react-router-dom"
import "../styles/sidebar.scss"
import Logo from "../assets/images/logo.svg"
import LogoSmall from "../assets/images/logo-small.svg"
import { DashboardIcon } from "../assets/icons/DashboardIcon"
import { UserIcon } from "../assets/icons/UserIcon"
import { AcessIcon } from "../assets/icons/AcessIcon"
import { ExpandLessIcon } from "../assets/icons/ExpandLess"
import { ExpandMoreIcon } from "../assets/icons/ExpandMore"

const drawerWidth = 336
const drawerCollapsedWidth = 116

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  width: open ? drawerWidth : drawerCollapsedWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : drawerCollapsedWidth,
    backgroundColor: "var(--color-navy)",
    color: "var(--full-branco-ffffff)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    boxShadow: "7px 0px 6px #0000002C",
  },
}))

const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const [accessControlOpen, setAccessControlOpen] = useState(false)
  const location = useLocation()

  const isHomeActive = location.pathname === "/"
  const isUsersActive = location.pathname.startsWith("/usuarios")
  const isAccessControlActive = location.pathname.startsWith("/usuarios")

  useEffect(() => {
    if (isUsersActive && !accessControlOpen) {
      setAccessControlOpen(true)
    }
  }, [isUsersActive, accessControlOpen])

  const toggleSidebar = () => {
    setOpen(!open)
  }

  const toggleAccessControl = () => {
    setAccessControlOpen(!accessControlOpen)
  }

  return (
    <div className="sidebar-container">
      <StyledDrawer variant="permanent" open={open} className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            {open ? (
              <img src={Logo} alt="Logo" className="logo-image" />
            ) : (
              <img src={LogoSmall} alt="Logo" className="logo-image" />
            )}
          </div>
        </div>
        <List className="sidebar-list">
          <ListItem disablePadding component={Link} to="/" className={`sidebar-item ${isHomeActive ? "active" : ""}`}>
            <ListItemButton
              className={`menu-button ${!open ? "collapsed" : ""}`}
              sx={{
                minHeight: 54,
                height: 54,
                justifyContent: open ? "initial" : "center",

                borderRadius: "6px",
                margin: "4px 8px",
                padding: open ? "0 12px" : 0,
                width: open ? "auto" : 24,
                marginLeft: open ? "12px" : "27px",
                marginRight: open ? "12px" : "27px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,

                  justifyContent: "center",
                  width: open ? "auto" : "100%",
                  padding: open ? "inherit" : 0,
                }}
              >
                <DashboardIcon isActive={isHomeActive} />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                sx={{
                  opacity: open ? 1 : 0,
                  "& .MuiTypography-root": {
                    color: isHomeActive ? "var(--verde-black-menu-lateral-021b1a)" : "var(--full-branco-ffffff)",
                    fontWeight: 800,
                    fontSize: "16px",
                    lineHeight: "22px",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding className="sidebar-item">
            <ListItemButton
              onClick={toggleAccessControl}
              className={`menu-button ${!open ? "collapsed" : ""}`}
              sx={{
                minHeight: 54,
                height: 54,
                justifyContent: open ? "initial" : "center",

                borderRadius: "6px",
                margin: "4px 8px",
                padding: open ? "0 12px" : 0,
                width: open ? "auto" : 24,
                marginLeft: open ? "12px" : "27px",
                marginRight: open ? "12px" : "27px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,

                  justifyContent: "center",
                  width: open ? "auto" : "100%",
                  padding: open ? "inherit" : 0,
                }}
              >
                <AcessIcon isActive={isAccessControlActive && !isUsersActive} />
              </ListItemIcon>
              <ListItemText
                primary="Controle de Acesso"
                sx={{
                  opacity: open ? 1 : 0,
                  "& .MuiTypography-root": {
                    fontSize: "16px",
                    lineHeight: "22px",
                    opacity: "0.6",
                  },
                }}
              />
              {open && (
                <span className="expand-icon">{accessControlOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}</span>
              )}
            </ListItemButton>
          </ListItem>

          <Collapse in={accessControlOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className="submenu-list">
              <ListItem
                disablePadding
                component={Link}
                to="/usuarios"
                className={`sidebar-item nested ${isUsersActive ? "active" : ""}`}
              >
                <ListItemButton
                  className={`menu-button submenu-button ${!open ? "collapsed" : ""}`}
                  sx={{
                    minHeight: 37,
                    height: 37,
                    justifyContent: open ? "initial" : "center",

                    borderRadius: "6px",
                    margin: "4px 8px",
                    padding: open ? "0 12px" : 0,
                    width: open ? "250px" : 50,
                    marginRight: open ? "0px" : "10px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,

                      justifyContent: "center",
                      width: open ? "auto" : "100%",
                      padding: open ? "inherit" : 0,
                    }}
                  >
                    <UserIcon isActive={isUsersActive} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Usuários"
                    sx={{
                      opacity: open ? 1 : 0,
                      "& .MuiTypography-root": {
                        color: isUsersActive ? "var(--verde-black-menu-lateral-021b1a)" : "var(--full-branco-ffffff)",
                        fontSize: "16px",
                        lineHeight: "22px",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </List>
        <div className="sidebar-footer">
          <div className="footer-text">
            {open ? (
              <>
                <span className="name">© WenLock</span>
                <span className="version">Power by conecthus</span>
                <span className="version">Versão 0.0.0</span>
              </>
            ) : (
              <>
                <span style={{ display: "flex", justifyContent: "center" }} className="version">
                  V 0.0.0
                </span>
              </>
            )}
          </div>
        </div>
      </StyledDrawer>

      <IconButton
        onClick={toggleSidebar}
        className="toggle-button"
        sx={{
          color: "gray",
          backgroundColor: "#F2F2F2",
          boxShadow: "0px 3px 6px #00000029",
          position: "absolute",
          right: open ? drawerWidth - 350 : drawerCollapsedWidth - 130,
          top: "30px",
          zIndex: 1200,
          width: "37px",
          height: "37px",
          transition: "right 0.3s",
          "&:hover": {
            backgroundColor: "#F2F2F2",
            color: "#0b2b25",
          },
        }}
      >
        {open ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </div>
  )
}

export default Sidebar