import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import { alpha } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";

import { usePathname } from "src/routes/hooks";
import { RouterLink } from "src/routes/components";

import { useResponsive } from "src/hooks/use-responsive";

import Logo from "src/components/logo";
import Scrollbar from "src/components/scrollbar";

import { NAV } from "./config-layout";
import navConfig from "./config-navigation";
import { Collapse, List } from "@mui/material";
import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();

  const upLg = useResponsive("up", "lg");
  const [openItem, setOpenItem] = React.useState(-1);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

    let openId = -1;
    navConfig.map((item, index) => {
      item.items?.map((sItem, sIndex) => {
        if (pathname.includes(sItem.path)) openId = index;
      });
    });
    setOpenItem(openId);
  }, [pathname]);

  const handleClick = (index) => {
    // setOpenItem(-1);
    if (navConfig[index].items) {
      if (openItem === index) setOpenItem(-1);
      else setOpenItem(index);
    }
  };

  const renderMenu = (
    <Stack
      component="nav"
      spacing={0.5}
      sx={{ px: 2 }}
    >
      {navConfig.map((item, index) => (
        <React.Fragment key={index}>
          <NavItem
            is_open={openItem === index}
            item={item}
            handleClick={() => handleClick(index)}
          />
          {item.items && (
            <Collapse
              in={openItem === index}
              timeout="auto"
              unmountOnExit
            >
              <List
                component="div"
                disablePadding
              >
                {item.items.map((item, index) => (
                  <NavItem
                    item={item}
                    key={index}
                    is_child={true}
                  />
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Logo
        sx={{ my: 3, ml: 4 }}
        link="/admin"
      />

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item, handleClick, is_child = false, is_open = false }) {
  const pathname = usePathname();

  const active = pathname.includes(item.path);

  return (
    <ListItemButton
      onClick={handleClick}
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(is_child && {
          pl: 4,
        }),
        ...(active && {
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, is_child ? 0.04 : 0.08),
          "&:hover": {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, is_child ? 0.12 : 0.16),
          },
        }),
        ...(is_open && {
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box
        component="span"
        sx={{ width: 24, height: 24, mr: 2 }}
      >
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>

      {item.items && (
        <Box
          component="span"
          sx={{ width: 20, height: 20, ml: "auto" }}
        >
          {is_open ? (
            <SvgColor
              src={`/assets/icons/ic_upward.svg`}
              sx={{ width: 1, height: 1 }}
            />
          ) : (
            <SvgColor
              src={`/assets/icons/ic_downward.svg`}
              sx={{ width: 1, height: 1 }}
            />
          )}
        </Box>
      )}
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
