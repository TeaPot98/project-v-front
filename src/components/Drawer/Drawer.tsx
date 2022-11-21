import { CSSObject, Theme, styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

interface DrawerProps {
  width?: string | number;
}

const openedMixin = (
  theme: Theme,
  drawerWidth: number | string
): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<DrawerProps>(({ theme, open, width = 240 }) => ({
  width: width,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme, width),
    "& .MuiDrawer-paper": openedMixin(theme, width),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
