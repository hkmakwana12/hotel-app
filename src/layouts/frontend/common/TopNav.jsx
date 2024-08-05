import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Iconify from "src/components/iconify";
import Logo from "src/components/logo";
import { usePathname } from "src/routes/hooks";

const drawerWidth = 240;
const navItems = [
  { link: "/", title: "Home" },
  { link: "/about-us", title: "About Us" },
  { link: "/our-services", title: "Our Services" },
  { link: "/contact-us", title: "Contact Us" },
];

export default function TopNav({ window }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Logo sx={{ my: 3, ml: 4, width: "140px" }} />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.link}
            disablePadding
          >
            <ListItemButton
              selected={item.link === pathname}
              component={RouterLink}
              to={item.link}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar
        component="nav"
        sx={{
          boxShadow: 0,
          backgroundColor: "white",
        }}
      >
        <Toolbar
          component={Container}
          variant="regular"
          sx={{ justifyContent: "space-between" }}
        >
          <Logo sx={{ my: 3, ml: 4 }} />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Link
                key={index}
                component={RouterLink}
                to={item.link}
                className={item.link === pathname ? "active" : ""}
                underline="none"
                sx={{
                  marginLeft: 2,
                  color: "text.secondary",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                  "&.active": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {item.title}
              </Link>
            ))}
          </Box>

          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <Iconify icon="eva:menu-2-fill" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}
